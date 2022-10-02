import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent implements OnInit {
  addProduct!: UntypedFormGroup;

  productTypes!: any[];
  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>, 
    public http: HttpClient, 
    public snackBarService: SnackbarService,
    public productService: ProductService
    ) { }

  async ngOnInit(){

    this.addProduct = new UntypedFormGroup({
      productName: new UntypedFormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      productPrice: new UntypedFormControl('', [Validators.required, Validators.max(100000),Validators.maxLength(10)]),
      productQuantity: new UntypedFormControl('', [Validators.required, Validators.max(100000),Validators.maxLength(10)]),
      productType: new UntypedFormControl('', [Validators.required]),
    })
    this.getProductTypes();
    console.log('types', this.productTypes);
  }
  async onNoClick() {
    this.snackBarService.setMessage('You chose not to add the product')
    this.dialogRef.close()
  }

  async getProductTypes(){
    let productTypes:any[] = await this.productService.getProductTypes()
    console.log(productTypes)
    this.productTypes = productTypes;
  }

    async confirmAdd() {
      if(this.addProduct.valid){
        this.addProduct.controls['productType'].setValue(this.productTypes.find(x => x.productTypeName === this.addProduct.controls['productType'].value).productTypeId)

        let productStatusId; //1 means available, 2 means not available, 3 means low stock
        if(this.addProduct.controls['productQuantity'].value  < 1){
          productStatusId = 2;
        }
        else if(this.addProduct.controls['productQuantity'].value > 0 && this.addProduct.controls['productQuantity'].value < 10){
          productStatusId = 3;
        }
        else{
          productStatusId = 1;
        }
        let addProduct = {
          productName: this.addProduct.controls['productName'].value,
          productPrice: this.addProduct.controls['productPrice'].value,
          productQuantity: this.addProduct.controls['productQuantity'].value,
          productTypeId: this.addProduct.controls['productType'].value,
          ProductStatusId: productStatusId
        }
        console.log(this.addProduct.value);

       this.postProduct(addProduct);
       this.dialogRef.close();
      }
    }

    async postProduct(addProduct: any){
      try{
        let httpCall = this.http.post(`${API_URL}/Product/AddProduct`, addProduct);
        let result = (await lastValueFrom(httpCall));
        console.log(result);
       this.snackBarService.setMessage('The product was successfully added')
      }
      catch(error: any){
        console.log(error);
        if(error.status != 200){
          this.snackBarService.setMessage('There was an error adding the product')
        }
      }
    }
}
