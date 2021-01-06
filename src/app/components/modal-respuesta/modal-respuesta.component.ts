import { Component, Host, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-modal-respuesta',
  templateUrl: './modal-respuesta.component.html',
  styleUrls: ['./modal-respuesta.component.css']
})
export class ModalRespuestaComponent implements OnInit {
  appComponent:AppComponent;

  constructor(
    @Host() private _appComponent:AppComponent,
  ) { 
    this.appComponent = _appComponent;
  }

  ngOnInit() {
  }

}
