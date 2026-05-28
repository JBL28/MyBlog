import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { PostSummary } from "@/lib/posts";

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <Card className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 text-caption">
        <span>{post.createdAt}</span>
        <span aria-hidden="true">·</span>
        <Link href={`/categories/${encodeURIComponent(post.category)}`} className="text-accent">
          {post.category}
        </Link>
        <span aria-hidden="true">·</span>
        <span>조회수 {post.views}</span>
      </div>
      <div className="space-y-2">
        <h2 className="text-section-title">
          <Link href={`/posts/${post.slug}`} className="hover:text-accent">
            {post.title}
          </Link>
        </h2>
        <p className="text-body text-muted">{post.description}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="border border-border bg-tag px-3 py-1 text-xs font-semibold text-tag-text">
            #{tag}
          </Link>
        ))}
      </div>
    </Card>
  );
}
