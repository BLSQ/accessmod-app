import { MembershipRole, PermissionMode } from "./graphql";
import { i18n } from "next-i18next";

export function formatMembershipRole(role: MembershipRole) {
  switch (role) {
    case MembershipRole.Admin:
      return i18n!.t("Administrator");
    case MembershipRole.Regular:
      return i18n!.t("Regular");
  }
}

export function formatPermissionMode(mode: PermissionMode) {
  switch (mode) {
    case PermissionMode.Editor:
      return i18n!.t("Editor");
    case PermissionMode.Owner:
      return i18n!.t("Owner");
    case PermissionMode.Viewer:
      return i18n!.t("Viewer");
  }
}
