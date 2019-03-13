const fs = require('fs');
const {
	name,
	version,
	description,
	keywords,
	license,
	author,
	repository,
	bugs,
	homepage,
} = require('../package.json');
const DIST_LIB_PATH = 'dist/angular-contenteditable-accessor';
const DIST_PACKAGE_PATH = DIST_LIB_PATH + '/package.json';
const LIB_PACKAGE_PATH = 'projects/angular-contenteditable-accessor/package.json';
const INDENTATION = 4;

generatePackageFile();

function generatePackageFile() {
	if (!fs.existsSync(DIST_LIB_PATH)) {
		return;
	}

	// Sync dist package.json
	fs.writeFileSync(DIST_PACKAGE_PATH,
		JSON.stringify(
			{
				...getPackage(DIST_PACKAGE_PATH),
				name,
				version,
				description,
				keywords,
				license,
				author,
				repository,
				bugs,
				homepage,
				dependencies: undefined,
			},
			null,
			INDENTATION,
		),
	);

	// Sync lib package.json
	fs.writeFileSync(LIB_PACKAGE_PATH,
		JSON.stringify(
			{
				...getPackage(LIB_PACKAGE_PATH),
				name,
				version,
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
