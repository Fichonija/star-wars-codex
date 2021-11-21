import { ITableColumn, ITableData } from 'src/app/models/table-data.model';

export interface ICharacter {
  name: string;
  birthYear: string;
  gender: string;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  height: string;
  weight: string;
  url: string;
  homeworldUrl: string;
  filmUrls: string[];
  specieUrls: string[];
  starshipUrls: string[];
  vehicleUrls: string[];
}

export interface ICharactersResponse {
  recordCount: number;
  totalRecordCount: number;
  currentPageNumber: number;
  previousPageUrl: string | null;
  nextPageUrl: string | null;
  currentFilter: string | null;
  characters: ICharacter[];
}

export class CharactersResponse implements ICharactersResponse {
  recordCount: number;
  totalRecordCount: number;
  currentPageNumber: number;
  previousPageUrl: string | null;
  nextPageUrl: string | null;
  currentFilter: string | null;
  characters: ICharacter[];

  constructor(charactersResponseData: any) {
    this.recordCount = charactersResponseData.results.length;
    this.totalRecordCount = charactersResponseData.count;
    this.nextPageUrl = charactersResponseData.next;
    this.previousPageUrl = charactersResponseData.previous;
    this.characters = charactersResponseData.results.map((characterData: any) =>
      this.mapCharacter(characterData)
    );
  }

  private mapCharacter(characterData: any): ICharacter {
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
}

export class CharactersTableData implements ITableData {
  columns: ITableColumn[] = [
    { accessor: 'name', label: 'Name' },
    { accessor: 'birthYear', label: 'Birth Year' },
    { accessor: 'gender', label: 'Gender' },
  ];
  rows: {
    name: string;
    birthYear: string;
    gender: string;
  }[];

  constructor(characters: ICharacter[]) {
    this.rows = characters.map((character) => {
      return {
        name: character.name,
        birthYear: character.birthYear,
        gender: character.gender,
      };
    });
  }
}
