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
  longClickStarted,
  mappingIndex,
  mouseDownAt,
  mouseDownRef,
  mouseUpAt,
  mouseUpRef
}) => {
  console.log("longClickStarted", longClickStarted);
  // console.log("new date ", new Date().getTime());

  // const timeOnPressing = (mouseUpAt - mouseDownAt) / 1000 || -1;
  const clickEvent = !eventDetail.current;
  const dbClickEvent = eventDetail.current === 2;
  // const longClickEvent = longClickStarted;

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

  // if (longClickEvent) {
  //   console.log("long click started");
  // }
};

export default handleEvent;
