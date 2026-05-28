# 환경 세팅 및 실행

## 빌드 환경: GitHub Actions

GitHub Repository Secrets 또는 Variables에 DB 접속 정보를 설정한다. 컨테이너 네트워크 기준으로 `host:port`는 DB 컨테이너명과 포트를 사용한다.

```text
BUILD_DB_HOST=myblog-db
BUILD_DB_PORT=5432
BUILD_DB_NAME=myblog
BUILD_DB_USER=myblog
BUILD_DB_PASSWORD=<password>
```

Fallback 이름도 지원한다.

```text
DB_HOST=myblog-db
DB_PORT=5432
DB_NAME=myblog
DB_USER=myblog
DB_PASSWORD=<password>
```

이미 완성된 URL을 직접 넣고 싶으면 아래 Secret 중 하나를 설정한다. URL Secret이 있으면 host/port 조합보다 우선한다.

```text
DOCKER_BUILD_DATABASE_URL=postgresql://myblog:<password>@myblog-db:5432/myblog?schema=public
CI_DATABASE_URL=postgresql://myblog:<password>@myblog-db:5432/myblog?schema=public
DATABASE_URL=postgresql://myblog:<password>@myblog-db:5432/myblog?schema=public
```

Docker 빌드는 BuildKit secret으로 `DATABASE_URL`을 전달하므로 이미지 레이어에 DB URL을 남기지 않는다.

## 배포 환경: 서버 Docker Compose

서버에서 env 파일을 만든다.

```bash
cp .env.server.example .env.server
vi .env.server
```

필수 값:

```text
POSTGRES_CONTAINER_NAME=myblog-db
POSTGRES_DB=myblog
POSTGRES_USER=myblog
POSTGRES_PASSWORD=<strong-password>
DB_HOST=myblog-db
DB_PORT=5432
```

앱 컨테이너는 Compose 네트워크에서 `postgresql://POSTGRES_USER:POSTGRES_PASSWORD@DB_HOST:DB_PORT/POSTGRES_DB?schema=public` 형식으로 DB에 접속한다. `POSTGRES_PASSWORD`는 URL-safe 문자로 설정한다.

## 실행

이미지 빌드 및 실행:

```bash
docker compose --env-file .env.server up -d --build
```

DB 스키마 초기화/동기화:

```bash
docker compose --env-file .env.server --profile setup run --rm db-setup
```

로그 확인:

```bash
docker compose --env-file .env.server logs -f app
```

중지:

```bash
docker compose --env-file .env.server down
```
