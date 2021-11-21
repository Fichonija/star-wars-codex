import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCardComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
  }
}
