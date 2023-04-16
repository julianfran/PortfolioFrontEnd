import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

public proyecto: Proyecto[] = [];
public loading: boolean;
constructor(private proyectoS: ProyectoService, private tokenService: TokenService){
  this.loading = true;
}

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
  const listarProyectos = this.proyectoS.lista()
  .pipe(finalize(()=>{
    this.loading = false;
  }))
  .subscribe(data=>{
    this.proyecto = data
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
