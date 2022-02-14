import Button from "components/Button";
import { gql } from "@apollo/client";
import Dialog from "components/Dialog";
import Input from "components/forms/Input";
import Field from "components/forms/Field";
import SelectInput from "components/forms/SelectInput";
import useForm from "hooks/useForm";
import { FormEvent, MouseEventHandler, useMemo } from "react";
import { useCreateProjectMutation } from "libs/graphql";
import { useRouter } from "next/router";
import { countries, Country, regions } from "libs/countries";
import Spinner from "components/Spinner";
import useCacheKey from "hooks/useCacheKey";

type Props = {
  onClose: () => void;
  open: boolean;
};

type Form = {
  name: string;
  spatialResolution: string;
  country: Country;
};

const MUTATION = gql`
  mutation CreateProject($input: CreateAccessmodProjectInput) {
    createAccessmodProject(input: $input) {
      success
      project {
        id
      }
    }
  }
`;

const CreateProjectDialog = (props: Props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const [createProjectMutation, { loading }] = useCreateProjectMutation();
  const { formData, isValid, handleInputChange, setFieldValue } = useForm<Form>(
    {
      validate: (values) =>
        Boolean(
          values.name?.length > 0 && values.country && values.spatialResolution
        ),
    }
  );

  const clearCache = useCacheKey("projects");

  const countryOptions: { label: string; options: Country[] }[] =
    useMemo(() => {
      const groups = [];
      for (const [regionKey, regionLabel] of Object.entries(regions)) {
        groups.push({
          label: regionLabel,
          options: countries.filter((country) => country.region === regionKey),
        });
      }
      groups.push({
        label: "No Region",
        options: countries.filter((country) => !country.region),
      });
      return groups;
    }, []);

  const onCancel: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    onClose();
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const mutation = await createProjectMutation({
      variables: {
        input: {
          spatialResolution: parseInt(formData.spatialResolution, 10),
          name: formData.name,
          country: { code: formData.country.code },
        },
      },
    });
    if (mutation.data && mutation.data.createAccessmodProject!.success) {
      router.push(
        `/projects/${encodeURIComponent(
          mutation.data.createAccessmodProject!.project!.id
        )}`
      );
      clearCache();
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOutsideClick={false}
    >
      <form onSubmit={onSubmit}>
        <Dialog.Title>Create a new Project</Dialog.Title>

        <Dialog.Content className="px-9 py-8 space-y-4">
          <Field label="Project name" required name="name">
            <Input
              onChange={handleInputChange}
              required
              name="name"
              type="text"
            />
          </Field>
          <Field label="Country" required name="country">
            <SelectInput
              required
              options={countryOptions}
              labelKey="name"
              valueKey="code"
              value={formData.country}
              onChange={(value) => setFieldValue("country", value)}
            />
          </Field>

          <Field required label="Spatial Resolution" name="spatialResolution">
            <Input
              type="number"
              onChange={handleInputChange}
              name="spatialResolution"
              required
            />
          </Field>
        </Dialog.Content>

        <Dialog.Actions>
          <Button role="button" onClick={onCancel} variant="outlined">
            Cancel
          </Button>
          <Button
            disabled={!isValid || loading}
            role="submit"
            className="space-x-2"
          >
            {loading && <Spinner size="xs" />}
            <span>Create</span>
          </Button>
        </Dialog.Actions>
      </form>
    </Dialog>
  );
};

export default CreateProjectDialog;
