export const convertStatusShoppingList = (status: string) => {
  switch (status) {
    case "IN_PLANNING":
      return "shopping_list.status_in_planning";
    case "IN_PROGRESS":
      return "shopping_list.status_in_progress";
    case "READY":
      return "shopping_list.status_ready";
    default:
      return "shopping_list.status_in_planning";
  }
};

export const convertStatusShoppingListColorSchema = (status: string) => {
  switch (status) {
    case "IN_PLANNING":
      return "info";
    case "IN_PROGRESS":
      return "warning";
    case "READY":
      return "success";
    default:
      return "info";
  }
};
