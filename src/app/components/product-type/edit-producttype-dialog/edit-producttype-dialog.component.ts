import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';
import { ProductTypeInfoService } from '../../../services/product-type-info.service';

const API_URL = environment.API_URL + "/ProductType";


@Component({
  selector: 'app-edit-producttype-dialog',
  templateUrl: './edit-producttype-dialog.component.html',
  styleUrls: ['./edit-producttype-dialog.component.css']
})
export class EditProducttypeDialogComponent implements OnInit {

  productTypeInfo: any = []
  productTVM: any = []
  updateProductTypeControl!: UntypedFormGroup

  constructor(public dialogRef: MatDialogRef<EditProducttypeDialogComponent>,
    public productTypeInfoService: ProductTypeInfoService,
    public http: HttpClient,
    public snackBarService: SnackbarService,
    public fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    //Get product from pass service
    this.productTypeInfo = this.productTypeInfoService.retrieveUserTypeInfo();

    //Clear array from pass service
    this.productTypeInfoService.clearData();

    this.updateProductTypeControl = new UntypedFormGroup({
      productTypeName: new UntypedFormControl(`${this.productTypeInfo[0].name}`, Validators.required)
    });
  }

  onNoClick(): void {
    this.snackBarService.setMessage('You chose not to update the Product Type');
    this.dialogRef.close();
  }

  async confirmUpdateType() {
    try
    {
      let httpCall = this.http.put(`${API_URL}/UpdateProductType?productTypeID=${this.productTypeInfo[0].ID}`, this.updateProductTypeControl.value);
      let result = (await lastValueFrom(httpCall));
      console.log(result);
  }
  catch(error: any)
  {
    if(error.status == 200)
    {
      this.snackBarService.setMessage('The Product Type was successfully updated');
    }
    else{
      console.log(error);
    }
  }
  this.dialogRef.close();
  
}
}
