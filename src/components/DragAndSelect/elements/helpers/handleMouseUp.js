import {
  setItemsChangeState,
  setStartLongClickEvent,
  setStateOnEndLongClick
} from "../../reducer/dragAndSelectActions";

/**
 * Set the state required for mouse up event
 *
 * @param {object} params
 * @param {function} params.dispatch - reducer dispatch
 * @param {array} params.focusedItems - indices of focused items
 * @param {object} params.isLongClick - isLongClick ref
 * @param {number} params.mappingIndex - the index from map
 * @param {object} params.mouseDownRef - mouseDownRef
 * @param {object} params.mouseUpRef - mouseUpRef
 * @param {number} params.selectingEventFirstItem - the index of first item on "long selecting"
 * @param {boolean} params.selectingEventStarted - determine if a "long selection" started
 *
 * @returns {void} - execute the required dispatch for each case
 */
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
