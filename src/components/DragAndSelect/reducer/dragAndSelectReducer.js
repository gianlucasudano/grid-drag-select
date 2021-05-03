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

    case dragAndSelectActionTypes.UPDATE_STATE_WITH_API: {
      const { items, message, apiStatus } = payload;
      const itemsLabels = items?.map((item) => ` ${state[item].label}`) || [];
      return {
        ...state,
        apiResponse: {
          items: itemsLabels.toString(),
          apiStatus: apiStatus,
          message: message
        }
      };
    }

    case dragAndSelectActionTypes.UPDATE_STATE_ITEMS_CHANGES: {
      const isSelectedLabel = (isSelected) =>
        isSelected ? "selected" : "unselected";
      const itemsChanged = payload
        .map(
          (item) =>
            ` ${state[item].label} is ${isSelectedLabel(
              state[item].isSelected
            )}`
        )
        .toString();
      return {
        ...state,
        itemsChanged: itemsChanged,
        itemsChangedIndices: payload
      };
    }

    case dragAndSelectActionTypes.UPDATE_LONG_CLICK_SELECTION: {
      const { started, firstSelected, latestSelected } = payload;
      return {
        ...state,
        selectingEventStarted: started,
        selectingEventFirstItem: firstSelected,
        selectingEventLatestItem: latestSelected
      };
    }

    case dragAndSelectActionTypes.UPDATE_FOCUS_LONG_CLICK_SELECTION: {
      const itemsToSet = payload.reduce((acc, current) => {
        const currentSelectedItem = {
          ...state[current],
          onSelecting: true
        };

        return { ...acc, ...{ [current]: currentSelectedItem } };
      }, []);

      return {
        ...state,
        ...itemsToSet
      };
    }

    case dragAndSelectActionTypes.UPDATE_STATE_LONG_CLICK_SELECTION: {
      const itemsToSet = payload.reduce((acc, current) => {
        const currentSelectedItem = {
          ...state[current],
          onSelecting: false,
          isSelected: state[state.selectingEventFirstItem].isSelected
        };

        return { ...acc, ...{ [current]: currentSelectedItem } };
      }, []);

      return {
        ...state,
        ...itemsToSet
      };
    }

    default:
      throw new Error(
        `Action type: ${type} was not accounted for in dragAndSelectReducer`
      );
  }
};

export default dragAndSelectReducer;
