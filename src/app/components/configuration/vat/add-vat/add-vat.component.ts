import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { VatService } from 'src/app/services/vat.service';

@Component({
  selector: 'app-add-vat',
  templateUrl: './add-vat.component.html',
  styleUrls: ['./add-vat.component.css']
})
export class AddVatComponent implements OnInit {

  addVatForm!: UntypedFormGroup;

  constructor(public dialogRef: MatDialogRef<AddVatComponent>, public http: HttpClient, private snackBar: MatSnackBar, public vatService: VatService) { }

  async ngOnInit() {
    this.addVatForm = new UntypedFormGroup({
      vatRate: new UntypedFormControl('', [Validators.required,Validators.maxLength(10),]),
  });
}

async confirmAdd(){
  try{
    if(this.addVatForm.valid){
      let vatRate = this.addVatForm.value.vatRate;
      let response = await this.vatService.addVATRate(vatRate);
        this.openSnackBar("VAT Rate Updated Successfully", "Close");
        this.dialogRef.close();
    }
  }
  catch{
    this.openSnackBar("Error Updating VAT Rate", "Close");
  }
}
async onNoClick(){
  this.dialogRef.close();
}

openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {duration: 3000});
}

}
