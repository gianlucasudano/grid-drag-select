import { requestTimeout } from "../../../../utilities";
import { setStartLongClickEvent } from "../../reducer/dragAndSelectActions";

/**
 * Set the state required for mouse down event
 *
 * @param {object} params
 * @param {function} params.dispatch - reducer dispatch
 * @param {number} params.mappingIndex - the index from map
 * @param {object} params.mouseDownRef - mouseDownRef
 * @param {object} params.mouseUpRef - mouseUpRef
 *
 * @returns {void} - execute the required dispatch for each case
 */
const handleMouseDown = ({
  dispatch,
  mappingIndex,
  mouseDownRef,
  mouseUpRef
}) => (e) => {
  mouseDownRef.current = e.timeStamp;

  requestTimeout(
    () => {
      if (!mouseUpRef.current && mouseDownRef.current) {
        dispatch(
          setStartLongClickEvent({
            started: true,
            firstSelected: mappingIndex,
            latestSelected: mappingIndex
          })
        );
      }
    },
    1200,
    () => {}
  );
};

export default handleMouseDown;
