# syntax=docker/dockerfile:1.4

############################################################################
# BUILD - Base
############################################################################
FROM public.ecr.aws/docker/library/node:20-alpine3.17 as base

WORKDIR /app

# Install OS node builder dependencies
RUN --mount=type=cache,target=/var/cache/apk ln -vs /var/cache/apk /etc/apk/cache && \
  apk add g++ make py3-pip wget shadow

# Install dependencies first (including Nest dev dependency)
COPY --link ./package.json ./
COPY --link ./yarn.lock ./
COPY --link ./tsconfig*.json ./

############################################################################
# DEVELOPMENT IMAGE
############################################################################
FROM base as dev

# Install ZSH and Oh-My-ZSH with some formatting
RUN apk update && \
    apk add zsh git vim zsh-autosuggestions zsh-syntax-highlighting bind-tools curl && \
    rm -rf /var/cache/apk/*
RUN sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
RUN echo "source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ~/.zshrc && \
  echo "source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh" >> ~/.zshrc

RUN yarn install

COPY --link ./ ./

CMD ["yarn", "start:dev"]

############################################################################
#  Build - Assets
############################################################################
FROM base as build

RUN wget https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem

RUN --mount=type=cache,id=npm,target=/root/.npm npm ci

# Copy and build the assets
COPY --link --chown=node:node ./ ./
RUN npm run build:swc

USER node

############################################################################
#  Build - Modules
############################################################################
FROM base as modules

# Slim down to only Production assets (and post-remove the dev dependencies we no longer need)
ENV NODE_ENV production
RUN --mount=type=cache,id=npm,target=/root/.npm npm ci --omit=dev

USER node

############################################################################
# PRODUCTION IMAGE
############################################################################
FROM public.ecr.aws/docker/library/node:18-alpine3.17 as prod 

WORKDIR /app

ENV NODE_ENV=production

# Setup the directories
RUN mkdir /data /app/src /app/logs && \
  chown node:node -R /app && \
  chown node:node -R /data

# Copy over the assets
COPY --link --chown=node:node --from=modules /app/node_modules ./node_modules
COPY --link --chown=node:node --from=build /app/rds-combined-ca-bundle.pem ./
COPY --link --chown=node:node --from=build /app/dist ./dist

USER node:node

# Start the server using the production build
CMD [ "node", "dist/main.js" ]