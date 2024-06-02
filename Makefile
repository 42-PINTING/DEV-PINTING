BE = ./BE-PINTING
FE = ./FE-PINTING
REPO_URL = git@github.com:42-PINTING/env

pull:
	@if [ -d "env" ]; then \
		echo "env 파일이 있어요.\ngit pull을 실행합니다."; \
		cd env && git pull; \
	else \
		echo "env 파일이 없어요.\ngit clone을 실행합니다."; \
		git clone $(REPO_URL); \
	fi
	
	git subtree pull --prefix=FE-PINTING git@github.com:42-PINTING/FE-PINTING.git main
	git subtree pull --prefix=BE-PINTING-gateway git@github.com:42-PINTING/BE-PINTING-gateway.git main
	git subtree pull --prefix=BE-PINTING-board git@github.com:42-PINTING/BE-PINTING-board.git main

build:
# cd ${BE} && make build

up:
# cd ${BE} && make build
	docker compose up -d

fclean:
# cd ${BE} && make fclean
	docker compose -f ./compose.yaml down --rmi all --volumes

sh:
	docker compose run -it --service-ports web-proxy sh 

re:
	make fclean
	make up

.PHONY: pull build up env_update up re
