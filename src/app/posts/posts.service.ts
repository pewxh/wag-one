import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  getPosts() {
    this.http
      .get<{ message: string; posts: Post[] }>(
        'http://127.0.0.1:3000/api/posts'
      )
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postUpdated.next([...this.posts]);
      });
  }
  addPost(title: string, content: string) {
    this.posts.push({ id: null, title: title, content: content });
    this.postUpdated.next([...this.posts]);
  }
  getPostUpdatedListener() {
    return this.postUpdated.asObservable();
  }
  constructor(private http: HttpClient) {}
}
