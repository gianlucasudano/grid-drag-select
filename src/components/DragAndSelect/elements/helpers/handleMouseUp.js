import {
  setItemsChangeState,
  setStartLongClickEvent,
  setStateOnEndLongClick
} from "../../reducer/dragAndSelectActions";

const handleMouseUp = ({
  dispatch,
  focusedItems,
  isLongClick,
  mappingIndex,
  mouseDownRef,
  mouseUpRef,
  selectingEventFirstItem,
  selectingEventStarted
}) => (e) => {
  mouseUpRef.current = e.timeStamp;
  if (selectingEventStarted) {
    dispatch(setStateOnEndLongClick(focusedItems.current));
    dispatch(setItemsChangeState(focusedItems.current));
    dispatch(
      setStartLongClickEvent({
        started: false,
        firstSelected: selectingEventFirstItem,
        latestSelected: mappingIndex
      })
    );
    isLongClick.current = false;
    mouseDownRef.current = null;
    mouseUpRef.current = null;
  }
};

export default handleMouseUp;
