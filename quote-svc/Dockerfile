# syntax = docker/dockerfile:1.4

##############################################################
#      DEPENDENCY BUILDER      
##############################################################
FROM public.ecr.aws/docker/library/node:20-alpine as base

WORKDIR /app

## Install build toolchain and compile native add-ons
RUN --mount=type=cache,target=/var/cache/apk ln -vs /var/cache/apk /etc/apk/cache && \
  apk add --no-cache git python3 make g++ openssh-client

# Install node dependencies
COPY ./package*.json ./

##############################################################
#      BUILD IMAGE     
##############################################################
FROM base as builder

WORKDIR /app

RUN --mount=type=ssh --mount=type=cache,id=npm,target=/root/.npm npm install --only=production

##############################################################
#      DEVELOPMENT IMAGE     
##############################################################
FROM base as dev

WORKDIR /app

RUN --mount=type=cache,id=npm,target=/root/.npm npm install

CMD [ "npm", "run", "dev" ]

##############################################################
#      DEPLOYMENT IMAGE      
##############################################################

FROM public.ecr.aws/docker/library/node:20-alpine as app

WORKDIR /app

# Ensure Rootless User
RUN deluser --remove-home node \
  && addgroup -S node -g 1001 \
  && adduser -S -G node -u 999 node

# Set global npm deps to install in nonroot user dir
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# Copy builder node modules
COPY --chown=node:node --from=builder node_modules /app/node_modules

# Copy source code
COPY --link --chown=node:node --chmod=755 ./ ./

# Run as rootless node user
USER node:node

# Start the application
CMD [ "node", "src/index.js" ]

