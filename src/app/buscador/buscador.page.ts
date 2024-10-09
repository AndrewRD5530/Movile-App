import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { debounceTime } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
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
  private searchSubject: Subject<string> = new Subject();

  constructor(private alertController: AlertController) { }

  ngOnInit() {
    this.searchSubject.pipe(debounceTime(500)).subscribe(searchTerm => {
      this.getProducts(searchTerm);
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  searchProducts(event: any) {
    const searchTerm = event.target.value.trim();
    if (searchTerm) {
      this.isLoading = true; // Mostrar la barra de progreso mientras se busca
      this.searchSubject.next(searchTerm);
    } else {
      this.products = []; // Limpiar los productos si no hay búsqueda
    }
  }

  async getProducts(searchTerm: string) {
    const token = localStorage.getItem('access_token');
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

      if (productos.length > 0 && productos[0].details === "producto no encontrado") {
        await this.showAlert('No se encontraron productos');
      } else {
        this.products = productos.flat();
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
      await this.showAlert('Ocurrió un error al buscar productos.');
    } finally {
      this.isLoading = false;
    }
  }

  // Método para mostrar la alerta
  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Atención',
      message: message,
      buttons: ['OK'],
      cssClass: 'custom-alert'
    });

    await alert.present();
  }

}
