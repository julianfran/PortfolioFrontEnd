import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/model/skill';
import { ImageService } from 'src/app/services/image.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {
  skill: Skill = null;

  constructor(private skillS: SkillService, private activatedRouter: ActivatedRoute,
     private router: Router,public imageService:ImageService){}
  

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.skillS.detail(id).subscribe(data =>{
      this.skill = data;
    }, err =>{
      alert("Hubo un problema al modificar el skill");
      this.router.navigate(['']);
    })
  }
 
  onUpdate(){
    const id = this.activatedRouter.snapshot.params['id'];
    this.skill.img = this.imageService.url;
    this.skillS.update(id, this.skill).subscribe(data =>{
      this.router.navigate(['']);
    }, err =>{
      alert("Hubo un problema al modificar la skill");
      this.router.navigate(['']);
    })
  }

  uploadImage($event:any){
    // const id = this.activatedRouter.snapshot.params['id'];
    // const name = "skill_" + id;
    this.imageService.uploadImage($event)
  }
}
