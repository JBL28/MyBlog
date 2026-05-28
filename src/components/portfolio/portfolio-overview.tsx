import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import type { PortfolioVisibleState } from "@/lib/portfolio";

export function PortfolioOverview({ visible }: { visible: PortfolioVisibleState }) {
  return (
    <div className="space-y-6">
      <Section className="border border-border panel p-8">
        <p className="text-caption">Portfolio Submission Mode</p>
        {visible.name ? <h1 className="text-display">홍길동</h1> : null}
        {visible.email || visible.phone || visible.links ? (
          <div className="flex flex-wrap gap-3 text-sm font-semibold text-muted">
            {visible.email ? <span>hello@example.com</span> : null}
            {visible.phone ? <span>010-0000-0000</span> : null}
            {visible.links ? <span>GitHub · Blog · LinkedIn</span> : null}
          </div>
        ) : null}
        <p className="text-body text-muted">
          URL의 visible 값에 따라 필요한 프로필과 이력 정보만 DOM에 렌더링하는 제출용 화면입니다.
        </p>
      </Section>

      {visible.career ? (
        <Card className="space-y-3">
          <h2 className="text-section-title">경력/활동</h2>
          <p className="text-body text-muted">Next.js App Router 기반 웹 서비스와 홈서버 운영 자동화를 중심으로 구현 경험을 정리합니다.</p>
        </Card>
      ) : null}

      {visible.projects ? (
        <Card className="space-y-3">
          <h2 className="text-section-title">프로젝트</h2>
          <p className="text-body text-muted">개인 블로그, 댓글 시스템, 조회 통계, 관리자 대시보드를 단일 Next.js 애플리케이션으로 구축합니다.</p>
        </Card>
      ) : null}

      {visible.education ? (
        <Card className="space-y-3">
          <h2 className="text-section-title">교육</h2>
          <p className="text-body text-muted">웹 플랫폼, 데이터베이스, 인프라 운영 학습 이력을 필요한 제출 링크에서만 노출합니다.</p>
        </Card>
      ) : null}
    </div>
  );
}
