.PHONY: help build create debug clean

help:
	@echo '= Make targets:'
	@echo 'build: creates a public/ folder with the built static files'
	@echo 'create: runs the development server serving the built static files'
	@echo 'check: like create but production environment'
	@echo 'debug: like create without drafts and with --debug'
	@echo 'clean: deletes the public/ folder'

HUGO := hugo --printI18nWarnings --printPathWarnings --printUnusedTemplates --templateMetricsHints # --templateMetrics --cleanDestinationDir --gc
SERV := server --bind 0.0.0.0 --liveReloadPort 80 --appendPort=false --disableFastRender --printMemoryUsage --noHTTPCache --renderToDisk --navigateToChanged
DEV := $(HUGO) -e dev $(SERV)

build: clean_pub
	$(HUGO) -e prod

check: clean_pub
	$(HUGO) -e prod $(SERV)

create:
	$(DEV) -D

debug:
	$(DEV) --debug

clean: clean_pub
	rm -fr resources/ hugo_stats.json

clean_pub:
	rm -fr public/
