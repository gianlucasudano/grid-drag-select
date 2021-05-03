import React, { useCallback, useEffect, useRef } from "react";
import { StyledItem } from "./Item.styled";
import {
  cleanUpEventData,
  setFocusOnLongClickSelecting,
  setItemsChangeState,
  setStartLongClickEvent,
  setStateOnEndLongClick,
  setTimestampMouseDown,
  setTimestampMouseUp
} from "../reducer/dragAndSelectActions";
import { handleEvent } from "./helpers";
import { requestTimeout } from "../../../utilities";

const Item = ({
  col,
  dispatch,
  isSelected,
  itemOrder,
  items,
  label,
  mappingIndex,
  mouseDownAt,
  mouseUpAt,
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

  const onSelectingItems = ({
    selectingEventFirstItem,
    selectingEventLatestItem,
    items
  }) => {
    const firstSelection = items[selectingEventFirstItem];
    const lastSelection = items[selectingEventLatestItem];
    const isAscending = firstSelection?.itemOrder < lastSelection?.itemOrder;

    const filteringItems = items?.reduce(
      (acc, current, currentIndex, array) => {
        // left right up down
        const ascendingConditions =
          isAscending &&
          current.col >= firstSelection.col &&
          current.col <= lastSelection.col &&
          current.row >= firstSelection.row &&
          current.row <= lastSelection.row;
        // right left down up
        const descendingConditions =
          !isAscending &&
          current.col <= firstSelection.col &&
          current.col >= lastSelection.col &&
          current.row <= firstSelection.row &&
          current.row >= lastSelection.row;
        // left right down up
        const leftUpAscendingConditions =
          isAscending &&
          current.col >= firstSelection.col &&
          current.col <= lastSelection.col &&
          current.row <= firstSelection.row &&
          current.row >= lastSelection.row;
        // left right down up
        const rightUpAscendingConditions =
          !isAscending &&
          current.col <= firstSelection.col &&
          current.col >= lastSelection.col &&
          current.row >= firstSelection.row &&
          current.row <= lastSelection.row;

        const selectedIndex =
          ascendingConditions ||
          descendingConditions ||
          leftUpAscendingConditions ||
          rightUpAscendingConditions
            ? currentIndex
            : null;

        return [...acc, selectedIndex];
      },
      []
    );
    return filteringItems.filter((item) => item !== null);
  };

  const useClickMouseEvent = useCallback(
    ({
      col,
      isSelected,
      items,
      longClickStarted,
      mappingIndex,
      mouseDownRef,
      mouseUpRef
    }) => (e) => {
      return requestTimeout(
        () =>
          handleEvent({
            col,
            dispatch,
            eventDetail,
            isSelected,
            items,
            longClickStarted,
            mappingIndex,
            mouseDownAt,
            mouseDownRef,
            mouseUpAt,
            mouseUpRef
          }),
        300,
        () => {
          if (e.detail === 2) {
            eventDetail.current = e.detail;
            return;
          }
          eventDetail.current = null;
        }
      );
    },
    [mouseUpAt, mouseDownAt, dispatch]
  );

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
      onMouseDown={(e) => {
        mouseDownRef.current = e.timeStamp;
        requestTimeout(
          () => {
            if (!mouseUpRef.current && mouseDownRef.current) {
              dispatch(
                setStartLongClickEvent({
                  started: true,
                  firstSelected: mappingIndex,
                  latestSelected: mappingIndex
                })
              );
            }
          },
          1200,
          () => {}
        );
        dispatch(
          setTimestampMouseDown({
            eventOnItem: mappingIndex,
            [`mouseDownAt${mappingIndex}`]: e.timeStamp
          })
        );
      }}
      onMouseUp={(e) => {
        mouseUpRef.current = e.timeStamp;
        dispatch(
          setTimestampMouseUp({
            eventOnItem: mappingIndex,
            [`mouseUpAt${mappingIndex}`]: e.timeStamp
          })
        );

        if (selectingEventStarted) {
          dispatch(setStateOnEndLongClick(focusedItems.current));
          dispatch(setItemsChangeState(focusedItems.current));
          dispatch(
            setStartLongClickEvent({
              started: false,
              firstSelected: selectingEventFirstItem,
              latestSelected: mappingIndex
            })
          );
          isLongClick.current = false;
          mouseDownRef.current = null;
          mouseUpRef.current = null;
        }
      }}
      onClick={useClickMouseEvent({
        col,
        isSelected,
        items,
        longClickStarted: isLongClick.current,
        mappingIndex,
        mouseDownRef,
        mouseUpRef
      })}
      onMouseMove={() => {
        if (selectingEventStarted) {
          dispatch(
            setStartLongClickEvent({
              started: selectingEventStarted,
              firstSelected: selectingEventFirstItem,
              latestSelected: mappingIndex
            })
          );
        }
      }}
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
