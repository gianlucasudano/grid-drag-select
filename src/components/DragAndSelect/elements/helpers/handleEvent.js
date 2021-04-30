import { setSelectedItem } from "../../reducer/dragAndSelectActions";

const handleEvent = (
  dispatch,
  eventDetail,
  mappingIndex,
  mouseDownAt,
  mouseUpAt
) => {
  const timeOnPressing = (mouseUpAt - mouseDownAt) / 1000 || -1;
  const clickEvent = !eventDetail.current && timeOnPressing < 1;
  const dbClickEvent = eventDetail.current === 2;
  const longClickEvent = timeOnPressing >= 1;

  if (clickEvent) {
    console.log("click");
    return dispatch(setSelectedItem({ itemSelected: mappingIndex }));
  }
  if (dbClickEvent) {
    console.log("dblclick");
  }

  if (longClickEvent) {
    console.log("long click");
  }
};

export default handleEvent;
