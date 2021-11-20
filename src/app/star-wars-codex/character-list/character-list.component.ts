import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CharactersResponse } from '../models/character.model';
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterListComponent implements OnInit {
  constructor(public starWarsService: StarWarsService) {}

  ngOnInit(): void {
    this.starWarsService.fetchPeople();
  }
}
