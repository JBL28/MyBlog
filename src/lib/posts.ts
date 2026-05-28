export type PostSummary = {
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  published: boolean;
  coverImage?: string;
  views: number;
};

export const posts: PostSummary[] = [
  {
    slug: "home-server-blog-foundation",
    title: "홈서버 블로그 기반 세팅",
    description: "Next.js App Router, Tailwind token, Prisma 기반으로 개인 블로그의 첫 구현 기반을 잡습니다.",
    createdAt: "2026-05-28",
    updatedAt: "2026-05-28",
    category: "운영",
    tags: ["Next.js", "Prisma", "Tailwind"],
    published: true,
    views: 0,
  },
  {
    slug: "mdx-content-rules",
    title: "MDX 콘텐츠 작성 규칙",
    description: "MVP에서는 안전한 기본 문서 렌더링과 전역 Markdown 스타일에 집중합니다.",
    createdAt: "2026-05-28",
    updatedAt: "2026-05-28",
    category: "Next.js",
    tags: ["MDX", "Markdown"],
    published: true,
    views: 0,
  },
];

export function getPublishedPosts() {
  return posts
    .filter((post) => post.published)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getPostsByCategory(category: string) {
  if (category === "all") return getPublishedPosts();
  return getPublishedPosts().filter((post) => post.category.toLowerCase() === decodeURIComponent(category).toLowerCase());
}

export function getPostsByTag(tag: string) {
  return getPublishedPosts().filter((post) => post.tags.some((item) => item.toLowerCase() === decodeURIComponent(tag).toLowerCase()));
}
