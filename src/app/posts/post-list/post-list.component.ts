import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
// we import subscription bc we don't want the .subscribe on
// getPostUpdateListener to continue even when this component is not
// on the DOM. so we store the subscription in a new property.

import { Post } from '../post.model';
import { PostsService } from '../posts.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
posts: Post[] = [];
private postsSub: Subscription;

constructor(public postsService: PostsService) {}
// ngOnInit is a function Angular will automatically execute for us when it creates
// this component. its recommended to do basic initialization tasks in ngOnInit.
    ngOnInit() {
      this.postsService.getPosts();
      this.postsSub = this.postsService.getPostUpdateListener()
        .subscribe((posts: Post[]) => {
          this.posts = posts;
        });
        // this.postsService.getPostUpdateListener sets up a listener
        // to the Subject from rxjs (aka Observable) from posts.service.ts
        // .subscribe is a method that takes three possible arguments 1. function that gets executed when
        // new data is emitted 2. function when there's an error, this won't happen here
        // 3. function when there's no new Data, this wont' happen here either.
    }

    ngOnDestroy() {
      this.postsSub.unsubscribe();
      // this will prevent memory leaks
    }
}
