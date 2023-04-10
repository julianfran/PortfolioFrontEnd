import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/services/educacion.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educacion: Educacion[] = [];
  public loading: boolean;
  constructor(private educacionS: EducacionService, private tokenService: TokenService){
    this.loading = true
  }

  isLogged = false;

  ngOnInit(): void {
    this.cargarEducacion();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }
    else{
      this.isLogged = false;
    }
  }

  cargarEducacion(): void{
    const listarEducacion = this.educacionS.lista()
    .pipe(finalize(()=>{
      this.loading = false;
    }))
    .subscribe(data=>{
      this.educacion = data;
    })
  }

  delete(id?: number){
    if(id != undefined){
      this.educacionS.delete(id).subscribe(data=>{
        this.cargarEducacion();
      },err =>{
        alert("No se pudo eliminar el elemento");
      })
    }
  }
}
