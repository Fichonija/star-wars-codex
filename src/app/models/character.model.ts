import {
  ITableColumn,
  ITableData,
  SortDirection,
} from 'src/app/models/table-data.model';

export interface ICharacter {
  id: string;
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

export class Character {
  id: string;
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

  homeworld: string = '';
  films: string[] = [];

  constructor(characterData: any) {
    this.id = characterData.url.split('people/')[1];
    this.id = this.id.substring(0, this.id.length - 1);
    this.name = characterData.name;
    this.birthYear = characterData.birth_year;
    this.gender = characterData.gender;
    this.hairColor = characterData.hair_color;
    this.skinColor = characterData.skin_color;
    this.eyeColor = characterData.eye_color;
    this.height = characterData.height;
    this.weight = characterData.weight;
    this.url = characterData.url;
    this.homeworldUrl = characterData.homeworld;
    this.filmUrls = characterData.films;
    this.specieUrls = characterData.species;
    this.starshipUrls = characterData.starships;
    this.vehicleUrls = characterData.vehicles;
  }
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
    this.characters = charactersResponseData.results.map(
      (characterData: any) => new Character(characterData)
    );
  }
}

export class CharactersTableData implements ITableData {
  columns: ITableColumn[] = [
    {
      accessor: 'name',
      label: 'Name',
      enableSort: true,
      currentSortDirection: SortDirection.None,
    },
    {
      accessor: 'birthYear',
      label: 'Birth Year',
      enableSort: true,
      currentSortDirection: SortDirection.None,
    },
    {
      accessor: 'gender',
      label: 'Gender',
      enableSort: false,
      currentSortDirection: SortDirection.None,
    },
  ];
  rows: {
    id: string;
    name: string;
    birthYear: string;
    gender: string;
  }[];

  constructor(characters: ICharacter[]) {
    this.rows = characters.map((character) => {
      return {
        id: character.id,
        name: character.name,
        birthYear: character.birthYear,
        gender: character.gender,
      };
    });
  }
}
