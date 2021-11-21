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

  static mapCharacter(characterData: any): ICharacter {
    let character: ICharacter = {
      id: '',
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
    character.id = characterData.url.split('people/')[1];
    character.id = character.id.substring(0, 1);

    return character;
  }

  constructor(charactersResponseData: any) {
    this.recordCount = charactersResponseData.results.length;
    this.totalRecordCount = charactersResponseData.count;
    this.nextPageUrl = charactersResponseData.next;
    this.previousPageUrl = charactersResponseData.previous;
    this.characters = charactersResponseData.results.map((characterData: any) =>
      CharactersResponse.mapCharacter(characterData)
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
