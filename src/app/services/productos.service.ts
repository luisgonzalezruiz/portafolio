import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

@Injectable()
export class ProductosService {

  productos:any[] = [];   //asi definimos un array vacio
  cargando:boolean = true;

  productos_filtrados:any[] = [];

  constructor(private http:Http) {

    this.cargar_productos();

  }


  public buscar_producto( termino:string ){

      if( this.productos.length===0){

          //this.cargar_productos() devuelve una promesa, por que necesitamos saber con certeza cuando se carga todo
          this.cargar_productos().then( ()=>{
              //termino la carga
              //llamamos aqui, una vez que se carguen todos los productos, de lo contrario, error
              this.filtrar_productos(termino);
          });
        }else{
             //entra aqui cuando los productos ya fueron cargados por completo
             this.filtrar_productos(termino);
      }
  }

  private filtrar_productos(termino:string){

    this.productos_filtrados = [];
    termino = termino.toLowerCase();   //convierto el termino a minuscula todo

    for (let producto of this.productos) {
        //console.log(producto);
        if(producto.categoria.indexOf( termino ) >=0 || producto.titulo.toLowerCase().indexOf( termino ) >=0 ){
           this.productos_filtrados.push( producto );
        }
    }

  }


  public cargar_producto( cod:string ){
    //retornamos un json con todos los datos del producto
    //return  this.http.get(`https://paginaweb-b3359.firebaseio.com/productos/${cod}.json`);
      return  this.http.get('https://paginaweb-b3359.firebaseio.com/productos/' + cod + '.json');
  }

  public cargar_productos(){
    this.cargando = true;

    //crearemos una promesa para saber en que momento termino de cargar_producto
    let promesa = new Promise( ( resolve, reject )=>{

        this.http.get("https://paginaweb-b3359.firebaseio.com/productos_idx.json")
        .subscribe( res=> {
         //console.log(res.json());

         //solo para probar como funciona el loading
         // setTimeout(()=>{
         //   this.productos = res.json();
         //   this.cargando = false;
         // },1000);

         this.productos = res.json();
         this.cargando = false;

         resolve();


        });

    });

    return promesa;




  }

}
