import dayjs from "dayjs";

function isSymbol(x: unknown): x is symbol {
  return typeof x === "symbol";
}

function isNumber(n: unknown): n is number {
  return typeof n === "number";
}

function comparator<T>(a: T, b: T, orderBy: keyof T): number {
  if (
    b[orderBy] === null ||
    b[orderBy] === undefined ||
    b[orderBy] < a[orderBy]
  ) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function isEmpty(array: Array<unknown>) {
  return Array.isArray(array) && array.length === 0;
}

export function handleSort<T>(
  sortKey: keyof T,
  setSort: (ss?: SortState<T> | undefined) => void,
  sort?: SortState<T>,
) {
  setSort(
    sort && sortKey === sort.orderBy && sort.direction === "descending"
      ? undefined
      : {
          orderBy: sortKey,
          direction:
            sort && sortKey === sort.orderBy && sort.direction === "ascending"
              ? "descending"
              : "ascending",
        },
  );
}

export function hasKey<T extends object>(
  o: T,
  key: string | number | symbol | undefined,
): key is keyof T {
  if (!key) return false;
  if (isNumber(key)) return false;
  if (isSymbol(key)) return false;
  return Object.keys(o).includes(key);
}

export function formatDate(value?: string) {
  return dayjs(value).format("DD.MM.YYYY");
}

export function formatDateTime(value: string) {
  return dayjs(value).format("DD.MM.YYYY HH:mm:ss");
}

export interface SortState<T> {
  orderBy: keyof T;
  direction: "ascending" | "descending";
}

export function firstOf<T>(array: Array<T>): T {
  return array.reduce((a) => a);
}

export function applySortDirection<T>(sort?: SortState<T>) {
  return (a: T, b: T): number => {
    if (sort) {
      return sort.direction === "ascending"
        ? comparator<T>(b, a, sort.orderBy)
        : comparator<T>(a, b, sort.orderBy);
    }
    return 1;
  };
}

export function formaterTilNorskTall(sats?: number) {
  if (!sats) return "";
  return new Intl.NumberFormat("no-NO", {
    style: "decimal",
    minimumFractionDigits: 2,
  }).format(sats);
}
