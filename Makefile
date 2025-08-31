.PHONY: refresh expo express laravel nextjs remix clean

refresh:
	sudo -v
	$(MAKE) expo express laravel nextjs remix

expo:
	rm -rf expo temporary
	npx create-expo-app@latest temporary
	mv temporary expo
	cd expo && \
		sed -i.bak 's/"name": "[^"]*"/"name": "@nnst0knnt\/expo"/' package.json && \
		rm package.json.bak && \
		sed -i.bak 's/"name": "temporary"/"name": "nnst0knnt-expo"/' app.json && \
		sed -i.bak 's/"slug": "temporary"/"slug": "nnst0knnt-expo"/' app.json && \
		sed -i.bak 's/"scheme": "temporary"/"scheme": "nnst0knnt-expo"/' app.json && \
		rm app.json.bak

express:
	cd express \
		&& cd inmemory \
			&& npm install \
			&& npm run package:update:force \
			&& rm -rf node_modules package-lock.json \
			&& npm install \
			&& cd .. \
		&& cd permanent \
			&& npm install \
			&& npm run package:update:force \
			&& rm -rf node_modules package-lock.json \
			&& npm install \
			&& cd .. \
		&& cd ..

laravel:
	cd laravel \
		&& sudo rm -rf vendor composer.lock \
		&& make rebuild \
		&& docker compose exec app bash -c "composer install && composer update" \
		&& cd ..

nextjs:
	cd nextjs/sources \
		&& npm install \
		&& npm run package:update:force \
		&& rm -rf node_modules package-lock.json \
		&& npm install \
		&& cd ../..

remix:
	cd remix \
		&& npm install \
		&& npm run package:update:force \
		&& rm -rf node_modules package-lock.json \
		&& npm install \
		&& cd ..

clean:
	@if [ "$$(docker ps -aq)" ]; then docker stop $$(docker ps -aq); fi
	@if [ "$$(docker ps -aq)" ]; then docker rm $$(docker ps -aq); fi  
	@if [ "$$(docker images -q)" ]; then docker rmi $$(docker images -q); fi
	docker volume prune -f
	docker network prune -f
	docker system prune -a -f
