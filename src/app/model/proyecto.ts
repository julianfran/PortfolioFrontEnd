export class Proyecto {
    id?: number;
    nombre: string;
    descripcion: string;
    logo: string;
    enlaceGit: string;
    enlaceWeb: string;

    constructor(nombre: string, descripcion: string, logo: string, enlaceGit: string, enlaceWeb: string){
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.logo = logo;
      this.enlaceGit = enlaceGit;
      this.enlaceWeb = enlaceWeb;  
    }
}
