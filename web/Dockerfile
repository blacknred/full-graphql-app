# With a multi-stage build feature, we can keep our final image (production) as slim as possible
# by keeping all the unnecessary bloat in the development image.

FROM node:alpine As development
ENV NODE_ENV=development
WORKDIR /usr/src/app
# We copying only package*.json files before run npm install to make sure install command
# should run only when either package*.json or yarn.lock files change.
COPY package*.json ./
COPY yarn.lock ./
# we install only devDependencies due to the container being used as a “builder”
# that sends a clean /dist folder to the production image.
RUN yarn --dev install
COPY . .
CMD ["yarn", "dev"]

FROM node:alpine as production
# make sure we are use production mode on build time
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
# same as development but without devDependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn --prod install
# RUN yarn install pm2 -g
COPY . .
# Here we copy the built /dist folder from the development image
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist"]
# CMD [ "pm2-runtime", "dist" ]