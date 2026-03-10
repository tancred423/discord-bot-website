#!/usr/bin/env bash
set -euo pipefail

COMPOSE_FILE="docker-compose.dev.yml"

case "${1:-}" in
  up)
    docker compose -f "$COMPOSE_FILE" up -d
    ;;
  up:build)
    docker compose -f "$COMPOSE_FILE" up -d --build
    ;;
  down)
    docker compose -f "$COMPOSE_FILE" down
    ;;
  purge)
    docker compose -f "$COMPOSE_FILE" down -v
    ;;
  logs)
    docker compose -f "$COMPOSE_FILE" logs -f
    ;;
  rebuild)
    docker compose -f "$COMPOSE_FILE" build --no-cache
    ;;
  restart)
    docker compose -f "$COMPOSE_FILE" restart
    ;;
  check)
    docker compose -f "$COMPOSE_FILE" exec website npm run check
    ;;
  shell)
    docker compose -f "$COMPOSE_FILE" exec website sh
    ;;
  *)
    echo "Usage: ./dev.sh <command>"
    echo ""
    echo "Commands:"
    echo "  up        Start containers in detached mode"
    echo "  up:build  Start containers with a fresh build"
    echo "  down      Stop and remove containers"
    echo "  purge     Stop containers and remove volumes"
    echo "  logs      Follow container logs"
    echo "  rebuild   Rebuild images without cache"
    echo "  restart   Restart running containers"
    echo "  check     Run formatter, linter and type checker"
    echo "  shell     Open a shell inside the container"
    exit 1
    ;;
esac
