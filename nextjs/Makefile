.PHONY: help build clean rebuild up down restart destroy migration migrate fresh migrate-apply lint format npm-i npm-ci npm-dev npm-build npm-start copy-env

# Default target is help instead of build
.DEFAULT_GOAL := help

## @description Build and set up the development environment
## @usage make build
build:
	docker-compose build --force-rm --no-cache
	@make copy-env
	@make up
	@make npm-ci
	@make fresh
	@make restart
	@make npm-dev

access-url:
	@echo "╔═════════════════════════════════════════════════════════════╗"
	@echo "║                                                             ║"
	@echo "║                      Setup Complete!                        ║"
	@echo "║                                                             ║"
	@echo "║        Project is now ready to use (http://localhost)       ║"
	@echo "║                                                             ║"
	@echo "╚═════════════════════════════════════════════════════════════╝"

## @description Remove node_modules, .next directory and cache
## @usage make clean
clean:
	rm -rf ./sources/node_modules ./sources/.next ./sources/*.tsbuildinfo

## @description Destroy containers and rebuild from scratch
## @usage make rebuild
rebuild:
	@make destroy
	@make clean
	@make build

## @description Start docker containers
## @usage make up
up:
	docker-compose up -d

## @description Stop docker containers
## @usage make down
down:
	docker-compose down

## @description Restart docker containers
## @usage make restart
restart:
	@make down
	@make up

## @description Remove all containers, images, and volumes
## @usage make destroy
destroy:
	docker-compose down --rmi all --volumes --remove-orphans

# Create migration file (for development)
name :=
## @description Create a new migration file
## @usage make migration name=xxx
migration:
	$(call __require_migration_file_name)
	docker-compose exec app npm run prisma:migration -name=${name}
define __require_migration_file_name
    @bash -c "\
		if [ '${name}' = '' ]; then\
			echo -e\
				'No migration file name specified. Please use the following format:\n\n\
				> \033[31mmake migration name=xxx\033[0m\n';\
			exit 1;\
		fi"
endef

## @description Run migrations for development
## @usage make migrate
migrate:
	docker-compose exec app npm run prisma:migrate

## @description Reset database, run migrations and seed
## @usage make fresh
fresh:
	docker-compose exec app npm run prisma:fresh

## @description Apply migrations to production database
## @usage make migrate-apply
migrate-apply:
	docker-compose exec app npm run prisma:deploy

## @description Run linting
## @usage make lint
lint:
	docker-compose exec app npm run lint

## @description Format code
## @usage make format
format:
	docker-compose exec app npm run format

## @description Install npm dependencies
## @usage make npm-i
npm-i:
	docker-compose exec app npm install

## @description Clean install npm dependencies
## @usage make npm-ci
npm-ci:
	docker-compose exec app npm ci

## @description Run npm dev
## @usage make npm-dev
npm-dev:
	@make access-url
	docker-compose exec app npm run dev

## @description Build the application
## @usage make npm-build
npm-build:
	docker-compose exec app npm run build

## @description Start the application
## @usage make npm-start
npm-start:
	docker-compose exec app npm run start

## @description Copy environment file
## @usage make copy-env
copy-env:
ifeq ($(OS),Windows_NT)
	copy .\sources\.env.example .\sources\.env.local
else
	-cp -n ./sources/.env.example ./sources/.env.local
endif

help:
	@WIDTH=`tput cols`; \
	awk 'BEGIN { \
		box_width = 65; \
		padding_left = int(('$$WIDTH' - box_width) / 2); \
		if (padding_left < 0) padding_left = 0; \
		padding = sprintf("%*s", padding_left, ""); \
		print padding "╔═════════════════════════════════════════════════════════════╗"; \
		print padding "║                                                             ║"; \
		print padding "║                   Makefile Help Menu                        ║"; \
		print padding "║                                                             ║"; \
		print padding "╚═════════════════════════════════════════════════════════════╝"; \
		print ""; \
	}'
	@awk 'BEGIN { description = ""; usage = ""; } \
		/^## @description/ { description = substr($$0, index($$0, $$3)); } \
		/^## @usage/ { usage = substr($$0, index($$0, $$3)); } \
		/^[a-zA-Z0-9_\-]+:/ { \
			helpCommand = $$1; \
			if (description != "") { \
				printf "  \033[32m%-30s\033[0m %s\n", helpCommand, description; \
				if (usage != "") { \
					printf "  \033[36m%-30s\033[0m %s%s\n\n", "", "▶️ ", usage; \
				} \
			} \
			description = ""; usage = ""; \
		}' $(MAKEFILE_LIST)

# Catch-all target to allow passing arguments
%:
	@:
