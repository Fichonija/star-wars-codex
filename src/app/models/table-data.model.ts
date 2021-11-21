import { ICharactersResponse } from './character.model';

export interface ITableColumn {
  accessor: string;
  label: string;
}

export interface ITableData {
  columns: ITableColumn[];
  rows: any[];
}

export interface ITableParameters {
  heading: string;
  data: ITableData;
  searchAttribute: string;
  paginationData: IPaginationData;
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
}

export class CharactersPaginationData implements IPaginationData {
  currentPageNumber: number;
  currentPagingSection: PagingSection;
  currentRecordCount: number;
  totalRecordCount: number;

  constructor(charactersResponse: ICharactersResponse) {
    this.currentPageNumber = charactersResponse.currentPageNumber;
    this.currentPagingSection =
      this.getCurrentPagingSection(charactersResponse);

    this.currentRecordCount = charactersResponse.recordCount;
    this.totalRecordCount = charactersResponse.totalRecordCount;
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
