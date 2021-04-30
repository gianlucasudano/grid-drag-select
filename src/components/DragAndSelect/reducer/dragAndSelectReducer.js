import { dragAndSelectActionTypes } from "./dragAndSelectActions";

const dragAndSelectReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case dragAndSelectActionTypes.UPDATE_SELECTED_ITEM: {
      const itemToSet = {
        ...state[payload.itemSelected],
        isSelected: !state[payload.itemSelected].isSelected
      };

      return {
        ...state,
        ...{ [payload.itemSelected]: itemToSet }
      };
    }
    case dragAndSelectActionTypes.UPDATE_MOUSEDOWN_TIMESTAMP: {
      return {
        ...state,
        [`mouseDownAt${payload.eventOnItem}`]: payload[
          `mouseDownAt${payload.eventOnItem}`
        ]
      };
    }

    case dragAndSelectActionTypes.UPDATE_MOUSEUP_TIMESTAMP: {
      return {
        ...state,
        [`mouseUpAt${payload.eventOnItem}`]: payload[
          `mouseUpAt${payload.eventOnItem}`
        ]
      };
    }

    case dragAndSelectActionTypes.UPDATE_WHOLE_COLUMN: {
      const { itemSelectedStatus, wholeColumnIndexes } = payload;
      const selectedColumn = wholeColumnIndexes.reduce((acc, current) => {
        const currentSelectedItem = {
          ...state[current],
          isSelected: itemSelectedStatus
        };

        return { ...acc, ...{ [current]: currentSelectedItem } };
      }, []);

      return {
        ...state,
        ...selectedColumn
      };
    }

    default:
      throw new Error(
        `Action type: ${type} was not accounted for in dragAndSelectReducer`
      );
  }
};

export default dragAndSelectReducer;
