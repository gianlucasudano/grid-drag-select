import { StyledGrid } from "./DragEndSelect.styled";
import GridItems from "./elements/GridItems";
import itemsWithCoordinates from "./elements/helpers";

const DragEndSelect = ({ cols, items }) => {
  const calculatedRows = Math.round(items.length / cols);
  const adjustRowsNumber =
    calculatedRows * cols < items.length ? calculatedRows + 1 : calculatedRows;
  return (
    <StyledGrid cols={cols} rows={adjustRowsNumber}>
      <GridItems
        items={itemsWithCoordinates({
          items,
          rows: adjustRowsNumber
        })}
      />
    </StyledGrid>
  );
};

export default DragEndSelect;
