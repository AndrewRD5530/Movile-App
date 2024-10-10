import { Component } from '@angular/core';
import axios from 'axios';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  
})
export class HomePage {

  productos: any[] = []
  categorias: any[] = []
  constructor() {}

  isMenuOpen = false; // Variable para manejar el estado del menú


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Alternar el estado del menú
  }
  ngOnInit() {
    this.ObtenerProducto();
    this.ObtenerCategorias();
  }

  async ObtenerProducto() {
    // definir token bearer para autenticar
    const token = localStorage.getItem('access_token');
    // headers para autenticar
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    try {
      const respuesta = await axios.get("http://127.0.0.1:8000/DataScraping/api/Producto/Listar", { headers });
      this.productos = respuesta.data.data.productos;
      //a;adiendo los productos con mejkores precios a la lista
      console.log(this.productos);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async ObtenerCategorias() {
    // definir token bearer para autenticar
    const token = localStorage.getItem('access_token');
    // headers para autenticar
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    try {
      const respuesta = await axios.get("http://127.0.0.1:8000/DataScraping/api/Categoria/Listar", { headers });

      this.categorias = respuesta.data.data.categorias;
      console.log("categorias",this.categorias);
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
