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
const LIB_PACKAGE_PATH = 'projects/angular-contenteditable-accessor/package.json';
const INDENTATION = 4;

// Sync library package.json metadata with main package.json
updatePackage();

function updatePackage() {
	fs.writeFileSync(LIB_PACKAGE_PATH,
		JSON.stringify(
			{
				...JSON.parse(fs.readFileSync(LIB_PACKAGE_PATH)),
				name,
				version,
				description,
				keywords,
				license,
				author,
				repository,
				bugs,
				homepage,
			},
			null,
			INDENTATION,
		),
	);
}
