import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TableData } from 'src/app/table/table-data.model';
import { CharactersResponse } from '../models/character.model';
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
        this.charactersTableData =
          this.mapCharactersTableData(charactersResponse);
        this.changeDetectorRef.markForCheck();
      });
  }

  private mapCharactersTableData(
    charactersResponse: CharactersResponse
  ): TableData {
    let charactersTableData: TableData = {
      columns: [{ accessor: 'name', label: 'Name' }],
      rows: charactersResponse.characters.map((character) => {
        return { name: character.name };
      }),
    };
    return charactersTableData;
  }

  ngOnDestroy() {
    this.characterResponse$?.unsubscribe();
  }
}
