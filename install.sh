#!/bin/bash

if [ -d author/project ]; then
	mv author/project author/perm
fi

if [ -d author ]; then
	mv author kodorvan
fi

if [ -e kodorvan/perm/system/settings/*.sample ]; then
	for i in kodorvan/perm/system/settings/*.sample; do
    cp "i" "i/.sample/";
  done
fi
