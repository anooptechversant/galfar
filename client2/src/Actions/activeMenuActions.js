import {
  activeMenuSet
} from "../Features/activeMenuSlice";

export const activeMenuActions = (arg) => async (dispatch) => {
    dispatch(activeMenuSet(arg));
};
