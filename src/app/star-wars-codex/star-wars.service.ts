import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

import { Character, CharactersResponse } from './models/character.model';

@Injectable({
  providedIn: 'root',
})
export class StarWarsService {
  private swapiBaseUrl = 'https://swapi.dev/api/';

  public charactersResponse$: Observable<CharactersResponse> = new Observable();

  constructor(private http: HttpClient) {}

  public fetchPeople(page?: number): void {
    const pagingQuery = page ? `?&page=${page}` : '';
    this.charactersResponse$ = this.http
      .get(`${this.swapiBaseUrl}people${pagingQuery}`)
      .pipe(
        map((response: any) => this.mapCharactersResponseData(response)),
        catchError(this.handleError)
      );
  }

  private mapCharactersResponseData(
    charactersResponseData: any
  ): CharactersResponse {
    let characterResponse: CharactersResponse = {
      currentRecordCount: charactersResponseData.results.length,
      totalRecordCount: charactersResponseData.count,
      nextPageUrl: charactersResponseData.next,
      previousPageUrl: charactersResponseData.previous,
      characters: charactersResponseData.results.map((characterData: any) =>
        this.mapCharacterData(characterData)
      ),
    };

    return characterResponse;
  }

  private mapCharacterData(characterData: any): Character {
    return {
      name: characterData.name,
      birthYear: characterData.birth_year,
      gender: characterData.gender,
      hairColor: characterData.hair_color,
      skinColor: characterData.skin_color,
      eyeColor: characterData.eye_color,
      height: characterData.height,
      weight: characterData.weight,
      url: characterData.url,
      homeworldUrl: characterData.homeworld,
      filmUrls: characterData.films,
      specieUrls: characterData.species,
      starshipUrls: characterData.starships,
      vehicleUrls: characterData.vehicles,
    };
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(
        `Star Wars Service: An error occurred:`,
        error.error.message
      );
    } else {
      console.error(
        `Star Wars Service: Status: ${error.status}, ` + `Body: ${error.error}`
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
