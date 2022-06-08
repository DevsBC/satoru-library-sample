import { AfterViewInit, ChangeDetectorRef, Component, Inject, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ActionMenuItem, Column } from '../../interfaces/table-settings.interface';
import { Table } from '../../models/Table.class';
import { ActionService } from '../../services/action.service';

@Component({
  selector: 'sat-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit, OnChanges {

/** Mat Paginator Reference */
@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
/** Mat Sort Reference */
@ViewChild(MatSort, { static: true }) sort!: MatSort;

/** Table Object Received From Parent */
@Input() table!: Table;
/** Table data source */
dataSource!: MatTableDataSource<any>;
/** Array of data */
array: any[] = [];
/** Columns */
columns: Column[] = [];
/** Page size for mat paginator */
pageSize = '10';
/** Current data length (to update mat paginator onChanges) */
dataLength = 0;
/** Display property to render in UI */
displayedProperties: string[] = [];
/** Environment production */
production = this.env.production;

constructor(@Inject('environment') private env: any,
            private cdRef: ChangeDetectorRef, private action: ActionService,
            private router: Router) { }

/** To update table on data change */
ngOnChanges(changes: SimpleChanges): void {
  this.array = changes['table'].currentValue.array;
  this.initData();
}


/** To render table without bugs (data is async!!) */
ngAfterViewInit(): void {
  this.initData();
}

/** Build a table */
initData(): void {
  if (this.table) {
    this.array = this.table.array;
    this.columns = this.table.columns.filter(c => !c.hidden);
    this.pageSize = this.table.pageSize;
    this.displayedProperties = this.columns.map(c => c.property);
    this.updateDataSource();
  }
}

/** To set data to Mat Table */
updateDataSource(): void {
  setTimeout(() => {
    this.dataSource = new MatTableDataSource(this.array);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataLength = this.array.length;
    this.dataSource.sortingDataAccessor = (obj: any, property: string) => property.split('.').reduce((o, prop) => o[prop], obj);
    this.cdRef.detectChanges();
  });
}

/** To render changes without re render all items */
trackBy(index: number, item: any): string {
  return item.id ? item.id : '';
}

/** Access by row value based on it's column */
getRowValue(row: any, column: Column): string {
  let response: any;
  const property = column.displayedProperty || column.property;

  if (column.element === 'toggle') {
    return row[property] ? 'YES' : 'NO'
  }
  if (property.includes('.')) {
    response = this.getter(row, property);
  } else {
    response = row[property];
  }
  if (column.type === 'date') {
    if (!response) { return ''; }
    response = this.getDateFormatted(response);
  }
  return response;
}

/** Nested access for object property */
getter(obj: any, property: string): string {
  if (!property) { return obj; }
  if (property.includes('.')) {
    const properties = property.split('.');
    const lastProp: any = properties[properties.length - 1];
    // Value is an object with this properties, return only last prop for sort nested
    const value = this.getter(obj[properties.shift()!], properties.join('.'));
    if (value?.[lastProp]) {
      return value[lastProp];
    } else {
      return value || '';
    }
  } else {
    return obj ? obj[property] : '';
  }
}

/** To filter data source on search input (change event) */
applyFilter(event: any): void {
  let filterValue = event.target.value;
  filterValue = filterValue.trim();
  filterValue = filterValue.toLowerCase();
  if (this.dataSource) { this.dataSource.filter = filterValue; }
}

/** Transform a date into a readable date  */
private getDateFormatted(response: any): string {
  let date: any;
  const toStringDate = (date: any) => date.toLocaleString('es-ES', { timeZone: 'America/Denver' });
  if (typeof response === 'object') {
    date = { ...response };
    if (date.seconds) {
      try {
        date = response.toDate(); // Firestore Timestamp UTC to Native Date
      } catch (error) {
        try {
          date = new Date(response.seconds * 1000); // Object is a Plain Object
        } catch (error) {
          date = response; // Property it's an Native Date
        }
      }
    } else {
      date = response; // Property it's an Native Date, i think
    }
  } else {
    date = new Date(response); // Property it's a UNIX/STRING date
  }
  return toStringDate(date);
}

/**
 * Propagate an action based on the option selected in Action Menu
 * @param data A payload data to propagate
 * @param item Item selected in action menu
*/
runFunction(data: any, item: ActionMenuItem): void {
  const property = item.property ? data[item.property] : data.id;
  const functionName = item.functionName;
  if (functionName.includes('/')) {
    const route = functionName + property;
    if (functionName.includes('http')) {
      window.open(route, '_blank');
    } else {
      this.router.navigate([functionName, property], { state: data });
    }
  } else {
    this.action.setPayload({ data, functionName, collectionName: item.collectionName });
  }
}

}
