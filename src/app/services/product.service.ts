import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productInfo: any = [];
  products: any;
  constructor(private http: HttpClient) { }

  async getProducts() {
    try {
      let httpCall = this.http.get<any>(API_URL + `/Product/GetProducts`);
      let results = (await lastValueFrom(httpCall));

      this.products = results;
      return this.products;
    } catch (error) {
      return console.log(error);
    }
  }

  async updateProduct(product: any) {
    try {
      let httpCall = this.http.put<any>(API_URL + `/Product/UpdateProduct`, product.productId);
      let results = (await lastValueFrom(httpCall));

      return results;
    }
    catch (error) {
      return console.log(error);
    }

  }

  async CompileProductDashboard() {
    try {
      let httpCall = this.http.get<any>(API_URL + `/Dashboard/GetProductDashboard`);
      let results = (await lastValueFrom(httpCall));

      return results;
    } catch (error) {
      return console.log(error);
    }
  }

  async ProductInfo(product: any) {
    return await this.productInfo.push({
        productId: product.productId,
        productName: product.productName,
        productPrice: product.productPrice,
        productQuantity: product.productQuantity,
        productTypeId: product.productTypeId,
        productStatusId: product.productStatusId,
    })

  }

  async getProductTypes(){
    try {
      let httpCall = this.http.get<any>(API_URL + `/ProductType/GetAllProductTypes`);
      let results = (await lastValueFrom(httpCall));

      return results;
    } catch (error) {
      return console.log(error);
    }
  }

  async retrieveproductInfo(){
    let retrievedproducInfo = this.productInfo;
    return retrievedproducInfo
  }

  clearData() {
    this.productInfo = [];
  }
}