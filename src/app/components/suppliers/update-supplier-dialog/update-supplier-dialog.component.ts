import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SupplierService } from '../../../services/supplier.service';

const options = {
  componentRestrictions: { country: "za" },
  strictBounds: false
};
@Component({
  selector: 'app-update-supplier-dialog',
  templateUrl: './update-supplier-dialog.component.html',
  styleUrls: ['./update-supplier-dialog.component.css']
})
export class UpdateSupplierDialogComponent implements OnInit {

  supplierData: any = [];

  updateSupplier!: UntypedFormGroup;

  @ViewChild('search')
  public searchElementRef!: ElementRef;

  //Address VAR's
  streetName: string | undefined= "";
  streetNumber: string | undefined = "";
  suburbName: string | undefined= "";
  cityName: string | undefined= "";
  provinceName: string | undefined= "";
  countryName: string | undefined= "";

  constructor(public dialog: MatDialogRef<UpdateSupplierDialogComponent>, private service: SupplierService, public http: HttpClient, public snackbar: SnackbarService, public ngZone: NgZone) { }

  async confirmSupplierUpdate() {
    let addressSend = {
      supplierName: this.updateSupplier.value.supplierName,
      addressId: 0,
      supplierPhoneNo: this.updateSupplier.value.supplierPhoneNo,
      supplierEmail: this.updateSupplier.value.supplierEmail,
      Street_Name: this.streetName,
      Street_Number: this.streetNumber,
      Suburb_Name: this.suburbName,
      City_Name: this.cityName,
      Province_Name: this.provinceName,
      Country_Name: this.countryName
    }
    await this.service.UpdateSupplier(this.supplierData[0].supplierId, addressSend).then(() => { },
      (response: HttpErrorResponse) => {
        if (response.status == 200) {
          this.snackbar.setMessage("Inventory Item Edited Successfully")
        }
        else {
          this.snackbar.setMessage("Failed to Edit Inventory Item")
        }
      })
    this.dialog.close();
  }

  onNoClick() {
    this.snackbar.setMessage('You chose not to update the supplier')
    this.dialog.close();
  }

  async ngOnInit() {
    this.supplierData = this.service.retrieveSupplierData();
    this.service.clearData();

    console.log('Update', this.supplierData)

    this.updateSupplier = new UntypedFormGroup({
      supplierId: new UntypedFormControl(this.supplierData[0].supplierId),
      supplierName: new UntypedFormControl(`${this.supplierData[0].supplierName}`, [Validators.required]),
      supplierPhoneNo: new UntypedFormControl(`${this.supplierData[0].supplierPhoneNo}`, [Validators.required]),
      supplierEmail: new UntypedFormControl(`${this.supplierData[0].supplierEmail}`, [Validators.required]),
      supplierAddress: new UntypedFormControl(`${this.supplierData[0].addressId.streetNumber}, ${this.supplierData[0].addressId.streetName}`, [Validators.required]),
    })
  }

  ngAfterViewInit(): void{
    // Binding autocomplete to search input control
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement, options
    );

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
    

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          
          return;
        }
        else{
          this.streetNumber = place.name?.replace(/[^0-9]/g,'')
          this.suburbName = place.vicinity

          if(place.address_components != undefined){
            this.cityName = place.address_components[3].long_name
            this.provinceName = place.address_components[5].long_name
            this.countryName = place.address_components[6].long_name
            this.streetName = place.address_components[1].long_name
          }
        }
      })
    })
  }
}