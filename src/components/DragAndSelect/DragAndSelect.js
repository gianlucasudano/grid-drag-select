import { StyledGrid } from "./DragAndSelect.styled";
import GridItems from "./elements/GridItems";
import dragAndSelectReducer from "./reducer/dragAndSelectReducer";
import itemsWithCoordinates from "./elements/helpers";
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
    items: itemsWithCoordinates({
      items,
      rows: adjustRowsNumber
    }),
    itemsState: state,
    dispatch: dispatch
  };
  console.log(state);
  return (
    <StyledGrid cols={cols} rows={adjustRowsNumber}>
      <GridItems {...gridItemsProps} />
    </StyledGrid>
  );
};

export default DragAndSelect;
