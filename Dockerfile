FROM node:boron

RUN yarn
RUN yarn run webpack:deploy

EXPOSE 3000

CMD ["yarn", "start"] 
# // provide default params for ENTRYPOINT
#  // executable must be defined in CMD or ENDPOINT NOT BOTH

