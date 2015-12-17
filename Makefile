APPNAME = digabi-koe-ohje

all:

install:
	install -D -m 0755 digabi-koe-ohje.sh $(DESTDIR)/usr/bin/$(APPNAME)
	install -d -m 0755 /usr/share/$(APPNAME)
	
	# Finnish documentation
	cp -r fi /usr/share/$(APPNAME)/
	find /usr/share/$(APPNAME)/fi -type f -exec chmod 644 {} \;
	find /usr/share/$(APPNAME)/fi -type d -exec chmod 755 {} \;
	
	# Don't copy Swedish front page to make yelp fallback to Finnish
	#cp -r sv /usr/share/$(APPNAME)/
	#find /usr/share/$(APPNAME)/sv -type f -exec chmod 644 {} \;
	#find /usr/share/$(APPNAME)/sv -type d -exec chmod 755 {} \;
