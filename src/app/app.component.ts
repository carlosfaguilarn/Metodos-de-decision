import { Component, OnInit, DoCheck, ViewChild } from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
 
export class AppComponent implements DoCheck {
	title = 'metodos de decisión';
	public columnas : number = 3;  //propiedad capturada en input
	public filas : number = 3;     //propiedad capturada en input
	public col : number[] = [1];   //Arreglo para iterar con la directiva ngFor
	public fil : number[] = [1];   //Arreglo para iterar con la directiva ngFor

	public datos  = [];            //Objeto con los datos resultantes de la tabla
	element: HTMLInputElement;     //Elemento HTML para recoger los datos de las celdas de la tabla
	
	constructor(){}

	ngDoCheck(){ 
		//Actualiza la longitud de la tabla (DataBinding para el DOM)
		this.col.length = this.columnas;
		this.fil.length = this.filas;
	}
	onSubmit(){
		//Imprime longitud de la tabla
		console.log("filas: "+this.fil.length);
		console.log("columnas: "+this.col.length);

		//Recorre las columnas (itera hacia la derecha)
		for(var i = 0; i < this.col.length; i++){
			//Arreglo temporal para almacenar la fila[i]
			var objeto = [];
			//Recorre las celdas de la fila
			for(var j = 0; j < this.fil.length; j++){
				//Busca y recoge el valor de la celda indexada y lo imprime
				let id = "dato"+i+"_"+j;
				this.element = document.getElementById(id) as HTMLInputElement; 
				console.log(id+": "+this.element.value);

				//'pushea' el valor al arreglo temporal para la fila
				objeto.push(this.element.value);
			}
			//'pushea' la fila[i] en el objeto final
			this.datos.push(objeto);
		}
		//Imprime el objeto final en consola
		console.log(this.datos);
	}
}
