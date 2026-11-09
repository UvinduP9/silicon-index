#!/bin/zsh
# usage: shot.sh file.html out.png [width] [height] [query]
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=4000 \
  --window-size=${3:-1440},${4:-1000} --screenshot="$2" "file://$PWD/$1${5}" >/dev/null 2>&1
