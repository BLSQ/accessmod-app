import { i18n } from "next-i18next";
export const FORMATS = ["VECTOR", "RASTER", "TABULAR"];

export type Format = "VECTOR" | "RASTER" | "TABULAR";

export const getFormatLabel = (format: Format) => {
  switch (format) {
    case "VECTOR":
      return i18n!.t("Vector");
    case "RASTER":
      return i18n!.t("Raster");
    case "TABULAR":
      return i18n!.t("Tabular");
  }
};
