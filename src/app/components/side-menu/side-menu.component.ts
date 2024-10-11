import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  isPopoverOpen = false;
  isMenuOpen = false; // Estado del menú
  constructor(private router: Router) {}
  @ViewChild('popover') popover: any;
  ngOnInit() {
    console.log('SideMenuComponent cargado correctamente');
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  openPopover(event: any) {
    this.popover.event = event;
    this.isPopoverOpen = true;
  }
  // Cerrar el popover
  closePopover() {
    this.isPopoverOpen = false;
  }

  // Función para cerrar sesión (reemplazar con la lógica que desees)
  async logOut() {
    const access_token = localStorage.getItem('access_token');
    console.log('Tokens:', access_token);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('correo');
    //redireccionar a la página de inicio
    this.router.navigate(['/']);
    this.isPopoverOpen = false;
  }
}
