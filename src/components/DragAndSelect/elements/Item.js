import { useCallback, useRef } from "react";
import { StyledItem } from "./Item.styled";
import {
  setTimestampMouseDown,
  setTimestampMouseUp
} from "../reducer/dragAndSelectActions";
import { handleEvent, requestTimeout } from "./helpers";

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
  row
}) => {
  const eventDetail = useRef(null);

  const useMouseEvent = useCallback(
    ({ mappingIndex, isSelected, col, items }) => (e) => {
      return requestTimeout(
        () =>
          handleEvent({
            col,
            dispatch,
            eventDetail,
            isSelected,
            items,
            mappingIndex,
            mouseDownAt,
            mouseUpAt
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

  return (
    <StyledItem
      // to understand if usefull on long click to pick the color
      // bgColor={isSelected ? "selectedColor" : "defaultColor"}
      onMouseDown={(e) => {
        return dispatch(
          setTimestampMouseDown({
            eventOnItem: mappingIndex,
            [`mouseDownAt${mappingIndex}`]: e.timeStamp
          })
        );
      }}
      onMouseUp={(e) => {
        return dispatch(
          setTimestampMouseUp({
            eventOnItem: mappingIndex,
            [`mouseUpAt${mappingIndex}`]: e.timeStamp
          })
        );
      }}
      onClick={useMouseEvent({ mappingIndex, isSelected, col, items })}
      col={col}
      isSelected={isSelected}
      itemOrder={itemOrder}
      row={row}
    >
      {label}
    </StyledItem>
  );
};

export default Item;
