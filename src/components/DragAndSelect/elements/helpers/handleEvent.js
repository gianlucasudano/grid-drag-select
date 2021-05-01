import {
  setSelectedItem,
  setWholeColumnState,
  setItemsChangeState
} from "../../reducer/dragAndSelectActions";

const handleEvent = ({
  col,
  dispatch,
  eventDetail,
  isSelected,
  items,
  mappingIndex,
  mouseDownAt,
  mouseUpAt
}) => {
  const timeOnPressing = (mouseUpAt - mouseDownAt) / 1000 || -1;
  const clickEvent = !eventDetail.current && timeOnPressing < 1;
  const dbClickEvent = eventDetail.current === 2;
  const longClickEvent = timeOnPressing >= 1;

  if (clickEvent) {
    dispatch(setSelectedItem({ itemSelected: mappingIndex }));
    dispatch(setItemsChangeState([mappingIndex]));
  }

  if (dbClickEvent) {
    const wholeColumnIndexes = items
      .filter((item, index) => item.col === col)
      .map((item) => item.itemOrder - 1);
    dispatch(
      setWholeColumnState({
        itemSelectedStatus: isSelected,
        wholeColumnIndexes: wholeColumnIndexes
      })
    );
    dispatch(setItemsChangeState(wholeColumnIndexes));
  }

  if (longClickEvent) {
    console.log("long click");
  }
};

export default handleEvent;
