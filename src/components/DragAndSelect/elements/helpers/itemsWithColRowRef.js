/**
 * Returns an array of last element available for a column 
   ie: [5,10,15,20,25]
 *
 * @param {array} items - array of items
 * @param {number} rows - rows number
 *
 * @returns {array} - array of last element available for a column
 */
const chunkEndLimit = ({ items, rows }) =>
  items
    .reduce((acc, current, currentIndex, array) => {
      return [
        ...acc,
        current.itemOrder % rows === 0 ? current.itemOrder : null
      ];
    }, [])
    .filter((item) => item !== null);

/**
 * Returns an array of array with objects grouped by "column"
   ie: [[{
          label: "item-1",
          itemOrder: 1
        },{},...], Array(5), Array(5), Array(5), Array(5)]
 *
 * @param {array} items - array of items
 * @param {number} rows - rows number
 *
 * @returns {array} - array of array
 */
const itemsGroupedByCol = ({ items, rows }) =>
  chunkEndLimit({ items, rows }).reduce(
    (acc, current, currentIndex, array) => [
      ...acc,
      items.filter((item) => {
        return array[currentIndex - 1]
          ? item.itemOrder <= current &&
              item.itemOrder > array[currentIndex - 1]
          : item.itemOrder <= current;
      })
    ],
    []
  );

/**
 * Returns an array of objects with references to column and row.
 *   [
 *     {
 *       "label": "item-1",
 *       "itemOrder": 1,
 *       "col": 1,
 *       "row": 1
 *     },
 *     ...
 *   ]
 *
 * @param {array} items - array of items
 * @param {number} rows - rows number
 *
 * @returns {array} - array of objects
 */
const itemsWithColRowRef = ({ items, rows }) =>
  itemsGroupedByCol({ items, rows })
    .reduce(
      (acc, current, currentIndex, array) => [
        ...acc,
        current.map((item, index) => {
          return {
            ...item,
            col: currentIndex + 1,
            row: index + 1
          };
        })
      ],
      []
    )
    .flat();

export default itemsWithColRowRef;
export { chunkEndLimit, itemsGroupedByCol };
