.PHONY: help build create debug clean up down

BASE := --baseURL https://1313.proxy.blacktarheroin.no/

help:
	@echo '= Make targets:'
	@echo 'build: creates a public/ folder with the built static files'
	@echo 'create: runs the development server serving the built static files'
	@echo 'check: like create but production environment'
	@echo 'debug: like create without drafts and with --debug'
	@echo 'clean: deletes the public/ folder'
	@echo 'There is also "up" and "down" these starts or kills a languagetool api'
	@echo 'docker container, port 8010, localhost'

LANGTOOL := silviof/docker-languagetool:latest
DOCK := docker # maybe podman?

up:
	$(DOCK) run --rm -dn langtool p127.0.0.1:8010:8010 $(LANGTOOL)
down:
	$(DOCK) kill langtool
pull:
	$(DOCK) pull $(LANGTOOL)

HUGO := hugo --printI18nWarnings --printPathWarnings --printUnusedTemplates --templateMetricsHints # --templateMetrics --cleanDestinationDir --gc
SERV := server $(BASE) --bind 0.0.0.0 --liveReloadPort 80 --appendPort=false --disableFastRender --printMemoryUsage --noHTTPCache --renderToDisk --navigateToChanged
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
	rm -fr resources/ hugo_stats.json .hugo_build.lock
clean_pub:
	rm -fr public/
