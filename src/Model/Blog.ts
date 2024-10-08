// types.ts (or interfaces.ts)

export interface IBlog {
  _id: number;
  blog_title: string;
  blog_body: string;
  blog_tags: string;
  blog_link ?: string;
}
