import {Component, OnInit} from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import {Sort} from "@angular/material/sort";
import {DiscussionService} from "../../../service/discussion.service";
import {Discussion} from "../../../../model/Forum/Discussion";
import Swal from "sweetalert2";

@Component({
  selector: 'app-my-discussion',
  templateUrl: './my-discussion.component.html',
  styleUrls: ['./my-discussion.component.scss']
})
export class MyDiscussionComponent implements OnInit {
  public routes = routes;
  userDiscussions: Discussion[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private discussionService: DiscussionService) {}

  async ngOnInit(): Promise<void> {
    await this.fetchUserDiscussions();
  }

  private async fetchUserDiscussions(): Promise<void> {
    try {
      const discussionsObservable =  this.discussionService.getDiscussionsByUser();
      discussionsObservable.subscribe(
        (discussions: Discussion[]) => {
          this.userDiscussions = discussions;
          this.isLoading = false;
        },
        (error) => {
          this.error = 'Failed to load user discussions';
          console.error('Error fetching user discussions:', error);
          this.isLoading = false;
        }
      );
    } catch (error) {
      this.error = 'An unexpected error occurred';
      console.error('Unexpected error in fetchUserDiscussions:', error);
      this.isLoading = false;
    }
  }

  sortData(sort: Sort): void {
    // Implement sorting logic if needed
  }
   deleteDiscussion(discussionId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this discussion? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deleteObservable = await this.discussionService.deleteDiscussion(discussionId);
          deleteObservable.subscribe(
            () => {
              this.userDiscussions = this.userDiscussions.filter(d => d.discussionId !== discussionId);
              Swal.fire('Deleted!', 'Your discussion has been deleted.', 'success');
            },
            (error) => {
              console.error('Error deleting discussion:', error);
              Swal.fire('Error!', 'There was an issue deleting the discussion.', 'error');
            }
          );
        } catch (error) {
          console.error('Unexpected error while deleting discussion:', error);
          Swal.fire('Error!', 'An unexpected error occurred.', 'error');
        }
      }
    });
  }

}
