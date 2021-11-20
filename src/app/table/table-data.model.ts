export interface TableColumn {
  accessor: string;
  label: string;
}

export interface TableData {
  columns: TableColumn[];
  rows: any[];
}
