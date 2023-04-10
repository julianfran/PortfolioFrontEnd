import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/model/experiencia';
import { SExperienciaService } from 'src/app/services/s-experiencia.service';
import { TokenService } from 'src/app/services/token.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit{
  public expe: Experiencia[] = [];
  public loading: boolean;
  constructor(private sExperiencia: SExperienciaService, private tokenService: TokenService){
    this.loading = true
  }

  isLogged = false;

  ngOnInit(): void {
    this.cargarExperiencia();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }
    else{
      this.isLogged = false;
    }
    
  }

  cargarExperiencia(): void{
    const listarExperiencia = this.sExperiencia.lista()
    .pipe(finalize(()=>{
      this.loading = false;
    }))
    .subscribe(data=>{
      this.expe = data;
    })
  }

  delete(id?: number){
    if(id != undefined){
      this.sExperiencia.delete(id).subscribe(data=>{
        this.cargarExperiencia()
      }, err =>{
        alert("Error al eliminar la experiencia")
      })
    }
  }

}

