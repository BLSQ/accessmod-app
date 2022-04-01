import { gql } from "@apollo/client";
import Button from "components/Button";
import Dialog from "components/Dialog";
import Field from "components/forms/Field";
import Input from "components/forms/Input";
import { MembershipRole } from "libs/graphql";
import { useTranslation } from "next-i18next";
import { ChangeEvent, useState } from "react";

type Props = {
  onClose: () => void;
  open: boolean;
  team: { id: string; name: string };
};

const InviteTeamMemberDialog = (props: Props) => {
  const { open, onClose, team } = props;
  const [emails, setEmails] = useState<string[]>([""]);
  const [role, setRole] = useState<MembershipRole | undefined>();
  const { t } = useTranslation();
  const onSubmit = () => {};

  const handleClose = () => {
    setEmails([]);
    onClose();
  };

  const onInputFocus = () => {
    console.log("onInputFocus");
    if (emails.filter((x) => x === "").length < 2) {
      setEmails([...emails, ""]);
    }
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>, idx: number) => {
    const newEmails = [...emails];
    newEmails.splice(idx, 1, event.target.value);
    setEmails(newEmails);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={onSubmit}>
        <Dialog.Title>
          {t("Invite members in '{{name}}'", { name: team.name })}
        </Dialog.Title>

        <Dialog.Content className="px-9 py-8 space-y-4">
          <Dialog.Description>Lorem ipsum</Dialog.Description>
          {emails.map((email, idx) => (
            <Input
              key={idx}
              placeholder={t("Email address")}
              required
              name="name"
              type="text"
              onFocus={onInputFocus}
              onBlur={onInputFocus}
              autoComplete="email"
              value={email}
              onChange={(event) => onInputChange(event, idx)}
            />
          ))}

          <Field
            name="role"
            label={t("Role")}
            type="text"
            required
            onChange={(role) => setRole(role as unknown as MembershipRole)}
            value={role}
          />
        </Dialog.Content>

        <Dialog.Actions>
          <Button type="button" onClick={handleClose} variant="outlined">
            {t("Cancel")}
          </Button>
          <Button type="submit" className="space-x-2">
            <span>{t("Invite")}</span>
          </Button>
        </Dialog.Actions>
      </form>
    </Dialog>
  );
};

InviteTeamMemberDialog.fragments = {
  team: gql`
    fragment InviteTeamMemberDialog_team on Team {
      id
      name
    }
  `,
};

export default InviteTeamMemberDialog;
