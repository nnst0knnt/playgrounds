.PHONY: help install rebuild up down destroy restart ps test format lint ci ide-apply app-shell db-shell tinker route cache-clear insight db-migrate db-seed db-fresh

# Default target is help
.DEFAULT_GOAL := help

## @description Install the project
## @usage make install
install:
	-cp -n .env.example .env
	docker compose build --no-cache
	docker run --rm \
	    -u "$(shell id -u):$(shell id -g)" \
	    -v "$(shell pwd):/var/www/html" \
	    -w /var/www/html \
	    laravelsail/php83-composer:latest \
	    composer install --ignore-platform-reqs
	@make up
	@make cache-clear
	./vendor/bin/sail artisan key:generate
	./vendor/bin/sail artisan telescope:install
	@make db-migrate
	@make db-seed
	@make ide-apply
	@make restart
	@echo "╔═════════════════════════════════════════════════════════════╗"
	@echo "║                                                             ║"
	@echo "║                      Setup Complete!                        ║"
	@echo "║                                                             ║"
	@echo "║                Project is now ready to use                  ║"
	@echo "║                                                             ║"
	@echo "╚═════════════════════════════════════════════════════════════╝"

## @description Rebuild the project from scratch
## @usage make rebuild
rebuild:
	@make destroy
	@make install

## @description Start containers
## @usage make up
up:
	./vendor/bin/sail up -d

## @description Stop containers
## @usage make down
down:
	docker compose down --remove-orphans

## @description Remove all containers, volumes and images
## @usage make destroy
destroy:
	docker compose down -v --remove-orphans --rmi all

## @description Restart containers
## @usage make restart
restart:
	@make down
	@make up

## @description Show container status
## @usage make ps
ps:
	docker compose ps

## @description Run tests
## @usage make test
test:
	./vendor/bin/sail test

## @description Format code
## @usage make format
format:
	./vendor/bin/sail pint

## @description Run static analysis
## @usage make lint
lint:
	docker compose exec app ./vendor/bin/phpstan analyse

## @description Run CI commands (format, lint, test)
## @usage make ci
ci:
	@make format
	@make lint
	@make test

## @description Update IDE helper files
## @usage make ide-apply
ide-apply:
	./vendor/bin/sail artisan ide-helper:generate
	./vendor/bin/sail artisan ide-helper:models -N
	./vendor/bin/sail artisan ide-helper:meta

## @description Enter application container shell
## @usage make app-shell
app-shell:
	./vendor/bin/sail shell

## @description Enter database container shell
## @usage make db-shell
db-shell:
	docker compose exec db mysql -u sail -ppassword --database=local

## @description Start Tinker
## @usage make tinker
tinker:
	./vendor/bin/sail tinker

## @description List all routes
## @usage make route
route:
	./vendor/bin/sail artisan route:list

## @description Clear all caches
## @usage make cache-clear
cache-clear:
	./vendor/bin/sail artisan optimize:clear

## @description Show PHP Insights
## @usage make insight
insight:
	./vendor/bin/sail artisan insights

## @description Run database migrations
## @usage make db-migrate
db-migrate:
	./vendor/bin/sail artisan migrate

## @description Seed the database
## @usage make db-seed
db-seed:
	./vendor/bin/sail artisan db:seed

## @description Reset and re-seed database
## @usage make db-fresh
db-fresh:
	./vendor/bin/sail artisan migrate:fresh --seed

help:
	@WIDTH=`tput cols 2>/dev/null || echo 80`; \
	awk 'BEGIN { \
		box_width = 65; \
		padding_left = int(('$$WIDTH' - box_width) / 2); \
		if (padding_left < 0) padding_left = 0; \
		padding = sprintf("%*s", padding_left, ""); \
		print padding "╔═════════════════════════════════════════════════════════════╗"; \
		print padding "║                                                             ║"; \
		print padding "║                     Makefile Help Menu                      ║"; \
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
