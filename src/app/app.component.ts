import { Component, OnInit } from '@angular/core';
import { MAP_CONFIG, URL_MAP } from './shared/map_config';
import * as L from 'leaflet';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  evento: any;
  title = 'app works!';
  ngOnInit() {
    const map = L.map('map').setView([1.2135252, -77.312242], 13);
    L.tileLayer(URL_MAP, { MAP_CONFIG }).addTo(map);

    const marker = L.marker([1.2135252, -77.312242],
      {
        title: 'MyPoint',
        alt: 'The Big I',
        draggable: true
      }).addTo(map);

    marker.bindPopup(`
        <h1>My marcador</h1>
        </bienvenido>
        <ul>
          <li>Hola uno</li>
          <lihola dos></li>
          <li>hola tres</li>
        </ul>
      `);

    const polyline = L.polyline([[1.2135252, -77.312], [1.2135252, -75.312242]], {
      color: 'red',
      weight: 8
    }).addTo(map);


    map.on('click', (e) => {
      this.evento = e;
      const marker_cl = L.marker(this.evento.latlng, {
        title: 'MyPoint',
        alt: 'The Big I',
        draggable: true
      }).addTo(map);

      marker_cl.bindPopup(`
        <h1>My marcador</h1>
        </bienvenido>
        <ul>
          <li>Hola uno</li>
          <lihola dos></li>
          <li>hola tres</li>
        </ul>
      `);
      console.log(this.evento.latlng);
    });

    $('.scrollspy').scrollSpy();

  }


}
