import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SupplierOrderService } from 'src/app/services/supplier-orders.service';

@Component({
  selector: 'app-view-supplier-order-dialog',
  templateUrl: './view-supplier-order-dialog.component.html',
  styleUrls: ['./view-supplier-order-dialog.component.css']
})
export class ViewSupplierOrderDialogComponent implements OnInit {
  viewOrder!: UntypedFormGroup;
  orderInfo: any = []
  orderPlines: any =[]
  orderIlines: any =[]
  name: any
  id: any

  constructor(public dialogRef: MatDialogRef<ViewSupplierOrderDialogComponent>, public http: HttpClient , public supplierOrderService: SupplierOrderService) { }

  async ngOnInit(){
    
   this.orderInfo = await this.supplierOrderService.retrieveOrderInfo();
      this.supplierOrderService.clearData();
      console.log(this.orderInfo);
       this.getOrderPLines()
       this.getOrderILines()     


    this.viewOrder = new UntypedFormGroup({
      orderId: new UntypedFormControl(`${this.orderInfo[0].id}`, [Validators.required]),
      supplierName: new UntypedFormControl(`${this.orderInfo[0].supplier.supplierName}`, [Validators.required]),
      orderAmount: new UntypedFormControl(`${this.orderInfo[0].amount}`, [Validators.required]),
      supplierOrderDateReceived: new UntypedFormControl(`${this.orderInfo[0].supplierOrderDateReceived}`, [Validators.required]),
      supplierOrderDatePlaced: new UntypedFormControl(`${this.orderInfo[0].supplierOrderDatePlaced}`, [Validators.required]),
      supplierOrderStatus: new UntypedFormControl(`${this.orderInfo[0].supplierOrderStatus.supplierOrderStatusName}`, [Validators.required])
    })
  }
  


  onNoClick(): void {
    this.dialogRef.close()
  }

  async getOrderPLines(){
    
    await this.supplierOrderService.GetProductOrderLine(this.orderInfo[0].id).then((res) =>{this.orderPlines = res},

  )}

  async getOrderILines(){
   
    await this.supplierOrderService.GetInventoryOrderLine(this.orderInfo[0].id).then((res) =>{this.orderIlines = res},
  )}

}
