import moment from "moment";
// import "moment/locale/pt";
import "moment/min/locales";

export const useMoment = () => {
  moment.locale("pt-br");
  //  moment.updateLocale("pt", null);
  return moment;
};
