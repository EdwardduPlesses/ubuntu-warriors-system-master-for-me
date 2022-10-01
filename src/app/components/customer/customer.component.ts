import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from 'src/app/services/customer.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AddCustomerDialogComponent } from './add-customer-dialog/add-customer-dialog.component';
import { DeleteCustomerDialogComponent } from './delete-customer-dialog/delete-customer-dialog.component';
import { EditCustomerDialogComponent } from './edit-customer-dialog/edit-customer-dialog.component';
import { ViewCustomerDialogComponent } from './view-customer-dialog/view-customer-dialog.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})

export class CustomerComponent implements OnInit {
  customers: any = [];
  customerCompetencies: any = [];
  customerData: any = [];
  displayedColumns: string[] = ['title', 'name', 'surname', 'address', 'competency', 'phoneNo', 'idNumber',
    'email',
    'actions',
  ];

  dataSource = new MatTableDataSource<any>();
  actionsClicked: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, public http: HttpClient, public snackbar: SnackbarService, public service: CustomerService) { }

  ngOnInit() {
    this.refresh()
  }

  ngAfterViewInit() {
    //To make the paginator work, uncomment the code
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addNewCustomer() {
    this.dialog
      .open(AddCustomerDialogComponent, { disableClose: true })
      .afterClosed()
      .subscribe(async () => {
        this.snackbar.openSnackBar(), await this.refresh();
      });
  }

  editCustomer(customer: any) {
    this.service.CustomerData(customer);
    this.dialog
      .open(EditCustomerDialogComponent, { disableClose: true })
      .afterClosed()
      .subscribe(async () => {
        this.snackbar.openSnackBar(), await this.refresh();
      });
  }

  viewCustomer(customer: any) {
    if (this.actionsClicked == false) {
      this.service.CustomerData(customer);
      this.dialog
        .open(ViewCustomerDialogComponent, { disableClose: true })
        .afterClosed();
    }
    this.actionsClicked = false;
  }

  deleteCustomer(customer: any) {
    this.service.CustomerData(customer);
    this.dialog
      .open(DeleteCustomerDialogComponent, { disableClose: true })
      .afterClosed()
      .subscribe(async () => {
        this.snackbar.openSnackBar(), await this.refresh();
      });
  }

  async refresh() {
    //Get Customers
    await this.service.GetCustomers().then(
      (res) => {
        this.dataSource.data = res;
      },
      (response: HttpErrorResponse) => {
        if (response.status == 500) {
          this.snackbar.setMessage('error getting customers');
        }
      }
    );
  }

  onActionsClick() {
    this.actionsClicked = true;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
