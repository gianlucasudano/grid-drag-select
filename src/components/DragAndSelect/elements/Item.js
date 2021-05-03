import React, { useCallback, useEffect, useRef } from "react";
import { StyledItem } from "./Item.styled";
import { setFocusOnLongClickSelecting } from "../reducer/dragAndSelectActions";
import {
  handleClick,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  onSelectingItems
} from "./helpers";

const Item = ({
  col,
  dispatch,
  isSelected,
  itemOrder,
  items,
  label,
  mappingIndex,
  onSelecting,
  row,
  selectingEventFirstItem,
  selectingEventLatestItem,
  selectingEventStarted
}) => {
  const eventDetail = useRef(null);
  const isLongClick = useRef(null);
  const focusedItems = useRef(null);
  const mouseUpRef = useRef(null);
  const mouseDownRef = useRef(null);

  useEffect(() => {
    if (selectingEventStarted) {
      const focusItems = onSelectingItems({
        selectingEventFirstItem,
        selectingEventLatestItem,
        items
      });
      focusedItems.current = focusItems;
      dispatch(setFocusOnLongClickSelecting(focusItems));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    selectingEventFirstItem,
    selectingEventLatestItem,
    selectingEventStarted
  ]);

  return (
    <StyledItem
      onMouseDown={useCallback(
        (e) =>
          handleMouseDown({ mouseUpRef, mouseDownRef, dispatch, mappingIndex })(
            e
          ),
        [dispatch, mappingIndex]
      )}
      onMouseUp={useCallback(
        (e) =>
          handleMouseUp({
            dispatch,
            focusedItems,
            isLongClick,
            mappingIndex,
            mouseDownRef,
            mouseUpRef,
            selectingEventFirstItem,
            selectingEventStarted
          })(e),
        [dispatch, mappingIndex, selectingEventFirstItem, selectingEventStarted]
      )}
      onClick={useCallback(
        (e) =>
          handleClick({
            col,
            dispatch,
            eventDetail,
            isSelected,
            items,
            mappingIndex,
            mouseDownRef,
            mouseUpRef
          })(e),
        [col, dispatch, items, isSelected, mappingIndex]
      )}
      onMouseMove={useCallback(
        () =>
          handleMouseMove({
            dispatch,
            mappingIndex,
            selectingEventFirstItem,
            selectingEventStarted
          }),
        [dispatch, mappingIndex, selectingEventFirstItem, selectingEventStarted]
      )}
      col={col}
      isSelected={isSelected}
      isSelecting={onSelecting}
      itemOrder={itemOrder}
      row={row}
    >
      {label}
    </StyledItem>
  );
};

export default Item;
