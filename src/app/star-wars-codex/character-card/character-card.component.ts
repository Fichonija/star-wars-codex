import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICharacter } from 'src/app/models/character.model';
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCardComponent implements OnInit, OnDestroy {
  private characterId: string;
  private character$: Subscription;

  @Input() character: ICharacter;

  public isLoading: boolean = true;

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
    this.starWarsService.fetchSingleCharacter(this.characterId);
  }

  ngOnDestroy() {
    this.character$.unsubscribe();
  }
}
