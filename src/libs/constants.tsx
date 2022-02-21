export const FORMATS = ["VECTOR", "RASTER", "TABULAR"];

export type Format = "VECTOR" | "RASTER" | "TABULAR";

export const getFormatLabel = (format: Format) => {
  switch (format) {
    case "VECTOR":
      return "Vector";
    case "RASTER":
      return "Raster";
    case "TABULAR":
      return "Tabular";
  }
};
