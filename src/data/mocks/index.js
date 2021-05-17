const items = (length = 25) =>
  Array.from(Array(length)).reduce((acc, current, currentIndex, array) => {
    return [
      ...acc,
      {
        label: `item-${currentIndex + 1}`,
        itemOrder: currentIndex + 1
      }
    ];
  }, []);

export default items;
