import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SalesService } from 'src/app/services/sales.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-sale-status',
  templateUrl: './sale-status.component.html',
  styleUrls: ['./sale-status.component.css']
})
export class SaleStatusComponent implements OnInit {

  salesData: any = [];
  salestatus: any = [];

  editSaleStatus!: UntypedFormGroup

  constructor(public dialog: MatDialogRef<SaleStatusComponent>, public http: HttpClient, public service: SalesService, public snackbar: SnackbarService) { }

  async confirmEditSaleStatus() {
    await this.service.UpdateSales(this.salesData[0].saleId, this.editSaleStatus.value).then(() => { },
      (response: HttpErrorResponse) => {
        if (response.status == 200) {
          this.snackbar.setMessage("Sale Status Edited Successfully")
        }
        else {
          this.snackbar.setMessage("Failed to Edit Sale Status")
        }
      })
    this.dialog.close();
  }

  onNoClick() {
    this.snackbar.setMessage('You chose not to update the sale status')
    this.dialog.close()
  }

  async ngOnInit() {
    this.GetSaleStatus();
    this.salesData = this.service.retrieveSaleData();
    this.service.clearData();

    this.editSaleStatus = new UntypedFormGroup({
      saleId: new UntypedFormControl(this.salesData[0].saleId),
      saleStatusId: new UntypedFormControl(`${this.salesData[0].saleStatusId}`)
    })

    this.editSaleStatus.get('saleStatusId')?.setValue(this.salesData[0].saleStatusId)
  }

  async GetSaleStatus() {
    await this.service.GetSaleStatus().then(Response => { this.salestatus = Response });
  }

  // saveSaleStatus() {
  //   this.http.put(`${API_URL}/EditSaleStatus?saleId=${this.salesData[0].saleId}`, this.editSaleStatus.value).subscribe()
  //   this.snackbar.setMessage('The sale status was updated successfully')
  //   this.dialog.close();
  // }
}