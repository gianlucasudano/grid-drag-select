import { StyledGrid } from "./DragAndSelect.styled";
import GridItems from "./elements/GridItems";
import dragAndSelectReducer from "./reducer/dragAndSelectReducer";
import { itemsWithColRowRef } from "./elements/helpers";
import { useReducer } from "react";

const DragAndSelect = ({ cols, items }) => {
  const initialState = items.map((item) => {
    return { ...item, isSelected: false };
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

  return (
    <StyledGrid cols={cols} rows={adjustRowsNumber}>
      <GridItems {...gridItemsProps} />
    </StyledGrid>
  );
};

export default DragAndSelect;
