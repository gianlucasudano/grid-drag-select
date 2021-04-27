import { StyledItem } from "./Item.styled";

const Item = ({ itemOrder, label }) => {
  return <StyledItem itemOrder={itemOrder}>{label}</StyledItem>;
};

export default Item;
