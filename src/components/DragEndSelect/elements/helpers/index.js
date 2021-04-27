const chunkEndLimit = ({ items, rows }) =>
  items
    .reduce((acc, current, currentIndex, array) => {
      return [
        ...acc,
        current.itemOrder % rows === 0 ? current.itemOrder : null
      ];
    }, [])
    .filter((item) => item !== null);

const itemsGroupedByChunk = ({ items, rows }) =>
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

const itemsWithCoordinates = ({ items, rows }) =>
  itemsGroupedByChunk({ items, rows })
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

export default itemsWithCoordinates;
export { chunkEndLimit, itemsGroupedByChunk };
