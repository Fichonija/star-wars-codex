import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StarWarsCodexComponent } from './star-wars-codex/star-wars-codex.component';
import { HeaderComponent } from './header/header.component';
import { CharacterListComponent } from './star-wars-codex/character-list/character-list.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, StarWarsCodexComponent, CharacterListComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
