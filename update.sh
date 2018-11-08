#!/bin/bash

OLD_PWD="${PWD}"
GITLOG_JSON="${PWD}/gitlog.json"

cd /c/repos/liferay-portal

echo '[' > "${GITLOG_JSON}"
git log -10 --numstat --pretty=format:'{%n  "commit": "%H",%n  "author": "%ae",%n  "date": "%aI",%n  "message":"%s",%n  "stat": {' | \
sed '/^[0-9]/s/^\([0-9]*\)\s*\([0-9]*\)\s*\(.*\)$/    "\3":[\1,\2],/g' | \
sed '/^$/s/^$/    "": null\n  }\n},/g' >> "${GITLOG_JSON}"
echo '"":null}}]' >> "${GITLOG_JSON}"

cd -

git add gitlog.json
git commit --amend -m "No message"
git push origin -f