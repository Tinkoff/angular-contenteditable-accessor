const fs = require('fs');
const DIST_LIB_PATH = 'dist/angular-contenteditable-accessor/';
const DIST_PACKAGE_PATH = DIST_LIB_PATH + 'package.json';
const INDENTATION = 4;

removeDependencies();

// https://github.com/ng-packagr/ng-packagr/issues/1159
function removeDependencies() {
	if (!fs.existsSync(DIST_LIB_PATH)) {
		return;
	}

	// Sync dist package.json
	fs.writeFileSync(DIST_PACKAGE_PATH,
		JSON.stringify(
			{
				...getPackage(DIST_PACKAGE_PATH),
				dependencies: undefined,
			},
			null,
			INDENTATION,
		),
	);
}

function getPackage(packagePath) {
	return fs.existsSync(packagePath)
		? JSON.parse(fs.readFileSync(packagePath))
		: {};
}
