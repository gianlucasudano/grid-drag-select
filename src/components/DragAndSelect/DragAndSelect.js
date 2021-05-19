import PropTypes from "prop-types";
import React, { useReducer } from "react";
import { StyledGrid } from "./DragAndSelect.styled";
import GridItems from "./elements/GridItems";
import Info from "./elements/Info";
import dragAndSelectReducer from "./reducer/dragAndSelectReducer";
import { itemsWithColRowRef } from "./elements/helpers";

/**
 * 1. Renders a 5x5 grid where users can flip the color of each cell by clicking it with the mouse pointer.
 * 2. Alternatively, the color of the selected range of cells can be changed by “long pressing” and then subsequently moving (“dragging”) the mouse pointer over the grid.
 *    During this operation, it must be somehow indicated which cells are being “selected” and will be affected.
 *    Note that, on this “long press”, the color of the “source” cell that initiated the operation with the long click is not flipped.
 *    When the mouse button is released, all “selected” cells must flip to the same color of the “source” cell, if they were not already.
 * 3. Double-click a cell to set the whole column to the same color as the cell.
 * 4. The components latest state should be sent after each color change via a debounced (1 or 2 seconds) POST-request to the Postman Echo REST API
 *
 * @param  {object} props
 * @param  {number} props.cols - number of columns in the grid
 * @param  {array} props.items - items to iterate
 *
 * @returns {React.Component}
 */
const DragAndSelect = ({ cols, items, itemToRender, ...rest }) => {
  const initialState = items.reduce((acc, current, index) => {
    const accItem = {
      ...current,
      isSelected: false,
      onSelecting: false
    };
    acc[index] = accItem;
    return acc;
  }, {});

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
    itemToRender,
    dispatch: dispatch
  };

  return (
    <>
      <StyledGrid cols={cols} rows={adjustRowsNumber}>
        <GridItems {...gridItemsProps} />
      </StyledGrid>
      {state.itemsChanged && <Info itemsState={state} dispatch={dispatch} />}
    </>
  );
};

DragAndSelect.propTypes = {
  cols: PropTypes.number,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      length: PropTypes.number,
      map: PropTypes.func
    })
  )
};

export default DragAndSelect;
