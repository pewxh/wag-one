import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  getPosts() {
    return [...this.posts];
  }
  addPost(title: string, content: string) {
    this.posts.push({ title: title, content: content });
    this.postUpdated.next([...this.posts]);
  }
  getPostUpdatedListener() {
    return this.postUpdated.asObservable();
  }
  constructor() {}
}
