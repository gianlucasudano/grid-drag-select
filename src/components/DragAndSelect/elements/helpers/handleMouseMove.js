import { setStartLongClickEvent } from "../../reducer/dragAndSelectActions";

/**
 * Set the state required for mouse move event
 *
 * @param {object} params
 * @param {function} params.dispatch - reducer dispatch
 * @param {number} params.mappingIndex - the index from map
 * @param {number} params.selectingEventFirstItem - the index of first item on "long selecting"
 * @param {boolean} params.selectingEventStarted - determine if a "long selection" started
 *
 * @returns {void} - execute the required dispatch for each case
 */
const handleMouseMove = ({
  dispatch,
  mappingIndex,
  selectingEventFirstItem,
  selectingEventStarted
}) => {
  if (selectingEventStarted) {
    dispatch(
      setStartLongClickEvent({
        started: selectingEventStarted,
        firstSelected: selectingEventFirstItem,
        latestSelected: mappingIndex
      })
    );
  }
};

export default handleMouseMove;
