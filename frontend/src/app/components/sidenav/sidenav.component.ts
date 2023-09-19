import { Component, ViewChild } from '@angular/core';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  isExpanded = true;
  fillerNav = [
    { name: 'Menú', route: 'menu', icon: 'list_alt' },

    { name: 'Asignaciones', route: 'asignaciones', icon: 'view_agenda' },
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
