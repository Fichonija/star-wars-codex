import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ISortingData,
  ITableColumn,
  ITableParameters,
  SortDirection,
} from '../models/table-data.model';
import { getCharactersCompareFunction } from '../utility/sort-comparers';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  @Input() showLoading: boolean;
  @Input() tableHeading: string;
  @Input() tableParameters: ITableParameters;

  @Output() getPagedData: EventEmitter<number> = new EventEmitter();
  @Output() getFilteredData: EventEmitter<string> = new EventEmitter();
  @Output() sorted: EventEmitter<ISortingData> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    if (this.tableParameters.sortingData?.attribute !== '') {
      this.sortRows();
    }
  }

  public getFullColumnLabel(column: ITableColumn): string {
    let sortingLabel = '';
    if (column.enableSort) {
      switch (column.currentSortDirection) {
        case SortDirection.None:
          sortingLabel = '↕️';
          break;
        case SortDirection.Ascending:
          sortingLabel = '⬆';
          break;
        case SortDirection.Descending:
          sortingLabel = '⬇';
          break;
        default:
          sortingLabel = '↕️';
      }
    }
    return `${column.label}${' ' + sortingLabel}`;
  }

  public onTableHeaderClicked(event: MouseEvent): void {
    let tableHeaderElement: HTMLTableCellElement =
      event.target as HTMLTableCellElement;

    let isColumnSortable: boolean =
      tableHeaderElement.getAttribute('data-sortable') === 'true'
        ? true
        : false;
    if (isColumnSortable) {
      let sortAttribute: string = tableHeaderElement.getAttribute(
        'data-sort-attribute'
      ) as string;
      this.updateCurrentSortParameters(sortAttribute);
      this.updateColumnsSortParameters();
      this.sortRows();
      this.sorted.emit(this.tableParameters.sortingData);
    }
  }

  private updateCurrentSortParameters(sortAttribute: string): void {
    if (this.tableParameters.sortingData.attribute === '') {
      this.tableParameters.sortingData.attribute = sortAttribute;
      this.tableParameters.sortingData.direction = SortDirection.Ascending;
    } else if (sortAttribute !== this.tableParameters.sortingData.attribute) {
      this.tableParameters.sortingData.attribute = sortAttribute;
      this.tableParameters.sortingData.direction = SortDirection.Ascending;
    } else {
      let previousSortDirection: SortDirection =
        this.tableParameters.sortingData.direction;
      this.tableParameters.sortingData.direction =
        (previousSortDirection + 1) % 3;
    }
  }

  private sortRows(): void {
    let compareFunction = getCharactersCompareFunction(
      this.tableParameters.sortingData.attribute,
      this.tableParameters.sortingData.direction
    );
    this.tableParameters.data.rows =
      this.tableParameters.data.rows.sort(compareFunction);
  }

  private updateColumnsSortParameters(): void {
    for (let column of this.tableParameters.data.columns) {
      if (column.accessor === this.tableParameters.sortingData.attribute) {
        column.currentSortDirection =
          this.tableParameters.sortingData.direction;
      } else {
        column.currentSortDirection = SortDirection.None;
      }
    }
  }

  public onGetPage(pageNumber: number) {
    this.getPagedData.emit(pageNumber);
  }

  public onSearchRecordsBy(attributeValue: string) {
    this.getFilteredData.emit(attributeValue);
  }
}
