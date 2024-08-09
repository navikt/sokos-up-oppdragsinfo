import moment from "moment";

const isSymbol = (x: unknown): x is symbol => typeof x === "symbol";

const isNumber = (n: unknown): n is number => typeof n === "number";

const comparator = <T>(a: T, b: T, orderBy: keyof T) => {
  if (b[orderBy] === null || b[orderBy] === undefined || b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};


export const isEmpty = (array: Array<unknown> | undefined | null) =>
  !array || !Array.isArray(array) || !array.length;

export const handleSort = <T>(
  sortKey: keyof T,
  setSort: (ss?: SortState<T> | undefined) => void,
  sort?: SortState<T>
) => {
  setSort(
    sort && sortKey === sort.orderBy && sort.direction === "descending"
      ? undefined
      : {
        orderBy: sortKey,
        direction:
          sort && sortKey === sort.orderBy && sort.direction === "ascending"
            ? "descending"
            : "ascending"
      }
  );
};

export const hasKey = <T extends object>(
  o: T,
  key: string | number | symbol | undefined
): key is keyof T => {
  if (!key) return false;
  if (isNumber(key)) return false;
  if (isSymbol(key)) return false;
  return Object.keys(o).includes(key);
};

export function formatDate(value: string) {
  return moment(value).format("DD.MM.YYYY");
}

export function formatDateTime(value: string) {
  return moment(value).format("DD.MM.YYYY hh:mm:ss");
}

export interface SortState<T> {
  orderBy: keyof T;
  direction: "ascending" | "descending";
}

export const firstOf = <T>(ar: Array<T>) => ar.reduce((a) => a);

export const applySortDirection =
  <T>(sort?: SortState<T>) =>
    (a: T, b: T) => {
      if (sort) {
        return sort.direction === "ascending"
          ? comparator<T>(b, a, sort.orderBy)
          : comparator<T>(a, b, sort.orderBy);
      }
      return 1;
    };
