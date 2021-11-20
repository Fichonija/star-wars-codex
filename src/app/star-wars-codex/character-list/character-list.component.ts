import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
  PageSection,
  PaginationData,
  TableData,
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
  public charactersTableData: TableData;
  public charactersTablePagination: PaginationData;

  constructor(
    private starWarsService: StarWarsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.characterResponse$ =
      this.starWarsService.charactersResponseObservable.subscribe(
        (charactersResponse) => {
          this.charactersResponse = charactersResponse;
          this.charactersTableData = new CharactersTableData(
            charactersResponse.characters
          );
          this.charactersTablePagination = {
            currentPageNumber: charactersResponse.currentPageNumber,
            currentPageSection:
              charactersResponse.previousPageUrl === null
                ? PageSection.FirstPage
                : charactersResponse.nextPageUrl === null
                ? PageSection.LastPage
                : PageSection.Middle,
          };

          this.changeDetectorRef.markForCheck();
        }
      );
    this.starWarsService.fetchCharacters();
  }

  onGetPagedData(pageNumber: number) {
    this.starWarsService.fetchCharacters(pageNumber);
  }

  ngOnDestroy() {
    this.characterResponse$?.unsubscribe();
  }
}
