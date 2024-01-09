const countryList = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CYP: "CY",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  XPF: "NC",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW",
};

const selectCFFAT = document.querySelectorAll(".contForFromAndTo select");
// console.log(currCode);
// console.log(countryList[currCode]);

for (let selects of selectCFFAT) {
  for (let currCode in countryList) {
    let createOption = document.createElement("option");
    createOption.innerHTML = currCode;
    createOption.value = currCode;
    selects.append(createOption);

    if (selects.name == "selectFrom" && currCode == "USD") {
      createOption.selected = "selected";
    } else if (selects.name == "toFrom" && currCode == "INR") {
      createOption.selected = "selected";
    }
  }
  selects.addEventListener("change", (e) => {
    changeFlag(e.target);
  });
}

const changeFlag = (element) => {
  let currCode = element.value;
  let newCountryCode = countryList[currCode];
  let newImgSrc = `https://flagsapi.com/${newCountryCode}/flat/64.png`;
  let newImage = element.parentElement.querySelector("img");
  newImage.src = newImgSrc;
};

//CurrencyAPI
const currencyURL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const btnlistener = document.querySelector("#resultButton button");
const fromSelectValue = document.querySelector(
  ".borderForSelectAndFrom select"
);
const toSelectValue = document.querySelector(".borderForSelectAndTo select");
const rateInInput = document.querySelector(".inputBoxInsideTo input");
const rateInp = document.querySelector(".CurrencyEqualsTo p");
const rateInh = document.querySelector(".CurrencyEqualsTo h3");

btnlistener.addEventListener("click", async (evt) => {
  evt.preventDefault();

  let amountEntered = document.querySelector("#fromInputBox");
  let amount = amountEntered.value;

  if (amount == "" || amount < 0) {
    amount = 0;
    amountEntered.value = "0";
  }

  const updatingURL = `${currencyURL}/${fromSelectValue.value.toLowerCase()}/${toSelectValue.value.toLowerCase()}.json`;
  let response = await fetch(updatingURL);
  let data = await response.json();
  let rate = data[toSelectValue.value.toLowerCase()];

  let finalAmount = amount * rate;
  rateInInput.value = finalAmount;

  rateInp.innerText = `${1} ${fromSelectValue.value} equals to`;
  rateInh.innerText = `${1 * rate} ${toSelectValue.value}`;
});
