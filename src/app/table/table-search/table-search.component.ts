import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ISearchingData } from 'src/app/models/table-data.model';

@Component({
  selector: 'app-table-search',
  templateUrl: './table-search.component.html',
  styleUrls: ['./table-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSearchComponent implements OnInit, OnChanges {
  @Input() searchData: ISearchingData | undefined;

  @Output() searchRecordsBy: EventEmitter<string> = new EventEmitter<string>();

  public searchFormControl: FormControl = new FormControl('');

  constructor() {}

  ngOnInit() {
    this.searchFormControl = new FormControl(
      this.searchData?.value ? this.searchData.value : ''
    );
    this.searchFormControl.valueChanges.subscribe((value) => {
      if (value !== this.searchData?.value) this.searchRecordsBy.emit(value);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    let change: SimpleChange = changes['searchData'];
    if (change.currentValue?.value !== change.previousValue?.value) {
      this.searchFormControl.setValue(change.currentValue.value);
    }
  }
}
