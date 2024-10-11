import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pro-description',
  templateUrl: './pro-description.page.html',
  styleUrls: ['./pro-description.page.scss'],
})
export class ProDescriptionPage implements OnInit {
  products: any[] = [];
  productId!: number;

  constructor(private route: ActivatedRoute, private http: HttpClient,private router: Router, private location: Location) {
    console.log("Component se cargó correctamente");
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.productId = +idParam;
        this.getProductDetails(this.productId);
      } else {
        console.error('El parámetro de ID no está presente en la URL.');
      }
    });
  }
  async getProductDetails(id: number, ) {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    const json = {
      "productoID": id
    };

    const url = 'http://127.0.0.1:8000/ToolsData/api/filtrar/InformacionByProducto';

    try {
      const response = await axios.post(url, json, { headers });
      console.log(response.data);
      this.products = response.data.data.producto;
    } catch (error) {
      console.error("Error al obtener producto:", error);
    }
  }
  returnPage() {
    this.location.back();
  }

}