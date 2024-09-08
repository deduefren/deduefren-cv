import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-section',
  templateUrl: './blog-section.component.html',
  styleUrls: ['./blog-section.component.css']
})
export class BlogSectionComponent {

  // Bind to the search event
  search(event: any) {
    console.log(event);
  }

  posts = [
    {
      title: 'Chat GPT Toolkit',
      date: new Date('2021-01-01'),
      hint: 'A toolkit for building conversational agents',
      filePath: 'assets/articles/file.md'
    },
    {
      title: 'AI Advancements',
      date: new Date('2021-02-01'),
      hint: 'The latest advancements in AI',
      filePath: 'assets/articles/file.md'
    },
    {
      title: 'Machine Learning Impact',
      date: new Date('2021-03-01'),
      hint: 'The impact of machine learning on society',
      filePath: 'assets/articles/file.md'
    }
  ];
}