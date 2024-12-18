import {Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatDrawer} from '@angular/material/sidenav';
import {StorageService} from 'src/app/core/storage.service';
import {AuthService} from 'src/app/auth/auth.service';
import {capitalize} from "../../utils/helpers";

interface IMenuItems {
  label: string;
  link: string;
  icon: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  isSmallScreen = false;
  protected menuItems: IMenuItems[] = [];
  protected title = '';
  protected currentUser = '';
  userLogged = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private storage: StorageService,
    private auth: AuthService
  ) {
  }

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Home',
        link: '',
        icon: 'home',
      },
      {
        label: 'Dashboard',
        link: '/dashboard',
        icon: 'dashboard',
      },
      // {
      //   label: 'Sair',
      //   link: '/',
      //   icon: 'exit_to_app',
      // },
    ];

    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe(({matches}) => {
        this.isSmallScreen = matches;
        this.title = this.isSmallScreen
          ? 'SysCad'
          : 'SysCad - Sistema de Cadastro';
      });


    this.storage.isLogged$().subscribe((isLogged: boolean) => {
      this.userLogged = isLogged;

      if (this.userLogged) {
        const {name, last_name} = this.storage.getUser();
        let sobreNome = last_name.split(' ');
        this.currentUser = sobreNome ? `${capitalize(name)} ${sobreNome.at(-1)}` : capitalize(name);
      }
    });
  }

  logout(): void {
    this.auth.logout();
  }
}
