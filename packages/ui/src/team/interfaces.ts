export interface TableOptions {
  page: number;
  itemsPerPage: number;
  sortBy: string[];
  sortDesc: boolean[];
  groupBy: [];
  groupDesc: [];
  mustSort: boolean;
  multiSort: boolean;
}
