FE = ./FE-PINTING
REPO_URL = git@github.com:42-PINTING/env

all: pull install dev

pull:
	@if [ -d "env" ]; then \
		echo "env 파일이 있어요.\ngit pull을 실행합니다."; \
		cd env && git pull; \
	else \
		echo "env 파일이 없어요.\ngit clone을 실행합니다."; \
		git clone $(REPO_URL); \
	fi

install:
	npm install

dev:
	npm run dev

.PHONY: pull