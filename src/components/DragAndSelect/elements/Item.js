import { StyledItem } from "./Item.styled";
import {
  cleanUpEventData,
  setSelectedItem,
  setTimestampMouseDown,
  setTimestampMouseUp
} from "../reducer/dragAndSelectActions";
import { useEffect } from "react";

const Item = ({
  col,
  dispatch,
  itemOrder,
  label,
  row,
  isSelected,
  mappingIndex,
  mouseDownAt,
  mouseUpAt,
  eventOnItem
}) => {
  useEffect(() => {
    const timeOnPressing =
      eventOnItem === mappingIndex ? (mouseUpAt - mouseDownAt) / 1000 : -1;
    if (timeOnPressing >= 0) {
      console.log("timeOnPressing", timeOnPressing);
    }
    if (timeOnPressing !== -1 && timeOnPressing <= 1) {
      dispatch(setSelectedItem({ itemSelected: mappingIndex }));
      dispatch(cleanUpEventData({ itemSelected: mappingIndex }));
    }
  }, [mouseUpAt, mouseDownAt, mappingIndex, eventOnItem, dispatch]);
  return (
    <StyledItem
      // to understand if usefull on long click to pick the color
      // bgColor={isSelected ? "selectedColor" : "defaultColor"}
      onMouseDown={(e) => {
        console.log(e);
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
      onDoubleClick={(e) => console.log("dbclick", e.timeStamp)}
      //onClick={() => dispatch(setSelectedItem({ itemSelected: mappingIndex }))}
      onClick={(e) => {
        console.log(e.type);
        console.log(e.detail);
      }}
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
