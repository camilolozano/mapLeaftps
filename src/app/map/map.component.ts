import { Component, OnInit } from '@angular/core';
import { MAP_CONFIG, URL_MAP } from './shared/map_config';
import { FormBuilder, Validators } from '@angular/forms';
import { MapService } from './shared/map.service';
import { POINTS } from './shared/markers_points';

import * as L from 'leaflet';
declare var $: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['map.component.css'],
  providers: [MapService]
})
export class MapComponent implements OnInit {
  eventClick: any;
  map: any;
  lat: number;
  lng: number;
  points: any;
  pointsService: any;

  public markerInformationForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required]
  });
  constructor(
    public fb: FormBuilder,
    public ms: MapService) {
    this.pointsService = ms.getGeoJson();
    this.points = POINTS;
  }

  ngOnInit() {

    this.map = L.map('map').setView([1.22214, -77.27766], 13);
    L.tileLayer(URL_MAP, { MAP_CONFIG }).addTo(this.map);

    const geoJsonLayer = L.geoJSON(this.pointsService, {
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`
          <div>
            <img src="${feature.properties['image']}"
          <div>
          <h4> ${feature.properties['title']}</h4>
        `);
      }
    }).addTo(this.map);


    this.map.on('click', (e) => {
      this.eventClick = e;
      this.addMarker(this.eventClick.latlng);
      $(document).ready(function () {
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal').modal('open');
      });
    });
  }

  markerSave(event) {
    console.log(event);
    console.log(this.markerInformationForm.value);
  }

  addMarker(data) {
    const marker_cl = L.marker(data, {
      title: 'MyPoint',
      alt: 'The Big I',
      draggable: true
    }).addTo(this.map);

    marker_cl.bindPopup(`
      <h1>My marcador</h1>
    `);
    console.log(this.eventClick.latlng);
    $('.modal').modal();
  }
}
