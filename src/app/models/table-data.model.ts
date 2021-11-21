import { ICharactersResponse } from './character.model';

export enum SortDirection {
  None = 0,
  Ascending,
  Descending,
}
export interface ITableColumn {
  accessor: string;
  label: string;
  enableSort: boolean;
  currentSortDirection: SortDirection;
}

export interface ITableData {
  columns: ITableColumn[];
  rows: any[];
}

export interface ISortingData {
  attribute: string;
  direction: SortDirection;
}

export interface ISearchingData {
  attribute: string;
  value: string;
}

export interface ITableParameters {
  data: ITableData;
  searchData: ISearchingData;
  paginationData: IPaginationData;
  sortingData: ISortingData;
}

export enum PagingSection {
  FirstPage = 1,
  Middle,
  LastPage,
  OnlyPage,
}

export interface IPaginationData {
  currentPageNumber: number;
  currentPagingSection: PagingSection;
  currentRecordCount: number;
  totalRecordCount: number;
  numberOfPages: number;
  recordsPerPage: number;
}

export class CharactersPaginationData implements IPaginationData {
  currentPageNumber: number;
  currentPagingSection: PagingSection;
  currentRecordCount: number;
  totalRecordCount: number;
  numberOfPages: number;
  recordsPerPage: number = 10;

  constructor(charactersResponse: ICharactersResponse) {
    this.currentPageNumber = charactersResponse.currentPageNumber;
    this.currentPagingSection =
      this.getCurrentPagingSection(charactersResponse);

    this.currentRecordCount = charactersResponse.recordCount;
    this.totalRecordCount = charactersResponse.totalRecordCount;
    this.numberOfPages = Math.ceil(this.totalRecordCount / this.recordsPerPage);
  }

  private getCurrentPagingSection(
    charactersResponse: ICharactersResponse
  ): PagingSection {
    if (
      charactersResponse.previousPageUrl === null &&
      charactersResponse.nextPageUrl === null
    ) {
      return PagingSection.OnlyPage;
    } else if (charactersResponse.previousPageUrl === null) {
      return PagingSection.FirstPage;
    } else if (charactersResponse.nextPageUrl === null) {
      return PagingSection.LastPage;
    } else {
      return PagingSection.Middle;
    }
  }
}
