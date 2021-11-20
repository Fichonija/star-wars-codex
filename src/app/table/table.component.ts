import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ITableParameters } from '../models/table-data.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  @Input() tableParameters: ITableParameters;

  @Output() getPagedData: EventEmitter<number> = new EventEmitter();
  @Output() getFilteredData: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public onGetPage(pageNumber: number) {
    this.getPagedData.emit(pageNumber);
  }

  public onSearchRecordsBy(attributeValue: string) {
    this.getFilteredData.emit(attributeValue);
  }
}
