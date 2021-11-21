import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  forkJoin,
  map,
  Observable,
  Subject,
  throwError,
} from 'rxjs';

import {
  CharactersResponse,
  ICharactersResponse,
  Character,
} from '../models/character.model';
import { Film, FilmsResponse, IFilmsResponse } from '../models/film.model';

@Injectable({
  providedIn: 'root',
})
export class StarWarsService {
  private swapiBaseUrl = 'https://swapi.py4e.com/api/';

  private charactersResponseSubject: Subject<ICharactersResponse> =
    new Subject<ICharactersResponse>();
  public charactersResponseObservable: Observable<ICharactersResponse> =
    this.charactersResponseSubject.asObservable();

  private characterSubject: Subject<Character> = new Subject<Character>();
  public characterObservable: Observable<Character> =
    this.characterSubject.asObservable();

  private favouriteCharacters: Character[] = [];

  private filmsResponseSubject: Subject<IFilmsResponse> =
    new Subject<IFilmsResponse>();
  public filmsResponseObservable: Observable<IFilmsResponse> =
    this.filmsResponseSubject.asObservable();

  private filmSubject: Subject<Film> = new Subject<Film>();
  public filmObservable: Observable<Film> = this.filmSubject.asObservable();

  constructor(private http: HttpClient) {}

  public fetchCharacters(page?: number, searchValue?: string): void {
    let queryParameters = this.buildQueryParameters(page, searchValue);
    this.http
      .get(`${this.swapiBaseUrl}people${queryParameters}`)
      .pipe(
        map((response: any) => {
          let charactersResponse = new CharactersResponse(response);
          charactersResponse.currentPageNumber = page ? page : 1;
          charactersResponse.currentFilter = searchValue ? searchValue : null;

          return charactersResponse;
        }),
        catchError(this.handleError)
      )
      .subscribe((charactersResponse) =>
        this.charactersResponseSubject.next(charactersResponse)
      );
  }

  public fetchFilms(page?: number, searchValue?: string): void {
    let queryParameters = this.buildQueryParameters(page, searchValue);
    this.http
      .get(`${this.swapiBaseUrl}films${queryParameters}`)
      .pipe(
        map((response: any) => {
          let filmsResponse = new FilmsResponse(response);
          filmsResponse.currentPageNumber = page ? page : 1;
          filmsResponse.currentFilter = searchValue ? searchValue : null;

          return filmsResponse;
        }),
        catchError(this.handleError)
      )
      .subscribe((filmsResponse) =>
        this.filmsResponseSubject.next(filmsResponse)
      );
  }

  private buildQueryParameters(page?: number, searchValue?: string): string {
    let queryParameters = `?page=${page ? page : 1}`;
    if (searchValue) {
      queryParameters += `&search=${searchValue}`;
    }

    return queryParameters;
  }

  public fetchSingleCharacter(id: string): void {
    this.http
      .get(`${this.swapiBaseUrl}people/${id}`)
      .pipe(
        map((response: any) => new Character(response)),
        catchError(this.handleError)
      )
      .subscribe((character) =>
        this.fetchSingleCharacterAdditionals(character)
      );
  }

  private fetchSingleCharacterAdditionals(character: Character) {
    let fetchObservables: Observable<any>[] = [];
    fetchObservables.push(this.http.get(character.homeworldUrl));
    for (const filmUrl of character.filmUrls) {
      fetchObservables.push(this.http.get(filmUrl));
    }

    forkJoin(fetchObservables)
      .pipe(catchError(this.handleError))
      .subscribe((responses: any[]) => {
        character.homeworld = responses[0].name;
        for (let i = 1; i < responses.length; i++) {
          const film = new Film(responses[i]);
          character.films.push({ id: film.id, title: film.title });
        }
        this.characterSubject.next(character);
      });
  }

  public addFavouriteCharacter(character: Character) {
    if (
      this.favouriteCharacters.findIndex(
        (favouriteCharacter) => favouriteCharacter.id === character.id
      ) === -1
    ) {
      this.favouriteCharacters.push(character);
    }
  }

  public getFavouriteCharacter(characterId: string): Character | undefined {
    return this.favouriteCharacters.find(
      (favouriteCharacter) => favouriteCharacter.id === characterId
    );
  }

  public fetchSingleFilm(id: string): void {
    this.http
      .get(`${this.swapiBaseUrl}films/${id}`)
      .pipe(
        map((response: any) => new Film(response)),
        catchError(this.handleError)
      )
      .subscribe((film) => this.fetchSingleFilmAdditionals(film));
  }

  private fetchSingleFilmAdditionals(film: Film) {
    let fetchObservables: Observable<any>[] = [];
    for (const characterUrl of film.characterUrls) {
      fetchObservables.push(this.http.get(characterUrl));
    }

    forkJoin(fetchObservables)
      .pipe(catchError(this.handleError))
      .subscribe((responses: any[]) => {
        for (let i = 0; i < responses.length; i++) {
          const character = new Character(responses[i]);
          film.characters.push({ id: character.id, name: character.name });
        }
        this.filmSubject.next(film);
      });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(
        `Star Wars Service: An error occurred:`,
        error.error.message
      );
    } else {
      console.error(
        `Star Wars Service: Status: ${error.status}, ` +
          `Message: ${error.message}`
      );
    }
    return throwError(
      () =>
        new Error(
          `Star Wars Service: an error occured, please try again later.`
        )
    );
  }
}
