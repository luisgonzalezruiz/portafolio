import { Injectable } from '@angular/core';
import { Http } from "@angular/http"

@Injectable()
export class InformacionService {

  info:any = {};  //declaro un objeto vacio
  cargada:boolean = false;
  cargada_sobre_nosotros:boolean = false;
  equipo:any[] = [];

  constructor(public http:Http) {

    this.carga_info();
    this.carga_sobre_nosotros();

  }

  public carga_info(){
    //de esta forma obtenemos los valores del archivo .json que guardamos en assets/data
    this.http.get("assets/data/info.pagina.json")
             .subscribe ( data => {

              // console.log(data.json());
               this.cargada = true;
               this.info = data.json();

             })
  }
  carga_sobre_nosotros(){
    this.http.get("https://paginaweb-b3359.firebaseio.com/equipo.json")
             .subscribe ( data => {
              //console.log(data.json());
               this.cargada_sobre_nosotros = true;
               this.equipo = data.json();
             })
  }

}
