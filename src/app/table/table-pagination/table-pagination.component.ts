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

  public getPaginginationInfoText(): string {
    if (this.paginationData.currentRecordCount === 0) {
      return 'No records found!';
    }

    let firstRecordNumber: number =
      1 +
      (this.paginationData.currentPageNumber - 1) *
        this.paginationData.recordsPerPage;
    let lastRecordNumber: number =
      firstRecordNumber + this.paginationData.currentRecordCount - 1;
    let showingRecordsText = `showing ${firstRecordNumber}-${lastRecordNumber} of ${this.paginationData.totalRecordCount}`;

    let paginationInfoText = `Page ${this.paginationData.currentPageNumber} of ${this.paginationData.numberOfPages}, ${showingRecordsText}`;

    return paginationInfoText;
  }

  public onFirstPageClicked() {
    this.getPage.emit(1);
  }

  public onPreviousPageClicked() {
    this.getPage.emit(this.paginationData.currentPageNumber - 1);
  }

  public onNextPageClicked() {
    this.getPage.emit(this.paginationData.currentPageNumber + 1);
  }
}
