import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SupplierOrderService } from 'src/app/services/supplier-orders.service';
import { environment } from 'src/environments/environment';
import { PlaceSupplierOrderDialogComponent } from './place-supplier-order-dialog/place-supplier-order-dialog.component';
import { ReceiveSupplierOrderDialogComponent } from './receive-supplier-order-dialog/receive-supplier-order-dialog.component';
import { ViewSupplierOrderDialogComponent } from './view-supplier-order-dialog/view-supplier-order-dialog.component';



export interface SupplierOrder {
  orderID: number;
  orderAmount: number;
  supplierOrderDatePlaced: string;
  supplierOrderDateReceived: string;
  supplierOrderSatus: string;
}

@Component({
  selector: 'app-supplier-orders',
  templateUrl: './supplier-orders.component.html',
  styleUrls: ['./supplier-orders.component.css']
})
export class SupplierOrdersComponent implements AfterViewInit {
  orders: any = [];
  displayedColumns: string[] = ['supplierOrderID', 'orderAmount', 'supplierOrderStatus', 'actions'];
  dataSource = new MatTableDataSource<SupplierOrder>()
  constructor(public http: HttpClient, public dialog: MatDialog, public snackBarService: SnackbarService, public supplierOrderService: SupplierOrderService) { }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  
  actionsClicked: boolean = false;
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  async ngOnInit(){
   await this.getOrders();
    console.log(this.dataSource.data)
    
  }

  onActionsClick() {
    this.actionsClicked = true;
  }

   addOrder() {

    this.dialog.open(PlaceSupplierOrderDialogComponent, {disableClose: true})
    .afterClosed().subscribe(async () => {
      this.snackBarService.openSnackBar(), await this.getOrders();
    });
}

  

 async cancelOrder(order: any){
  let cancelledOrder: any =
  {
    supplierOrderDateReceived: new Date(Date.now()),
    supplierOrderStatusId: 2,
  };
      await this.supplierOrderService.CancelSupplierOrder(cancelledOrder, order.supplierOrderId).then(() =>{},
      (response: HttpErrorResponse) => {
       if(response.status == 200){
         this.snackBarService.setMessage(" Updated successfully")
       }
       else{
         this.snackBarService.setMessage("Failed to update Order")
       }
      }).then(async () => {
        this.snackBarService.openSnackBar(), await this.getOrders();
      })
      
      
      this.snackBarService.setMessage('The order has been cancelled')
      this.snackBarService.openSnackBar();
}



  viewOrder(order: any) {
    this.supplierOrderService.OrderInfo(order)
    this.dialog.open(ViewSupplierOrderDialogComponent, {disableClose: true})
  }

  updateOrder(order: any) {
    this.supplierOrderService.OrderInfo(order)

    this.dialog.open(ReceiveSupplierOrderDialogComponent, {disableClose: true})
    .afterClosed().subscribe(async () => {
      this.snackBarService.openSnackBar(), await this.getOrders();
    });
    }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async getOrders(){  
    await this.supplierOrderService.GetSupplierOrders().then((results) => {
      this.dataSource.data = results as SupplierOrder[];
      this.orders = results;
    },
    (response: HttpErrorResponse) => {
      if (response.status == 500) {
        this.snackBarService.setMessage('error getting orders');
      }
    }
  )
}

}
