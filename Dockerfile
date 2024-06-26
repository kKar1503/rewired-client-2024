# Dependencies
FROM node:20-alpine as deps
WORKDIR /app

COPY package.json /app/package.json
COPY pnpm-lock.yaml /app/pnpm-lock.yaml

RUN npm install pnpm@9.1.1 -g && pnpm i --frozen-lockfile

# Builder
FROM node:20-alpine as build
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Environment
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

ARG NEXT_PUBLIC_WS_URL
ENV NEXT_PUBLIC_WS_URL=$NEXT_PUBLIC_WS_URL

RUN npm run build

# Runner
FROM node:20-alpine as main
WORKDIR /app

# Environment
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

ARG NEXT_PUBLIC_WS_URL
ENV NEXT_PUBLIC_WS_URL=$NEXT_PUBLIC_WS_URL

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8080
ENV PORT 8080
CMD ["node", "server.js"]
