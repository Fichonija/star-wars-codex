import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarWarsCodexComponent } from './star-wars-codex.component';

describe('StarWarsCodexComponent', () => {
  let component: StarWarsCodexComponent;
  let fixture: ComponentFixture<StarWarsCodexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarWarsCodexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarWarsCodexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
