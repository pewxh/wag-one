import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  private postId: string;
  post: Post;
  enteredTitle = '';
  enteredContent = '';
  isLoading = false;
  onSave(form: NgForm) {
    if (form.invalid) return;
    // const post: Post = {
    //   id: null,
    //   title: form.value.title,
    //   content: form.value.content,
    // };
    // this.postsService.addPost(post['id'], post['title'], post['content']);
    this.isLoading = true;
    if (this.mode === 'create')
      this.postsService.addPost(form.value.title, form.value.content);
    else {
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
  }
  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        //
        this.isLoading = true;
        //
        this.postsService.getPost(this.postId).subscribe((postData) => {
          //
          this.isLoading = false;
          //
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
          };
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
}
