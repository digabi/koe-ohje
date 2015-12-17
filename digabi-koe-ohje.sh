#!/bin/sh

IS_FI=`echo "$LANG" | grep -P "^fi"`
IS_SV=`echo "$LANG" | grep -P "^sv"`

# Defaults to Finnish
DOC_LANG=fi

if [ "${IS_FI}" != "" ]; then
	echo "Finnish language selected"
	DOC_LANG=fi
elif [ "${IS_SV}" != "" ]; then
	echo "Swedish language selected"
	DOC_LANG=sv

	if [ ! -f /usr/share/digabi-koe-ohje/${DOC_LANG}/index.html ]; then
		echo "Oops, Swedish documentation is missing"
		DOC_LANG=fi
	fi
else
	echo "No known language selected, defaults to ${DOC_LANG}"
fi

/usr/bin/yelp /usr/share/digabi-koe-ohje/${DOC_LANG}/index.html
