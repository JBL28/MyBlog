import { PostCard } from "@/components/posts/post-card";
import { Section } from "@/components/ui/section";
import { getPublishedPosts } from "@/lib/posts";

export const metadata = {
  title: "게시글",
};

export default function PostsPage() {
  const posts = getPublishedPosts();

  return (
    <div className="page-container space-y-8">
      <Section className="border border-border panel p-8">
        <p className="text-caption">Posts</p>
        <h1 className="text-display">게시글 목록</h1>
        <p className="text-body text-muted">MDX 게시글 목록, 페이지네이션, 검색은 다음 단계에서 실제 콘텐츠 파서와 연결합니다.</p>
      </Section>
      <div className="grid gap-5">
        {posts.map((post) => <PostCard key={post.slug} post={post} />)}
      </div>
    </div>
  );
}
