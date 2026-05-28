import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { PortfolioVisibleState } from "@/lib/portfolio";

const categories = ["Next.js", "운영", "회고"];
const recentPosts = ["홈서버 블로그 구축기", "MDX 작성 규칙", "운영 자동화 메모"];
const popularPosts = ["Docker Compose 배포", "Prisma 통계 모델링", "관리자 세션 설계"];

export function Sidebar({
  isPortfolioMode,
  portfolioVisible,
}: {
  isPortfolioMode: boolean;
  portfolioVisible: PortfolioVisibleState;
}) {
  return (
    <aside className="space-y-5">
      <Card className="space-y-3">
        <p className="text-caption">프로필</p>
        {isPortfolioMode ? (
          <div className="space-y-2">
            {portfolioVisible.name ? <h2 className="text-xl font-bold">홍길동</h2> : null}
            {portfolioVisible.email ? <p className="text-caption">hello@example.com</p> : null}
            {portfolioVisible.phone ? <p className="text-caption">010-0000-0000</p> : null}
            {portfolioVisible.links ? (
              <div className="flex flex-wrap gap-2 text-sm font-semibold text-accent">
                <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
                <a href="/" target="_blank" rel="noreferrer">Blog</a>
              </div>
            ) : null}
          </div>
        ) : (
          <p className="text-body text-muted">Next.js, PostgreSQL, 홈서버 운영을 기록하는 개인 블로그입니다.</p>
        )}
      </Card>

      <Card className="space-y-3">
        <h2 className="text-section-title">카테고리</h2>
        <ul className="space-y-2 text-sm text-muted">
          {categories.map((category) => (
            <li key={category}>
              <Link className="hover:text-accent" href={`/categories/${encodeURIComponent(category)}`}>
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="space-y-3">
        <h2 className="text-section-title">최근 글</h2>
        <ul className="space-y-2 text-sm text-muted">
          {recentPosts.map((post) => <li key={post}>{post}</li>)}
        </ul>
      </Card>

      <Card className="space-y-3">
        <h2 className="text-section-title">인기 글</h2>
        <ul className="space-y-2 text-sm text-muted">
          {popularPosts.map((post) => <li key={post}>{post}</li>)}
        </ul>
        <p className="text-caption">방문자 추이 요약 영역은 통계 DB 연결 후 활성화됩니다.</p>
      </Card>
    </aside>
  );
}
