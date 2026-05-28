import { PortfolioOverview } from "@/components/portfolio/portfolio-overview";
import { PortfolioStateHydrator } from "@/components/portfolio-state-hydrator";
import { Sidebar } from "@/components/layout/sidebar";
import { PostCard } from "@/components/posts/post-card";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { getPublishedPosts } from "@/lib/posts";
import { isPortfolioMode, parsePortfolioVisible } from "@/lib/portfolio";
import { logDatabaseConnectionStatus } from "@/lib/db-health";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  await logDatabaseConnectionStatus();

  const params = await searchParams;
  const portfolioMode = isPortfolioMode(params.portfolio);
  const portfolioVisible = parsePortfolioVisible(params.visible);
  const posts = getPublishedPosts();

  return (
    <div className="page-container">
      <PortfolioStateHydrator isPortfolioMode={portfolioMode} portfolioVisible={portfolioVisible} />
      <div className="page-grid">
        <div className="space-y-8">
          {portfolioMode ? (
            <PortfolioOverview visible={portfolioVisible} />
          ) : (
            <>
              <Section className="border border-border panel p-8">
                <p className="text-caption">Self-hosted Blog</p>
                <h1 className="text-display">Next.js로 운영 역량까지 보여주는 개인 블로그</h1>
                <p className="text-body text-muted">
                  MDX 게시글, 댓글, 관리자 인증, 조회 통계, Docker Compose 배포까지 하나의 App Router 애플리케이션에서 구현합니다.
                </p>
              </Section>

              <Section>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-caption">Latest Posts</p>
                    <h2 className="text-title">최신 글</h2>
                  </div>
                </div>
                <div className="grid gap-5">
                  {posts.map((post) => <PostCard key={post.slug} post={post} />)}
                </div>
              </Section>

              <Card className="markdown-body">
                <h2>Markdown 스타일 샘플</h2>
                <p>전역 <strong>.markdown-body</strong> 스타일은 제목, 문단, 링크, 목록, 코드, 표, 인용문에 중앙 토큰을 적용합니다.</p>
                <blockquote>개별 MDX 컴포넌트가 아니라 전역 CSS에서 Markdown typography를 관리합니다.</blockquote>
                <pre><code>{"npm run build"}</code></pre>
              </Card>
            </>
          )}
        </div>
        <Sidebar isPortfolioMode={portfolioMode} portfolioVisible={portfolioVisible} />
      </div>
    </div>
  );
}
