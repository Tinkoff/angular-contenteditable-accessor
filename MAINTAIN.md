# Publishing

Once all code changes for the new version are merged, do

```
npm run release
```

This would run all the required checks, bump version and create a new tag. After that, run:

```
git push --follow-tags origin master
```

to push new tag to the repository and then do

```
cd ./dist/angular-contenteditable-accessor
npm publish --access=public
```

to publish new version to `npm`.
