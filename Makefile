build:
	./gradlew clean build -x test

up:
	make build
	docker compose up

fclean:
	rm -rf ./data
	docker compose -f ./docker-compose.yaml down --rmi all --volumes

re:
	make fclean
	make up

env_update:
	git submodule update --init --recursive

.PHONY: build up env_update up re
