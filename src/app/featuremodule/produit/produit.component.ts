import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../service/produit/produit.service';
import { Produit } from '../../service/produit/Produit';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponentComponent} from "./dialog-component/dialog-component.component";

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {
  public produits: Produit[] = [];
  public newProduit: Produit = new Produit();
  public selectedProduit: Produit | null = null;

  protected showForm: boolean = false;
  protected showUpdateForm: boolean = false; // Contrôle de la modale de mise à jour










  constructor(private produitService: ProduitService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchProduit();
  }

  private async fetchProduit(): Promise<void> {
    try {
      const produitObservable = await this.produitService.getAllProduit();
      produitObservable.subscribe(
        (data: Produit[]) => {
          this.produits = data;
        },
        (error) => {
          console.error('Error fetching produits:', error);
        }
      );
    } catch (error) {
      console.error('Error in fetchProduit:', error);
    }
  }

  async addProduit(): Promise<void> {
    try {
      const createObservable = await this.produitService.createProduit(this.newProduit);
      createObservable.subscribe(
        (produit: Produit) => {
          this.produits.push(produit);
          console.log('Produit ajouté:', produit);
          this.newProduit = new Produit();
          this.showForm = false;
        },
        (error) => {
          console.error('Error adding produit:', error);
        }
      );
    } catch (error) {
      console.error('Error in addProduit:', error);
    }
  }

  async deleteProduit(id: any): Promise<void> {
    try {
      const deleteObservable = await this.produitService.deleteProduit(id);
      deleteObservable.subscribe(
        () => {
          this.produits = this.produits.filter(produit => produit.idProd !== id);
          console.log(`Produit avec ID ${id} supprimé.`);
        },
        (error) => {
          console.error('Error deleting produit:', error);
        }
      );
    } catch (error) {
      console.error('Error in deleteProduit:', error);
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  openUpdateForm(produit: Produit): void {
    this.selectedProduit = { ...produit }; // Crée une copie du produit sélectionné
    this.showUpdateForm = true; // Affiche la modale de mise à jour
  }

  viewProduit(produit: Produit) {
    // Ajoutez la logique pour afficher les détails du produit ici
    this.selectedProduit = produit;
    this.showUpdateForm = true;
  }




  public modifierDialog(prod: Produit) {
    localStorage.setItem('data', JSON.stringify(prod));
    const dialogRef = this.dialog.open(DialogComponentComponent, {
      width: '1200px',
      height: '1100px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      data: prod
    });
  }




}
