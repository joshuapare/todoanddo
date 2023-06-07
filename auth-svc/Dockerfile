# syntax=docker/dockerfile:1.4

##################################### Base
FROM --platform=${BUILDPLATFORM} golang:1.20-alpine AS build

ARG TARGETOS
ARG TARGETARCH

WORKDIR /app

ENV CGO_ENABLED=0

COPY --link go.* .
RUN go mod download

COPY --link ./ /app/
RUN --mount=type=cache,target=/root/.cache/go-build \
  GOOS=${TARGETOS} GOARCH=${TARGETARCH} go build -o /out/main .

##################################### Developement
FROM build AS dev

RUN apk add --no-cache git
RUN go install github.com/cosmtrek/air@latest
RUN go install github.com/swaggo/swag/cmd/swag@latest

EXPOSE 3000
WORKDIR /app
CMD ["air", "-c", ".air.toml"]

##################################### Production
FROM golang:1.20-alpine AS prod

WORKDIR /app

RUN apk add dumb-init
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

COPY --from=build /out/main .

EXPOSE 3000
CMD "./main"
