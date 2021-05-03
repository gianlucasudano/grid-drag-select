/**
 * Determine wich items are involved on "long selection"
 *
 * @param {objet} params
 * @param {array} params.items - all items in the grid
 * @param {number} params.selectingEventFirstItem - index of first item selected
 * @param {number} params.selectingEventLatestItem - index of latest item selected
 *
 * @returns {array} - returns a filtered array of items index
 */
const onSelectingItems = ({
  items,
  selectingEventFirstItem,
  selectingEventLatestItem
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
