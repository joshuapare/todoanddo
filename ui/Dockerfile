# syntax = docker/dockerfile:1.2
############################################################################
# BUILD - Base
############################################################################
FROM public.ecr.aws/docker/library/node:20-alpine3.17 as base

WORKDIR /app

# Install OS node builder dependencies
RUN apk add g++ make py3-pip shadow

# Install dependencies first (including NextJS dev dependency)
COPY ./package*.json ./

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

RUN --mount=type=cache,id=npm,target=/root/.npm npm install

COPY ./ ./

CMD ["npm", "run", "dev"]

############################################################################
#  Build - Assets
############################################################################
FROM base as build

RUN --mount=type=cache,id=npm,target=/root/.npm npm ci

# Copy and build the assets
COPY ./ ./
RUN npm run build

USER node

############################################################################
#  Build - Modules
############################################################################
FROM base as modules

# Slim down to only Production assets (and post-remove the dev dependencies we no longer need)
ENV NODE_ENV production
RUN --mount=type=cache,id=npm,target=/root/.npm npm ci --only=production

USER node

############################################################################
# PRODUCTION IMAGE
############################################################################
FROM public.ecr.aws/docker/library/node:18-alpine3.17 as prod 

WORKDIR /app

# Setup the directories
RUN mkdir /app/src /app/logs && \
  chown node:node -R /app

# Copy over the assets
COPY --chown=node:node --from=modules /app/package.json ./
COPY --chown=node:node --from=modules /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/next.config.prd.js ./next.config.js
COPY --chown=node:node --from=build /app/.next ./.next
COPY --chown=node:node --from=build /app/public ./public

USER node:node

# Start the server using the production build
CMD [ "node_modules/.bin/next", "start" ]
