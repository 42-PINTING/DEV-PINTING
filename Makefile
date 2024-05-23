build:
	./gradlew clean build -x test

up:
	make build
	docker compose --env-file ./env/.env up

fclean:
	rm -rf ./data
	docker compose --env-file ./env/.env -f ./compose.yaml down --rmi all --volumes

re:
	make fclean
	make up

env_update:
	git submodule update --init --recursive --remote

.PHONY: build up env_update up re
