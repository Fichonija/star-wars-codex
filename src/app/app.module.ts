import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StarWarsCodexComponent } from './star-wars-codex/star-wars-codex.component';
import { HeaderComponent } from './header/header.component';
import { CharacterListComponent } from './star-wars-codex/character-list/character-list.component';
import { TableComponent } from './table/table.component';
import { TablePaginationComponent } from './table/table-pagination/table-pagination.component';
import { TableSearchComponent } from './table/table-search/table-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StarWarsCodexComponent,
    CharacterListComponent,
    TableComponent,
    TablePaginationComponent,
    TableSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
