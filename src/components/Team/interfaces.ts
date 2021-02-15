export interface TableOptions {
  page: number;
  itemsPerPage: number;
  sortBy: string[];
  sortDesc: string[];
  groupBy: [];
  groupDesc: [];
  mustSort: boolean;
  multiSort: boolean;
}
