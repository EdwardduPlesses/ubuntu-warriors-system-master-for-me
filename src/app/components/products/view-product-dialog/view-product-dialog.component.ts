import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-product-dialog',
  templateUrl: './view-product-dialog.component.html',
  styleUrls: ['./view-product-dialog.component.css']
})
export class ViewProductDialogComponent implements OnInit {

  productInfo: any = [];

  constructor(public dialogRef: MatDialogRef<ViewProductDialogComponent>,
    public productService: ProductService) { }

  async ngOnInit() {
    this.productInfo = await this.productService.retrieveproductInfo();
    this.productService.clearData();
  }

  public back(): void {
    this.dialogRef.close();
  }
}
