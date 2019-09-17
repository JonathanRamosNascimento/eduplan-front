FROM node:latest

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


# install and cache dependencies
COPY package.json /usr/src/app
RUN npm install

# used for development
# RUN npm install -g @angular/cli --migrate-only --from=1.2.6
RUN npm install -g @angular/cli

# copy source files
COPY . /usr/src/app

# Expose the port the app runs in
EXPOSE 4200

# start app
CMD ng serve --host 0.0.0.0 --poll 2000

