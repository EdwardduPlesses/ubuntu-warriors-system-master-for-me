import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  async CompileProductDashboard() {
    try {
			let httpCall = this.http.get<any>(API_URL + `/Dashboard/GetProductDashboard`);
			let results = (await lastValueFrom(httpCall));

			return results;
		} catch (error) {
      return console.log(error);
		}
  }

  async CompileSaleDashboard(){
    try {
      let httpCall = this.http.get<any>(API_URL + `/Dashboard/GetSaleDashboard`);
      let results = (await lastValueFrom(httpCall));

      return results;
    } catch (error) {
      return console.log(error);
    }
  }

  async ComplileCustomerDashboard(){
    try {
      let httpCall = this.http.get<any>(API_URL + `/Dashboard/GetCustomerDashboard`);
      let results = (await lastValueFrom(httpCall));

      return results;
    } catch (error) {
      return console.log(error);
    }
  }

  async ComplileRepairDashboard(){
    try {
      let httpCall = this.http.get<any>(API_URL + `/Dashboard/GetRepairDashboard`);
      let results = (await lastValueFrom(httpCall));

      return results;
    } catch (error) {
      return console.log(error);
    }
  }

  async CompileProductPieChart(){
    try {
      let httpCall = this.http.get<any>(API_URL + `/Dashboard/GetProductPieChart`);
      let results = (await lastValueFrom(httpCall));

      return results;
    } catch (error) {
      return console.log(error);
    }
  }
}
