import PropTypes from "prop-types";
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

/**
 * Render a single cell in the grid component
 *
 * @param  {object} props - react props
 * @param  {number} props.col - column number
 * @param  {function} props.dispatch - dispatch from reducer
 * @param  {boolean} props.isSelected - determine selected state
 * @param  {array} props.items - all elements in the grid
 * @param  {string} props.label - label to render on item
 * @param  {number} props.mappingIndex - index from parent
 * @param  {number} props.row - row number
 * @param  {number} props.selectingEventFirstItem - index of first selected item
 * @param  {number} props.selectingEventLatestItem - index of latest selected item
 * @param  {boolean} props.selectingEventStarted - determine if a "long selection" started
 *
 * @returns {React.Component} - render a single cell on the grid
 */
const Item = ({
  children,
  col,
  dispatch,
  isSelected,
  items,
  mappingIndex,
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
      border={1}
      borderColor="grey.500"
      borderRadius="borderRadius"
    >
      {children}
    </StyledItem>
  );
};

Item.propTypes = {
  col: PropTypes.number,
  dispatch: PropTypes.func,
  isSelected: PropTypes.bool,
  itemOrder: PropTypes.number,
  items: PropTypes.array,
  label: PropTypes.string,
  mappingIndex: PropTypes.number,
  selectingEventFirstItem: PropTypes.number,
  selectingEventLatestItem: PropTypes.number,
  selectingEventStarted: PropTypes.bool
};

export default Item;
