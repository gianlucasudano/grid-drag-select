import {
  setSelectedItem,
  setWholeColumnState,
  setItemsChangeState
} from "../../reducer/dragAndSelectActions";

const handleClickDbClickEvents = ({
  col,
  dispatch,
  eventDetail,
  isSelected,
  items,
  mappingIndex,
  mouseDownRef,
  mouseUpRef
}) => {
  const clickEvent = !eventDetail.current;
  const dbClickEvent = eventDetail.current === 2;

  mouseDownRef.current = null;
  mouseUpRef.current = null;

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
};

export default handleClickDbClickEvents;
