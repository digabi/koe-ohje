#!/bin/bash

IS_FI=`echo "$LANG" | grep -P "^fi"`
IS_SV=`echo "$LANG" | grep -P "^sv"`

# Defaults to Finnish
DOC_LANG=fi
TITLE="Koejärjestelmän ohjeet"

if [ "${IS_FI}" != "" ]; then
	echo "Finnish language selected"
	DOC_LANG=fi
elif [ "${IS_SV}" != "" ]; then
	echo "Swedish language selected"
	DOC_LANG=sv
	TITLE="Provmiljöns instruktioner"

	if [ ! -f /usr/share/digabi-koe-ohje/build/index-${DOC_LANG}.html ]; then
		echo "Oops, Swedish documentation is missing"
		DOC_LANG=fi
		TITLE="Koejärjestelmän ohjeet"
	fi
else
	echo "$0: No known language selected, defaults to ${DOC_LANG}"
fi

# Kill existing browsers
pkill -TERM -f "/usr/bin/digabi-koe-browser"

# Start browser
/usr/bin/digabi-koe-browser -t "${TITLE}" -W 1045 -H 600 -x 30 -y 30 file:///usr/share/digabi-koe-ohje/build/index-${DOC_LANG}.html &
