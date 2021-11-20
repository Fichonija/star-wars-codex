import { TableColumn, TableData } from 'src/app/table/table-data.model';

export interface Character {
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

export interface CharactersResponse {
  currentRecordCount: number;
  totalRecordCount: number;
  nextPageUrl: string;
  previousPageUrl: string;
  characters: Character[];
}

export class CharactersTableData implements TableData {
  columns: TableColumn[] = [
    { accessor: 'name', label: 'Name' },
    { accessor: 'birthYear', label: 'Birth Year' },
    { accessor: 'gender', label: 'Gender' },
  ];
  rows: {
    name: string;
    birthYear: string;
    gender: string;
  }[];

  constructor(characters: Character[]) {
    this.rows = characters.map((character) => {
      return {
        name: character.name,
        birthYear: character.birthYear,
        gender: character.gender,
      };
    });
  }
}
