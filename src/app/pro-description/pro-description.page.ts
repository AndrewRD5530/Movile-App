import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-pro-description',
  templateUrl: './pro-description.page.html',
  styleUrls: ['./pro-description.page.scss'],
})
export class ProDescriptionPage implements OnInit {
  product: any[] = [
    {
      name: 'Cafe Bukelele',
      price: '$2.99',
      category: 'Cafe Soluble',
      description: 'Cafe instantáneo Bukelele 30 sobres',
      image: '../../assets/icon/card1.avif',
    },
  ];
  constructor() { }

  ngOnInit() {
    //this.ObtenerProducto();
  }
  
}
