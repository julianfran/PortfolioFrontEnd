import { UnaryOperatorExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
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
  persona: Persona = null;

  constructor(public personaService: PersonaService, private tokenService: TokenService) {}
  
  isLogged = false;


  

  
  get backListo(): boolean{
    return !!this.persona.descripcion;
  }


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
    this.personaService.detail(1).subscribe(data=>{
      this.persona = data;
    })
  }
 
  get URL(){
    return this.personaService.URL;
  }

}
