network: ##
	docker network create infrastructure

dev-build: ##
	docker compose -f docker-compose.dev.yml build --no-cache $(c)

dev: ##
	docker compose -f docker-compose.dev.yml up $(c)

dev-check: ##
	docker compose -f docker-compose.dev.yml config

prod-build: ##
	docker compose -f docker-compose.yml build --no-cache $(c)

prod-check: ##
	docker compose -f docker-compose.yml config

prod: ##
	docker compose -f docker-compose.yml up $(c)