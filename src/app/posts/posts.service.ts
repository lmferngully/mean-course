// study this for the term Dependency Injection. Go to the component
// where you want the particular service,or method that is listed
// in this service file, and use the constructor keyword
// constructor is a function that is called whenever Angular
// creates a new instance of this component.


import { Post } from './post.model';
import { Injectable } from '../../../node_modules/@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post [] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts])
      });

  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  // getPostUpdateListener lets us listen to the private subject postsUpdated
  // returns an object to which we cna listen but we can't emit.

  addPost(title: string, content: string) {
    const post: Post = {id: null, title: title, content: content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
    // above line pushes a copy of the updated posts array using the spread operator
    // ...this.posts
  }
}
