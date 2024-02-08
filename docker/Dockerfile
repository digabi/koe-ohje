FROM nginx:1.25.3

WORKDIR /app

ADD ./common ./common
ADD ./build ./build
COPY ./index.html .
COPY ./accessibility-fi.html .
COPY ./accessibility-sv.html .

COPY ./docker/nginx.conf /etc/nginx/nginx.conf