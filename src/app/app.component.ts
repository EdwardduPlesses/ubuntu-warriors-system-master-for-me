import { Component } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ubuntu-warriors-system';
  opened = true;

  constructor(public authService: AuthService, public authGuard: AuthGuard) { 
    if(this.authService.loggedIn.getValue() === true) {
      this.authService.isUserAuthenticated();
      this.authService.isUserAdmin();
      this.authService.getUserInfo();
    }
  }
  
  logout() {
    this.authService.doLogout()
  }

  isExpanded: boolean = false;

}