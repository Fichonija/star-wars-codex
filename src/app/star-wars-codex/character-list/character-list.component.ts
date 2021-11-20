import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
  ITableData,
  IPaginationData,
  CharactersPaginationData,
  ITableParameters,
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
  private characterResponse$: Subscription;

  public charactersResponse: ICharactersResponse;
  public charactersTableParameters: ITableParameters;
  public charactersSearchAttribute: string = 'name';

  constructor(
    private starWarsService: StarWarsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.characterResponse$ =
      this.starWarsService.charactersResponseObservable.subscribe(
        (charactersResponse) => {
          this.charactersResponse = charactersResponse;
          this.charactersTableParameters = {
            heading: 'Star Wars Characters',
            data: new CharactersTableData(charactersResponse.characters),
            searchAttribute: this.charactersSearchAttribute,
            paginationData: new CharactersPaginationData(charactersResponse),
          };

          this.changeDetectorRef.markForCheck();
        }
      );
    this.starWarsService.fetchCharacters();
  }

  onGetPagedData(pageNumber: number) {
    this.starWarsService.fetchCharacters(pageNumber);
  }

  onGetFilteredData(value: string) {
    this.starWarsService.fetchCharacters(undefined, value);
  }

  ngOnDestroy() {
    this.characterResponse$?.unsubscribe();
  }
}
