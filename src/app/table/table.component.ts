import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IPaginationData, TableData } from '../models/table-data.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  @Input() heading: string = '';
  @Input() data: TableData;
  @Input() paginationData: IPaginationData;

  @Output() getPagedData: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public onGetPage(pageNumber: number) {
    this.getPagedData.emit(pageNumber);
  }
}
