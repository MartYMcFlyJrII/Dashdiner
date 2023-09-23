import { Component, ViewChild } from '@angular/core';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  isExpanded = true;
  fillerNav = [
    { name: 'Dashbord', route: 'dashboard', icon: 'dashboard' },
    { name: 'Menú', route: 'menu', icon: 'fastfood' },
    { name: 'Categorías', route: 'categorias', icon: 'category' },
    { name: 'Órdenes', route: 'ordenes', icon: 'edit_note' },
    { name: 'Mi Cuenta', route: 'cuenta', icon: 'account_circle' },
  ];
  @ViewChild('drawer') drawer: any;
  public selectedItem: string = '';
  public isMobileLayout = window.innerWidth <= 991;

  ngOnInit() {
    window.onresize = () => {
      this.isMobileLayout = window.innerWidth <= 991;
      if (this.isMobileLayout) {
        this.isExpanded = true;
      }
    };
  }
  closeSideNav() {
    if (this.drawer._mode == 'over') {
      this.drawer.close();
    }
  }
}
