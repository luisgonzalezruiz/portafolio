import { Component } from '@angular/core';
import { InformacionService } from "../../services/informacion.service";

import { Router } from "@angular/router"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(public _is:InformacionService,
              private router:Router){

  }

  buscar_producto(termino:string){

      //console.log (termino);
      //de esta forma navegamos al search que esta definido como buscar en el ruteador
      this.router.navigate( ['buscar',termino] )

  }



}
