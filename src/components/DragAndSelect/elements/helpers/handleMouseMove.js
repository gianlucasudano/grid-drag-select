import { setStartLongClickEvent } from "../../reducer/dragAndSelectActions";

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
