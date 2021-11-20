import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StarWarsCodexComponent } from './star-wars-codex/star-wars-codex.component';
import { HeaderComponent } from './header/header.component';
import { CharacterListComponent } from './star-wars-codex/character-list/character-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, StarWarsCodexComponent, CharacterListComponent, TableComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
