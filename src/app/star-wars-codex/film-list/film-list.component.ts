import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FilmsTableData, IFilmsResponse } from 'src/app/models/film.model';
import {
  FilmsPaginationData,
  ISortingData,
  ITableParameters,
  SortDirection,
} from 'src/app/models/table-data.model';
import { getFilmsCompareFunction } from 'src/app/utility/sort-comparers';
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-films-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmListComponent implements OnInit, OnDestroy {
  private filmsResponse$: Subscription;

  public filmsResponse: IFilmsResponse;
  public filmsTableParameters: ITableParameters;
  public filmsSearchAttribute: string = 'title';

  public isLoading: boolean = true;

  constructor(
    private starWarsService: StarWarsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.filmsResponse$ =
      this.starWarsService.filmsResponseObservable.subscribe(
        (filmsResponse) => {
          this.filmsResponse = filmsResponse;
          this.initializeTableParameters();
          this.isLoading = false;
          this.changeDetectorRef.markForCheck();
        }
      );

    this.starWarsService.fetchFilms();
  }

  private initializeTableParameters(): void {
    this.filmsTableParameters = {
      data: new FilmsTableData(this.filmsResponse.films),
      searchData: {
        attribute: this.filmsSearchAttribute,
        value: '',
      },
      paginationData: new FilmsPaginationData(this.filmsResponse),
      sortingData: {
        attribute: '',
        direction: SortDirection.None,
      },
      getSortingFunction: getFilmsCompareFunction,
    };
  }

  onGetPagedData(pageNumber: number): void {
    this.isLoading = true;
    this.starWarsService.fetchFilms(pageNumber);
  }

  onGetFilteredData(searchValue: string): void {
    this.isLoading = true;
    this.starWarsService.fetchFilms(undefined, searchValue);
  }

  onTableSorted(sortingData: ISortingData): void {}

  ngOnDestroy() {
    this.filmsResponse$?.unsubscribe();
  }
}
