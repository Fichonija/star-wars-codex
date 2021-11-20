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

export enum PageSection {
  FirstPage = 1,
  Middle,
  LastPage,
}

export interface IPaginationData {
  currentPageNumber: number;
  currentPageSection: PageSection;
  currentRecordCount: number;
  totalRecordCount: number;
}

export class CharactersPaginationData implements IPaginationData {
  currentPageNumber: number;
  currentPageSection: PageSection;
  currentRecordCount: number;
  totalRecordCount: number;

  constructor(charactersResponse: ICharactersResponse) {
    this.currentPageNumber = charactersResponse.currentPageNumber;
    if (charactersResponse.previousPageUrl === null) {
      this.currentPageSection = PageSection.FirstPage;
    } else if (charactersResponse.nextPageUrl === null) {
      this.currentPageSection = PageSection.LastPage;
    } else {
      this.currentPageSection = PageSection.Middle;
    }

    this.currentRecordCount = charactersResponse.recordCount;
    this.totalRecordCount = charactersResponse.totalRecordCount;
  }
}
