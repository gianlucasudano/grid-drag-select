import Item from "./Item";

const GridItems = ({ items }) =>
  items.map(({ col, itemOrder, label, row }) => (
    <Item col={col} itemOrder={itemOrder} key={label} label={label} row={row} />
  ));

export default GridItems;
