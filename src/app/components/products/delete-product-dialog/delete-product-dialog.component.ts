import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

@Component({
  selector: 'app-delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html',
  styleUrls: ['./delete-product-dialog.component.css']
})

export class DeleteProductDialogComponent implements OnInit {

  productInfo: any = [];

  constructor(public dialogRef: MatDialogRef<DeleteProductDialogComponent>, public http: HttpClient, public productService: ProductService, public snackBarService: SnackbarService) { }

  async ngOnInit() {
    this.productInfo = await this.productService.retrieveproductInfo();
    this.productService.clearData();
  }

  submit() { }
  
  async confirmDelete(product: any){
    try{
      let httpCall = this.http.delete(`${API_URL}/Product/DeleteProduct?productID=${product.productId.toString()}`);
      let result = (await lastValueFrom(httpCall));
      console.log(result);
      this.snackBarService.setMessage('The product was successfully deleted')
      this.dialogRef.close();
    }
    catch(error){
      console.log(error);
      this.snackBarService.setMessage('There was an error deleting the product')
    }
  }
  
  async onNoClick(){
    this.snackBarService.setMessage('You chose not to delete the product')
    this.dialogRef.close()
  }
}