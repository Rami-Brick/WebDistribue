import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EspacesService } from 'src/app/service/Espaces/espaces.service';
import { Espaces } from 'src/model/Espaces';

@Component({
  selector: 'app-update-espace',
  templateUrl: './update-espace.component.html',
  styleUrls: ['./update-espace.component.scss']
})
export class UpdateEspaceComponent implements OnInit {
  espaceId: number | null = null;
  espace: Espaces | null = null;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private espacesService: EspacesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.espaceId = idParam ? parseInt(idParam, 10) : null;

      if (this.espaceId) {
        console.log('ID récupéré:', this.espaceId);
        this.loadEspace();
      } else {
        console.error('Erreur : ID non récupéré');
      }
    });
  }

  // Charger les données de l'espace
  private async loadEspace() {
    if (this.espaceId) {
      try {
        const espaceObservable = await this.espacesService.getEspaceById(this.espaceId);
        espaceObservable.subscribe(
          (data) => {
            this.espace = data;
            console.log('Données chargées:', this.espace);
          },
          (error) => {
            console.error('Erreur lors du chargement de l\'espace', error);
            this.error = 'Erreur lors du chargement de l\'espace';
          }
        );
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'espace', error);
        this.error = 'Erreur lors de la récupération de l\'espace';
      }
    }
  }

  // Mettre à jour l'espace
  async updateEspace(): Promise<void> {
    if (this.espaceId && this.espace) {
      try {
        const updateObservable = await this.espacesService.updateEspace(this.espaceId, this.espace);
        updateObservable.subscribe(
          () => {
            console.log('Espace mis à jour avec succès');
            this.router.navigate(['/ListespacesBack']); // Rediriger après mise à jour
          },
          (error) => {
            console.error('Erreur lors de la mise à jour', error);
            this.error = 'Erreur lors de la mise à jour de l\'espace';
          }
        );
      } catch (error) {
        console.error('Erreur lors de la mise à jour', error);
        this.error = 'Erreur lors de la mise à jour de l\'espace';
      }
    }
  }
}
