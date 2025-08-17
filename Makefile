update-deps:
	cd expo \
		&& npm install \
		&& npm run package:update:force \
		&& rm -rf node_modules package-lock.json \
		&& npm install \
		&& cd ..
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
	cd laravel \
		&& sudo rm -rf vendor composer.lock \
		&& make rebuild \
		&& docker compose exec app bash -c "composer install && composer update" \
		&& cd ..
	cd nextjs/sources \
		&& npm install \
		&& npm run package:update:force \
		&& rm -rf node_modules package-lock.json \
		&& npm install \
		&& cd ../..
	cd remix \
		&& npm install \
		&& npm run package:update:force \
		&& rm -rf node_modules package-lock.json \
		&& npm install \
		&& cd ..
