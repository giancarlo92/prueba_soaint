import { Component } from '@angular/core';
import { RespuestaService } from './respuesta.service';
import { respuesta } from './respuesta';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  respuestas: Array<respuesta>;
  respuesta: respuesta = {};

  constructor(private respuestaService: RespuestaService) { }

  ngOnInit() {
    this.ObtenerRespuestas()
  }

  ObtenerRespuestas(){
    this.respuestaService.obtener().subscribe(data => {
      this.respuestas = data.result.items.map((x,i) => {
      return {
          id: i,
          about: x._about,
          accessURL: x.accessURL,
          title: x.title[0]._value
        }
      });
    });
  }

  GuardarRespuesta(){
    const datos = { ...this.respuesta };
    datos.id = this.respuestas.length;
    this.respuestas.push(datos);
    this.LimpiarDatos();
  }

  EditarRespuesta(respuesta){
    this.respuesta = {...respuesta};
  }

  EliminarRespuesta(id){
    this.respuestas = this.respuestas.filter(x => x.id !== id);
  }

  LimpiarDatos(){
    this.respuesta = {};
  }
}
