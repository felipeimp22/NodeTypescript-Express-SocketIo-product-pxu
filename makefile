build:
	docker-compose build
up:
	docker-compose up -d
up-db-only:
	docker-compose up -d mongo
down:
	docker-compose down --remove-orphans
all: down build up