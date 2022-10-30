import { Component, OnInit } from '@angular/core';
import { AuthStoreService } from '../../../modules/auth/services/auth-store.service';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  links = [
    {
      to: '/',
      text: 'Home',
    },
    {
      to: '/products',
      text: 'Products',
    },
    {
      to: '/login',
      text: 'Login',
    },
  ];

  constructor(private authStore: AuthStoreService, private auth: AuthService) {}

  ngOnInit(): void {}

  get userName(): string | undefined {
    return this.authStore.user?.name;
  }

  get isAuthenticated(): boolean {
    return this.authStore.isAuthenticated;
  }

  logout(): void {
    this.auth.logout().subscribe();
  }
}
