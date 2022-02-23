import { gql } from "@apollo/client";
import Badge from "components/Badge";
import { getAnalysisStatusLabel } from "libs/analysis";
import { AccessmodAnalysisStatus } from "libs/graphql";

interface Props {
  analysis: { status: AccessmodAnalysisStatus };
}

const Classes = {
  [AccessmodAnalysisStatus.Failed]: "bg-red-200 text-red-800",
  [AccessmodAnalysisStatus.Pending]: "bg-gray-200 text-gray-800",
  [AccessmodAnalysisStatus.Queued]: "bg-lime-200 text-lime-800",
  [AccessmodAnalysisStatus.Ready]: "bg-blue-200 text-blue-800",
  [AccessmodAnalysisStatus.Running]: "bg-purple-200 text-purple-800",
  [AccessmodAnalysisStatus.Success]: "bg-green-200 text-green-800",
};

const AnalysisStatus = ({ analysis }: Props) => {
  return (
    <Badge size="xs" className={Classes[analysis.status]}>
      {getAnalysisStatusLabel(analysis.status)}
    </Badge>
  );
};

AnalysisStatus.fragments = {
  analysis: gql`
    fragment AnalysisStatus_analysis on AccessmodAnalysis {
      __typename
      status
    }
  `,
};

export default AnalysisStatus;
