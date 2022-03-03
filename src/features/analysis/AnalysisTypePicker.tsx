import clsx from "clsx";
import SelectInput, { DefaultComponents } from "components/forms/SelectInput";
import { AccessmodAnalysisType } from "libs/graphql";

type Props = {
  value: { value: AccessmodAnalysisType } | null | undefined;
  disabled?: boolean;
  required?: boolean;
  onChange: (value: any) => void;
};

const OPTIONS = [
  {
    value: AccessmodAnalysisType.Accessibility,
    label: "Accessibility Analysis",
    description:
      "Compute the traveling time surface, informing the time needed to reach the nearest health facility.",
  },
];

const AnalysisOption = (props: any) => {
  return (
    <DefaultComponents.Option {...props}>
      <div className="flex">
        <div className="flex-1 flex flex-col">
          <span className="text-md font-bold">{props.data.label}</span>
          <span className={clsx("text-xs mt-1")}>{props.data.description}</span>
        </div>
      </div>
    </DefaultComponents.Option>
  );
};

const COMPONENTS = {
  Option: AnalysisOption,
};

const AnalysisTypePicker = (props: Props) => {
  const { value, onChange, disabled, required } = props;

  return (
    <SelectInput
      options={OPTIONS}
      value={value}
      disabled={disabled}
      onChange={onChange}
      required={required}
      components={COMPONENTS}
    />
  );
};

export default AnalysisTypePicker;
