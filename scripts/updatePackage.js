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

updatePackage();

function updatePackage() {
	// Sync lib package.json
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
