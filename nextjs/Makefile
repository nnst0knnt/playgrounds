build:
	docker-compose build --force-rm --no-cache
	@make copy-env
	@make up
	@make npm-ci
	@make fresh
	@make restart
	@echo "---------------------------------------------------------"
	@echo "http://localhost にアクセスしてください"
	@echo "---------------------------------------------------------"
	@make npm-dev

clean:
	rm -rf ./sources/node_modules ./sources/.next ./sources/*.tsbuildinfo

rebuild:
	@make destroy
	@make clean
	@make build

up:
	docker-compose up -d

down:
	docker-compose down

restart:
	@make down
	@make up

destroy:
	docker-compose down --rmi all --volumes --remove-orphans

# マイグレーションファイルの作成とマイグレートするコマンド（開発環境用）
name :=
migration:
	$(call __require_migration_file_name)
	docker-compose exec app npm run prisma:migration -name=${name}
define __require_migration_file_name
    @bash -c "\
		if [ '${name}' = '' ]; then\
			echo -e\
				'マイグレーションファイルの名前が指定されていません。以下のように指定してください。\n\n\
				> \033[31mmake migration name=xxx\033[0m\n';\
			exit 1;\
		fi"
endef

# マイグレートを実行するコマンド（開発環境用）
migrate:
	docker-compose exec app npm run prisma:migrate

# 全てのテーブルを削除してマイグレートとシードをし直すコマンド（開発環境用）
fresh:
	docker-compose exec app npm run prisma:fresh

# 作成されたマイグレーションファイルを元に、データベースへの反映をするコマンド
# 開発環境以外への反映は、こちらのコマンドを利用する
migrate-apply:
	docker-compose exec app npm run prisma:deploy

lint:
	docker-compose exec app npm run lint

format:
	docker-compose exec app npm run format

npm-i:
	docker-compose exec app npm install

npm-ci:
	docker-compose exec app npm ci

npm-dev:
	docker-compose exec app npm run dev

npm-build:
	docker-compose exec app npm run build

npm-start:
	docker-compose exec app npm run start

copy-env:
ifeq ($(OS),Windows_NT)
	copy .\sources\.env.example .\sources\.env.local
else
	-cp -n ./sources/.env.example ./sources/.env.local
endif
