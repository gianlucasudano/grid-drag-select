import { StyledItem } from "./Item.styled";
import {
  setSelectedItem,
  setTimestampMouseDown,
  setTimestampMouseUp
} from "../reducer/dragAndSelectActions";
import { useCallback, useRef } from "react";
import { handleEvent, requestTimeout } from "./helpers";

const Item = ({
  col,
  dispatch,
  isSelected,
  itemOrder,
  label,
  mappingIndex,
  mouseDownAt,
  mouseUpAt,
  row
}) => {
  const eventDetail = useRef(null);

  const useMouseEvent = useCallback(
    (mappingIndex) => (e) => {
      return requestTimeout(
        () =>
          handleEvent(
            dispatch,
            eventDetail,
            mappingIndex,
            mouseDownAt,
            mouseUpAt
          ),
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
      onClick={useMouseEvent(mappingIndex)}
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
