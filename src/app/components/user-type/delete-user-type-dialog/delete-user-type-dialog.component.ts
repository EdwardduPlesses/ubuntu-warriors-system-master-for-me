import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';
import { UserTypeInfoService } from '../../../services/user-type-info.service';

const API_URL = environment.API_URL + '/UserType';

@Component({
  selector: 'app-delete-user-type-dialog',
  templateUrl: './delete-user-type-dialog.component.html',
  styleUrls: ['./delete-user-type-dialog.component.css'],
})
export class DeleteUserTypeDialogComponent implements OnInit {
  userTypeInfo: any = [];

  constructor(
    public dialogRef: MatDialogRef<DeleteUserTypeDialogComponent>,
    public userTypeInfoService: UserTypeInfoService,
    public http: HttpClient,
    public snackBarService: SnackbarService
  ) {}

  ngOnInit() {
    this.userTypeInfo = this.userTypeInfoService.retrieveUserTypeInfo();
    this.userTypeInfoService.clearData();
  }

  confirmDeleteType(usertype: any) {
    this.http
      .delete(`${API_URL}/DeleteUserType?userTypeID=${usertype.ID}`)
      .subscribe();
    this.snackBarService.setMessage('The user type was successfully deleted');
    this.dialogRef.close();
  }

  onNoClick() {
    this.snackBarService.setMessage('You chose not to delete the user type');
    this.dialogRef.close();
  }
}
