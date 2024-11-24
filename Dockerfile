# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app with production optimization
RUN npm run build

# Production stage
FROM nginx:alpine

# Add non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Create necessary nginx directories and set permissions
RUN mkdir -p /var/cache/nginx /var/run \
    && chown -R appuser:appgroup /var/cache/nginx \
    && chown -R appuser:appgroup /var/run

# Copy built assets from build stage
COPY --from=build /app/build /usr/share/nginx/html
RUN chown -R appuser:appgroup /usr/share/nginx

# Add custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:80 || exit 1

CMD ["nginx", "-g", "daemon off;"]
