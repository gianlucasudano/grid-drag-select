export const dragAndSelectActionTypes = {
  UPDATE_SELECTED_ITEM: "UPDATE_SELECTED_ITEM",
  UPDATE_MOUSEDOWN_TIMESTAMP: "UPDATE_MOUSEDOWN_TIMESTAMP",
  UPDATE_MOUSEUP_TIMESTAMP: "UPDATE_MOUSEUP_TIMESTAMP"
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
