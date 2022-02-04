import Button from "components/Button";
import { gql } from "@apollo/client";
import Dialog from "components/Dialog";
import Input from "components/Input";
import useForm from "hooks/useForm";
import { FormEvent } from "react";
import { useCreateProjectMutation } from "libs/graphql";
import { useRouter } from "next/router";

type Props = {
  onClose: () => void;
  open: boolean;
};

type Form = {
  name: string;
  spatialResolution: string;
  country: string;
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
  const { formData, isValid, handleInputChange } = useForm<Form>({
    validate: (values) =>
      Boolean(
        values.name?.length > 0 && values.country && values.spatialResolution
      ),
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const mutation = await createProjectMutation({
      variables: {
        input: {
          spatialResolution: parseInt(formData.spatialResolution, 10),
          name: formData.name,
          country: { code: formData.country },
        },
      },
    });
    if (mutation.data && mutation.data.createAccessmodProject!.success) {
      router.push(
        `/projects/${encodeURIComponent(
          mutation.data.createAccessmodProject!.project!.id
        )}`
      );
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <Dialog.Title>Create a new Project</Dialog.Title>

        <Dialog.Content className="px-9 py-8 space-y-4">
          <Input
            onChange={handleInputChange}
            required
            name="name"
            label="Project Name"
            type="text"
          />
          <Input
            onChange={handleInputChange}
            name="country"
            label="Country"
            required
          />
          <Input
            type="number"
            onChange={handleInputChange}
            name="spatialResolution"
            label="Spatial Resolution"
            required
          />
        </Dialog.Content>

        <Dialog.Actions>
          <Button role="button" onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button disabled={!isValid || loading} role="submit">
            Create
          </Button>
        </Dialog.Actions>
      </form>
    </Dialog>
  );
};

export default CreateProjectDialog;
