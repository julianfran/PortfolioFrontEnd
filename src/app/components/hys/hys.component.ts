import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/services/skill.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-hys',
  templateUrl: './hys.component.html',
  styleUrls: ['./hys.component.css']
})
export class HysComponent implements OnInit {
  skill: Skill[] = [];
  public loading: boolean;
  constructor(private skillS: SkillService, private tokenService: TokenService){
    this.loading = true;
  }

  isLogged = false;

  ngOnInit(): void {
    this.cargarSkills();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }
    else{
      this.isLogged = false;
    }
  }

  cargarSkills(): void{
    const listarSkills = this.skillS.lista()
    .pipe(finalize(()=>{
      this.loading = false;
    }))
    .subscribe(data=>{
      this.skill = data
      alert
    })
  }
  
  delete(id: number){
    if(id != undefined){
      this.skillS.delete(id).subscribe(data =>{
        this.cargarSkills();
      }, err  =>{
        alert("Error al borrar la skill")
      })
    }
  }
}
