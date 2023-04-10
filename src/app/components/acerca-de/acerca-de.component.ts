import { UnaryOperatorExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { list } from '@firebase/storage';
import { finalize } from 'rxjs';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/services/persona.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css'],
  template: '<ng-template #mostrar></ng-template>'
})
export class AcercaDeComponent implements OnInit {
  public persona: Persona = undefined
  public loading: boolean;
  
  constructor(public personaService: PersonaService, private tokenService: TokenService) {
    this.loading = true;
  }
  
  isLogged = false;

  ngOnInit(): void {
    
    this.cargarPersona()
    
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }
    else{
      this.isLogged = false;
    }
  }

  cargarPersona(){
    const listarPersonas = this.personaService.detail(1)
    .pipe(finalize(()=>{
      this.loading = false;
    }))
    .subscribe(data=>{
      this.persona = data;
    })
    
    
  }

}
