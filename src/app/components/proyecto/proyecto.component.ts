import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

proy: Proyecto[] = [];

constructor(private proyectoS: ProyectoService, private tokenService: TokenService){}

isLogged = false;

ngOnInit(): void {
  this.cargarProyectoS();
  if(this.tokenService.getToken()){
    this.isLogged = true;
  }
  else{
    this.isLogged = false;
  }
}

cargarProyectoS(): void{
  this.proyectoS.lista().subscribe(data=>{
    this.proy = data
  })
}

delete(id: number){
  if(id != undefined){
    this.proyectoS.delete(id).subscribe(data =>{
      this.cargarProyectoS();
    }, err  =>{
      alert("Error al borrar el proyecto")
    })
  }
}
}
