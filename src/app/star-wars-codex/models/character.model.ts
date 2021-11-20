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
