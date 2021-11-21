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

  private buildQueryParameters(page?: number, searchValue?: string): string {
    let queryParameters = '';
    if (searchValue) {
      queryParameters += `search=${searchValue}&`;
    }
    if (page) {
      queryParameters += `page=${page}&`;
    }

    if (queryParameters !== '') {
      queryParameters = '?' + queryParameters;
      queryParameters = queryParameters.substring(
        0,
        queryParameters.lastIndexOf('&')
      );
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
