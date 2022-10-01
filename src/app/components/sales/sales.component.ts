import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Sale } from '../../interface/sales-interface';
import { SalesService } from '../../services/sales.service';
import { ViewSaleComponent } from './view-sale/view-sale.component';
import { CaptureSaleComponent } from './capture-sale/capture-sale.component';
import { SaleStatusComponent } from './sale-status/sale-status.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})

export class SalesComponent implements OnInit {

  displayedColumns: string[] = ['SaleDate', 'CustomerId', 'SaleStatusId', 'SaleAmount', 'Actions'];

  dataSource = new MatTableDataSource<Sale>()

  actionsClicked: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, public http: HttpClient, public service: SalesService, public snackbar: SnackbarService) { }

  async ngOnInit() {
    await this.refresh();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  captureSale() {
    this.dialog.open(CaptureSaleComponent, { disableClose: true })
      .afterClosed().subscribe(async () => {
        this.snackbar.openSnackBar(),
          await this.refresh()
      });
  }

  editSaleStatus(sales: any) {
    this.service.SalesData(sales)
    this.dialog.open(SaleStatusComponent, { disableClose: true })
      .afterClosed().subscribe(async () => {
        this.snackbar.openSnackBar(),
          await this.refresh()
      });
  }

  viewSaleStatus(sales: any) {
    if (this.actionsClicked == false) {
    this.service.SalesData(sales)
    this.dialog.open(ViewSaleComponent, { disableClose: true })
      .afterClosed().subscribe(async () => { await this.refresh() });}
      this.actionsClicked = false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Get Sales
  async refresh() {
    await this.service.GetSales().then(
      (res) => { this.dataSource.data = res; },
      (response: HttpErrorResponse) => {
        if (response.status == 500) {
          this.snackbar.setMessage('Error getting sales');
        }
      });
  }

  onActionsClick() {
    this.actionsClicked = true;
  }
}