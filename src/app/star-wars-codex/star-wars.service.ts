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

    forkJoin(fetchObservables).subscribe((responses: any[]) => {
      character.homeworld = responses[0].name;
      for (let i = 1; i < responses.length; i++) {
        const film = responses[i];
        character.films.push(film.title);
      }
      this.characterSubject.next(character);
    });
  }

  private buildQueryParameters(page?: number, searchValue?: string): string {
    let queryParameters = `?page=${page ? page : 1}`;
    if (searchValue) {
      queryParameters += `&search=${searchValue}`;
    }

    return queryParameters;
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
