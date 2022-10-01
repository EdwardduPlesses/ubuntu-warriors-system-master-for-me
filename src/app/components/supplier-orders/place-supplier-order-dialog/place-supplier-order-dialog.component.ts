import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SupplierOrderService } from 'src/app/services/supplier-orders.service';



@Component({
  selector: 'app-place-supplier-order-dialog',
  templateUrl: './place-supplier-order-dialog.component.html',
  styleUrls: ['./place-supplier-order-dialog.component.css']
})
export class PlaceSupplierOrderDialogComponent implements OnInit {
  addOrder!: FormGroup;
  addOrderPLine!: FormGroup;
  addOrderILine!: FormGroup;
  suppliers: any = [];
  products: any = [];
  inventories: any = [];
  orderPLines: any = [];
  orderILines: any = [];
  orders: any = [];
  orderAmount: number = 0;

  constructor(public dialogRef: MatDialogRef<PlaceSupplierOrderDialogComponent>, public snackBarService: SnackbarService, public http: HttpClient, public supplierOrderService: SupplierOrderService) { }

  ngOnInit() {

    let yourDate = new Date()
    let formatDate = yourDate.toISOString().split('T')[0]

    this.GetSuppliers()
    this.GetProducts();
    this.GetInventory();
    this.getLastOrder()
    console.log(this.suppliers);
    // console.log(this.suppliers);
    // console.log(this.suppliers);
    // console.log(this.suppliers);
    // console.log(this.suppliers);

    this.addOrder = new FormGroup({
      supplierId: new FormControl('', [Validators.required]),
      supplierOrderStatusId: new FormControl(1, [Validators.required]),
      orderAmount: new FormControl('', [Validators.required]),
      supplierOrderDatePlaced: new FormControl('', [Validators.required]),
      
    })

    //---------Product Order Line--------------//

    this.addOrderPLine = new FormGroup({
      supplierOrderId: new FormControl('', [Validators.required]),
      productId: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    })

    //---------Inventory Order Line--------------//

    this.addOrderILine = new FormGroup({
      supplierOrderId: new FormControl('', [Validators.required]),
      inventoryId: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    })

    this.addOrder.controls['supplierOrderDatePlaced'].setValue(formatDate)

  }

  submit() {
    // empty stuff
    }

    //----------Saving Products-------------//

    saveOrderPLine(){
      this.products.forEach((product: any) => {
        if(this.addOrderPLine.controls['productId'].value == product.productId) 
        {
          if(this.addOrderPLine.controls['quantity'].value <= product.productQuantity)
          {
            this.orderAmount += product.productPrice * this.addOrderPLine.controls['quantity'].value
            this.addOrder.controls['orderAmount'].setValue(this.orderAmount)
            this.orderPLines.push(this.addOrderPLine.value)
          }
          else
          {
            this.snackBarService.setMessage('The quantity selected is greater than the stock on hand')
            this.snackBarService.openSnackBar()
          }
        }
      })
  }

  //----------Saving Inventory Items-------------//

  saveOrderILine(){
    this.inventories.forEach((inventory: any) => {
      if(this.addOrderILine.controls['inventoryId'].value == inventory.inventoryId) 
      {
        if(this.addOrderILine.controls['quantity'].value <= inventory.inventoryQuantity)
        {
          this.orderAmount += inventory.inventoryPrice * this.addOrderILine.controls['quantity'].value
          this.addOrder.controls['orderAmount'].setValue(this.orderAmount)
          this.orderILines.push(this.addOrderILine.value)
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


   async confirmAdd(): Promise<void> {
    if(this.addOrder.valid){
      
      await this.supplierOrderService.PostSupplierOrders(this.addOrder.value).then(async () =>{},
      async (response: HttpErrorResponse) => {
       if(response.status == 200){
         this.snackBarService.setMessage(" Updated successfully")
         await this.confirmOrderPLine();
         await this.confirmOrderILine();
       }
       else{
         this.snackBarService.setMessage("Failed to update Order")
       }
      })
      
      this.snackBarService.setMessage('The order was successfully placed')
      this.dialogRef.close();
    }
    console.log(this.addOrder.value)
  }

//--------------Confirm PRODUCT order line--------------//

  async confirmOrderPLine() {
    if(this.addOrderPLine.valid){
      this.orderPLines.forEach(async (orderline: any) => {
       
      await this.supplierOrderService.PostProductOrderLine(orderline).then(() =>{},
      (response: HttpErrorResponse) => {
       if(response.status == 200){
         this.snackBarService.setMessage(" Updated successfully")
       }
       else{
         this.snackBarService.setMessage("Failed to update Order")
       }
      })

    })

      this.snackBarService.setMessage('The product was added')
      this.dialogRef.close();
    }
  }

  //--------------Confirm INVENTORY order line--------------//

  async confirmOrderILine() {
    if(this.addOrderILine.valid){
      this.orderILines.forEach(async (orderline: any) => {
      
      await this.supplierOrderService.PostInventoryOrderLine(orderline).then(() =>{},
      (response: HttpErrorResponse) => {
       if(response.status == 200){
         this.snackBarService.setMessage(" Updated successfully")
       }
       else{
         this.snackBarService.setMessage("Failed to update Order")
       }
      })
    })
      this.snackBarService.setMessage('The inventory item was successfully added')
      this.dialogRef.close();
    }
  }


  async getLastOrder(){
    await this.supplierOrderService.GetSupplierOrders().then(
      results => {
       this.orders = results;
   let lastOrder = this.orders.slice(-1)
   if (lastOrder != null)
   {
    this.addOrderPLine.controls['supplierOrderId'].setValue(lastOrder[0].supplierOrderId + 1)
    this.addOrderILine.controls['supplierOrderId'].setValue(lastOrder[0].supplierOrderId + 1)
   }
   else
   {
   this.addOrderPLine.controls['supplierOrderId'].setValue(0)
   this.addOrderILine.controls['supplierOrderId'].setValue(0)
   }
   })
  }

  async GetProducts(){
  
  await this.supplierOrderService.GetProducts().then(results => {
    this.products = results;
  })

}

  async GetSuppliers(){
  
  await this.supplierOrderService.GetSuppliers().then(results => {
    this.suppliers = results;
    
  })

}



  async GetInventory(){
  
  await this.supplierOrderService.GetInventory().then(results => {
    this.inventories = results;
  })

}

}
