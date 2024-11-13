import {Component, OnInit} from '@angular/core';
import {Discussion, DiscussionStatus, VisibilityType} from "../../../../model/Forum/Discussion";
import {DiscussionService} from "../../../service/discussion.service";
import {ActivatedRoute} from "@angular/router";
import { routes } from 'src/app/core/helpers/routes/routes';
import {COMMA, ENTER} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-update-discussion',
  templateUrl: './update-discussion.component.html',
  styleUrls: ['./update-discussion.component.scss']
})
export class UpdateDiscussionComponent implements OnInit{
  discussionId: string | null = null;
  public routes = routes;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagInput = '';
  selectedTags: string[] = [];
  filteredTags: string[] = [];
  invitedUsersInput = '';

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


  constructor(    private discussionService: DiscussionService,    private route: ActivatedRoute

) {
}
  ngOnInit(): void {
    this.discussionId = this.route.snapshot.paramMap.get('id');
    if (this.discussionId) {
      this.loadDiscussion(this.discussionId);
    }
  }
  onTagChange(): void {
    this.discussion.tags = this.tagInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
  }

  onInvitedUsersChange(): void {
    this.discussion.invitedUsers = this.invitedUsersInput.split(',').map(user => user.trim()).filter(user => user !== '');
  }


  loadDiscussion(discussionId: string): void {
    this.discussionService.getDiscussionById(discussionId).subscribe(
      (data: Discussion) => {
        this.discussion = data;

        // Populate selectedTags and invitedUsersInput for display
        this.selectedTags = data.tags || [];
        this.invitedUsersInput = (data.invitedUsers || []).join(', '); // Convert array to a comma-separated string
      },
      (error) => {
        console.error('Error fetching discussion data:', error);
      }
    );
  }


  onSubmit(): void {
    if (this.discussion.discussionId) {
      this.discussionService.updateDiscussion(this.discussion.discussionId, this.discussion).subscribe(
        (updatedDiscussion) => {
          console.log('Discussion updated successfully:', updatedDiscussion);
          // Navigate or show a success message
        },
        (error) => {
          console.error('Error updating discussion:', error);
        }
      );
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
