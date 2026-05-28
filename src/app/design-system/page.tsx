import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

export const metadata = {
  title: "디자인 시스템 테스트",
};

const colorTokens = [
  { name: "brand-white", css: "--color-brand-white", usage: "모든 화면 fill의 기준" },
  { name: "brand-light-brown", css: "--color-brand-light-brown", usage: "따뜻한 배경/테두리 계열" },
  { name: "brand-light-orange", css: "--color-brand-light-orange", usage: "연한 주황색 강조 계열" },
  { name: "bg", css: "--color-bg", usage: "White 페이지 배경" },
  { name: "surface", css: "--color-surface", usage: "섹션 표면, white 고정" },
  { name: "card", css: "--color-card", usage: "카드/패널, white 고정" },
  { name: "tag", css: "--color-tag", usage: "태그 배경, white 고정" },
  { name: "accent", css: "--color-accent", usage: "링크/텍스트/강조선" },
  { name: "border", css: "--color-border", usage: "구분선/테두리" },
  { name: "text", css: "--color-text", usage: "기본 텍스트" },
  { name: "muted", css: "--color-muted", usage: "보조 텍스트" },
];

const typeScales = [
  ["text-xs", "작은 보조 정보 12px 계열"],
  ["text-sm", "메타/캡션 14px 계열"],
  ["text-base", "본문 기본 16px 계열"],
  ["text-lg", "강조 본문 18px 계열"],
  ["text-xl", "소제목 20px 계열"],
  ["text-2xl", "섹션 제목 24px 계열"],
  ["text-3xl", "페이지 제목 30px 계열"],
  ["text-4xl", "히어로 제목 36px 계열"],
  ["text-5xl", "대형 히어로 48px 계열"],
];

const tagLabels = ["Next.js", "Prisma", "MDX", "운영", "포트폴리오", "통계", "댓글"];

export default function DesignSystemPage() {
  return (
    <div className="page-container space-y-10">
      <Section className="panel border border-border p-8">
        <p className="text-caption">Design System Test</p>
        <h1 className="text-display">디자인 시스템 테스트</h1>
        <p className="text-body text-muted">
          White background, white fill, 연한 주황색 강조, 직각 모서리, 무그림자, full-wide 레이아웃을 한 화면에서 검증합니다.
        </p>
      </Section>

      <Section>
        <div>
          <p className="text-caption">Color Tokens</p>
          <h2 className="text-title">색상 테스트</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {colorTokens.map((token) => (
            <Card key={token.css} className="space-y-3 border-l-4 border-l-accent">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-section-title">{token.name}</h3>
                  <p className="text-caption">{token.css}</p>
                </div>
                <span className="border border-border bg-tag px-3 py-1 text-xs font-semibold text-tag-text">
                  token
                </span>
              </div>
              <div
                aria-label={`${token.name} 색상 샘플`}
                className="h-14 border border-border"
                style={{ background: `var(${token.css})` }}
              />
              <p className="text-body text-muted">{token.usage}</p>
              <code className="border border-border bg-card px-2 py-1 text-sm text-accent">var({token.css})</code>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div>
          <p className="text-caption">Font Tokens</p>
          <h2 className="text-title">폰트 스케일 테스트</h2>
        </div>
        <Card className="space-y-4">
          {typeScales.map(([className, label]) => (
            <div key={className} className="grid gap-2 border-b border-border pb-4 last:border-b-0 last:pb-0 md:grid-cols-[12rem_minmax(0,1fr)]">
              <code className="text-sm text-accent">.{className}</code>
              <p className={className}>{label} — Pretendard 한글/English 12345</p>
            </div>
          ))}
        </Card>
      </Section>

      <Section>
        <div>
          <p className="text-caption">HTML / Markdown Tags</p>
          <h2 className="text-title">태그별 폰트 테스트</h2>
        </div>
        <Card className="markdown-body">
          <h1>h1 제목: 디자인 시스템 테스트</h1>
          <h2>h2 제목: 색상과 폰트 계층</h2>
          <h3>h3 제목: 섹션 내부 제목</h3>
          <h4>h4 제목: 카드 제목</h4>
          <h5>h5 제목: 작은 그룹 제목</h5>
          <h6>h6 제목: 보조 제목</h6>
          <p>
            p 본문입니다. <strong>strong 강조</strong>, <em>em 기울임</em>, <del>del 취소선</del>, <small>small 보조 문장</small>,
            <a href="/design-system"> 링크 텍스트</a>를 함께 확인합니다.
          </p>
          <blockquote>blockquote 인용문은 흰색 배경과 강조선만 사용합니다.</blockquote>
          <ul>
            <li>ul/li 목록 첫 번째 항목</li>
            <li>ul/li 목록 두 번째 항목</li>
          </ul>
          <ol>
            <li>ol/li 순서 목록 첫 번째 항목</li>
            <li>ol/li 순서 목록 두 번째 항목</li>
          </ol>
          <p>
            인라인 코드는 <code>const theme = &quot;white-only&quot;;</code>처럼 표시합니다.
          </p>
          <pre><code>{`function verifyDesignSystem() {
  return "white background + light-orange accent";
}`}</code></pre>
          <table>
            <thead>
              <tr>
                <th>토큰</th>
                <th>역할</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Warm Brown</td>
                <td>페이지 배경</td>
                <td>적용</td>
              </tr>
              <tr>
                <td>Light Orange</td>
                <td>텍스트/강조선</td>
                <td>적용</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </Section>

      <Section>
        <div>
          <p className="text-caption">Tag Samples</p>
          <h2 className="text-title">태그 컴포넌트 테스트</h2>
        </div>
        <Card className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {tagLabels.map((tag) => (
              <span key={tag} className="border border-border bg-tag px-3 py-1 text-sm font-semibold text-tag-text">
                #{tag}
              </span>
            ))}
          </div>
          <p className="text-body text-muted">페이지 배경은 흰색이고, 태그 fill은 흰색이며 텍스트와 테두리만 중앙 token을 사용합니다.</p>
        </Card>
      </Section>
    </div>
  );
}
