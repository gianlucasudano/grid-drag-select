import { requestTimeout } from "../../../../utilities";
import handleClickDbClickEvents from "./handleClickDbClickEvents";
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
