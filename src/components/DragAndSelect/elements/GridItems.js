import React from "react";
import Item from "./Item";
const GridItems = ({ dispatch, items, itemsState }) => {
  return items.map(({ col, itemOrder, label, row }, index) => (
    <Item
      col={col}
      dispatch={dispatch}
      isSelected={itemsState[index].isSelected}
      itemOrder={itemOrder}
      items={items}
      key={label}
      label={label}
      mappingIndex={index}
      mouseDownAt={itemsState[`mouseDownAt${index}`]}
      mouseUpAt={itemsState[`mouseUpAt${index}`]}
      row={row}
    />
  ));
};
export default GridItems;
