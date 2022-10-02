import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';


const API_URL = environment.API_URL;
@Component({
  selector: 'app-add-vat-dialog',
  templateUrl: './add-vat-dialog.component.html',
  styleUrls: ['./add-vat-dialog.component.css']
})
export class AddVatDialogComponent implements OnInit {
  addVatRateControl = new UntypedFormGroup({
    rate: new UntypedFormControl('', [Validators.required, Validators.minLength(1), Validators.pattern(/\d{1,2}/)] )
  });

  constructor(
    public dialogRef: MatDialogRef<AddVatDialogComponent>,
    public http: HttpClient,
    public snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.snackBarService.setMessage('You chose not to add a VAT Rate');
    this.dialogRef.close();
  }

  onClick(): void {
    this.dialogRef.close();
  }

  confirmAddVATRate(){
    this.http.post(`${API_URL}/Static/AddVATRate`, this.addVatRateControl.value)
    .subscribe(() => {})

    this.snackBarService.setMessage('The VAT Rate was successfully added')
    this.dialogRef.close();
  }
}
