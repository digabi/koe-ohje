#!/bin/bash

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

# Kill existing yelps
pkill -TERM -f "/usr/bin/yelp"

# Start yelp
/usr/bin/yelp /usr/share/digabi-koe-ohje/${DOC_LANG}/index.html &

# Modify window size (get PID, Window ID and finally resize with xdotool)
YELP_WID=
try_count=0

while [[ -z $YELP_WID && $try_count -lt 100 ]]; do
	YELP_PID=`pgrep -f /usr/bin/yelp`
	YELP_WID=`xdotool search --all --onlyvisible --pid ${YELP_PID} 2>/dev/null | grep -P "^\d+$" | head -n 1`
	let "try_count=${try_count}+1"
done


if [ "${YELP_WID}" != "" ]; then
	xdotool windowsize --sync ${YELP_WID} 800 500
	xdotool windowmove --sync ${YELP_WID} 25 25
fi
