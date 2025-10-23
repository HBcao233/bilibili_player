#!/bin/bash

SVG_DIR="svg"
BUILD_DIR="build"
DIST_DIR="dist"
SVG_JS="build/svg.js"
BUILD_JS="build/BPlayer.js"
OUTPUT_JS="dist/BPlayer.min.js"

if [ ! -d $BUILD_DIR ]; then
  mkdir $BUILD_DIR;
fi
if [ ! -d $DIST_DIR ]; then
  mkdir $DIST_DIR;
fi

echo "const svgs = {" > $SVG_JS

echo "generate $SVG_JS..."
first=true
for file in $SVG_DIR/*.svg; do
  if [ -f "$file" ]; then
    if [ "$first" = false ]; then
      echo "," >> $SVG_JS
    fi
    first=false
    
    basename=$(basename "$file" .svg)
    content=$(cat "$file" | tr -d '\n\r')
    
    echo -n "  '$basename': \`$content\`" >> $SVG_JS
  fi
done

echo "" >> $SVG_JS
echo "};" >> $SVG_JS

echo "generate $BUILD_JS..."
echo "(function(){'use strict';" > $BUILD_JS

echo "generate build/BPlayer.min.css..."
cleancss BPlayer.css -o build/BPlayer.min.css

cat utils.js >> $BUILD_JS
cat $SVG_JS >> $BUILD_JS
printf "const styles = \`" >> $BUILD_JS
cat build/BPlayer.min.css >> $BUILD_JS;
echo "\`;" >> $BUILD_JS;
cat main.js >> $BUILD_JS
echo "})();" >> $BUILD_JS
echo "generate $OUTPUT_JS..."
uglifyjs $BUILD_JS -o $OUTPUT_JS -c -m
