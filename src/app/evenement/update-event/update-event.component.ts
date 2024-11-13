import { Component,Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EvenementService } from 'src/app/service/evenement-module/evenement.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss']
})
export class UpdateEventComponent implements OnInit {
  eventForm: FormGroup;
  eventId: number | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private evenementService: EvenementService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Event

  ) {
    // Initialize the form with validators
    this.eventForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      lieu: ['', Validators.required],
      nombreParticipants: [0, [Validators.required, Validators.min(1)]],
      organisateur: ['', Validators.required],
      prix: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.eventId = idParam ? parseInt(idParam, 10) : null;

      if (this.eventId) {
        this.loadEvent();
      } else {
        console.error('Erreur : ID non récupéré');
      }
    });
  }

  // Load event details into the form
  private loadEvent(): void {
    if (this.eventId) {
      this.evenementService.getEventById(this.eventId).subscribe(
        data => {
          this.eventForm.patchValue(data);
        },
        error => {
          console.error('Erreur lors du chargement de l\'événement', error);
          this.error = 'Erreur lors du chargement de l\'événement';
        }
      );
    }
  }

  // Update event
  updateEvent(): void {
    if (this.eventForm.valid && this.eventId) {
      this.evenementService.updateEvent(this.eventId, this.eventForm.value).subscribe(
        () => {
          console.log('Événement mis à jour avec succès');
          this.router.navigate(['/listevents']); // Redirect after update
        },
        error => {
          console.error('Erreur lors de la mise à jour', error);
          this.error = 'Erreur lors de la mise à jour de l\'événement';
        }
      );
    }
  }

  // Cancel update
  onNoClick(): void {
    this.router.navigate(['/listevents']);
  }
}
