import { registerSheet } from "react-native-actions-sheet";
import ActionSheetItem from "./components/ActionSheetItem";
import ActionSheetRemove from "./components/ActionSheetRemove";
import ErrorSheet from "./components/ErrorSheet";
import ConfirmSheet from "./components/ConfirmSheet";
import LoadingSheet from "./components/LoadingSheet";
import ActionSheetRegister from "./components/ActionSheetRegister";

registerSheet("item-sheet", ActionSheetItem);
registerSheet("remove-item-sheet", ActionSheetRemove);
registerSheet("error-sheet", ErrorSheet);
registerSheet("confirm-sheet", ConfirmSheet);
registerSheet("loading-sheet", LoadingSheet);
registerSheet("register-sheet", ActionSheetRegister);

export {};
