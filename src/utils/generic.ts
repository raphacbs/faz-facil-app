import moment from "moment";
import i18n from "../i18n";
import "intl";
import "intl/locale-data/jsonp/en";

export const calculateProgress = (partialValue: number, totalValue: number) => {
  let percentile: string = ((partialValue / totalValue) * 100).toFixed();
  return parseInt(percentile);
};

export const compareDate = (a: any, b: any) => {
  if (
    moment(a.updatedAt, "YYYY-MM-DD-THH:mm:ss.00000").isSameOrAfter(
      moment(b.updatedAt, "YYYY-MM-DD-THH:mm:ss.00000")
    )
  ) {
    return 1;
  } else {
    return -1;
  }
};

export const compareDateDesc = (a: any, b: any) => {
  if (
    moment(a.updatedAt, "YYYY-MM-DD-THH:mm:ss.00000").isSameOrBefore(
      moment(b.updatedAt, "YYYY-MM-DD-THH:mm:ss.00000")
    )
  ) {
    return 1;
  } else {
    return -1;
  }
};

export const formatDate = (date: string, format: string) => {
  return moment(date, "YYYY-MM-DD-THH:mm:ss.00000").format(format);
};
export const formatCurrency = (value: number | undefined) => {
  const language = i18n.language;

  switch (language) {
    case "en-US":
      // return new Intl.NumberFormat("en-US", {
      //   style: "currency",
      //   currency: "USD",
      // }).format(value);
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    case "pt-BR":
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    default:
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
  }
};
