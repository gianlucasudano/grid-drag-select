import { requestTimeout } from "../../../../utilities";
import handleClickDbClickEvents from "./handleClickDbClickEvents";

/**
 * Determine if a the user click once or twice
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
 * @returns {function} - returns a function that execute an other function after 300ms
 */
const handleClick = ({
  col,
  dispatch,
  eventDetail,
  isSelected,
  items,
  mappingIndex,
  mouseDownRef,
  mouseUpRef
}) => (e) => {
  return requestTimeout(
    () =>
      handleClickDbClickEvents({
        col,
        dispatch,
        eventDetail,
        isSelected,
        items,
        mappingIndex,
        mouseDownRef,
        mouseUpRef
      }),
    300,
    () => {
      if (e.detail === 2) {
        eventDetail.current = e.detail;
        return;
      }
      eventDetail.current = null;
    }
  );
};

export default handleClick;
