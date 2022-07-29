import { gql, useMutation } from "@apollo/client";
import Button from "components/Button";
import Checkbox from "components/forms/Checkbox";
import Pagination from "components/Pagination";
import Time from "components/Time";
import { displayAlert } from "libs/alert";
import {
  AccessmodAccessRequestStatus,
  ApproveAccessRequestMutation,
  DenyAccessmodAccessRequestMutation,
  useAccessRequestsTableQuery,
} from "libs/graphql";
import { NextPageWithPrefetch } from "libs/types";
import { useTranslation } from "next-i18next";
import { useCallback, useState } from "react";

type AccessRequestsTableProps = {
  perPage?: number;
};

const AccessRequestsTable: NextPageWithPrefetch = (
  props: AccessRequestsTableProps
) => {
  const { perPage = 10 } = props;
  const { t } = useTranslation();
  const [variables, setVariables] = useState({
    page: 1,
  });

  const [approveRequest] = useMutation<ApproveAccessRequestMutation>(gql`
    mutation ApproveAccessRequest($input: ApproveAccessmodAccessRequestInput!) {
      approveAccessmodAccessRequest(input: $input) {
        success
        errors
      }
    }
  `);

  const [denyRequest] = useMutation<DenyAccessmodAccessRequestMutation>(gql`
    mutation DenyAccessmodAccessRequest(
      $input: DenyAccessmodAccessRequestInput!
    ) {
      denyAccessmodAccessRequest(input: $input) {
        success
        errors
      }
    }
  `);

  const formatStatus = useCallback(
    (status: AccessmodAccessRequestStatus) => {
      switch (status) {
        case AccessmodAccessRequestStatus.Approved:
          return t("Approved");
        case AccessmodAccessRequestStatus.Pending:
          return t("Pending");
        case AccessmodAccessRequestStatus.Denied:
          return t("Denied");
      }
    },
    [t]
  );

  const { data, previousData, loading, refetch } = useAccessRequestsTableQuery({
    variables,
  });

  const rows = (data || previousData)?.accessRequests.items ?? [];
  const totalItems = (data || previousData)?.accessRequests.totalItems ?? 0;
  const totalPages = (data || previousData)?.accessRequests.totalPages ?? 0;

  const onApproveClick = async (request: { id: string }) => {
    const { data } = await approveRequest({
      variables: {
        input: { id: request.id },
      },
    });
    if (!data?.approveAccessmodAccessRequest.success) {
      displayAlert(t("We were unable to approve this access request"), "error");
    }
    refetch(variables);
  };
  const onDenyClick = async (request: { id: string }) => {
    const { data } = await denyRequest({
      variables: {
        input: { id: request.id },
      },
    });
    if (!data?.denyAccessmodAccessRequest.success) {
      displayAlert(t("We were unable to deny this access request"), "error");
    }
    refetch(variables);
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="overflow-x-auto">
        <table className="who">
          <thead>
            <tr>
              <th scope="column" className="whitespace-nowrap">
                {t("Name")}
              </th>
              <th scope="column" className="whitespace-nowrap">
                {t("Email")}
              </th>
              <th scope="column" className="whitespace-nowrap">
                {t("Accepts ToS?")}
              </th>
              <th scope="column">{t("Created at")}</th>
              <th scope="column">{t("Updated at")}</th>
              <th scope="column" className="whitespace-nowrap">
                {t("Status")}
              </th>
              <th scope="column">
                <span className="sr-only">{t("Actions")}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="cursor-pointer">
                <td className="min-w-fit">
                  {[row.firstName, row.lastName].join(" ")}
                </td>
                <td>{row.email}</td>
                <td>
                  <Checkbox disabled checked={row.acceptedTos} />
                </td>
                <td>
                  <Time datetime={row.createdAt} />
                </td>
                <td>
                  <Time datetime={row.updatedAt} />
                </td>
                <td>{formatStatus(row.status)}</td>
                <td>
                  {row.status === AccessmodAccessRequestStatus.Pending && (
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outlined"
                        size="sm"
                        onClick={() => onDenyClick(row)}
                      >
                        {t("Deny")}
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onApproveClick(row)}
                      >
                        {t("Accept")}
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 border-t border-gray-200">
        <Pagination
          className="px-2"
          loading={loading}
          onChange={(page) => setVariables({ ...variables, page })}
          page={variables.page}
          perPage={perPage}
          countItems={rows.length}
          totalItems={totalItems}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

AccessRequestsTable.prefetch = async (client) => {
  await client.query({
    query: gql`
      query AccessRequestsTable($page: Int = 1, $perPage: Int = 10) {
        accessRequests: accessmodAccessRequests(
          page: $page
          perPage: $perPage
        ) {
          pageNumber
          items {
            id
            firstName
            lastName
            acceptedTos
            email
            status
            createdAt
            updatedAt
          }
          totalPages
          totalItems
        }
      }
    `,
    variables: { page: 1, perPage: 10 },
  });
};

export default AccessRequestsTable;
