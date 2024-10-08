import { Component, OnInit } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
})
export class BuscadorPage implements OnInit {

  //definición de variables
  products: any[] = [];
  isMenuOpen = false; // Variable para manejar el estado del menú

  constructor() { }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Alternar el estado del menú
  }

  ngOnInit() {
  }

  // Método para buscar productos
  searchProducts(event: any) {
    const searchTerm = event.target.value;
    if (searchTerm) {
      this.getProducts(searchTerm);
    }
  }

  async getProducts(searchTerm: string) {
    const token  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI5NTY2NDQzLCJpYXQiOjE3MjY5NzQ0NDMsImp0aSI6IjE2YTFmZjA0MjZkZDQzMDA4NTk1OTdhN2MzZWU0MjcyIiwidXNlcl9pZCI6Mn0.be7ZN6uS-UfO73XEaZy3bPtExryonp-Uv_vrnnc5QAI'

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const json = {
      "keyWord": searchTerm
    };
    const url = 'http://127.0.0.1:8000/ToolsData/api/SeachProductos';
    const response = await axios.post(url, json, { headers });
    const productos = response.data.data.productos;
    this.products = productos.flat();
    console.log("productos", this.products);
  }
}
