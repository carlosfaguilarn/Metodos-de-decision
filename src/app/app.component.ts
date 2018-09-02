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

	public seleccion_maximin : number = 0;  //Resultado del método maximin
	
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
		//console.log(this.datos);

		let valor_maximin :string = this.maximin().valor;
		let index_maximin : number = this.maximin().index + 1;
		console.log("El valor Maximin es: "+valor_maximin+ " En la fila: "+index_maximin); 
	}

	maximin(){
		var valores_minimos : number[] = [];	//Para guardar los minimos de cada fila

		this.datos.forEach(function(valor, indice, array){
			var numeros : number[] = [];	   //Arreglo temporal para numeros de la fila
			valor.forEach(function(item, i, arreglo){
				numeros.push(parseInt(item));	//Convierte a entero cada numero de la fila iterada
			});

			//Calcula el valor minimo de los numeros de la fila iterada y el indice
			let minimo = Math.min.apply(null, numeros);

			//Guarda el valor minimo de la fila en un arreglo general
			valores_minimos.push(minimo);
		});

		//Calcula y retorna el valor máximo de los valores mínimos
		let maximo_minimos, index_maximo;

		valores_minimos.forEach((valor, i, array)=>{
			if(valor === Math.max.apply(null, valores_minimos)){
				maximo_minimos = valor;
				index_maximo = i;
			}
		});

		return {
			"index" : index_maximo, 
			"valor": maximo_minimos
		};
	}
}
