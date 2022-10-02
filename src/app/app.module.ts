import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { UserTypeComponent } from './components/user-type/user-type.component';
import { AddUserTypeDialogComponent } from './components/user-type/add-user-type-dialog/add-user-type-dialog.component';
import { ViewUserTypeDialogComponent } from './components/user-type/view-user-type-dialog/view-user-type-dialog.component';
import { UpdateUserTypeDialogComponent } from './components/user-type/update-user-type-dialog/update-user-type-dialog.component';
import { DeleteUserTypeDialogComponent } from './components/user-type/delete-user-type-dialog/delete-user-type-dialog.component';
import { CustomerComponent } from './components/customer/customer.component';
import { AddCustomerDialogComponent } from './components/customer/add-customer-dialog/add-customer-dialog.component';
import { EditCustomerDialogComponent } from './components/customer/edit-customer-dialog/edit-customer-dialog.component';
import { DeleteCustomerDialogComponent } from './components/customer/delete-customer-dialog/delete-customer-dialog.component';
import { ViewCustomerDialogComponent } from './components/customer/view-customer-dialog/view-customer-dialog.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UsersComponent } from './components/users/users.component';
import { AddUserDialogComponent } from './components/users/add-user-dialog/add-user-dialog.component';
import { ViewUserDialogComponent } from './components/users/view-user-dialog/view-user-dialog.component';
import { UpdateUserDialogComponent } from './components/users/update-user-dialog/update-user-dialog.component';
import { DeleteUserDialogComponent } from './components/users/delete-user-dialog/delete-user-dialog.component';
import { UpdateInventoryItemComponent } from './components/inventory/update-inventory-item/update-inventory-item.component';
import { DeleteInventoryItemComponent } from './components/inventory/delete-inventory-item/delete-inventory-item.component';
import { AddInventoryItemComponent } from './components/inventory/add-inventory-item/add-inventory-item.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProductTypeComponent } from './components/product-type/product-type.component';
import { CustomerordersComponent } from './components/customerorders/customerorders.component';
import { AddOrderDialogComponent } from './components/customerorders/add-order-dialog/add-order-dialog.component';
import { UpdateOrderDialogComponent } from './components/customerorders/update-order-dialog/update-order-dialog.component';
import { ViewOrderDialogComponent } from './components/customerorders/view-order-dialog/view-order-dialog.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthInterceptor } from './services/authconfig.interceptor';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { AddProductDialogComponent } from './components/products/add-product-dialog/add-product-dialog.component';
import { UpdateProductDialogComponent } from './components/products/update-product-dialog/update-product-dialog.component';
import { DeleteProductDialogComponent } from './components/products/delete-product-dialog/delete-product-dialog.component';
import { ViewProductDialogComponent } from './components/products/view-product-dialog/view-product-dialog.component';
import { AddProducttypeDialogComponent } from './components/product-type/add-producttype-dialog/add-producttype-dialog.component';
import { EditProducttypeDialogComponent } from './components/product-type/edit-producttype-dialog/edit-producttype-dialog.component';
import { DeleteProducttypeDialogComponent } from './components/product-type/delete-producttype-dialog/delete-producttype-dialog.component';
import { RepairComponent } from './components/repair/repair.component';
import { AddRepairDialogComponent } from './components/repair/add-repair-dialog/add-repair-dialog.component';
import { DeleteRepairDialogComponent } from './components/repair/delete-repair-dialog/delete-repair-dialog.component';
import { ViewRepairDialogComponent } from './components/repair/view-repair-dialog/view-repair-dialog.component';
import { UpdateRepairDialogComponent } from './components/repair/update-repair-dialog/update-repair-dialog.component';
import { SalesComponent } from './components/sales/sales.component';
import { ViewSaleComponent } from './components/sales/view-sale/view-sale.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { AddSupplierDialogComponent } from './components/suppliers/add-supplier-dialog/add-supplier-dialog.component';
import { DeleteSupplierDialogComponent } from './components/suppliers/delete-supplier-dialog/delete-supplier-dialog.component';
import { UpdateSupplierDialogComponent } from './components/suppliers/update-supplier-dialog/update-supplier-dialog.component';
import { ViewSupplierDialogComponent } from './components/suppliers/view-supplier-dialog/view-supplier-dialog.component';
import { WriteoffInventoryComponent } from './components/writeoff-inventory/writeoff-inventory/writeoff-inventory.component';
import { AddWriteoffComponent } from './components/writeoff-inventory/add-writeoff/add-writeoff.component';
import { StocktakeComponent } from './components/stocktake/stocktake/stocktake.component';
import { AddStocktakeComponent } from './components/stocktake/add-stocktake/add-stocktake.component';
import { AddWriteoffProductComponent } from './components/writeoff-inventory/add-writeoff-product/add-writeoff-product.component';
import { AddStocktakeProductComponent } from './components/stocktake/add-stocktake-product/add-stocktake-product.component';
import { AssingRepairDialogComponent } from './components/repair/assing-repair-dialog/assing-repair-dialog.component';
import { CalenderComponent } from './components/repair/calender/calender.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CompleteRepairDialogComponent } from './components/repair/complete-repair-dialog/complete-repair-dialog.component';
import { EmailConfirmationDialogComponent } from './components/repair/email-confirmation-dialog/email-confirmation-dialog.component';
import { NgChartsModule } from 'ng2-charts';
import { SupplierOrdersComponent } from './components/supplier-orders/supplier-orders.component';
import { PlaceSupplierOrderDialogComponent } from './components/supplier-orders/place-supplier-order-dialog/place-supplier-order-dialog.component';
import { ReceiveSupplierOrderDialogComponent } from './components/supplier-orders/receive-supplier-order-dialog/receive-supplier-order-dialog.component';
import { ViewSupplierOrderDialogComponent } from './components/supplier-orders/view-supplier-order-dialog/view-supplier-order-dialog.component';
import { CaptureSaleComponent } from './components/sales/capture-sale/capture-sale.component';
import { SaleStatusComponent } from './components/sales/sale-status/sale-status.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PhoneMaskDirective } from './shared/phone-mask.directive';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { HelpComponent } from './components/help/help.component';
import { ViewVatComponent } from './components/configuration/vat/view-vat/view-vat.component';
import { AddVatComponent } from './components/configuration/vat/add-vat/add-vat.component';
import { ViewInventoryItemComponent } from './components/inventory/view-inventory-item/view-inventory-item.component';
import { CompletedRepairsComponent } from './components/completed-repairs/completed-repairs.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        InventoryComponent,
        UserTypeComponent,
        AddUserTypeDialogComponent,
        ViewUserTypeDialogComponent,
        UpdateUserTypeDialogComponent,
        DeleteUserTypeDialogComponent,
        CustomerComponent,
        AddCustomerDialogComponent,
        EditCustomerDialogComponent,
        DeleteCustomerDialogComponent,
        ViewCustomerDialogComponent,
        ChangePasswordComponent,
        UsersComponent,
        AddUserDialogComponent,
        ViewUserDialogComponent,
        UpdateUserDialogComponent,
        DeleteUserDialogComponent,
        UpdateInventoryItemComponent,
        DeleteInventoryItemComponent,
        AddInventoryItemComponent,
        ResetPasswordComponent,
        ProductTypeComponent,
        ToolbarComponent,
        SidebarComponent,
        ResetPasswordComponent,
        AddProducttypeDialogComponent,
        EditProducttypeDialogComponent,
        DeleteProducttypeDialogComponent,
        CustomerordersComponent,
        AddOrderDialogComponent,
        UpdateOrderDialogComponent,
        ViewOrderDialogComponent,
        ToolbarComponent,
        SidebarComponent,
        ResetPasswordComponent,
        DashboardComponent,
        ProductsComponent,
        AddProductDialogComponent,
        UpdateProductDialogComponent,
        DeleteProductDialogComponent,
        ViewProductDialogComponent,
        RepairComponent,
        AddRepairDialogComponent,
        DeleteRepairDialogComponent,
        ViewRepairDialogComponent,
        UpdateRepairDialogComponent,
        SalesComponent,
        ViewSaleComponent,
        SuppliersComponent,
        AddSupplierDialogComponent,
        DeleteSupplierDialogComponent,
        UpdateSupplierDialogComponent,
        ViewSupplierDialogComponent,
        WriteoffInventoryComponent,
        AddWriteoffComponent,
        StocktakeComponent,
        AddStocktakeComponent,
        AddWriteoffProductComponent,
        AddStocktakeProductComponent,
        AssingRepairDialogComponent,
        CalenderComponent,
        CompleteRepairDialogComponent,
        EmailConfirmationDialogComponent,
        SupplierOrdersComponent,
        PlaceSupplierOrderDialogComponent,
        ReceiveSupplierOrderDialogComponent,
        ViewSupplierOrderDialogComponent,
        CaptureSaleComponent,
        SaleStatusComponent,
        PhoneMaskDirective,
        ConfigurationComponent,
        HelpComponent,
        ViewVatComponent,
        AddVatComponent,
        ViewInventoryItemComponent,
        CompletedRepairsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        NgChartsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule
    ],
    providers: [{
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }],
    bootstrap: [AppComponent]
})

export class AppModule { }

// the packages below are needed to display dashboard. THEY SHOULD BE IN THE package.json
// "chart.js": "^3.9.0",
// "html2canvas": "*",
// "jspdf": "^2.3.1",
// "ng2-charts": "^3.0.10",
// "ngx-toastr": "^14.3.0",
//"@swimlane/ngx-charts": "^18.0.1",