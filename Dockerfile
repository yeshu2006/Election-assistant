# Stage 1: Build the React frontend from the client workspace.
FROM node:22-alpine AS build

WORKDIR /app

COPY client/package*.json ./
RUN npm install

ARG VITE_GEMINI_API_KEY=""
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY

COPY client/ ./
RUN npm run build

# Stage 2: Serve static assets with NGINX.
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html
COPY client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
