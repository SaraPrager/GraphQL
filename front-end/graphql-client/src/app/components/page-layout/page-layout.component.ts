import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import User from '../../models/user';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss']
})
export class PageLayoutComponent implements OnInit {
  appName: string = 'GraphQL Client';
  copyrightText: string = '© Sara Prager';
  headerIcons: { name: string, url?: string }[] = [
    { name: 'language', url: '/'},
    { name: 'help', url: '/'},
    { name: 'settings', url: '/'},
    { name: 'login' },
    { name: 'logout' },
  ];
  sidebarLinks: { label: string, url: string, icon: string }[] = [
    { label: 'Users', url: '/users', icon: 'people'},
    { label: 'Tasks', url: '/tasks', icon: 'task'},
    { label: 'Accounting Log', url: '/', icon: 'edit'},
  ];
  isLoggedIn$: Observable<boolean>;
  user$: Observable<User>;
  @ViewChild('sidenav') sidenav: any;

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.user$ = this.authService.user$;
  }

  ngOnInit(): void {
  }

  onLogin() {
    this.authService.signIn();
  }

  onLogout() {
    this.authService.signOut();
  }

  onToggleSidebar() {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }
}
