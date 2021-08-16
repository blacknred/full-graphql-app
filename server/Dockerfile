FROM node:alpine

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src

# add `/usr/src/node_modules/.bin` to $PATH
ENV PATH /usr/src/node_modules/.bin:$PATH

# install and cache app dependencies
ADD package.json /usr/src/package.json
RUN yarn install

# start app
CMD ["yarn", "watch"]