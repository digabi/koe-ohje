#two step build where we first build the react app and then copy the build folder to nginx image
FROM node:18.17.0 as builder
WORKDIR '/app'
COPY package-lock.json .
COPY package.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine as prod
COPY --from=builder /app/build /usr/share/nginx/html/build
# Map tiles are do not exist in this repository. They are instead checked out from the map-tiles repository by Github Actions durin dev-release workflow. 
COPY ./map-tiles/tiles /usr/share/nginx/html/tiles
COPY ./index.html /usr/share/nginx/html
COPY ./accessibility-fi.html /usr/share/nginx/html
COPY ./accessibility-sv.html /usr/share/nginx/html
COPY ./licenses/muzak /usr/share/nginx/html/licenses/muzak
COPY ./common /usr/share/nginx/html/common
EXPOSE 80
