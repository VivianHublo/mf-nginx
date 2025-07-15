FROM node:22.17 AS build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

ARG SERVICE_NAME
WORKDIR /app

COPY . .

RUN pnpm install --force
RUN pnpm --filter=${SERVICE_NAME} build

FROM nginx:alpine AS production
ARG SERVICE_NAME

COPY --from=build /app/apps/${SERVICE_NAME}/dist /usr/share/nginx/html/
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]