import { Component } from '@angular/core';
import { RespuestaService } from './respuesta.service';
import { respuesta } from './respuesta';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  respuestas: Array<respuesta>;
  respuesta: respuesta = {
    about: '',
    accessURL: '',
    title: ''
  };
  modal: boolean = false;
  tituloModal: string = "Agregar respuesta";
  submitted: boolean;
  cargando: boolean = true;

  constructor(
    private respuestaService: RespuestaService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.ObtenerRespuestas()
  }

  ObtenerRespuestas(){
    this.respuestaService.obtener().subscribe(data => {
      this.respuestas = data.result.items.map((x,i) => {
      return {
          id: i + 1,
          about: x._about,
          accessURL: x.accessURL,
          title: x.title[0]._value
        }
      });
    });
  }

  GuardarRespuesta(){
    this.submitted = true;
    if(this.respuesta.about.trim() === '' || 
      this.respuesta.accessURL.trim() === '' ||
      this.respuesta.title.trim() === ''){
      return
    }
    this.cargando = false;
    setTimeout(() => {
      const datos = { ...this.respuesta };
      if(datos.id > 0){
        let actual = this.respuestas.findIndex(x => x.id === datos.id);
        this.respuestas[actual] = datos;
      } else {
        let idMax = Math.max.apply(Math, this.respuestas.map(x => x.id));
        datos.id = idMax + 1;
        this.respuestas.push(datos);
      }
      console.log(this.respuestas);
      this.CerrarModal();
      this.cargando = true;
    }, 500);
  }

  CerrarModal(){
    this.modal = false;
    this.submitted = false;
    this.LimpiarDatos();
  }

  AgregarRespuesta(){
    this.tituloModal = 'Agregar respuesta';
    this.LimpiarDatos();
    this.submitted = false;
    this.modal = true;
  }

  EditarRespuesta(respuesta){
    this.respuesta = {...respuesta};
    this.tituloModal = 'Editar respuesta';
    this.modal = true;
  }

  EliminarRespuesta(id){
    this.confirmationService.confirm({
      message: '¿Estás seguro que deseas eliminar este registro?',
      header: 'Eliminar',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.respuestas = this.respuestas.filter(x => x.id !== id);
      }
    });
    
  }

  LimpiarDatos(){
    this.respuesta = {
      about: '',
      accessURL: '',
      title: ''
    };
  }
}
