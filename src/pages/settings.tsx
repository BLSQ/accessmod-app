import { gql } from "@apollo/client";
import Block from "components/Block";
import Breadcrumbs from "components/Breadcrumbs";
import Button from "components/Button";
import Field from "components/forms/Field";
import SelectInput from "components/forms/SelectInput";
import Layout from "components/layouts/Layout";
import { PageContent, PageHeader } from "components/layouts/Layout/PageContent";
import useForm from "hooks/useForm";
import { LANGUAGES } from "libs/constants";
import { useSettingsPageQuery } from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { routes } from "libs/router";
import { useTranslation } from "next-i18next";

type UserForm = {
  language: any;
  firstName: string;
  lastName: string;
};

const SettingsPage = () => {
  const { t } = useTranslation();
  const { data } = useSettingsPageQuery();
  const form = useForm<UserForm>({
    onSubmit: (values) => {},
    getInitialState: () => ({
      language: LANGUAGES.find((l) => l.code === "en"),
      firstName: data?.me?.firstName ?? "",
      lastName: data?.me?.lastName ?? "",
    }),
    validate: (values) => {
      const errors = {} as any;

      return errors;
    },
  });

  return (
    <>
      <PageHeader>
        <Breadcrumbs>
          <Breadcrumbs.Part href={routes.settings}>
            {t("Settings")}
          </Breadcrumbs.Part>
        </Breadcrumbs>
        <h1 className="mt-4 text-3xl font-bold text-white">{t("Settings")}</h1>
      </PageHeader>
      <PageContent>
        <Block>
          <form onSubmit={form.handleSubmit} className="space-y-6">
            <div className="flex gap-4">
              <Field
                className="w-72"
                name="firstName"
                label={t("First name")}
                required
                disabled
                type="text"
                value={form.formData.firstName}
                onChange={form.handleInputChange}
                error={form.touched.firstName && form.errors.firstName}
              />
              <Field
                className="w-72"
                name="lastName"
                label={t("LastName")}
                required
                disabled
                type="text"
                value={form.formData.lastName}
                onChange={form.handleInputChange}
                error={form.touched.lastName && form.errors.lastName}
              />
            </div>
            <Field
              className="w-72"
              name="language"
              label={t("Interface Language")}
              required
            >
              <SelectInput
                options={LANGUAGES}
                labelKey="name"
                valueKey="code"
                required
                disabled
                value={form.formData.language}
                onChange={(value) => form.setFieldValue("language", value)}
              />
            </Field>
            <div className="flex justify-end gap-2">
              <Button disabled type="submit">
                {t("Save")}
              </Button>
            </div>
          </form>
        </Block>
      </PageContent>
    </>
  );
};

export const getServerSideProps = createGetServerSideProps({
  requireAuth: true,
  getServerSideProps: async (ctx, client) => {
    await client.query({
      query: gql`
        query SettingsPage {
          me {
            id
            email
            firstName
            lastName
          }
        }
      `,
    });
    await Layout.prefetch(client);
  },
});

export default SettingsPage;
