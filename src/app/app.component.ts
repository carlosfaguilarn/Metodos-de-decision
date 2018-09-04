import { Component, OnInit, DoCheck, ViewChild } from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { isNgTemplate } from '../../node_modules/@angular/compiler';

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
	public p : number = 0.5;			   //Coeficiente de optimismo => 1>p>0 
	public q : number;			   //Coeficiente de pesimismo => q = 1-p
	public datos  = [];            //Objeto con los datos resultantes de la tabla
	element: HTMLInputElement;     //Elemento HTML para recoger los datos de las celdas de la tabla

	public seleccion_maximin : number = 0;  //Resultado del método maximin
	
	constructor(){}

	ngDoCheck(){ 
		//Actualiza la longitud de la tabla (DataBinding para el DOM)
		this.col.length = this.columnas;
		this.fil.length = this.filas;
		this.q = 1 - this.p;
	}
	onSubmit(){
		//Imprime longitud de la tabla
		console.log("filas: "+this.fil.length);
		console.log("columnas: "+this.col.length);
		//console.log(this.datos); 

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
		
		//Calcular Maxmin
		let valor_maximin :string = this.maximin().valor;
		let index_maximin : number = this.maximin().index + 1;
		console.log("El valor Maximin es: "+valor_maximin+ " En la fila: "+index_maximin); 
		//Calcular Maxmax
		let valor_maximax :string = this.maximax().valor;
		let index_maximax : number = this.maximax().index + 1;
		console.log("El valor Maximax es: "+valor_maximax+ " En la fila: "+index_maximax); 
		//Calcular Coeficiente optimista
		let valor_coeficiente :string = this.coeficienteOptimismo().valor;
		let index_coeficiente : number = this.coeficienteOptimismo().index + 1;
		console.log("El valor coeficiente optimismo es: "+valor_coeficiente+ " En la fila: "+index_coeficiente); 
		//Calcular coste oportunidad
		let valor_coste_oportunidad :number = this.costeOportunidad().valor;
		let index_coste_oportunidad : number = this.costeOportunidad().index + 1;
		console.log("El valor coste oportunidad es: "+valor_coste_oportunidad+ " En la fila: "+index_coste_oportunidad); 
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

	maximax(){
		var valores_maximos : number[] = [];	//Para guardar los maximos de cada fila
		this.datos.forEach(function(valor, indice, array){
			var numeros : number[] = [];	   //Arreglo temporal para numeros de la fila
			valor.forEach(function(item, i, arreglo){
				numeros.push(parseInt(item));	//Convierte a entero cada numero de la fila iterada
			});
			//Calcula el valor maximos de los numeros de la fila iterada y el indice
			let maximo = Math.max.apply(null, numeros);
			//Guarda el valor maximo de la fila en un arreglo general
			valores_maximos.push(maximo);
		});
		//Calcula y retorna el valor máximo de los valores maximos
		let maximo_maximos, index_maximo;
		valores_maximos.forEach((valor, i, array)=>{
			if(valor === Math.max.apply(null, valores_maximos)){
				maximo_maximos = valor;
				index_maximo = i;
			}
		});
		return {
			"index" : index_maximo, 
			"valor": maximo_maximos
		};
	}
	coeficienteOptimismo(){
		var resultados : number[] = [];
		this.datos.forEach((valor, i, array)=>{
			// Valor -> fila

			//Buscar el valor máximo de la fila
			var numeros : number[] = [];	   //Arreglo temporal para numeros de la fila
			valor.forEach(function(item, i, arreglo){
				numeros.push(parseInt(item));	//Convierte a entero cada numero de la fila iterada
			});
			//Calcula el valor maximo y minimo de los numeros de la fila iterada
			let maximo = Math.max.apply(null, numeros);
			let minimo = Math.min.apply(null, numeros);

			//Calcula con coeficiente optimisma y guarda en arreglo resultados
			let res = this.p*maximo + this.q*minimo;
			resultados.push(res);

			 
		});
		let resultado, index;
		resultados.forEach((valor, i, array)=>{
			if(valor === Math.max.apply(null, resultados)){
				resultado = valor;
				index = i;
			}
		});

		return {
			"index" : index,
			"valor" : resultado
		}
	} 
	costeOportunidad(){ 
		let string_array : string[] = [];

		
		

		this.datos.forEach((v,i,a)=>{
			string_array.push(v.toString());
		});
		
		let len = string_array[0].split(',').length;

		let numeros = [];
		for(var i = 0; i < len; i++){
			//i = columnas
			//j = filas
			numeros[i] = 0;
			//let columna = [];
			for(var j = 0; j < this.datos.length; j++){
				if(parseInt(this.datos[j][i]) > numeros[i] ){
					numeros[i] = parseInt(this.datos[j][i]);
				} 
				//columna.push(parseInt(this.datos[j][i]));
			}
		}
		//console.log(numeros); 
		let coste_op = [];

		this.datos.forEach((valor,index,array)=>{
			coste_op[index]=0;
			valor.forEach((v,i,a)=>{
				coste_op[index] += numeros[i]-parseInt(v);
			});
		});

		coste_op.forEach((v,i,a)=>{
			coste_op[i] = v / len;
		});
		console.log(coste_op);
		
		let resultado: number;
		let index: number;
		coste_op.forEach((valor, i, array)=>{
			if(valor === Math.min.apply(null, coste_op)){
				resultado = valor;
				index = i;
			}
		});
		return {
			"index": index,
			"valor": resultado
		}
	}
}
