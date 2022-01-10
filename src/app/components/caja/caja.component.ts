import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscriber } from 'rxjs';
import { CajaService } from 'src/app/services/caja.service';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {
listCaja:any[]= [];
accion='AGREGAR';
form:FormGroup;
id: number|undefined;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _cajaServicice: CajaService) {
    this.form =this.fb.group({
      nombredocumento:['', [ Validators.required,Validators.maxLength(100),Validators.minLength(1)]],
      ubicacion:['', [Validators.required,Validators.maxLength(100),Validators.minLength(1)]],
      tamanio:['',[Validators.required,Validators.maxLength(100),Validators.minLength(1)]],
      extension:['',[Validators.required,Validators.minLength(1)]],
      codigo:['',[Validators.required,Validators.maxLength(100),Validators.minLength(1)]]
    })
   }

  ngOnInit(): void {
    this.obtenercaja();
  }

obtenercaja() {
  this._cajaServicice.getListCaja().subscribe(data => {
    console.log(data);
    this.listCaja=data;
  }, error=>{
    console.log(error);
  })  
}

 guardarCaja(){

  const Caja:any={
    nombredocumento: this.form.get('nombredocumento')?.value,
    ubicacion: this.form.get('ubicacion')?.value,
    tamanio: this.form.get('tamanio')?.value,
    extension: this.form.get('extension')?.value,
    codigo: this.form.get('codigo')?.value
   }
   if (this.id==undefined){
     //new
      this._cajaServicice.saveCaja(Caja).subscribe(data => {
      this.toastr.success('El documento se agrego con exito!', 'Nuevo Documento!');
      this.obtenercaja();
      this.form.reset();
     }, error=> {
       this.toastr.error('Ocurrio un error.....','Error');
       console.log(error);
     })
   }else{
    //edit
    Caja.id = this.id;
     this._cajaServicice.updateCaja(this.id,Caja).subscribe(data =>{
      this.form.reset();
      this.accion='AGREGAR';
      this.id=undefined;
      this.toastr.info('La caja se modifico con exito!','Actualizada');
      this.obtenercaja();
    }, error=> {
      console.log(error);     
    })
   }   
  }

    eliminarCaja(id: number){
      this._cajaServicice.deleteCaja(id).subscribe(data =>{
      this.toastr.error('El documento se elimino!', 'Documento Eliminado!');
      this.obtenercaja();
      }, error =>{
        console.log(error);
      });      
    }

    editarCaja(caja:any){
      this.accion="EDITAR";
      this.id=caja.id;

      this.form.patchValue({
        nombredocumento: caja.nombredocumento,
        ubicacion: caja.ubicacion,
        tamanio: caja.tamanio,
        extension: caja.extension,
        codigo: caja.codigo
      })
    }
}
