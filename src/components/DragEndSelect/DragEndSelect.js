import { StyledGrid } from "./DragEndSelect.styled";
import Item from "./Item";

const DragEndSelect = ({ cols, items }) => {
  const elements = items.map(({ itemOrder, label }) => (
    <Item itemOrder={itemOrder} key={label} label={label} />
  ));
  const calculatedRows = Math.round(items.length / cols);
  const adjustRowsNumber =
    calculatedRows * cols < items.length ? calculatedRows + 1 : calculatedRows;
  return (
    <StyledGrid cols={cols} rows={adjustRowsNumber}>
      {elements}
    </StyledGrid>
  );
};

export default DragEndSelect;
