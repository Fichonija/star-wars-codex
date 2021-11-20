import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IPaginationData } from '../../models/table-data.model';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePaginationComponent implements OnInit {
  @Input() paginationData: IPaginationData;
  @Output() getPage: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  public onFirstPageClicked() {
    this.getPage.emit(1);
  }

  public onPreviousPageClicked() {
    this.getPage.emit(--this.paginationData.currentPageNumber);
  }

  public onNextPageClicked() {
    this.getPage.emit(++this.paginationData.currentPageNumber);
  }
}
