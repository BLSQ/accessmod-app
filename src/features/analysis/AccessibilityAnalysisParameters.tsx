import { gql } from "@apollo/client";
import { LinkIcon } from "@heroicons/react/outline";
import DataGrid, { Column } from "components/DataGrid";
import DescriptionList from "components/DescriptionList";
import {
  AccessibilityAnalysisParameters_AnalysisFragment,
  AccessibilityAnalysisParameters_ProjectFragment,
  AccessmodAccessibilityAnalysisAlgorithm,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useCallback, useMemo } from "react";

const TravelScenarioTable = ({
  movingSpeeds,
}: {
  movingSpeeds: { [key: string]: string };
}) => {
  const { t } = useTranslation();
  const columns = useMemo(() => {
    const cols: Column<any>[] = [
      {
        id: "class",
        accessor: (row) => row[0],
        width: 100,
        Header: t("Class"),
      },
      {
        id: "speed",
        accessor: (row) => row[0],
        width: 100,
        Header: t("Speed (in km/h)"),
      },
    ];
    return cols;
  }, [t]);
  const data = useMemo(() => {
    return Object.entries(movingSpeeds);
  }, [movingSpeeds]);

  return (
    <DataGrid
      columns={columns}
      data={data}
      totalItems={data.length}
      defaultPageSize={5}
    />
  );
};

type Props = {
  analysis: AccessibilityAnalysisParameters_AnalysisFragment;
  project: AccessibilityAnalysisParameters_ProjectFragment;
};

const AccessibilityAnalysisParameters = ({ analysis, project }: Props) => {
  const { t } = useTranslation();

  const getLayerName = useCallback(
    (id: string) => {
      const layer = [
        analysis.barrier,
        analysis.water,
        analysis.landCover,
        analysis.transportNetwork,
      ].find((x) => x?.id === id);
      return layer?.name ?? t("Unknown layer");
    },
    [analysis, t]
  );

  if (analysis.__typename !== "AccessmodAccessibilityAnalysis") {
    return null;
  }

  return (
    <>
      <DescriptionList>
        <DescriptionList.Item label={t("Stack")} className="col-span-2">
          {analysis.stack ? (
            <Link
              href={`/projects/${encodeURIComponent(
                project.id
              )}/datasets/${encodeURIComponent(analysis.stack.id)}/`}
            >
              <a className="flex items-center text-gray-800 hover:text-gray-600">
                {analysis.stack.name}
                <LinkIcon className="ml-1 inline w-4" />
              </a>
            </Link>
          ) : (
            "-"
          )}
        </DescriptionList.Item>

        <DescriptionList.Item label={t("Digital elevation model")}>
          {analysis.dem ? (
            <Link
              href={`/projects/${encodeURIComponent(
                project.id
              )}/datasets/${encodeURIComponent(analysis.dem.id)}/`}
            >
              <a className="flex items-center text-gray-800 hover:text-gray-600">
                {analysis.dem.name}
                <LinkIcon className="ml-1 inline w-4" />
              </a>
            </Link>
          ) : (
            "-"
          )}
        </DescriptionList.Item>

        <DescriptionList.Item label={t("Land cover")}>
          {analysis.landCover ? (
            <Link
              href={`/projects/${encodeURIComponent(
                project.id
              )}/datasets/${encodeURIComponent(analysis.landCover.id)}/`}
            >
              <a className="flex items-center text-gray-800 hover:text-gray-600">
                {analysis.landCover.name}
                <LinkIcon className="ml-1 inline w-4" />
              </a>
            </Link>
          ) : (
            "-"
          )}
        </DescriptionList.Item>

        <DescriptionList.Item label={t("Transport network")}>
          {analysis.transportNetwork ? (
            <Link
              href={`/projects/${encodeURIComponent(
                project.id
              )}/datasets/${encodeURIComponent(analysis.transportNetwork.id)}/`}
            >
              <a className="flex items-center text-gray-800 hover:text-gray-600">
                {analysis.transportNetwork.name}
                <LinkIcon className="ml-1 inline w-4" />
              </a>
            </Link>
          ) : (
            "-"
          )}
        </DescriptionList.Item>

        <DescriptionList.Item label={t("Barriers")}>
          {analysis.barrier ? (
            <Link
              href={`/projects/${encodeURIComponent(
                project.id
              )}/datasets/${encodeURIComponent(analysis.barrier.id)}/`}
            >
              <a className="flex items-center text-gray-800 hover:text-gray-600">
                {analysis.barrier.name}
                <LinkIcon className="ml-1 inline w-4" />
              </a>
            </Link>
          ) : (
            "-"
          )}
        </DescriptionList.Item>

        <DescriptionList.Item label={t("Water")}>
          {analysis.water ? (
            <Link
              href={`/projects/${encodeURIComponent(
                project.id
              )}/datasets/${encodeURIComponent(analysis.water.id)}/`}
            >
              <a className="flex items-center text-gray-800 hover:text-gray-600">
                {analysis.water.name}
                <LinkIcon className="ml-1 inline w-4" />
              </a>
            </Link>
          ) : (
            "-"
          )}
        </DescriptionList.Item>

        <DescriptionList.Item label={t("Water cells behaviour")}>
          {analysis.waterAllTouched ? t("Impassable") : t("Passable")}
        </DescriptionList.Item>

        <DescriptionList.Item label={t("Layer priorities")}>
          {analysis.stackPriorities ? (
            <ul className="list-inside list-decimal space-y-1">
              {analysis.stackPriorities.map((row: any) => (
                <li key={row.id}>
                  {getLayerName(row.id)} -{" "}
                  <span className="text-gray-600">
                    {row.class ?? t("all classes")}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            "-"
          )}
        </DescriptionList.Item>

        <DescriptionList.Item label={t("Health facilities")}>
          {analysis.healthFacilities ? (
            <Link
              href={`/projects/${encodeURIComponent(
                project.id
              )}/datasets/${encodeURIComponent(analysis.healthFacilities.id)}/`}
            >
              <a className="flex items-center text-gray-800 hover:text-gray-600">
                {analysis.healthFacilities.name}
                <LinkIcon className="ml-1 inline w-4" />
              </a>
            </Link>
          ) : (
            "-"
          )}
        </DescriptionList.Item>

        <DescriptionList.Item
          label={t("Travel scenario")}
          className="col-span-2"
        >
          <div className="w-1/2">
            {analysis.movingSpeeds ? (
              <TravelScenarioTable movingSpeeds={analysis.movingSpeeds} />
            ) : (
              t("No travel scenario")
            )}
          </div>
        </DescriptionList.Item>

        <DescriptionList.Item label={t("Cost distance analysis method")}>
          {analysis.algorithm ===
            AccessmodAccessibilityAnalysisAlgorithm.Anisotropic &&
            t("Anisotropic")}
          {analysis.algorithm ===
            AccessmodAccessibilityAnalysisAlgorithm.Isotropic && t("Isotropic")}
        </DescriptionList.Item>
        <DescriptionList.Item label={t("Direction of travel")}>
          {analysis.invertDirection
            ? t("From facilities")
            : t("Towards facilities")}
        </DescriptionList.Item>
        <DescriptionList.Item label={t("Max travel time")}>
          {analysis.maxTravelTime}
        </DescriptionList.Item>
        <DescriptionList.Item
          label={t("Use Knight's move in cose distance analysis")}
        >
          {analysis.knightMove ? t("Yes") : t("No")}
        </DescriptionList.Item>
      </DescriptionList>
    </>
  );
};

AccessibilityAnalysisParameters.fragments = {
  project: gql`
    fragment AccessibilityAnalysisParameters_project on AccessmodProject {
      id
    }
  `,
  analysis: gql`
    fragment AccessibilityAnalysisParameters_analysis on AccessmodAccessibilityAnalysis {
      __typename
      id
      landCover {
        id
        name
      }
      transportNetwork {
        id
        name
      }
      water {
        id
        name
      }
      barrier {
        id
        name
      }
      stack {
        id
        name
      }
      dem {
        id
        name
      }
      algorithm
      stackPriorities
      movingSpeeds
      knightMove
      maxTravelTime
      invertDirection
      waterAllTouched
      healthFacilities {
        id
        name
      }
    }
  `,
};

export default AccessibilityAnalysisParameters;
