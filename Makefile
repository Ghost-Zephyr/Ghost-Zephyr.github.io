HUGO := hugo

.PHONY: build create clean

build: clean
	$(HUGO) --gc

create:
	$(HUGO) server -D --bind 0.0.0.0 --disableFastRender

clean:
	rm -fr public/