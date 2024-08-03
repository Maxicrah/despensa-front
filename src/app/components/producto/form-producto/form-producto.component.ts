import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto';

@Component({
  selector: 'app-form-producto',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-producto.component.html',
  styleUrl: './form-producto.component.css'
})
export class FormProductoComponent {  
  
  private _productoService = inject(ProductoService);

  //product !: Producto;
  productForm: FormGroup;
  currentDate: string;
  producto: Producto = new Producto();
  imagen: File | null = null;

  constructor(private fb: FormBuilder) {
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];

    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [{ value: null, disabled: true }, [Validators.required, Validators.min(0)]],
      imagen: [null, Validators.required],
      costo_adquisicion: [null, [Validators.required, Validators.min(0)]],
      fecha_vencimiento: ['', [Validators.required, this.minDateValidator.bind(this)]],
      fecha_ingreso: [{ value: this.currentDate, disabled: true }, Validators.required],
      marca: ['', Validators.required],
      stock: [null, [Validators.required, Validators.min(0)]],
      promocion: [''],
      notas_adicionales: ['']
    });

        // Escuchar cambios en el costo de adquisición y calcular el precio automáticamente
    this.productForm.get('costo_adquisicion')?.valueChanges.subscribe(value => {
      const calculatedPrice = value ? value * 1.3 : 0;
      this.productForm.get('precio')?.setValue(calculatedPrice.toFixed(2), { emitEvent: false });
    });
  
  }

  

  minDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && new Date(control.value) < new Date(this.currentDate)) {
      return { 'minDate': true };
    }
    return null;
  }

  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Imagen seleccionada:', file);
      this.imagen = file;
      this.productForm.patchValue({ imagen: file });
    } else {
      console.log('No se seleccionó ninguna imagen');
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Producto = this.productForm.getRawValue();
      product.fecha_ingreso = new Date(this.currentDate);

      if (this.imagen) {
        this._productoService.createProducto(product, this.imagen).subscribe({
          next: (response) => {
            console.log('Producto creado exitosamente:', response);
            alert('Producto creado exitosamente');
             // Limpiar el formulario y la imagen después de la creación
             this.productForm.reset();
             this.imagen = null;
             
             // Resetear la fecha de ingreso a la fecha actual
             this.productForm.patchValue({ fecha_ingreso: this.currentDate });
             
          },
          error: (error) => {
            console.error('Error al crear el producto:', error);
            alert(`Error al crear el producto: ${error.message}`);
          }
        });
      } else {
        console.log('Imagen no seleccionada');
      }
    } else {
      console.log('Formulario inválido');
    }
  }
}