import Item from "./Item";
const GridItems = ({ dispatch, items, itemsState }) => {
  return items.map(({ col, itemOrder, label, row }, index) => (
    <Item
      col={col}
      mappingIndex={index}
      dispatch={dispatch}
      isSelected={itemsState[index].isSelected}
      itemOrder={itemOrder}
      key={label}
      label={label}
      row={row}
      mouseDownAt={itemsState[`mouseDownAt${index}`]}
      mouseUpAt={itemsState[`mouseUpAt${index}`]}
      eventOnItem={itemsState.eventOnItem}
    />
  ));
};
export default GridItems;
