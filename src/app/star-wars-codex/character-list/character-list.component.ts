import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TableData } from 'src/app/table/table-data.model';
import {
  CharactersResponse,
  CharactersTableData,
} from '../models/character.model';
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterListComponent implements OnInit, OnDestroy {
  private characterResponse$: Subscription | undefined;

  public charactersResponse: CharactersResponse | undefined;
  public charactersTableData: TableData | undefined;

  constructor(
    private starWarsService: StarWarsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.characterResponse$ = this.starWarsService
      .fetchPeople()
      .subscribe((charactersResponse) => {
        this.charactersResponse = charactersResponse;
        this.charactersTableData = new CharactersTableData(
          charactersResponse.characters
        );
        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy() {
    this.characterResponse$?.unsubscribe();
  }
}
