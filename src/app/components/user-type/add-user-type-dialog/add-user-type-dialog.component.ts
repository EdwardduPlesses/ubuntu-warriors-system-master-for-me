import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL + "/UserType";

@Component({
  selector: 'app-add-user-type-dialog',
  templateUrl: './add-user-type-dialog.component.html',
  styleUrls: ['./add-user-type-dialog.component.css']
})
export class AddUserTypeDialogComponent implements OnInit {
  addNewType = new UntypedFormGroup({
    userTypeName: new UntypedFormControl(''),
  })

  constructor(public dialogRef: MatDialogRef<AddUserTypeDialogComponent>, public http: HttpClient, public snackBarService: SnackbarService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.snackBarService.setMessage('You chose not to add the user type')
    this.dialogRef.close();
  }
  submit() {

  }

  public confirmAddType(): void {
    this.http.post(`${API_URL}/AddUserType`, this.addNewType.value)
      .subscribe()
    this.snackBarService.setMessage('The user type was successfully added')
    this.dialogRef.close();
  }
}
