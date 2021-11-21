import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Film } from 'src/app/models/film.model';
import { StarWarsService } from '../../star-wars.service';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmCardComponent implements OnInit {
  private filmId: string;
  private film$: Subscription;

  public film: Film;

  public isLoading: boolean = true;
  public isFavourite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private starWarsService: StarWarsService
  ) {}

  ngOnInit() {
    this.filmId = this.route.snapshot.paramMap.get('id') as string;
    this.film$ = this.starWarsService.filmObservable.subscribe((film) => {
      this.film = film;
      this.isLoading = false;
      this.changeDetectorRef.markForCheck();
    });

    this.starWarsService.fetchSingleFilm(this.filmId);
  }

  ngOnDestroy() {
    this.film$.unsubscribe();
  }
}
