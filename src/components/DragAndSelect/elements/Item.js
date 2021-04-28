import { StyledItem } from "./Item.styled";

const Item = ({ col, itemOrder, label, row }) => {
  return (
    <StyledItem col={col} row={row} itemOrder={itemOrder}>
      {label}
    </StyledItem>
  );
};

export default Item;
