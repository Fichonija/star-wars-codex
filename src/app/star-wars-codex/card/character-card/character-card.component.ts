import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Character } from 'src/app/models/character.model';
import { StarWarsService } from '../../star-wars.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCardComponent implements OnInit, OnDestroy {
  private characterId: string;
  private character$: Subscription;

  public character: Character;

  public isLoading: boolean = true;
  public isFavourite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private starWarsService: StarWarsService
  ) {}

  ngOnInit() {
    this.characterId = this.route.snapshot.paramMap.get('id') as string;
    this.character$ = this.starWarsService.characterObservable.subscribe(
      (character) => {
        this.character = character;
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      }
    );

    this.getCharacter();
  }

  private getCharacter() {
    let favouriteCharacter: Character | undefined =
      this.starWarsService.getFavouriteCharacter(this.characterId);
    if (favouriteCharacter !== undefined) {
      this.character = favouriteCharacter;
      this.isFavourite = true;
      this.isLoading = false;
    } else {
      this.starWarsService.fetchSingleCharacter(this.characterId);
    }
  }

  markAsFavourite(): void {
    this.starWarsService.addFavouriteCharacter(this.character);
    this.isFavourite = true;
  }

  ngOnDestroy() {
    this.character$.unsubscribe();
  }
}
