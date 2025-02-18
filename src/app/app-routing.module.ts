import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterCardComponent } from './star-wars-codex/card/character-card/character-card.component';
import { FilmCardComponent } from './star-wars-codex/card/film-card/film-card.component';
import { CharacterListComponent } from './star-wars-codex/list/character-list/character-list.component';
import { FilmListComponent } from './star-wars-codex/list/film-list/film-list.component';

import { StarWarsCodexComponent } from './star-wars-codex/star-wars-codex.component';

const routes: Routes = [
  { path: '', component: StarWarsCodexComponent },
  { path: 'characters', component: CharacterListComponent },
  { path: 'characters/:id', component: CharacterCardComponent },
  { path: 'films', component: FilmListComponent },
  { path: 'films/:id', component: FilmCardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
