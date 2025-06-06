FROM --platform=linux/amd64 node:24-alpine3.21 AS node-builder
RUN npm install -g pnpm@10

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY src ./src
COPY static ./static
COPY postcss.config.cjs svelte.config.js tailwind.config.cjs vite.config.js ./

RUN pnpm run build

FROM --platform=linux/amd64 nginx:1.27-alpine3.21-slim
LABEL org.opencontainers.image.source https://github.com/Faucett-GmbH/ts-duckduckfit

COPY default.conf.template /etc/nginx/templates/default.conf.template
RUN rm -rf /usr/share/nginx/html
COPY 40-env.sh /docker-entrypoint.d/40-env.sh

COPY --from=node-builder /app/build /usr/share/nginx/html
