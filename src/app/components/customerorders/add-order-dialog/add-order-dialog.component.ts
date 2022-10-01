import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OrderInfoService } from '../../../services/order-info.service';
import { CustomerOrderService } from 'src/app/services/customerOrder.service';

@Component({
  selector: 'app-add-order-dialog',
  templateUrl: './add-order-dialog.component.html',
  styleUrls: ['./add-order-dialog.component.css']
})
export class AddOrderDialogComponent implements OnInit {
  addOrder!: FormGroup;
  addOrderLine!: FormGroup;
  customers: any = [];
  products: any = [];
  orderLines: any = [];
  orders: any = [];
  orderAmount: number = 0;

  constructor(
    public dialogRef: MatDialogRef<AddOrderDialogComponent>, 
    public snackBarService: SnackbarService, 
    public http: HttpClient, 
    public orderInfoService: OrderInfoService,
    public customerOrderService: CustomerOrderService
    ) { }

  ngOnInit() {
    let yourDate = new Date()
    let formatDate = yourDate.toISOString().split('T')[0]

    this.GetCustomers()
    this.GetProducts();
    this.getLastOrder()

    this.addOrder = new FormGroup({
      customerId: new FormControl('', [Validators.required]),
      customerOrderStatusId: new FormControl(1, [Validators.required]),
      orderAmount: new FormControl('', [Validators.required]),
      orderDatePlaced: new FormControl('', [Validators.required]),
    })

    this.addOrderLine = new FormGroup({
      customerOrderId: new FormControl('', [Validators.required]),
      productId: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    })

    this.addOrder.controls['orderDatePlaced'].setValue(formatDate)
  }

    saveOrderLine(){
      this.products.forEach((product: any) => {
        if(this.addOrderLine.controls['productId'].value == product.productId) 
        {
          if(this.addOrderLine.controls['quantity'].value <= product.productQuantity)
          {
            this.orderAmount += product.productPrice * this.addOrderLine.controls['quantity'].value
            this.addOrder.controls['orderAmount'].setValue(this.orderAmount)
            this.orderLines.push(this.addOrderLine.value)
          }
          else
          {
            this.snackBarService.setMessage('The quantity selected is greater than the stock on hand')
            this.snackBarService.openSnackBar()
          }
        }
      })
  }

  onNoClick(): void {
    this.snackBarService.setMessage('You chose not to add an order')
    this.dialogRef.close()
  }

  async confirmAdd(){
    if(this.addOrder.valid){
      await this.customerOrderService.confirmAdd(this.addOrder.value).then(async () =>{},
  async (response: HttpErrorResponse) => {
    if(response.status == 200){
      this.snackBarService.setMessage("Order has been completed")
      await this.confirmOrderLine();
    }
    else{
      this.snackBarService.setMessage("Failed to complete order")
    }
  })
  }
  this.dialogRef.close();
  }

  async confirmOrderLine(){
    if(this.addOrderLine.valid){
      this.orderLines.forEach(async (orderline: any) => {
        await this.customerOrderService.confirmOrderLine(orderline).then(() =>{},
    (response: HttpErrorResponse) => {
      if(response.status == 200){
        this.snackBarService.setMessage("Orderline added")
      }
      else{
        this.snackBarService.setMessage("Failed to add Orderline")
      }
    })
    })
    }
  }
  async getLastOrder(){
    await this.customerOrderService.getLastOrder().then(
      (res) => {
        this.orders = res;
        let lastOrder = this.orders.slice(-1)
   if (lastOrder != null)
   {
    this.addOrderLine.controls['customerOrderId'].setValue(lastOrder[0].customerOrderId + 1)
   }
   else
   {
   this.addOrderLine.controls['customerOrderId'].setValue(0)
   }
      },
      (response: HttpErrorResponse) => {
        if (response.status == 500) {
          this.snackBarService.setMessage('error getting orders');
        }
      }
    );
    }

  async GetCustomers(){
    await this.customerOrderService.GetCustomers().then(
      (res) => {
        this.customers = res;
      },
      (response: HttpErrorResponse) => {
        if (response.status == 500) {
          this.snackBarService.setMessage('error getting orders');
        }
      }
    );
  }
async GetProducts(){
  await this.customerOrderService.GetProducts().then(
    (res) => {
      this.products = res;
    },
    (response: HttpErrorResponse) => {
      if (response.status == 500) {
        this.snackBarService.setMessage('error getting orders');
      }
    }
  );
}


}
