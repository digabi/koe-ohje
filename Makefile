APPNAME = digabi-koe-ohje

all:

update-clipboardjs:
	wget -O common/clipboard.min.js https://raw.githubusercontent.com/lgarron/clipboard.js/master/clipboard.min.js

install:
	install -D -m 0755 digabi-koe-ohje.sh $(DESTDIR)/usr/bin/$(APPNAME)
	install -D -m 0755 digabi-koe-browser.py $(DESTDIR)/usr/bin/digabi-koe-browser
	install -d -m 0755 $(DESTDIR)/usr/share/$(APPNAME)
	install -D -m 0644 digabi-koe-ohje.desktop $(DESTDIR)/usr/share/applications/digabi-koe-ohje.desktop
	install -D -m 0644 help-browser.svg $(DESTDIR)/usr/share/$(APPNAME)/help-browser.svg

	# Common files (images etc)
	cp -r common $(DESTDIR)/usr/share/${APPNAME}/

	# Common content to Finnish/Swedish documentation
	cp -r build/ $(DESTDIR)/usr/share/$(APPNAME)/

	# Finnish/Swedish frontpage
	cp build/index.html $(DESTDIR)/usr/share/$(APPNAME)/build/index-fi.html
	cp build/index.html $(DESTDIR)/usr/share/$(APPNAME)/build/index-sv.html

	# Set perms
	find $(DESTDIR)/usr/share/$(APPNAME) -type f -exec chmod 644 {} \;
	find $(DESTDIR)/usr/share/$(APPNAME) -type d -exec chmod 755 {} \;
