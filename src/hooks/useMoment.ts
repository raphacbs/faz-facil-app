import moment from "moment";
import "moment/locale/pt";

export const useMoment = () => {
  moment.locale("pt-br");
  return moment;
};
