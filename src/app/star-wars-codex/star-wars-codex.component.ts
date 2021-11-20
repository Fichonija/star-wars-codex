import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-wars-codex',
  templateUrl: './star-wars-codex.component.html',
  styleUrls: ['./star-wars-codex.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarWarsCodexComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
