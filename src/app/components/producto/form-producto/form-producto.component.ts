import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-producto',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-producto.component.html',
  styleUrl: './form-producto.component.css'
})
export class FormProductoComponent {  productForm: FormGroup;
  currentDate: string;

  constructor(private fb: FormBuilder) {
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];

    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [null, [Validators.required, Validators.min(0)]],
      imagen: [null, Validators.required],
      costo_adquisicion: [null, [Validators.required, Validators.min(0)]],
      fecha_vencimiento: ['', [Validators.required, this.minDateValidator.bind(this)]],
      fecha_ingres: [{ value: this.currentDate, disabled: true }, Validators.required],
      marca: ['', Validators.required],
      stock: [null, [Validators.required, Validators.min(0)]],
      promocion: [''],
      notas_adicionales: ['']
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
      this.productForm.patchValue({
        imagen: file
      });
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      console.log('Form Data:', this.productForm.value);
      // Aquí puedes procesar los datos del formulario
    } else {
      console.log('Form is invalid');
    }
  }
}