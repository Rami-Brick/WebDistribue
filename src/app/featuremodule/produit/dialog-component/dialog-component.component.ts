import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProduitService } from '../../../service/produit/produit.service';
import {Produit} from "../../../service/produit/Produit";

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.scss']
})
export class DialogComponentComponent implements OnInit {
  public produitForm!: FormGroup;

  constructor(
    private produitService: ProduitService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Produit
  ) {}

  ngOnInit(): void {
    // Initialiser le formulaire avec les valeurs du produit injecté
    this.produitForm = this.fb.group({
      nomProd: [this.data.nomProd, Validators.required],
      descriptionProd: [this.data.descriptionProd, Validators.required],
      prix: [this.data.prix, [Validators.required, Validators.min(0)]],
      quantiteEnStock: [this.data.quantiteEnStock, [Validators.required, Validators.min(0)]],
      couleur: [this.data.couleur, Validators.required],
      dateAjout: [this.data.dateAjout, Validators.required]
    });
  }

  updateProduit(): void {
    if (this.produitForm.valid) {
      const updatedProduit: Produit = {
        ...this.data,
        ...this.produitForm.value
      };

      this.produitService.updateProduit(this.data.idProd!, updatedProduit).subscribe(
        () => {
          console.log('Produit modifié avec succès', updatedProduit);
          this.dialogRef.close(true);
        },
          (error: any) => {
          console.error('Erreur lors de la modification du produit:', error);
        }
      );
    }
  }

  onNoClick(): void {
    this.dialogRef.close(); // Fermer la boîte de dialogue sans modification
  }
}
