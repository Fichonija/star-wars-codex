import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
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
  @Input() tableParameters: ITableParameters;

  currentSortParameters: { attribute: string; direction: SortDirection } = {
    attribute: '',
    direction: SortDirection.None,
  };

  @Output() getPagedData: EventEmitter<number> = new EventEmitter();
  @Output() getFilteredData: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

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
    }
  }

  private updateCurrentSortParameters(sortAttribute: string): void {
    if (this.currentSortParameters.attribute === '') {
      this.currentSortParameters.attribute = sortAttribute;
      this.currentSortParameters.direction = SortDirection.Ascending;
    } else if (sortAttribute !== this.currentSortParameters.attribute) {
      this.currentSortParameters.attribute = sortAttribute;
      this.currentSortParameters.direction = SortDirection.Ascending;
    } else {
      let previousSortDirection: SortDirection =
        this.currentSortParameters.direction;
      this.currentSortParameters.direction = (previousSortDirection + 1) % 3;
    }
  }

  private sortRows(): void {
    let compareFunction = getCharactersCompareFunction(
      this.currentSortParameters.attribute,
      this.currentSortParameters.direction
    );
    this.tableParameters.data.rows =
      this.tableParameters.data.rows.sort(compareFunction);
  }

  private updateColumnsSortParameters(): void {
    for (let column of this.tableParameters.data.columns) {
      if (column.accessor === this.currentSortParameters.attribute) {
        column.currentSortDirection = this.currentSortParameters.direction;
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
