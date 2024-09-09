import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-section',
  templateUrl: './blog-section.component.html',
  styleUrls: ['./blog-section.component.css']
})
export class BlogSectionComponent {

  // Bind to the search event
  search(event: any) {
    if (event.target.value) {
      this.displayedPosts = this.posts.filter(post => post.title.toLowerCase().includes(event.target.value.toLowerCase()));
    } else {
      this.displayedPosts = this.posts;
    }
  }

  posts = [
    {
      title: 'Chat GPT Toolkit',
      date: new Date('2021-01-01'),
      hint: 'This is the content of post 1 which is based on a new toolkit for Chat GPT. The toolkit includes various features that enhance the capabilities of Chat GPT.',
      filePath: 'assets/articles/file.md'
    },
    {
      title: 'AI Advancements',
      date: new Date('2021-02-01'),
      hint: 'This is the content of post 1 which is based on a new toolkit for Chat GPT. The toolkit includes various features that enhance the capabilities of Chat GPT.',
      filePath: 'assets/articles/file.md'
    },
    {
      title: 'Machine Learning Impact',
      date: new Date('2021-03-01'),
      hint: 'This is the content of post 1 which is based on a new toolkit for Chat GPT. The toolkit includes various features that enhance the capabilities of Chat GPT.',
      filePath: 'assets/articles/file.md'
    }
  ];

  displayedPosts = this.posts;
}