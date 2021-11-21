import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterCardComponent } from './star-wars-codex/character-card/character-card.component';
import { CharacterListComponent } from './star-wars-codex/character-list/character-list.component';

import { StarWarsCodexComponent } from './star-wars-codex/star-wars-codex.component';

const routes: Routes = [
  { path: '', component: StarWarsCodexComponent },
  { path: 'characters', component: CharacterListComponent },
  { path: 'characters/:id', component: CharacterCardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
