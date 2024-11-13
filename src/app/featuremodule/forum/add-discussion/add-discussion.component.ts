import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import {DiscussionService} from "../../../service/discussion.service";
import {Discussion, DiscussionStatus, VisibilityType} from "../../../../model/Forum/Discussion";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-discussion',
  templateUrl: './add-discussion.component.html',
  styleUrls: ['./add-discussion.component.scss']
})
export class AddDiscussionComponent {
  public routes = routes;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagInput = '';
  selectedTags: string[] = [];
  filteredTags: string[] = [];

  discussion: Discussion = {
    discussionId: '',
    title: '',
    content: '',
    createdAt: new Date(),
    userId: '',
    visibility: VisibilityType.PUBLIC,
    likes: 0,
    comments: 0,
    tags: [],
    pinned: false,
    viewCount: 0,
    sentimentScore: 0,
    commentList: [],
    invitedUsers: [],
    status: DiscussionStatus.PENDING_APPROVAL,
    userHasLiked : false
  };

  visibilityTypes = Object.values(VisibilityType);
  invitedUsersInput = '';

  constructor(private router: Router,private discussionService: DiscussionService) {}

  onTagChange(): void {
    this.discussion.tags = this.tagInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
  }

  onInvitedUsersChange(): void {
    this.discussion.invitedUsers = this.invitedUsersInput.split(',').map(user => user.trim()).filter(user => user !== '');
  }

   onSubmit(): void {
    // Assurez-vous que les tags sélectionnés sont ajoutés à la discussion avant l'envoi
    this.discussion.tags = this.selectedTags;

    try {
      (this.discussionService.createDiscussion(this.discussion)).subscribe(
        response => {
          console.log('Discussion created successfully:', response);
          // Redirect to forum after successful submission
          this.router.navigate(['/forum']);
        },
        error => {
          console.error('Error creating discussion:', error);
        }
      );
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }

  addTag(event: any): void {
    console.log('Event value:', event.value);
    console.log('Event input:', event.input);

    const value = (event.value || '').trim();
    if (value && !this.selectedTags.includes(value)) {
      this.selectedTags.push(value);
      console.log('Tag ajouté:', value);
    }

    if (event.input) {
      event.input.value = '';
    }
    this.tagInput = '';
  }


  removeTag(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }
  }

  selectTag(event: any): void {
    const value = event.option.viewValue;
    if (!this.selectedTags.includes(value)) {
      this.selectedTags.push(value);
    }
    this.tagInput = '';
  }
}
