FROM node:20.11-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

RUN node prisma/seed.js

FROM node:20.11-alpine AS runner
WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma 
COPY --from=builder /app/src ./src
COPY --from=builder /app/package.json ./package.json

ENV NEXT_PUBLIC_BASE_URL=http://localhost:3000
ENV POSTS_API_URL=$POSTS_API_URL
ENV USERS_API_URL=$USERS_API_URL

EXPOSE 3000

CMD npm start
