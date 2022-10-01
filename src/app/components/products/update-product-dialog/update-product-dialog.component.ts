import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

@Component({
  selector: 'app-update-product-dialog',
  templateUrl: './update-product-dialog.component.html',
  styleUrls: ['./update-product-dialog.component.css']
})
export class UpdateProductDialogComponent implements OnInit {
  productInfo: any = [];
  productVM: any = []
  updateProduct!: FormGroup;
  productTypes!: any[];


  constructor(
    public dialogRef: MatDialogRef<UpdateProductDialogComponent>,
    public http: HttpClient,
    public snackBarService: SnackbarService,
    public fb: FormBuilder,
    public productService: ProductService) { }

  async ngOnInit() {
    this.productInfo = await this.productService.retrieveproductInfo();

    await this.getProductTypes();
    this.productInfo[0].productTypeName = this.productTypes.find(x => x.productTypeId === this.productInfo[0].productTypeId).productTypeName;

    this.updateProduct = new FormGroup({
      productName: new FormControl(this.productInfo[0].productName, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      productQuantity: new FormControl(this.productInfo[0].productQuantity, [Validators.required, Validators.max(100000), Validators.maxLength(10)]),
      productPrice: new FormControl(this.productInfo[0].productPrice, [Validators.required, Validators.max(100000), Validators.maxLength(10)]),
      productType: new FormControl(this.productInfo[0].productTypeName, [Validators.required]),
    });
    this.productService.clearData();

  }
  onNoClick(): void {
    this.snackBarService.setMessage('You chose not to update the product')
    this.dialogRef.close()
  }

  async getProductTypes() {
    let productTypes: any[] = await this.productService.getProductTypes()
    this.productTypes = productTypes;
  }

  public async confirmUpdate() {
    if (this.updateProduct.valid) {
      this.updateProduct.controls['productType'].setValue(this.productTypes.find(x => x.productTypeName === this.updateProduct.controls['productType'].value).productTypeId)

      let productStatusId; //1 means available, 2 means not available, 3 means low stock
      if (this.updateProduct.controls['productQuantity'].value < 1) {
        productStatusId = 2;
      }
      else if (this.updateProduct.controls['productQuantity'].value > 0 && this.updateProduct.controls['productQuantity'].value < 10) {
        productStatusId = 3;
      }
      else {
        productStatusId = 1;
      }
      let updateProduct = {
        productName: this.updateProduct.controls['productName'].value,
        productPrice: this.updateProduct.controls['productPrice'].value,
        productQuantity: this.updateProduct.controls['productQuantity'].value,
        productTypeId: this.updateProduct.controls['productType'].value,
        productStatusId: productStatusId,
      }

      try {
        this.http.put(`${API_URL}/Product/UpdateProduct?productID=${this.productInfo[0].productId}`, updateProduct)
          .subscribe()
        this.snackBarService.setMessage('The product was successfully updated')
        this.dialogRef.close();
      }
      catch (error) {
      }
    }
  }
}
