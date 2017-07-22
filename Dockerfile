FROM node:boron

# CREATE APP DIRECTORY
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN ls -la

# INSTALL APP DEPENDENCIES
COPY package.json /usr/src/app
# COPY webpack.config.babel.js /usr/src/app

RUN yarn

COPY . /usr/src/app

RUN yarn run webpack:deploy

# BUNDLE APP SOURCE


EXPOSE 3000
CMD ["yarn", "start"] 
# // provide default params for ENTRYPOINT
#  // executable must be defined in CMD or ENDPOINT NOT BOTH

