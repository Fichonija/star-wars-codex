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
  ITableParameters,
  SortDirection,
} from 'src/app/models/table-data.model';
import {
  ICharactersResponse,
  CharactersTableData,
} from '../../models/character.model';
import { StarWarsService } from '../star-wars.service';

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

  constructor(
    private starWarsService: StarWarsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.charactersResponse$ =
      this.starWarsService.charactersResponseObservable.subscribe(
        (charactersResponse) => {
          this.charactersResponse = charactersResponse;
          this.charactersTableParameters = {
            heading: 'Star Wars Characters',
            data: new CharactersTableData(charactersResponse.characters),
            searchAttribute: this.charactersSearchAttribute,
            paginationData: new CharactersPaginationData(charactersResponse),
            sortingData: {
              attribute: '',
              direction: SortDirection.None,
            },
          };

          this.changeDetectorRef.markForCheck();
        }
      );
    this.starWarsService.fetchCharacters();
  }

  onGetPagedData(pageNumber: number) {
    let searchValue = this.charactersResponse.currentFilter
      ? this.charactersResponse.currentFilter
      : undefined;
    this.starWarsService.fetchCharacters(pageNumber, searchValue);
  }

  onGetFilteredData(value: string) {
    this.starWarsService.fetchCharacters(undefined, value);
  }

  ngOnDestroy() {
    this.charactersResponse$?.unsubscribe();
  }
}
