import PropTypes from "prop-types";
import React from "react";
import Item from "./Item";

/**
 * Render a grid of elements
 *
 * @param  {func} dispatch - reducer dispatch
 * @param  {array} items - items props
 * @param  {object} itemsState - items state from parent
 *
 * @returns {React.Component}
 */
const GridItems = ({ dispatch, items, itemsState, itemToRender }) => {
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
      row={row}
      selectingEventStarted={itemsState.selectingEventStarted}
      selectingEventFirstItem={itemsState.selectingEventFirstItem}
      selectingEventLatestItem={itemsState.selectingEventLatestItem}
    >
      {React.createElement(itemToRender, {
        label: label,
        isSelected: itemsState[index].isSelected,
        isSelecting: itemsState[index].onSelecting
      })}
    </Item>
  ));
};

GridItems.propTypes = {
  dispatch: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      map: PropTypes.func
    })
  ),
  itemsState: PropTypes.object
};
export default GridItems;
