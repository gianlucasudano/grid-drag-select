import React, { useReducer } from "react";
import { StyledGrid } from "./DragAndSelect.styled";
import GridItems from "./elements/GridItems";
import InfoBox from "./elements/InfoBox";
import dragAndSelectReducer from "./reducer/dragAndSelectReducer";
import { itemsWithColRowRef } from "./elements/helpers";

const DragAndSelect = ({ cols, items }) => {
  const initialState = items.map((item) => {
    return { ...item, isSelected: false, onSelecting: false };
  });
  const [state, dispatch] = useReducer(dragAndSelectReducer, initialState);
  const calculatedRows = Math.round(items.length / cols);
  const adjustRowsNumber =
    calculatedRows * cols < items.length ? calculatedRows + 1 : calculatedRows;

  const gridItemsProps = {
    items: itemsWithColRowRef({
      items,
      rows: adjustRowsNumber
    }),
    itemsState: state,
    dispatch: dispatch
  };
  // console.log(state);
  return (
    <>
      <StyledGrid cols={cols} rows={adjustRowsNumber}>
        <GridItems {...gridItemsProps} />
      </StyledGrid>
      {state.itemsChanged && <InfoBox itemsState={state} dispatch={dispatch} />}
    </>
  );
};

export default DragAndSelect;
