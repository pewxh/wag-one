import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  getPosts() {
    this.http
      .get<{ message: string; posts: any }>('http://127.0.0.1:3000/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        })
      )
      .subscribe((alteredPostData) => {
        this.posts = alteredPostData;
        this.postUpdated.next([...this.posts]);
      });
  }
  addPost(id: string, title: string, content: string) {
    const post: Post = {
      id: id,
      title: title,
      content: content,
    };

    this.http
      .post<{ message: string }>('http://localhost:3000/api/posts', post)
      .subscribe((resp) => {
        console.log(resp.message);
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });
  }
  getPostUpdatedListener() {
    return this.postUpdated.asObservable();
  }
  constructor(private http: HttpClient) {}
}
