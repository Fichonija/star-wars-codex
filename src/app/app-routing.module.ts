import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StarWarsCodexComponent } from './star-wars-codex/star-wars-codex.component';

const routes: Routes = [{ path: '', component: StarWarsCodexComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
