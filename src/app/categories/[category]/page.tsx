import { PostCard } from "@/components/posts/post-card";
import { Section } from "@/components/ui/section";
import { getPostsByCategory } from "@/lib/posts";

type Params = Promise<{ category: string }>;

export default async function CategoryPage({ params }: { params: Params }) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const posts = getPostsByCategory(category);

  return (
    <div className="page-container space-y-8">
      <Section className="border border-border panel p-8">
        <p className="text-caption">Category</p>
        <h1 className="text-display">{decodedCategory}</h1>
      </Section>
      <div className="grid gap-5">
        {posts.map((post) => <PostCard key={post.slug} post={post} />)}
        {posts.length === 0 ? <p className="text-body text-muted">표시할 공개 게시글이 없습니다.</p> : null}
      </div>
    </div>
  );
}
