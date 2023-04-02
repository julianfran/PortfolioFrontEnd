import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, list, getDownloadURL } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url: string = "";
  fileName: string = "";
  nombreImg: string = ""
  constructor(private storage: Storage) { }
  
  public uploadImage($event: any){
    let file = $event.target.files[0]
    console.log(file)
    this.fileName = file.name
    console.log(this.fileName)
    const imgRef = ref(this.storage, `imagen/${file.name}`)
    uploadBytes(imgRef, file)
    .then(() =>{this.getImages()})
    .catch(error => console.log(error))
    }

    getImages(){
      const imagesRef = ref(this.storage, `imagen/${this.fileName}` );
      list(imagesRef)
      .then(async response =>{
        // for(let item of response.items){
          this.url = await getDownloadURL((imagesRef));
          console.log("La URL es: " + this.url);
        // }
      })
      .catch(error => console.log(error)
      )
    }
}
