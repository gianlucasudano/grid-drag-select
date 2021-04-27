import { StyledGrid } from "./DragEndSelect.styled";
import GridItems from "./elements/GridItems";

const DragEndSelect = ({ cols, items }) => {
  const calculatedRows = Math.round(items.length / cols);
  const adjustRowsNumber =
    calculatedRows * cols < items.length ? calculatedRows + 1 : calculatedRows;
  return (
    <StyledGrid cols={cols} rows={adjustRowsNumber}>
      <GridItems items={items} />
    </StyledGrid>
  );
};

export default DragEndSelect;
