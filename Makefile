pull:
	git subtree pull --prefix BE-PINTING git@github.com:42-PINTING/BE-PINTING.git main
	git subtree pull --prefix FE-PINTING git@github.com:42-PINTING/FE-PINTING.git main
	git submodule update --init --recursive
