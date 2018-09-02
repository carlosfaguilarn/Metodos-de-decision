import { Component, OnInit, DoCheck, ViewChild } from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
 
export class AppComponent implements DoCheck {
	title = 'metodos';
	public columnas : number = 3; 
	public filas : number = 3;
	public col : number[] = [1];
	public fil : number[] = [1];
	public Datos : any;
	public I : number;
	public J : number;

	public datos  = [];

	element: HTMLInputElement; 
	

	constructor(){

	}
	ngDoCheck(){ 
		this.col.length = this.columnas;
		this.fil.length = this.filas;	
	}
	onSubmit(){
		console.log("filas: "+this.fil.length);
		console.log("columnas: "+this.col.length);
		for(var i = 0; i < this.fil.length; i++){
			var objeto = [];
			for(var j = 0; j < this.col.length; j++){
				let id = "dato"+i+"_"+j;
				this.element = document.getElementById(id) as HTMLInputElement; 
				console.log(id+": "+this.element.value);
				objeto.push(this.element.value);
				//console.log(id);
			}
			this.datos.push(objeto);
		}
		console.log(this.datos);
	}

}
