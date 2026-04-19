#!/bin/bash

git submodule update --init --recursive

if [ -d author/project ]; then
	mv author/project author/site
fi

if [ -d author ]; then
	mv author kodorvan
fi

for i in kodorvan/site/system/settings/*.sample; do
  echo $i;
  if [ ! -f "${i/.sample/}" ]; then
    cp -n "$i" "${i/.sample/}";
    echo ${i/.sample/};
  fi
done

if ! [ -d kodorvan/site/system/public/js/modules ]; then
	mkdir kodorvan/site/system/public/js/modules -p
fi

if ! [ -L kodorvan/site/system/public/js/modules/damper.mjs ]; then
	ln -s ../../../../../../damper.mjs/damper.mjs kodorvan/site/system/public/js/modules/damper.mjs;
fi

if ! [ -L kodorvan/site/system/public/js/modules/hotline.mjs ]; then
	ln -s ../../../../../../hotline.mjs/hotline.mjs kodorvan/site/system/public/js/modules/hotline.mjs;
fi

if ! [ -L kodorvan/site/system/public/js/modules/womb3-simplex.mjs ]; then
	ln -s ../../../../../../womb3-simplex.mjs/womb3-simplex.mjs kodorvan/site/system/public/js/modules/womb3-simplex.mjs;
fi

if ! [ -L kodorvan/site/system/public/js/modules/simplex-noise.mjs ]; then
	ln -s ../../../../../../womb3-simplex.mjs/simplex-noise.mjs kodorvan/site/system/public/js/modules/simplex-noise.mjs;
fi

if ! [ -L kodorvan/site/system/public/css/icons ]; then
	ln -s ../../../../../icons/css kodorvan/site/system/public/css/icons;
fi
