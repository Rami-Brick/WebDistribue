import { Component, OnInit } from '@angular/core';
import { routes } from "../../core/helpers/routes/routes";
import {Event as RouterEvent, NavigationEnd, Router} from "@angular/router";
import {SidebarService} from "../../service/sidebar.service";
import {CommonService} from "../../service/common.service";
import {url} from "../../shared/models/header.model";
import {DiscussionService} from "../../service/discussion.service";
import {Discussion} from "../../../model/Forum/Discussion";

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  showMiniSidebar = false;
  public base = '';
  public page = '';
  public last = '';
  public routes = routes;
  public tittle = 'Home';
  discussions: Discussion[] = [];
  isLoading = true;
  error: string | null = null;
  public strokeValue = 0;
  public progress = 0;
  public firstHeader = false;
  public hideFooter = false;
  hover = false; // Removed the type annotation as it is inferred by TypeScript

  constructor(
    private router: Router,
    private sidebar: SidebarService,
    private common: CommonService,
    private discussionService: DiscussionService
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        // call the function to apply condition in page changes
        this.getroutes(event);
      }
    });
    this.sidebar.toogleSidebar.subscribe((res: string) => {
      if (res == 'true') {
        this.showMiniSidebar = true;
      } else {
        this.showMiniSidebar = false;
      }
    });
  }

  ngOnInit(): void {
    this.calculateScrollPercentage();
    this.fetchDiscussions();

  }
  private  fetchDiscussions(): void{
    try {
      const discussionsObservable =  this.discussionService.getAllDiscussions();
      discussionsObservable.subscribe(
        (data) => {
          this.discussions = data;
          this.isLoading = false;
        },
        (error) => {
          this.error = 'Failed to load discussions';
          console.error('Error fetching discussions:', error);
          this.isLoading = false;
        }
      );
    } catch (error) {
      this.error = 'An unexpected error occurred';
      console.error('Error in fetchDiscussions:', error);
      this.isLoading = false;
    }
  }
  // scroll the page to top position
  public scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  // function to calculate the scroll progress
  private calculateScrollPercentage(): void {
    window.addEventListener('scroll', () => {
      const body = document.body,
        html = document.documentElement;
      //gets the total height of page till scroll
      const totalheight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      // calculates the total stroke value
      this.progress = totalheight;
      const currentDistance = window.scrollY / (totalheight / 3000);
      // calculates the current stroke value
      this.strokeValue = totalheight - currentDistance / 8;
      // condition to hide scroll progress if page in top
      if (window.scrollY == 0) {
        this.strokeValue = totalheight;
      }
      // condition to make scroll progress to 100 if page in bottom
      if (window.innerHeight + window.scrollY >= totalheight) {
        this.strokeValue = 0;
      }
    });
  }

  // function to get the route details and apply condition based on page
  private getroutes(route: url): void {
    const splitVal = route.url.split('/');
    this.base = splitVal[1];
    this.page = splitVal[2];
    this.last = splitVal[3];
    // case to change the tab name according to route
    switch (splitVal.length) {
      case 2:
        this.tittle = this.base;
        break;
      case 3:
        this.tittle = this.page;
        break;
      case 4:
        this.tittle = this.last;
        break;

      default:
        this.tittle = 'Template';
        break;
    }
    // hide home one in other home pages
    if (
      route.url == routes.home2 ||
      route.url == routes.home3 ||
      route.url == routes.home4 ||
      route.url == routes.home5 ||
      route.url == routes.home6 ||
      route.url == routes.home7 ||
      route.url == routes.home8 ||
      route.url == routes.home9
    ) {
      this.firstHeader = false;
    } else {
      this.firstHeader = true;
    }

    // hide the footer in list map and grid page
    if (
      route.url == routes.listingmaplist ||
      route.url == routes.listingmapgrid
    ) {
      this.hideFooter = true;
    } else {
      this.hideFooter = false;
    }
  }
  toggleLike(discussion: Discussion): void {
    if (discussion.userHasLiked) {
      this.unlikeDiscussion(discussion);
    } else {
      this.likeDiscussion(discussion);
    }
  }

  likeDiscussion(discussion: Discussion): void {
    this.discussionService.likeDiscussion(discussion.discussionId).subscribe(
      (updatedDiscussion) => {
        discussion.likes = updatedDiscussion.likes;
        discussion.userHasLiked = true; // Set userHasLiked to true
        console.log('Discussion liked successfully');
      },
      (error) => {
        console.error('Error liking discussion:', error);
      }
    );
  }

  unlikeDiscussion(discussion: Discussion): void {
    this.discussionService.unlikeDiscussion(discussion.discussionId).subscribe(
      (updatedDiscussion) => {
        discussion.likes = updatedDiscussion.likes;
        discussion.userHasLiked = false; // Set userHasLiked to false
        console.log('Discussion unliked successfully');
      },
      (error) => {
        console.error('Error unliking discussion:', error);
      }
    );
  }

}
