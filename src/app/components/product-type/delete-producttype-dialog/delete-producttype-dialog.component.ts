import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';
import { ProductTypeInfoService } from '../../../services/product-type-info.service';

const API_URL = environment.API_URL + '/ProductType';

@Component({
  selector: 'app-delete-producttype-dialog',
  templateUrl: './delete-producttype-dialog.component.html',
  styleUrls: ['./delete-producttype-dialog.component.css'],
})
export class DeleteProducttypeDialogComponent implements OnInit {
  productTypeInfo: any = [];

  constructor(
    public dialogRef: MatDialogRef<DeleteProducttypeDialogComponent>,
    public productTypeInfoService: ProductTypeInfoService,
    public http: HttpClient,
    public snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    //Get product from pass service
    this.productTypeInfo = this.productTypeInfoService.retrieveUserTypeInfo();

    //Clear array from pass service
    this.productTypeInfoService.clearData();
  }

  onNoClick() {
    this.snackBarService.setMessage('You chose not to delete the Product Type');
    this.dialogRef.close();
  }

  async confirmDeleteType(productType: any) {
    try
    {
      let httpCall = this.http.delete(`${API_URL}/DeleteProductType?productTypeID=${productType.ID.toString()}`);
      let result = (await lastValueFrom(httpCall));
      console.log(result);
  }
  catch(error: any)
  {
    if(error.status == 200)
    {
      this.snackBarService.setMessage('The product type was successfully deleted');
    }
    else{
      console.log(error);
    }
  }
  this.dialogRef.close();
  }
}
