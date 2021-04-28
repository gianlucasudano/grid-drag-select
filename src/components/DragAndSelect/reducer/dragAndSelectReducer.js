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
        ],
        eventOnItem: payload.eventOnItem
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

    case dragAndSelectActionTypes.CLEAN_EVENT_DATA: {
      return {
        ...state,
        [`mouseUpAt${payload.itemSelected}`]: undefined,
        [`mouseDownAt${payload.itemSelected}`]: undefined,
        eventOnItem: undefined
      };
    }
    default:
      throw new Error(
        `Action type: ${type} was not accounted for in dragAndSelectReducer`
      );
  }
};

export default dragAndSelectReducer;
