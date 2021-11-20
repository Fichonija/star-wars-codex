import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-table-search',
  templateUrl: './table-search.component.html',
  styleUrls: ['./table-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSearchComponent implements OnInit {
  @Input() searchAttribute: string = '';

  @Output() searchRecordsBy: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  public onSearchInputChange(event: KeyboardEvent) {
    const inputElementTarget: HTMLInputElement =
      event.target as HTMLInputElement;
    this.searchRecordsBy.emit(inputElementTarget.value);
  }
}
