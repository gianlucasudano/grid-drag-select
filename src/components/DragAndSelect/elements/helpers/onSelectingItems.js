const onSelectingItems = ({
  selectingEventFirstItem,
  selectingEventLatestItem,
  items
}) => {
  const firstSelection = items[selectingEventFirstItem];
  const lastSelection = items[selectingEventLatestItem];
  const isAscending = firstSelection?.itemOrder < lastSelection?.itemOrder;

  const filteringItems = items?.reduce((acc, current, currentIndex, array) => {
    // left right up down
    const ascendingConditions =
      isAscending &&
      current.col >= firstSelection.col &&
      current.col <= lastSelection.col &&
      current.row >= firstSelection.row &&
      current.row <= lastSelection.row;
    // right left down up
    const descendingConditions =
      !isAscending &&
      current.col <= firstSelection.col &&
      current.col >= lastSelection.col &&
      current.row <= firstSelection.row &&
      current.row >= lastSelection.row;
    // left right down up
    const leftUpAscendingConditions =
      isAscending &&
      current.col >= firstSelection.col &&
      current.col <= lastSelection.col &&
      current.row <= firstSelection.row &&
      current.row >= lastSelection.row;
    // left right down up
    const rightUpAscendingConditions =
      !isAscending &&
      current.col <= firstSelection.col &&
      current.col >= lastSelection.col &&
      current.row >= firstSelection.row &&
      current.row <= lastSelection.row;

    const selectedIndex =
      ascendingConditions ||
      descendingConditions ||
      leftUpAscendingConditions ||
      rightUpAscendingConditions
        ? currentIndex
        : null;

    return [...acc, selectedIndex];
  }, []);
  return filteringItems.filter((item) => item !== null);
};

export default onSelectingItems;
