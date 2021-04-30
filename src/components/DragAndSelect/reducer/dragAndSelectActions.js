export const dragAndSelectActionTypes = {
  UPDATE_SELECTED_ITEM: "UPDATE_SELECTED_ITEM",
  UPDATE_MOUSEDOWN_TIMESTAMP: "UPDATE_MOUSEDOWN_TIMESTAMP",
  UPDATE_MOUSEUP_TIMESTAMP: "UPDATE_MOUSEUP_TIMESTAMP",
  UPDATE_WHOLE_COLUMN: "UPDATE_WHOLE_COLUMN"
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
