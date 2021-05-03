import { requestTimeout } from "../../../../utilities";
import { setStartLongClickEvent } from "../../reducer/dragAndSelectActions";

const handleMouseDown = ({
  mouseUpRef,
  mouseDownRef,
  dispatch,
  mappingIndex
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
