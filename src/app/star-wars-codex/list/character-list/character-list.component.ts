import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
  CharactersPaginationData,
  ISortingData,
  ITableParameters,
  SortDirection,
} from 'src/app/models/table-data.model';
import { getCharactersCompareFunction } from 'src/app/utility/sort-comparers';
import {
  ICharactersResponse,
  CharactersTableData,
} from '../../../models/character.model';
import { StarWarsService } from '../../star-wars.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterListComponent implements OnInit, OnDestroy {
  private charactersResponse$: Subscription;

  public charactersResponse: ICharactersResponse;
  public charactersTableParameters: ITableParameters;
  public charactersSearchAttribute: string = 'name';

  private state: {
    searchValue: string | null;
    page: number | null;
    sortAttribute: string | null;
    sortDirection: SortDirection | null;
  } = {
    searchValue: null,
    page: null,
    sortAttribute: null,
    sortDirection: null,
  };

  public isLoading: boolean = true;

  constructor(
    private starWarsService: StarWarsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.charactersResponse$ =
      this.starWarsService.charactersResponseObservable.subscribe(
        (charactersResponse) => {
          this.charactersResponse = charactersResponse;
          this.initializeTableParameters();
          this.isLoading = false;
          this.changeDetectorRef.markForCheck();
        }
      );

    if (this.isStateCached()) {
      this.getState();
      this.starWarsService.fetchCharacters(
        this.state.page ? this.state.page : undefined,
        this.state.searchValue ? this.state.searchValue : undefined
      );
    } else {
      this.starWarsService.fetchCharacters();
    }
  }

  private initializeTableParameters(): void {
    this.charactersTableParameters = {
      data: new CharactersTableData(this.charactersResponse.characters),
      searchData: {
        attribute: this.charactersSearchAttribute,
        value: this.state.searchValue ? this.state.searchValue : '',
      },
      paginationData: new CharactersPaginationData(this.charactersResponse),
      sortingData: {
        attribute: this.state.sortAttribute ? this.state.sortAttribute : '',
        direction: this.state.sortDirection
          ? this.state.sortDirection
          : SortDirection.None,
      },
      getSortingFunction: getCharactersCompareFunction,
    };
    if (this.state.sortAttribute && this.state.sortAttribute !== '') {
      let columnForSortIndex: number =
        this.charactersTableParameters.data.columns.findIndex(
          (column) => column.accessor === this.state.sortAttribute
        );
      this.charactersTableParameters.data.columns[
        columnForSortIndex
      ].currentSortDirection = this.state.sortDirection as SortDirection;
    }
  }

  onGetPagedData(pageNumber: number): void {
    this.isLoading = true;

    this.state.page = pageNumber;
    this.state.sortAttribute = '';
    this.state.sortDirection = SortDirection.None;
    this.saveState();
    let searchValue = this.state.searchValue
      ? this.state.searchValue
      : undefined;
    this.starWarsService.fetchCharacters(pageNumber, searchValue);
  }

  onGetFilteredData(searchValue: string): void {
    this.isLoading = true;
    this.state.searchValue = searchValue;
    this.state.page = 1;
    this.state.sortAttribute = '';
    this.state.sortDirection = SortDirection.None;
    this.saveState();
    this.starWarsService.fetchCharacters(undefined, searchValue);
  }

  onTableSorted(sortingData: ISortingData): void {
    this.state.sortAttribute = sortingData.attribute;
    this.state.sortDirection = sortingData.direction;
    this.saveState();
  }

  ngOnDestroy() {
    this.charactersResponse$?.unsubscribe();
  }

  private isStateCached(): boolean {
    return window.sessionStorage.length !== 0;
  }

  private getState(): void {
    this.state.searchValue = window.sessionStorage.getItem('searchValue');
    this.state.page = Number(window.sessionStorage.getItem('page'));
    this.state.sortAttribute = window.sessionStorage.getItem('sortAttribute');
    this.state.sortDirection = Number(
      window.sessionStorage.getItem('sortDirection')
    );
  }

  private saveState(): void {
    window.sessionStorage.setItem(
      'searchValue',
      this.state.searchValue ? this.state.searchValue : ''
    );
    window.sessionStorage.setItem(
      'page',
      this.state.page ? this.state.page.toString() : '1'
    );
    window.sessionStorage.setItem(
      'sortAttribute',
      this.state.sortAttribute ? this.state.sortAttribute : ''
    );
    window.sessionStorage.setItem(
      'sortDirection',
      this.state.sortDirection ? this.state.sortDirection.toString() : '0'
    );
  }
}
