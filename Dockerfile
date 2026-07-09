FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG VITE_API_BASE_URL=https://backend.yampi.eu
ARG VITE_GIT_HUB_URL=https://github.com/cdryampi/
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_GIT_HUB_URL=$VITE_GIT_HUB_URL
RUN echo "VITE_API_BASE_URL=$VITE_API_BASE_URL" > .env && \
    echo "VITE_GIT_HUB_URL=$VITE_GIT_HUB_URL" >> .env
RUN npm run build

FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
