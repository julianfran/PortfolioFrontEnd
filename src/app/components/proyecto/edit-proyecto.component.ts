import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ImageService } from 'src/app/services/image.service';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./edit-proyecto.component.css']
})
export class EditProyectoComponent implements OnInit {
  proyecto: Proyecto = null;

  constructor(private proyectoS: ProyectoService, private activatedRouter: ActivatedRoute,
    private router: Router, public imageService:ImageService){}

    ngOnInit(): void {
      const id = this.activatedRouter.snapshot.params['id'];
      this.proyectoS.detail(id).subscribe(data =>{
        this.proyecto = data;
      }, err =>{
        alert("Hubo un problema al modificar el skill");
        this.router.navigate(['']);
      })
    }

    onUpdate(){
      const id = this.activatedRouter.snapshot.params['id'];
      this.proyecto.logo = this.imageService.url;
      this.proyecto.imgFondo = this.imageService.url;
      this.proyectoS.update(id, this.proyecto).subscribe(data =>{
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
