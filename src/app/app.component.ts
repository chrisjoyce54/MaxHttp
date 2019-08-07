import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isLoading = false;
  error = null;
  private errorSubscription: Subscription;
  constructor(private http: HttpClient, private postService: PostsService) {}

  ngOnInit() {
    this.errorSubscription = this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    })
    this.isLoading = true;
    this.postService.fetchPosts().subscribe(posts => {
      // ...
      console.log(posts);
      this.isLoading = false;
      this.loadedPosts = posts;
    }, error => {
      this.isLoading = false;
      this.error = error.message;
    });    
    }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData.title, postData.content);
    // Send Http request
    
  }
  onFetchPosts() {
    this.isLoading = true;
    this.postService.fetchPosts().subscribe(posts => {
      // ...
      console.log(posts);
      this.isLoading = false;
      this.loadedPosts = posts;
    }, error => {
      this.isLoading = false;
      this.error = error.message;
    });    
    }


    ngOnDestroy(): void {
      this.errorSubscription.unsubscribe();
    }

    onHandleError() {
      this.error = null;
    }
  // onFetchPosts() {
  //   this.http
  //     .get(
  //       'https://ng-complete-guide-74acf.firebaseio.com/posts.json')
  //       .pipe(
  //         map((responseData: { [key: string]: Post}) => {
  //           const postsArray: Post[] = [];
  //           for (const key in responseData) {
  //             if (responseData.hasOwnProperty(key)) {
  //               postsArray.push({ ...responseData[key], id: key });
  //             }
  //           }
  //           return postsArray;
  //         })
  //       )
  //       .subscribe(posts => {
  //         // ...
  //         console.log(posts);
  //       });
  //   }

  onClearPosts() {
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }
}
