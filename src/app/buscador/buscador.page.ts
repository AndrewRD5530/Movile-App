import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
})
export class BuscadorPage implements OnInit {

  products: any[] = [];
  isMenuOpen = false; // Estado del menú
  isLoading = false;  // Estado de la barra de progreso
  isAlertOpen = false;  // Estado de la alerta
  private searchSubject: Subject<string> = new Subject(); // Para manejar debounce en búsqueda

  constructor() { }

  ngOnInit() {
    // Configurar el debounce para evitar múltiples solicitudes
    this.searchSubject.pipe(debounceTime(500)).subscribe(searchTerm => {
      this.getProducts(searchTerm);
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Alternar el estado del menú
  }

  // Método para manejar el input de búsqueda
  searchProducts(event: any) {
    const searchTerm = event.target.value.trim();
    if (searchTerm) {
      this.isLoading = true; // Mostrar la barra de progreso mientras se busca
      this.searchSubject.next(searchTerm); // Emitir el término de búsqueda después del debounce
    } else {
      this.products = []; // Limpiar los productos si no hay búsqueda
    }
  }

  async getProducts(searchTerm: string) {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI5NTY2NDQzLCJpYXQiOjE3MjY5NzQ0NDMsImp0aSI6IjE2YTFmZjA0MjZkZDQzMDA4NTk1OTdhN2MzZWU0MjcyIiwidXNlcl9pZCI6Mn0.be7ZN6uS-UfO73XEaZy3bPtExryonp-Uv_vrnnc5QAI';

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const json = {
      "keyWord": searchTerm
    };

    const url = 'http://127.0.0.1:8000/ToolsData/api/SeachProductos';

    try {
      const response = await axios.post(url, json, { headers });
      const productos = response.data.data.productos;

      // Verifica si no hay productos encontrados
      if (productos.length > 0 && productos[0].details === "producto no encontrado") {
        this.showNoProductsFoundAlert();
      } else {
        this.products = productos.flat(); // Aplana el array si es necesario
        this.isAlertOpen = false;
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
      this.showErrorAlert();
    } finally {
      this.isLoading = false; // Asegura que siempre se oculta el indicador de carga
    }
  }

  // Método para mostrar una alerta si no se encontraron productos
  showNoProductsFoundAlert() {
    this.isAlertOpen = true;
    this.products = [];
    console.log("Producto no encontrado");
  }

  // Método para mostrar una alerta en caso de error
  showErrorAlert() {
    this.isAlertOpen = true;
    this.products = [];
    console.log("Error al buscar productos");
  }

}
