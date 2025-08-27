FROM node:24-alpine AS base
ENV NODE_ENV=production
ENV TURBO_TELEMETRY_DISABLED=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apk add --no-cache libc6-compat && \
  corepack enable && \
  pnpm install turbo --global

FROM base AS builder
RUN apk add --no-cache openssl
WORKDIR /app
COPY . .
RUN turbo prune public --docker

FROM base AS installer
WORKDIR /app
# COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .
RUN ls -la
COPY turbo.json turbo.json

RUN --mount=type=secret,id=TURBO_API \
  --mount=type=secret,id=TURBO_TEAM \
  --mount=type=secret,id=TURBO_TOKEN \
  export TURBO_API=$(cat /run/secrets/TURBO_API) && \
  export TURBO_TEAM=$(cat /run/secrets/TURBO_TEAM) && \
  export TURBO_TOKEN=$(cat /run/secrets/TURBO_TOKEN) && \
  pnpm build

# NOTE: If enabling sentry
# RUN --mount=type=secret,id=TURBO_API \
#   --mount=type=secret,id=TURBO_TEAM \
#   --mount=type=secret,id=TURBO_TOKEN \
#   --mount=type=secret,id=SENTRY_ORG \
#   --mount=type=secret,id=SENTRY_PROJECT \
#   --mount=type=secret,id=SENTRY_AUTH_TOKEN \
#   --mount=type=secret,id=BRANCH \
#   --mount=type=secret,id=SENTRY_RELEASE \
#   export TURBO_API=$(cat /run/secrets/TURBO_API) && \
#   export TURBO_TEAM=$(cat /run/secrets/TURBO_TEAM) && \
#   export TURBO_TOKEN=$(cat /run/secrets/TURBO_TOKEN && \
#   export SENTRY_ORG=$(cat /run/secrets/SENTRY_ORG) && \
#   export SENTRY_PROJECT=$(cat /run/secrets/SENTRY_PROJECT) && \
#   export SENTRY_AUTH_TOKEN=$(cat /run/secrets/SENTRY_AUTH_TOKEN) && \
#   export BRANCH=$(cat /run/secrets/BRANCH) && \
#   export SENTRY_RELEASE=$(cat /run/secrets/SENTRY_RELEASE) && \
#   export SENTRY_LOG_LEVEL=debug && \
#   turbo run build --filter=apps/website


FROM base AS sveltekit
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 svelte
USER svelte

# NOTE: Uncomment this if you add a dependency, as this only works with devDependencies only
# COPY --from=installer /app/node_modules /app/node_modules
COPY --chown=svelte:nodejs --from=installer /app/apps/website/build /app/build
# COPY --from=installer /app/build /app/build
# RUN apt-get update && apt-get install -y ca-certificates curl
# RUN mkdir errors
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]
