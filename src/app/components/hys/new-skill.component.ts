import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/model/skill';
import { ImageService } from 'src/app/services/image.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-new-skill',
  templateUrl: './new-skill.component.html',
  styleUrls: ['./new-skill.component.css']
})
export class NewSkillComponent implements OnInit{
  id: number;
  nombre: string;
  porcentaje: number;
  img: string;

  constructor(private skillS: SkillService, private router: Router, 
    private activatedRouter: ActivatedRoute,
    public imageService:ImageService){}

  ngOnInit(): void {
    
  }
  onCreate(){
    this.img = this.imageService.url
    const skill = new Skill(this.nombre, this.porcentaje, this.img);
    this.skillS.save(skill).subscribe(data =>{
      alert("Skill creada");
      this.router.navigate(['']);
    }, err =>{
      alert("Error al crear la skill");
      this.router.navigate(['']);
    })
  }
  uploadImage($event:any){
    // const id = this.id
    // const name = "skill_" + this.nombre;
    this.imageService.uploadImage($event)
  }
}
