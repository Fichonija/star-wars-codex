import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';

import {
  CharactersResponse,
  ICharactersResponse,
} from '../models/character.model';

@Injectable({
  providedIn: 'root',
})
export class StarWarsService {
  private swapiBaseUrl = 'https://swapi.dev/api/';

  private charactersResponseSubject: Subject<ICharactersResponse> =
    new Subject<ICharactersResponse>();
  public charactersResponseObservable: Observable<ICharactersResponse> =
    this.charactersResponseSubject.asObservable();

  constructor(private http: HttpClient) {}

  public fetchCharacters(page?: number, searchValue?: string): void {
    let queryParameters = this.getQueryParameters(page, searchValue);
    this.http
      .get(`${this.swapiBaseUrl}people${queryParameters}`)
      .pipe(
        map((response: any) => new CharactersResponse(response)),
        catchError(this.handleError)
      )
      .subscribe((charactersResponse) =>
        this.charactersResponseSubject.next(charactersResponse)
      );
  }

  private getQueryParameters(page?: number, searchValue?: string): string {
    let queryParameters = '';
    if (searchValue) {
      queryParameters += `search=${searchValue}`;
    } else if (page) {
      queryParameters += `page=${page}`;
    }

    if (queryParameters !== '') {
      queryParameters = '?' + queryParameters;
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
