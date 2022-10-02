import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service';
import { SalesService } from 'src/app/services/sales.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-capture-sale',
  templateUrl: './capture-sale.component.html',
  styleUrls: ['./capture-sale.component.css']
})
export class CaptureSaleComponent implements OnInit {

  customers: any = [];
  sales: any = [];
  salestatus: any = [];
  products: any = [];
  orderLines: any = [];
  orders: any = [];
  saleAmount: number = 0;

  addOrderLine!: UntypedFormGroup;
  captureSale!: UntypedFormGroup;

  constructor(public dialog: MatDialogRef<CaptureSaleComponent>, public http: HttpClient, public snackbar: SnackbarService, public saleService: SalesService, public customerService: CustomerService) { }

  async ngOnInit() {

    this.getCustomers();
    this.GetSaleStatus();
    this.getLastSale();
    this.refresh();
    this.GetProducts();

    let yourDate = new Date()
    let formatDate = yourDate.toISOString().split('T')[0]

    this.captureSale = new UntypedFormGroup({
      customerId: new UntypedFormControl('', [Validators.required]),
      saleStatusId: new UntypedFormControl('', [Validators.required]),
      saleAmount: new UntypedFormControl('', [Validators.required]),
      saleDate: new UntypedFormControl('', [Validators.required]),
    })

    this.captureSale.controls['saleDate'].setValue(formatDate)



    this.addOrderLine = new UntypedFormGroup({
      saleId: new UntypedFormControl('', [Validators.required]),
      productId: new UntypedFormControl('', [Validators.required]),
      quantity: new UntypedFormControl('', [Validators.required, Validators.min(1)]),
    })
  }

  onNoClick() {
    this.snackbar.setMessage("You chose not to capture a new sale.")
    this.dialog.close()
  }

  async confirmCaptureSale() {
    await this.saleService.PostSales(this.captureSale.value).then(() => { },
      async (response: HttpErrorResponse) => {
        if (response.status == 200) {
          this.snackbar.setMessage("Sale Captured Successfully");
          await this.confirmOrderLine()
        }
        else {
          this.snackbar.setMessage("Failed to Capture Sale")
        }
      })
    this.dialog.close();
  }

  async getCustomers() {
    await this.customerService.GetCustomers().then(Response => { this.customers = Response });
  }

  async GetSaleStatus() {
    await this.saleService.GetSaleStatus().then(Response => { this.salestatus = Response, this.salestatus.pop() });
  }

  async GetProducts() {
    await this.saleService.GetProducts().then(
      (res) => {
        this.products = res;
      },
      (response: HttpErrorResponse) => {
        if (response.status == 500) {
          this.snackbar.setMessage('error getting orders');
        }
      }
    );
  }

  async getLastSale() {
    await this.saleService.getLastSale().then((res) => {
      this.sales = res;
      let lastOrder = this.sales.slice(-1)
      if (lastOrder != null)
      {
       this.addOrderLine.controls['saleId'].setValue(lastOrder[0].saleId + 1)
      }
      else
      {
      this.addOrderLine.controls['saleId'].setValue(0)
      }
    },
      (response: HttpErrorResponse) => {
        if (response.status == 500) {
          this.snackbar.setMessage('error getting orders');
        }
      }
    );
  }

  async confirmOrderLine() {
    if (this.addOrderLine.valid) {
      this.orderLines.forEach(async (orderline: any) => {
        await this.saleService.confirmOrderLine(orderline).then(() => { },
          (response: HttpErrorResponse) => {
            if (response.status == 200) {
              this.snackbar.setMessage("Orderline added")
            }
            else {
              this.snackbar.setMessage("Failed to add Orderline")
            }
          })
      })
    }
  }

  saveOrderLine() {
    this.products.forEach((product: any) => {
      if (this.addOrderLine.controls['productId'].value == product.productId) {
        if (this.addOrderLine.controls['quantity'].value <= product.productQuantity) {
          this.saleAmount += product.productPrice * this.addOrderLine.controls['quantity'].value
          this.captureSale.controls['saleAmount'].setValue(this.saleAmount)
          this.orderLines.push(this.addOrderLine.value)
        }
        else {
          this.snackbar.setMessage('The quantity selected is greater than the stock on hand')
          this.snackbar.openSnackBar()
        }
      }
    })
  }

  async refresh() {
    await this.saleService.GetSales().then(
      (res) => { this.sales = res; },
      (response: HttpErrorResponse) => {
        if (response.status == 500) {
          this.snackbar.setMessage('Error getting sales');
        }
      });
  }
}