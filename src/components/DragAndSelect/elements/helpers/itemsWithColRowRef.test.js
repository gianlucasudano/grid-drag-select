import itemsWithColRowRef, { chunkEndLimit, itemsGroupedByCol } from "./index";
import items from "../../../../data/mocks";

it("should return a valid array of last element available for a column", () => {
  expect(chunkEndLimit({ items: items(10), rows: 2 })).toStrictEqual([
    2,
    4,
    6,
    8,
    10
  ]);
});

it("should return a valid array of array with objects grouped by 'column'", () => {
  expect(itemsGroupedByCol({ items: items(4), rows: 2 })).toStrictEqual([
    [
      {
        itemOrder: 1,
        label: "item-1"
      },
      {
        itemOrder: 2,
        label: "item-2"
      }
    ],
    [
      {
        itemOrder: 3,
        label: "item-3"
      },
      {
        itemOrder: 4,
        label: "item-4"
      }
    ]
  ]);
});

it("should return a valid array of objects with references to column and row.", () => {
  expect(itemsWithColRowRef({ items: items(4), rows: 2 })).toStrictEqual([
    {
      col: 1,
      itemOrder: 1,
      label: "item-1",
      row: 1
    },
    {
      col: 1,
      itemOrder: 2,
      label: "item-2",
      row: 2
    },
    {
      col: 2,
      itemOrder: 3,
      label: "item-3",
      row: 1
    },
    {
      col: 2,
      itemOrder: 4,
      label: "item-4",
      row: 2
    }
  ]);
});
