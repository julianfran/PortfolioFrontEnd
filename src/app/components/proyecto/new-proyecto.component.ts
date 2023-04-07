import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ImageService } from 'src/app/services/image.service';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-new-proyecto',
  templateUrl: './new-proyecto.component.html',
  styleUrls: ['./new-proyecto.component.css']
})
export class NewProyectoComponent implements OnInit {
  id: number;
  nombre: string;
  descripcion: string;
  logo: string;
  enlaceGit: string;
  enlaceWeb: string;

  constructor(private proyectoS: ProyectoService, private router: Router,
    private activateRouter: ActivatedRoute, public imageService: ImageService) { }

  ngOnInit(): void {
  }



  onCreate() {
    this.logo = this.imageService.url
    const proy = new Proyecto(this.nombre, this.descripcion, this.logo, this.enlaceGit, this.enlaceWeb);
    this.proyectoS.save(proy).subscribe(data => {
      alert("Proyecto creado");
      this.router.navigate(['']);
    }, err => {
      alert("Error al crear el proyecto");
      this.router.navigate(['']);
    })
  }
  uploadImage($event: any) {
    // const id = this.id
    // const name = "skill_" + this.nombre;
    this.imageService.uploadImage($event)
  }
}
