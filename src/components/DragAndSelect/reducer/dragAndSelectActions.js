export const dragAndSelectActionTypes = {
  UPDATE_SELECTED_ITEM: "UPDATE_SELECTED_ITEM",
  UPDATE_MOUSEDOWN_TIMESTAMP: "UPDATE_MOUSEDOWN_TIMESTAMP",
  UPDATE_MOUSEUP_TIMESTAMP: "UPDATE_MOUSEUP_TIMESTAMP",
  UPDATE_WHOLE_COLUMN: "UPDATE_WHOLE_COLUMN",
  UPDATE_STATE_WITH_API: "UPDATE_STATE_WITH_API",
  UPDATE_STATE_ITEMS_CHANGES: "UPDATE_STATE_ITEMS_CHANGES"
  // RESET_FILTERS: 'RESET_FILTERS'
};

export const setSelectedItem = (payload) => {
  return {
    type: dragAndSelectActionTypes.UPDATE_SELECTED_ITEM,
    payload
  };
};

export const setTimestampMouseDown = (payload) => {
  return {
    type: dragAndSelectActionTypes.UPDATE_MOUSEDOWN_TIMESTAMP,
    payload
  };
};

export const setTimestampMouseUp = (payload) => {
  return {
    type: dragAndSelectActionTypes.UPDATE_MOUSEUP_TIMESTAMP,
    payload
  };
};

export const setWholeColumnState = (payload) => {
  return {
    type: dragAndSelectActionTypes.UPDATE_WHOLE_COLUMN,
    payload
  };
};

export const setStateTroughApi = (payload) => {
  return {
    type: dragAndSelectActionTypes.UPDATE_STATE_WITH_API,
    payload
  };
};

export const setItemsChangeState = (payload) => {
  return {
    type: dragAndSelectActionTypes.UPDATE_STATE_ITEMS_CHANGES,
    payload
  };
};
