install: ## プロジェクトをインストールします
	docker run --rm \
	    -u "$(shell id -u):$(shell id -g)" \
	    -v "$(shell pwd):/var/www/html" \
	    -w /var/www/html \
	    laravelsail/php83-composer:latest \
	    composer install --ignore-platform-reqs && cp -a -n .env.example .env
	@make up
	@make cache-clear
	./vendor/bin/sail artisan key:generate
	./vendor/bin/sail artisan telescope:install
	@make db-migrate
	@make db-seed
	@make ide-apply
	@make up

rebuild: ## プロジェクトを再構築します
	@make destroy
	docker compose build --no-cache
	@make install

up: ## コンテナを起動します
	./vendor/bin/sail up -d

down: ## コンテナを停止します
	docker compose down --remove-orphans

destroy: ## 全てのコンテナを削除します
	docker compose down -v --remove-orphans --rmi all

restart: ## コンテナを再起動します
	@make down
	@make up

ps: ## コンテナの状態を表示します
	docker compose ps

test: ## テストを実行します
	./vendor/bin/sail test

format: ## コードをフォーマットします
	./vendor/bin/sail pint

lint: ## 静的解析を実行します
	docker compose exec app ./vendor/bin/phpstan analyse

ide-apply: ## IDE補完用のファイルを更新します
	./vendor/bin/sail artisan ide-helper:generate
	./vendor/bin/sail artisan ide-helper:models -N
	./vendor/bin/sail artisan ide-helper:meta

app-shell: ## アプリケーションのコンテナに入ります
	./vendor/bin/sail shell

db-shell: ## データベースのコンテナに入ります
	docker compose exec db mysql -u sail -ppassword --database=local

tinker: ## Tinkerを起動します
	./vendor/bin/sail tinker

route: ## ルート一覧を表示します
	./vendor/bin/sail artisan route:list

cache-clear: ## キャッシュをクリアします
	./vendor/bin/sail artisan optimize:clear

insight: ## PHP Insightsを表示します
	./vendor/bin/sail artisan insights

db-migrate: ## データベースをマイグレートします
	./vendor/bin/sail artisan migrate

db-seed: ## データベースにデータを投入します
	./vendor/bin/sail artisan db:seed

db-fresh: ## データベースを初期化します
	./vendor/bin/sail artisan migrate:fresh --seed

help:
	@printf "\033[33m%-30s\033[0m %s\n" "コマンド一覧:"
	@awk -F ':.*?## ' \
		'/^[a-zA-Z0-9_\-]+:/ { \
			helpCommand = $$1; \
			helpMessage = $$2; \
			gsub(/:.*?## /, "", helpCommand); \
			if (helpMessage != "" && helpCommand != "") { \
				printf "  \033[32m%-30s\033[0m %s\n", helpCommand, helpMessage; \
			} \
		}' \
		$(MAKEFILE_LIST)
