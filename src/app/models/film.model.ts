import { ITableColumn, ITableData, SortDirection } from './table-data.model';

export interface IFilm {
  id: string;
  episodeId: string;
  title: string;
  openingCrawl: string;
  director: string;
  producer: string;
  releaseDate: string;
  url: string;
  characterUrls: string[];
  planetUrls: string[];
  starshipUrls: string[];
  vehicleUrls: string[];
  specieUrls: string[];
}

export class Film implements IFilm {
  id: string;
  episodeId: string;
  title: string;
  openingCrawl: string;
  director: string;
  producer: string;
  releaseDate: string;
  url: string;
  characterUrls: string[];
  planetUrls: string[];
  starshipUrls: string[];
  vehicleUrls: string[];
  specieUrls: string[];

  characters: { id: string; name: string }[] = [];

  constructor(filmData: any) {
    this.id = filmData.url.split('films/')[1];
    this.id = this.id.substring(0, this.id.length - 1);
    this.episodeId = filmData.episode_id;
    this.title = filmData.title;
    this.openingCrawl = filmData.opening_crawl;
    this.director = filmData.director;
    this.producer = filmData.producer;
    this.releaseDate = filmData.release_date;
    this.url = filmData.url;
    this.characterUrls = filmData.characters;
    this.planetUrls = filmData.planets;
    this.starshipUrls = filmData.starships;
    this.vehicleUrls = filmData.vehicles;
    this.specieUrls = filmData.species;
  }
}

export interface IFilmsResponse {
  recordCount: number;
  totalRecordCount: number;
  currentPageNumber: number;
  previousPageUrl: string | null;
  nextPageUrl: string | null;
  currentFilter: string | null;
  films: IFilm[];
}

export class FilmsResponse implements IFilmsResponse {
  recordCount: number;
  totalRecordCount: number;
  currentPageNumber: number;
  previousPageUrl: string | null;
  nextPageUrl: string | null;
  currentFilter: string | null;
  films: IFilm[];

  constructor(filmsResponseData: any) {
    this.recordCount = filmsResponseData.results.length;
    this.totalRecordCount = filmsResponseData.count;
    this.nextPageUrl = filmsResponseData.next;
    this.previousPageUrl = filmsResponseData.previous;
    this.films = filmsResponseData.results.map(
      (filmData: any) => new Film(filmData)
    );
  }
}

export class FilmsTableData implements ITableData {
  columns: ITableColumn[] = [
    {
      accessor: 'title',
      label: 'Title',
      enableSort: true,
      currentSortDirection: SortDirection.None,
    },
    {
      accessor: 'director',
      label: 'Director',
      enableSort: false,
      currentSortDirection: SortDirection.None,
    },
    {
      accessor: 'releaseDate',
      label: 'Release Date',
      enableSort: false,
      currentSortDirection: SortDirection.None,
    },
  ];
  rows: {
    id: string;
    title: string;
    director: string;
    releaseDate: string;
  }[];

  constructor(films: IFilm[]) {
    this.rows = films.map((film) => {
      return {
        id: film.id,
        title: film.title,
        director: film.director,
        releaseDate: film.releaseDate,
      };
    });
  }
}
