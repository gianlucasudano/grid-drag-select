import Item from "./Item";

const GridItems = ({ items }) =>
  items.map(({ itemOrder, label }) => (
    <Item itemOrder={itemOrder} key={label} label={label} />
  ));

export default GridItems;
