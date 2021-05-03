import React, { useCallback, useEffect, useRef } from "react";
import { StyledItem } from "./Item.styled";
import {
  setFocusOnLongClickSelecting,
  setItemsChangeState,
  setStartLongClickEvent,
  setStateOnEndLongClick,
  setTimestampMouseUp
} from "../reducer/dragAndSelectActions";
import { handleClickDbClickEvents, onSelectingItems } from "./helpers";
import { requestTimeout } from "../../../utilities";

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

  const useClickMouseEvent = useCallback(
    ({
      col,
      dispatch,
      eventDetail,
      isSelected,
      items,
      mappingIndex,
      mouseDownRef,
      mouseUpRef
    }) => (e) => {
      return requestTimeout(
        () =>
          handleClickDbClickEvents({
            col,
            dispatch,
            eventDetail,
            isSelected,
            items,
            mappingIndex,
            mouseDownRef,
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
    []
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
        // dispatch(
        //   setTimestampMouseDown({
        //     eventOnItem: mappingIndex,
        //     [`mouseDownAt${mappingIndex}`]: e.timeStamp
        //   })
        // );
      }}
      onMouseUp={(e) => {
        mouseUpRef.current = e.timeStamp;
        // dispatch(
        //   setTimestampMouseUp({
        //     eventOnItem: mappingIndex,
        //     [`mouseUpAt${mappingIndex}`]: e.timeStamp
        //   })
        // );

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
        dispatch,
        eventDetail,
        isSelected,
        items,
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
