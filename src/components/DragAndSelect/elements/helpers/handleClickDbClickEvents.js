import {
  setItemsChangeState,
  setSelectedItem,
  setWholeColumnState
} from "../../reducer/dragAndSelectActions";

/**
 * Set the state required for click and dbclick events
 *
 * @param {object} params
 * @param {number} params.col - item column number
 * @param {function} params.dispatch - reducer dispatch
 * @param {object} params.eventDetail - event detail ref
 * @param {boolean} params.isSelected - determine if an item is selected
 * @param {number} params.mappingIndex - the index from map
 * @param {object} params.mouseDownRef - mouseDownRef
 * @param {object} params.mouseUpRef - mouseUpRef
 *
 * @returns {void} - execute the required dispatch for each case
 */
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
