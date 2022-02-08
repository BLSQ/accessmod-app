type WhoRegion = "AMR" | "EMR" | "WPR" | "EUR" | "SEAR" | "AFR";

export type Country = {
  alpha3: string;
  name: string;
  code: string;
  region?: WhoRegion;
};

export const regions = {
  AMR: "Region of the Americas",
  EMR: "Eastern Mediterranean Region",
  EUR: "European Region",
  WPR: "Western Pacific Region",
  SEAR: "South-East Asian Region",
};

export const countries: Country[] = [
  {
    "region": "AMR",
    "alpha3": "ABW",
    "name": "ARUBA",
    "code": "AW"
  },
  {
    "region": "EMR",
    "alpha3": "AFG",
    "name": "AFGHANISTAN",
    "code": "AF"
  },
  {
    "region": "AFR",
    "alpha3": "AGO",
    "name": "ANGOLA",
    "code": "AO"
  },
  {
    "region": "AMR",
    "alpha3": "AIA",
    "name": "ANGUILLA",
    "code": "AI"
  },
  {
    "region": "EMR",
    "alpha3": "ARE",
    "name": "UNITED ARAB EMIRATES",
    "code": "AE"
  },
  {
    "region": "AMR",
    "alpha3": "ARG",
    "name": "ARGENTINA",
    "code": "AR"
  },
  {
    "region": "WPR",
    "alpha3": "ASM",
    "name": "AMERICAN SAMOA",
    "code": "AS"
  },
  {
    "region": "AMR",
    "alpha3": "ATG",
    "name": "ANTIGUA AND BARBUDA",
    "code": "AG"
  },
  {
    "region": "AFR",
    "alpha3": "BDI",
    "name": "BURUNDI",
    "code": "BI"
  },
  {
    "region": "AFR",
    "alpha3": "BEN",
    "name": "BENIN",
    "code": "BJ"
  },
  {
    "region": "AMR",
    "alpha3": "BES",
    "name": "BONAIRE, SINT EUSTATIUS AND SABA",
    "code": "BQ"
  },
  {
    "region": "AFR",
    "alpha3": "BFA",
    "name": "BURKINA FASO",
    "code": "BF"
  },
  {
    "region": "SEAR",
    "alpha3": "BGD",
    "name": "BANGLADESH",
    "code": "BD"
  },
  {
    "region": "EMR",
    "alpha3": "BHR",
    "name": "BAHRAIN",
    "code": "BH"
  },
  {
    "region": "AMR",
    "alpha3": "BHS",
    "name": "BAHAMAS",
    "code": "BS"
  },
  {
    "region": "AMR",
    "alpha3": "BLM",
    "name": "SAINT BARTHÉLEMY",
    "code": "BL"
  },
  {
    "region": "AMR",
    "alpha3": "BLZ",
    "name": "BELIZE",
    "code": "BZ"
  },
  {
    "region": "AMR",
    "alpha3": "BMU",
    "name": "BERMUDA",
    "code": "BM"
  },
  {
    "region": "AMR",
    "alpha3": "BOL",
    "name": "BOLIVIA (PLURINATIONAL STATE OF)",
    "code": "BO"
  },
  {
    "region": "AMR",
    "alpha3": "BRA",
    "name": "BRAZIL",
    "code": "BR"
  },
  {
    "region": "AMR",
    "alpha3": "BRB",
    "name": "BARBADOS",
    "code": "BB"
  },
  {
    "region": "WPR",
    "alpha3": "BRN",
    "name": "BRUNEI DARUSSALAM",
    "code": "BN"
  },
  {
    "region": "SEAR",
    "alpha3": "BTN",
    "name": "BHUTAN",
    "code": "BT"
  },
  {
    "region": "AFR",
    "alpha3": "BWA",
    "name": "BOTSWANA",
    "code": "BW"
  },
  {
    "region": "AFR",
    "alpha3": "CAF",
    "name": "CENTRAL AFRICAN REPUBLIC",
    "code": "CF"
  },
  {
    "region": "AMR",
    "alpha3": "CAN",
    "name": "CANADA",
    "code": "CA"
  },
  {
    "region": "WPR",
    "alpha3": "CCK",
    "name": "COCOS (KEELING) ISLANDS",
    "code": "CC"
  },
  {
    "region": "AMR",
    "alpha3": "CHL",
    "name": "CHILE",
    "code": "CL"
  },
  {
    "region": "WPR",
    "alpha3": "CHN",
    "name": "CHINA",
    "code": "CN"
  },
  {
    "region": "AFR",
    "alpha3": "CMR",
    "name": "CAMEROON",
    "code": "CM"
  },
  {
    "region": "WPR",
    "alpha3": "COK",
    "name": "COOK ISLANDS",
    "code": "CK"
  },
  {
    "region": "AMR",
    "alpha3": "COL",
    "name": "COLOMBIA",
    "code": "CO"
  },
  {
    "region": "AFR",
    "alpha3": "COM",
    "name": "COMOROS",
    "code": "KM"
  },
  {
    "region": "AFR",
    "alpha3": "CPV",
    "name": "CABO VERDE",
    "code": "CV"
  },
  {
    "region": "AMR",
    "alpha3": "CRI",
    "name": "COSTA RICA",
    "code": "CR"
  },
  {
    "region": "AMR",
    "alpha3": "CUB",
    "name": "CUBA",
    "code": "CU"
  },
  {
    "region": "AMR",
    "alpha3": "CUW",
    "name": "CURAÇAO",
    "code": "CW"
  },
  {
    "region": "WPR",
    "alpha3": "CXR",
    "name": "CHRISTMAS ISLAND",
    "code": "CX"
  },
  {
    "region": "AMR",
    "alpha3": "CYM",
    "name": "CAYMAN ISLANDS",
    "code": "KY"
  },
  {
    "region": "EMR",
    "alpha3": "DJI",
    "name": "DJIBOUTI",
    "code": "DJ"
  },
  {
    "region": "AMR",
    "alpha3": "DMA",
    "name": "DOMINICA",
    "code": "DM"
  },
  {
    "region": "AMR",
    "alpha3": "DOM",
    "name": "DOMINICAN REPUBLIC",
    "code": "DO"
  },
  {
    "region": "AFR",
    "alpha3": "DZA",
    "name": "ALGERIA",
    "code": "DZ"
  },
  {
    "region": "AMR",
    "alpha3": "ECU",
    "name": "ECUADOR",
    "code": "EC"
  },
  {
    "region": "EMR",
    "alpha3": "EGY",
    "name": "EGYPT",
    "code": "EG"
  },
  {
    "region": "AFR",
    "alpha3": "ERI",
    "name": "ERITREA",
    "code": "ER"
  },
  {
    "region": "AFR",
    "alpha3": "ESH",
    "name": "WESTERN SAHARA",
    "code": "EH"
  },
  {
    "region": "AFR",
    "alpha3": "ETH",
    "name": "ETHIOPIA",
    "code": "ET"
  },
  {
    "region": "WPR",
    "alpha3": "FJI",
    "name": "FIJI",
    "code": "FJ"
  },
  {
    "region": "AMR",
    "alpha3": "FLK",
    "name": "FALKLAND ISLANDS (MALVINAS)",
    "code": "FK"
  },
  {
    "region": "WPR",
    "alpha3": "FSM",
    "name": "MICRONESIA (FEDERATED STATES OF)",
    "code": "FM"
  },
  {
    "region": "AFR",
    "alpha3": "GAB",
    "name": "GABON",
    "code": "GA"
  },
  {
    "region": "AFR",
    "alpha3": "GHA",
    "name": "GHANA",
    "code": "GH"
  },
  {
    "region": "AFR",
    "alpha3": "GIN",
    "name": "GUINEA",
    "code": "GN"
  },
  {
    "region": "AMR",
    "alpha3": "GLP",
    "name": "GUADELOUPE",
    "code": "GP"
  },
  {
    "region": "AMR",
    "alpha3": "GLP",
    "name": "GUADELOUPE",
    "code": "GP"
  },
  {
    "region": "AFR",
    "alpha3": "GMB",
    "name": "GAMBIA",
    "code": "GM"
  },
  {
    "region": "AFR",
    "alpha3": "GNB",
    "name": "GUINEA-BISSAU",
    "code": "GW"
  },
  {
    "region": "AFR",
    "alpha3": "GNQ",
    "name": "EQUATORIAL GUINEA",
    "code": "GQ"
  },
  {
    "region": "AMR",
    "alpha3": "GRD",
    "name": "GRENADA",
    "code": "GD"
  },
  {
    "region": "AMR",
    "alpha3": "GTM",
    "name": "GUATEMALA",
    "code": "GT"
  },
  {
    "region": "AMR",
    "alpha3": "GUF",
    "name": "FRENCH GUIANA",
    "code": "GF"
  },
  {
    "region": "WPR",
    "alpha3": "GUM",
    "name": "GUAM",
    "code": "GU"
  },
  {
    "region": "AMR",
    "alpha3": "GUY",
    "name": "GUYANA",
    "code": "GY"
  },
  {
    "region": "AMR",
    "alpha3": "HND",
    "name": "HONDURAS",
    "code": "HN"
  },
  {
    "region": "AMR",
    "alpha3": "HTI",
    "name": "HAITI",
    "code": "HT"
  },
  {
    "region": "SEAR",
    "alpha3": "IDN",
    "name": "INDONESIA",
    "code": "ID"
  },
  {
    "region": "SEAR",
    "alpha3": "IND",
    "name": "INDIA",
    "code": "IN"
  },
  {
    "region": "EMR",
    "alpha3": "IRN",
    "name": "IRAN (ISLAMIC REPUBLIC OF)",
    "code": "IR"
  },
  {
    "region": "EMR",
    "alpha3": "IRQ",
    "name": "IRAQ",
    "code": "IQ"
  },
  {
    "region": "AMR",
    "alpha3": "JAM",
    "name": "JAMAICA",
    "code": "JM"
  },
  {
    "region": "EMR",
    "alpha3": "JOR",
    "name": "JORDAN",
    "code": "JO"
  },
  {
    "region": "WPR",
    "alpha3": "JPN",
    "name": "JAPAN",
    "code": "JP"
  },
  {
    "region": "AFR",
    "alpha3": "KEN",
    "name": "KENYA",
    "code": "KE"
  },
  {
    "region": "WPR",
    "alpha3": "KHM",
    "name": "CAMBODIA",
    "code": "KH"
  },
  {
    "region": "WPR",
    "alpha3": "KIR",
    "name": "KIRIBATI",
    "code": "KI"
  },
  {
    "region": "AMR",
    "alpha3": "KNA",
    "name": "SAINT KITTS AND NEVIS",
    "code": "KN"
  },
  {
    "region": "WPR",
    "alpha3": "KOR",
    "name": "REPUBLIC OF KOREA",
    "code": "KR"
  },
  {
    "region": "EMR",
    "alpha3": "KWT",
    "name": "KUWAIT",
    "code": "KW"
  },
  {
    "region": "WPR",
    "alpha3": "LAO",
    "name": "LAO PEOPLE'S DEMOCRATIC REPUBLIC",
    "code": "LA"
  },
  {
    "region": "EMR",
    "alpha3": "LBN",
    "name": "LEBANON",
    "code": "LB"
  },
  {
    "region": "AFR",
    "alpha3": "LBR",
    "name": "LIBERIA",
    "code": "LR"
  },
  {
    "region": "EMR",
    "alpha3": "LBY",
    "name": "LIBYA",
    "code": "LY"
  },
  {
    "region": "AMR",
    "alpha3": "LCA",
    "name": "SAINT LUCIA",
    "code": "LC"
  },
  {
    "region": "SEAR",
    "alpha3": "LKA",
    "name": "SRI LANKA",
    "code": "LK"
  },
  {
    "region": "AFR",
    "alpha3": "LSO",
    "name": "LESOTHO",
    "code": "LS"
  },
  {
    "region": "AMR",
    "alpha3": "MAF",
    "name": "SAINT MARTIN",
    "code": "MF"
  },
  {
    "region": "EMR",
    "alpha3": "MAR",
    "name": "MOROCCO",
    "code": "MA"
  },
  {
    "region": "AFR",
    "alpha3": "MDG",
    "name": "MADAGASCAR",
    "code": "MG"
  },
  {
    "region": "SEAR",
    "alpha3": "MDV",
    "name": "MALDIVES",
    "code": "MV"
  },
  {
    "region": "AMR",
    "alpha3": "MEX",
    "name": "MEXICO",
    "code": "MX"
  },
  {
    "region": "WPR",
    "alpha3": "MHL",
    "name": "MARSHALL ISLANDS",
    "code": "MH"
  },
  {
    "region": "AFR",
    "alpha3": "MLI",
    "name": "MALI",
    "code": "ML"
  },
  {
    "region": "SEAR",
    "alpha3": "MMR",
    "name": "MYANMAR",
    "code": "MM"
  },
  {
    "region": "WPR",
    "alpha3": "MNG",
    "name": "MONGOLIA",
    "code": "MN"
  },
  {
    "region": "WPR",
    "alpha3": "MNP",
    "name": "NORTHERN MARIANA ISLANDS (COMMONWEALTH OF THE)",
    "code": "MP"
  },
  {
    "region": "AFR",
    "alpha3": "MOZ",
    "name": "MOZAMBIQUE",
    "code": "MZ"
  },
  {
    "region": "AFR",
    "alpha3": "MRT",
    "name": "MAURITANIA",
    "code": "MR"
  },
  {
    "region": "AMR",
    "alpha3": "MSR",
    "name": "MONTSERRAT",
    "code": "MS"
  },
  {
    "region": "AMR",
    "alpha3": "MTQ",
    "name": "MARTINIQUE",
    "code": "MQ"
  },
  {
    "region": "AFR",
    "alpha3": "MUS",
    "name": "MAURITIUS",
    "code": "MU"
  },
  {
    "region": "AFR",
    "alpha3": "MWI",
    "name": "MALAWI",
    "code": "MW"
  },
  {
    "region": "WPR",
    "alpha3": "MYS",
    "name": "MALAYSIA",
    "code": "MY"
  },
  {
    "region": "AFR",
    "alpha3": "MYT",
    "name": "MAYOTTE",
    "code": "YT"
  },
  {
    "region": "AFR",
    "alpha3": "NAM",
    "name": "NAMIBIA",
    "code": "NA"
  },
  {
    "region": "WPR",
    "alpha3": "NCL",
    "name": "NEW CALEDONIA",
    "code": "NC"
  },
  {
    "region": "AFR",
    "alpha3": "NER",
    "name": "NIGER",
    "code": "NE"
  },
  {
    "region": "WPR",
    "alpha3": "NFK",
    "name": "NORFOLK ISLAND",
    "code": "NF"
  },
  {
    "region": "AFR",
    "alpha3": "NGA",
    "name": "NIGERIA",
    "code": "NG"
  },
  {
    "region": "AMR",
    "alpha3": "NIC",
    "name": "NICARAGUA",
    "code": "NI"
  },
  {
    "region": "WPR",
    "alpha3": "NIU",
    "name": "NIUE",
    "code": "NU"
  },
  {
    "region": "SEAR",
    "alpha3": "NPL",
    "name": "NEPAL",
    "code": "NP"
  },
  {
    "region": "WPR",
    "alpha3": "NZL",
    "name": "NEW ZEALAND",
    "code": "NZ"
  },
  {
    "region": "EMR",
    "alpha3": "OMN",
    "name": "OMAN",
    "code": "OM"
  },
  {
    "region": "EMR",
    "alpha3": "PAK",
    "name": "PAKISTAN",
    "code": "PK"
  },
  {
    "region": "AMR",
    "alpha3": "PAN",
    "name": "PANAMA",
    "code": "PA"
  },
  {
    "region": "WPR",
    "alpha3": "PCN",
    "name": "PITCAIRN ISLANDS",
    "code": "PN"
  },
  {
    "region": "AMR",
    "alpha3": "PER",
    "name": "PERU",
    "code": "PE"
  },
  {
    "region": "WPR",
    "alpha3": "PHL",
    "name": "PHILIPPINES",
    "code": "PH"
  },
  {
    "region": "AMR",
    "alpha3": "PRI",
    "name": "PUERTO RICO",
    "code": "PR"
  },
  {
    "region": "SEAR",
    "alpha3": "PRK",
    "name": "DEMOCRATIC PEOPLE'S REPUBLIC OF KOREA",
    "code": "KP"
  },
  {
    "region": "AMR",
    "alpha3": "PRY",
    "name": "PARAGUAY",
    "code": "PY"
  },
  {
    "region": "EMR",
    "alpha3": "PSE",
    "name": "OCCUPIED PALESTINIAN TERRITORY, INCLUDING EAST JERUSALEM",
    "code": "PS"
  },
  {
    "region": "WPR",
    "alpha3": "PYF",
    "name": "FRENCH POLYNESIA",
    "code": "PF"
  },
  {
    "region": "EMR",
    "alpha3": "QAT",
    "name": "QATAR",
    "code": "QA"
  },
  {
    "region": "AFR",
    "alpha3": "REU",
    "name": "RÉUNION",
    "code": "RE"
  },
  {
    "region": "AFR",
    "alpha3": "RWA",
    "name": "RWANDA",
    "code": "RW"
  },
  {
    "region": "EMR",
    "alpha3": "SAU",
    "name": "SAUDI ARABIA",
    "code": "SA"
  },
  {
    "region": "EMR",
    "alpha3": "SDN",
    "name": "SUDAN",
    "code": "SD"
  },
  {
    "region": "EMR",
    "alpha3": "SDN",
    "name": "SUDAN",
    "code": "SD"
  },
  {
    "region": "AFR",
    "alpha3": "SEN",
    "name": "SENEGAL",
    "code": "SN"
  },
  {
    "region": "WPR",
    "alpha3": "SGP",
    "name": "SINGAPORE",
    "code": "SG"
  },
  {
    "region": "AFR",
    "alpha3": "SHN",
    "name": "SAINT HELENA",
    "code": "SH"
  },
  {
    "region": "WPR",
    "alpha3": "SLB",
    "name": "SOLOMON ISLANDS",
    "code": "SB"
  },
  {
    "region": "AFR",
    "alpha3": "SLE",
    "name": "SIERRA LEONE",
    "code": "SL"
  },
  {
    "region": "AMR",
    "alpha3": "SLV",
    "name": "EL SALVADOR",
    "code": "SV"
  },
  {
    "region": "EMR",
    "alpha3": "SOM",
    "name": "SOMALIA",
    "code": "SO"
  },
  {
    "region": "AMR",
    "alpha3": "SPM",
    "name": "SAINT PIERRE AND MIQUELON",
    "code": "PM"
  },
  {
    "region": "AFR",
    "alpha3": "SSD",
    "name": "SOUTH SUDAN",
    "code": "SS"
  },
  {
    "region": "AFR",
    "alpha3": "STP",
    "name": "SAO TOME AND PRINCIPE",
    "code": "ST"
  },
  {
    "region": "AMR",
    "alpha3": "SUR",
    "name": "SURINAME",
    "code": "SR"
  },
  {
    "region": "AFR",
    "alpha3": "SWZ",
    "name": "ESWATINI",
    "code": "SZ"
  },
  {
    "region": "AMR",
    "alpha3": "SXM",
    "name": "SINT MAARTEN",
    "code": "SX"
  },
  {
    "region": "AFR",
    "alpha3": "SYC",
    "name": "SEYCHELLES",
    "code": "SC"
  },
  {
    "region": "EMR",
    "alpha3": "SYR",
    "name": "SYRIAN ARAB REPUBLIC",
    "code": "SY"
  },
  {
    "region": "AMR",
    "alpha3": "TCA",
    "name": "TURKS AND CAICOS ISLANDS",
    "code": "TC"
  },
  {
    "region": "AFR",
    "alpha3": "TCD",
    "name": "CHAD",
    "code": "TD"
  },
  {
    "region": "AFR",
    "alpha3": "TGO",
    "name": "TOGO",
    "code": "TG"
  },
  {
    "region": "SEAR",
    "alpha3": "THA",
    "name": "THAILAND",
    "code": "TH"
  },
  {
    "region": "SEAR",
    "alpha3": "TLS",
    "name": "TIMOR-LESTE",
    "code": "TL"
  },
  {
    "region": "WPR",
    "alpha3": "TON",
    "name": "TONGA",
    "code": "TO"
  },
  {
    "region": "AMR",
    "alpha3": "TTO",
    "name": "TRINIDAD AND TOBAGO",
    "code": "TT"
  },
  {
    "region": "EMR",
    "alpha3": "TUN",
    "name": "TUNISIA",
    "code": "TN"
  },
  {
    "region": "WPR",
    "alpha3": "TUV",
    "name": "TUVALU",
    "code": "TV"
  },
  {
    "region": "AFR",
    "alpha3": "TZA",
    "name": "UNITED REPUBLIC OF TANZANIA",
    "code": "TZ"
  },
  {
    "region": "AFR",
    "alpha3": "UGA",
    "name": "UGANDA",
    "code": "UG"
  },
  {
    "region": "AMR",
    "alpha3": "URY",
    "name": "URUGUAY",
    "code": "UY"
  },
  {
    "region": "AMR",
    "alpha3": "USA",
    "name": "UNITED STATES OF AMERICA",
    "code": "US"
  },
  {
    "region": "AMR",
    "alpha3": "VCT",
    "name": "SAINT VINCENT AND THE GRENADINES",
    "code": "VC"
  },
  {
    "region": "AMR",
    "alpha3": "VEN",
    "name": "VENEZUELA (BOLIVARIAN REPUBLIC OF)",
    "code": "VE"
  },
  {
    "region": "AMR",
    "alpha3": "VGB",
    "name": "BRITISH VIRGIN ISLANDS",
    "code": "VG"
  },
  {
    "region": "AMR",
    "alpha3": "VIR",
    "name": "UNITED STATES VIRGIN ISLANDS",
    "code": "VI"
  },
  {
    "region": "WPR",
    "alpha3": "VNM",
    "name": "VIET NAM",
    "code": "VN"
  },
  {
    "region": "WPR",
    "alpha3": "VUT",
    "name": "VANUATU",
    "code": "VU"
  },
  {
    "region": "WPR",
    "alpha3": "WLF",
    "name": "WALLIS AND FUTUNA",
    "code": "WF"
  },
  {
    "region": "WPR",
    "alpha3": "WSM",
    "name": "SAMOA",
    "code": "WS"
  },
  {
    "region": "EMR",
    "alpha3": "YEM",
    "name": "YEMEN",
    "code": "YE"
  },
  {
    "region": "AFR",
    "alpha3": "ZAF",
    "name": "SOUTH AFRICA",
    "code": "ZA"
  },
  {
    "region": "AFR",
    "alpha3": "ZMB",
    "name": "ZAMBIA",
    "code": "ZM"
  },
  {
    "region": "AFR",
    "alpha3": "ZWE",
    "name": "ZIMBABWE",
    "code": "ZW"
  },
  {
    "region": "AFR",
    "alpha3": "COD",
    "name": "DEMOCRATIC REPUBLIC OF THE CONGO",
    "code": "CD"
  },
  {
    "region": "AFR",
    "alpha3": "COG",
    "name": "CONGO",
    "code": "CG"
  },
  {
    "region": "WPR",
    "alpha3": "PNG",
    "name": "PAPUA NEW GUINEA",
    "code": "PG"
  },
  {
    "region": "AMR",
    "alpha3": "ANT",
    "name": "NETHERLANDS ANTILLES"
  },
  {
    "region": "WPR",
    "alpha3": "JTN",
    "name": "JOHNSTON ATOLL"
  },
  {
    "region": "WPR",
    "alpha3": "MID",
    "name": "MIDWAY ISLANDS"
  },
  {
    "region": "WPR",
    "alpha3": "WAK",
    "name": "WAKE ISLAND"
  },
  {
    "region": "AFR",
    "alpha3": "CIV",
    "name": "CÔTE D’IVOIRE",
    "code": "CI"
  },
  {
    "region": "EUR",
    "alpha3": "ALB",
    "name": "ALBANIA",
    "code": "AL"
  },
  {
    "region": "EUR",
    "alpha3": "AND",
    "name": "ANDORRA",
    "code": "AD"
  },
  {
    "region": "EUR",
    "alpha3": "ARM",
    "name": "ARMENIA",
    "code": "AM"
  },
  {
    "region": "EUR",
    "alpha3": "AUT",
    "name": "AUSTRIA",
    "code": "AT"
  },
  {
    "region": "EUR",
    "alpha3": "AZE",
    "name": "AZERBAIJAN",
    "code": "AZ"
  },
  {
    "region": "EUR",
    "alpha3": "BEL",
    "name": "BELGIUM",
    "code": "BE"
  },
  {
    "region": "EUR",
    "alpha3": "BGR",
    "name": "BULGARIA",
    "code": "BG"
  },
  {
    "region": "EUR",
    "alpha3": "BIH",
    "name": "BOSNIA AND HERZEGOVINA",
    "code": "BA"
  },
  {
    "region": "EUR",
    "alpha3": "BLR",
    "name": "BELARUS",
    "code": "BY"
  },
  {
    "region": "EUR",
    "alpha3": "CHE",
    "name": "SWITZERLAND",
    "code": "CH"
  },
  {
    "region": "EUR",
    "alpha3": "CYP",
    "name": "CYPRUS",
    "code": "CY"
  },
  {
    "region": "EUR",
    "alpha3": "CZE",
    "name": "CZECHIA",
    "code": "CZ"
  },
  {
    "region": "EUR",
    "alpha3": "DEU",
    "name": "GERMANY",
    "code": "DE"
  },
  {
    "region": "EUR",
    "alpha3": "DNK",
    "name": "DENMARK",
    "code": "DK"
  },
  {
    "region": "EUR",
    "alpha3": "ESP",
    "name": "SPAIN",
    "code": "ES"
  },
  {
    "region": "EUR",
    "alpha3": "EST",
    "name": "ESTONIA",
    "code": "EE"
  },
  {
    "region": "EUR",
    "alpha3": "FIN",
    "name": "FINLAND",
    "code": "FI"
  },
  {
    "region": "EUR",
    "alpha3": "FRA",
    "name": "FRANCE",
    "code": "FR"
  },
  {
    "region": "EUR",
    "alpha3": "FRO",
    "name": "FAROE ISLANDS",
    "code": "FO"
  },
  {
    "region": "EUR",
    "alpha3": "GBR",
    "name": "THE UNITED KINGDOM",
    "code": "GB"
  },
  {
    "region": "EUR",
    "alpha3": "GEO",
    "name": "GEORGIA",
    "code": "GE"
  },
  {
    "region": "EUR",
    "alpha3": "GGY",
    "name": "GUERNSEY",
    "code": "GG"
  },
  {
    "region": "EUR",
    "alpha3": "GIB",
    "name": "GIBRALTAR",
    "code": "GI"
  },
  {
    "region": "EUR",
    "alpha3": "GRC",
    "name": "GREECE",
    "code": "GR"
  },
  {
    "region": "EUR",
    "alpha3": "GRL",
    "name": "GREENLAND",
    "code": "GL"
  },
  {
    "region": "EUR",
    "alpha3": "HRV",
    "name": "CROATIA",
    "code": "HR"
  },
  {
    "region": "EUR",
    "alpha3": "HUN",
    "name": "HUNGARY",
    "code": "HU"
  },
  {
    "region": "EUR",
    "alpha3": "IMN",
    "name": "ISLE OF MAN",
    "code": "IM"
  },
  {
    "region": "EUR",
    "alpha3": "IRL",
    "name": "IRELAND",
    "code": "IE"
  },
  {
    "region": "EUR",
    "alpha3": "ISL",
    "name": "ICELAND",
    "code": "IS"
  },
  {
    "region": "EUR",
    "alpha3": "ISR",
    "name": "ISRAEL",
    "code": "IL"
  },
  {
    "region": "EUR",
    "alpha3": "ITA",
    "name": "ITALY",
    "code": "IT"
  },
  {
    "region": "EUR",
    "alpha3": "JEY",
    "name": "JERSEY",
    "code": "JE"
  },
  {
    "region": "EUR",
    "alpha3": "KAZ",
    "name": "KAZAKHSTAN",
    "code": "KZ"
  },
  {
    "region": "EUR",
    "alpha3": "LIE",
    "name": "LIECHTENSTEIN",
    "code": "LI"
  },
  {
    "region": "EUR",
    "alpha3": "LTU",
    "name": "LITHUANIA",
    "code": "LT"
  },
  {
    "region": "EUR",
    "alpha3": "LUX",
    "name": "LUXEMBOURG",
    "code": "LU"
  },
  {
    "region": "EUR",
    "alpha3": "LVA",
    "name": "LATVIA",
    "code": "LV"
  },
  {
    "region": "EUR",
    "alpha3": "MCO",
    "name": "MONACO",
    "code": "MC"
  },
  {
    "region": "EUR",
    "alpha3": "MDA",
    "name": "REPUBLIC OF MOLDOVA",
    "code": "MD"
  },
  {
    "region": "EUR",
    "alpha3": "MKD",
    "name": "NORTH MACEDONIA",
    "code": "MK"
  },
  {
    "region": "EUR",
    "alpha3": "MLT",
    "name": "MALTA",
    "code": "MT"
  },
  {
    "region": "EUR",
    "alpha3": "MNE",
    "name": "MONTENEGRO",
    "code": "ME"
  },
  {
    "region": "EUR",
    "alpha3": "NLD",
    "name": "NETHERLANDS",
    "code": "NL"
  },
  {
    "region": "EUR",
    "alpha3": "NOR",
    "name": "NORWAY",
    "code": "NO"
  },
  {
    "region": "EUR",
    "alpha3": "POL",
    "name": "POLAND",
    "code": "PL"
  },
  {
    "region": "EUR",
    "alpha3": "PRT",
    "name": "PORTUGAL",
    "code": "PT"
  },
  {
    "region": "EUR",
    "alpha3": "ROU",
    "name": "ROMANIA",
    "code": "RO"
  },
  {
    "region": "EUR",
    "alpha3": "RUS",
    "name": "RUSSIAN FEDERATION",
    "code": "RU"
  },
  {
    "region": "EUR",
    "alpha3": "SJM",
    "name": "SVALBARD AND JAN MAYEN ISLANDS",
    "code": "SJ"
  },
  {
    "region": "EUR",
    "alpha3": "SMR",
    "name": "SAN MARINO",
    "code": "SM"
  },
  {
    "region": "EUR",
    "alpha3": "SRB",
    "name": "SERBIA",
    "code": "RS"
  },
  {
    "region": "EUR",
    "alpha3": "SVK",
    "name": "SLOVAKIA",
    "code": "SK"
  },
  {
    "region": "EUR",
    "alpha3": "SVN",
    "name": "SLOVENIA",
    "code": "SI"
  },
  {
    "region": "EUR",
    "alpha3": "SWE",
    "name": "SWEDEN",
    "code": "SE"
  },
  {
    "region": "EUR",
    "alpha3": "TKM",
    "name": "TURKMENISTAN",
    "code": "TM"
  },
  {
    "region": "EUR",
    "alpha3": "TUR",
    "name": "TURKEY",
    "code": "TR"
  },
  {
    "region": "EUR",
    "alpha3": "UKR",
    "name": "UKRAINE",
    "code": "UA"
  },
  {
    "region": "EUR",
    "alpha3": "VAT",
    "name": "HOLY SEE",
    "code": "VA"
  },
  {
    "region": "EUR",
    "alpha3": "XKX",
    "name": "KOSOVO"
  },
  {
    "region": "EUR",
    "alpha3": "KGZ",
    "name": "KYRGYZSTAN",
    "code": "KG"
  },
  {
    "region": "EUR",
    "alpha3": "TJK",
    "name": "TAJIKISTAN",
    "code": "TJ"
  },
  {
    "region": "EUR",
    "alpha3": "UZB",
    "name": "UZBEKISTAN",
    "code": "UZ"
  },
  {
    "region": "WPR",
    "alpha3": "NRU",
    "name": "NAURU",
    "code": "NR"
  },
  {
    "region": "WPR",
    "alpha3": "TKL",
    "name": "TOKELAU",
    "code": "TK"
  },
  {
    "region": "WPR",
    "alpha3": "PLW",
    "name": "PALAU",
    "code": "PW"
  },
  {
    "region": "WPR",
    "alpha3": "AUS",
    "name": "AUSTRALIA",
    "code": "AU"
  },
  {
    "alpha3": "BVT",
    "name": "BOUVET ISLAND",
    "code": "BV"
  },
  {
    "alpha3": "IOT",
    "name": "BRITISH INDIAN OCEAN TERRITORY",
    "code": "IO"
  },
  {
    "alpha3": "TWN",
    "name": "CHINA, PROVINCE OF TAIWAN",
    "code": "TW"
  },
  {
    "alpha3": "SGS",
    "name": "SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS",
    "code": "GS"
  },
  {
    "alpha3": "ALA",
    "name": "ÅLAND ISLANDS",
    "code": "AX"
  },
  {
    "alpha3": "HMD",
    "name": "HEARD ISLAND AND MCDONALD ISLANDS",
    "code": "HM"
  },
  {
    "alpha3": "HKG",
    "name": "CHINA, HONG KONG SPECIAL ADMINISTRATIVE REGION",
    "code": "HK"
  },
  {
    "alpha3": "MAC",
    "name": "CHINA, MACAO SPECIAL ADMINISTRATIVE REGION",
    "code": "MO"
  },
  {
    "alpha3": "UMI",
    "name": "UNITED STATES MINOR OUTLYING ISLANDS",
    "code": "UM"
  },
  {
    "alpha3": "ATF",
    "name": "FRENCH SOUTHERN TERRITORIES",
    "code": "TF"
  }
]