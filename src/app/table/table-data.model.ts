export interface TableColumn {
  accessor: string;
  label: string;
}

export interface TableData {
  columns: TableColumn[];
  rows: any[];
}

export enum PageSection {
  FirstPage = 1,
  Middle,
  LastPage,
}
export interface PaginationData {
  currentPageNumber: number;
  currentPageSection: PageSection;
}
