import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  isMenuOpen = false; // Variable para manejar el estado del menú
  searchTerm: string = '';

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Alternar el estado del menú
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value;
    // Aquí puedes implementar la lógica para filtrar o buscar elementos
  }

}
