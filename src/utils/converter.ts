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
