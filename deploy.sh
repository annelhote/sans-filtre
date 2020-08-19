#!/usr/bin/env sh
# See here : https://cli.vuejs.org/guide/deployment.html#github-pages

# abort on errors
set -e

# build
yarn build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy' --no-gpg-sign

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:annelhote/sans-filtre.git master:gh-pages

cd -
