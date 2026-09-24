FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy website assets to nginx root
COPY . /usr/share/nginx/html

# Expose port 8080 (Cloud Run standard)
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
