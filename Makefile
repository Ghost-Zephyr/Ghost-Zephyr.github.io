HUGO := hugo

.PHONY: publish build create

publish: build
	git add public/
	git commit -m'public/ autocommit'
	git push

build:
	rm -fr public/
	$(HUGO) --gc --minify

create:
	$(HUGO) server --bind 0.0.0.0
