import { MembershipRole } from "./graphql";
import { i18n } from "next-i18next";

export function formatMembershipRole(role: MembershipRole) {
  switch (role) {
    case MembershipRole.Admin:
      return i18n!.t("Administrator");
    case MembershipRole.Regular:
      return i18n!.t("Regular");
  }
}
