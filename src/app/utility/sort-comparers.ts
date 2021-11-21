import { SortDirection } from '../models/table-data.model';

export function getCharactersCompareFunction(
  attribute: string,
  direction: SortDirection
): (a: any, b: any) => number {
  if (attribute === 'birthYear') {
    return function youngerToOlderByYavinComparer(a: any, b: any) {
      let compareResult: number = 0;
      let aBirthYear: string = a[attribute];
      let bBirthYear: string = b[attribute];
      // unknown is oldest
      if (bBirthYear === 'unknown') {
        compareResult = -1;
      } else if (aBirthYear === 'unknown') {
        compareResult = 1;
      } else if (aBirthYear.endsWith('ABY') && bBirthYear.endsWith('BBY')) {
        compareResult = -1;
      } else if (aBirthYear.endsWith('BBY') && bBirthYear.endsWith('ABY')) {
        compareResult = 1;
      } else {
        let aBirthYearNumber: number = Number(
          aBirthYear.substring(0, aBirthYear.length - 3)
        );
        let bBirthYearNumber: number = Number(
          bBirthYear.substring(0, bBirthYear.length - 3)
        );
        if (aBirthYear.endsWith('BBY')) {
          compareResult = aBirthYearNumber - bBirthYearNumber;
        } else {
          compareResult = bBirthYearNumber - aBirthYearNumber;
        }
      }
      if (direction === SortDirection.Descending) {
        compareResult = -compareResult;
      }
      return compareResult;
    };
  } else if (attribute === 'name') {
    return function alphabeticalComparer(a: any, b: any) {
      let compareResult: number = 0;
      if (a[attribute] < b[attribute]) {
        compareResult = -1;
      } else if (a[attribute] > b[attribute]) {
        compareResult = 1;
      }
      if (direction === SortDirection.Descending) {
        compareResult = -compareResult;
      }
      return compareResult;
    };
  }
  return (a: any, b: any) => {
    return a[attribute] - b[attribute];
  };
}
