import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent {
  @Input() post: any;
  collapsed = true;

  toggleCollapse() {
	this.collapsed = !this.collapsed;
  }

  getExcerpt(content: string, length: number): string {
	return content.length > length ? content.slice(0, length) + '...' : content;
  }
}