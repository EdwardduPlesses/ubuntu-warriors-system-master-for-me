import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL + "/ProductType";

@Component({
  selector: 'app-add-producttype-dialog',
  templateUrl: './add-producttype-dialog.component.html',
  styleUrls: ['./add-producttype-dialog.component.css'],
})
export class AddProducttypeDialogComponent implements OnInit {

  addProductTypeControl = new UntypedFormGroup({
    ProductTypeName: new UntypedFormControl('', [Validators.required, Validators.minLength(2)] )
  });

  constructor(
    public dialogRef: MatDialogRef<AddProducttypeDialogComponent>,
    public http: HttpClient,
    public snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.snackBarService.setMessage('You chose not to add the Product Type');
    this.dialogRef.close();
  }

  async confirmAddType(){
    try
    {
      let httpCall = this.http.post(`${API_URL}/AddProductType`, this.addProductTypeControl.value);
      let result = (await lastValueFrom(httpCall));
      console.log(result);
    }
    catch(error: any)
    {
      if(error.status == 200){
        this.snackBarService.setMessage('The Product Type was successfully added')
      }
      else
      {
        console.log(error);
      }
    }
    this.dialogRef.close();
  }
}
