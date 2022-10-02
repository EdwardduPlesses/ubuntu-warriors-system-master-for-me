import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.API_URL;

@Component({
  selector: 'app-add-writeoff-product',
  templateUrl: './add-writeoff-product.component.html',
  styleUrls: ['./add-writeoff-product.component.css']
})
export class AddWriteoffProductComponent implements OnInit {

  addWriteoff!: UntypedFormGroup;
  productItem: any = []


  constructor(public dialogRef: MatDialogRef<AddWriteoffProductComponent>, public snackBarService: SnackbarService, public http: HttpClient) { }

  ngOnInit() {
    this.getProductItems()

    this.addWriteoff = new UntypedFormGroup({
      writeOffDate: new UntypedFormControl('', [Validators.required]),
      writeOffDesc: new UntypedFormControl('', [Validators.required]),
      productID: new UntypedFormControl('', [Validators.required])
    })
}
submit() {
  // empty stuff
  }

onNoClick(): void {
  this.snackBarService.setMessage('You chose not to add Product to Write Off')
  this.dialogRef.close()
}

public confirmAdd(): void {
  if(this.addWriteoff.valid){
    this.http.post(`${API_URL}/WriteOff/AddWriteOffProduct`, this.addWriteoff.value)
    .subscribe()
    this.snackBarService.setMessage('Product was succesfully adde to Write Off')
    this.dialogRef.close();
  }
}

getProductItems(){
  this.http.get(`${API_URL}/Product/GetProducts`)
    .subscribe((results) => {
      this.productItem = results
    })
}
}
