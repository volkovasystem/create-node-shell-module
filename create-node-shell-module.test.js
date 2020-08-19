"use strict";

//; @template-engine-code-space;
const assert = require( "assert" );
const util = require( "util" );

const strictAssert = (
	assert
	.strict
);

//; @check-directory-procedure;
const checkDirectory = (
	async	function checkDirectory( directoryPath ){
					const fs = require( "fs" );
					const path = require( "path" );

					const fsAsync = (
						fs
						.promises
					);

						directoryPath
					=	(
							path
							.resolve(
								(
									directoryPath
								)
							)
						);

					try{
						return	(
									(
										await	fsAsync
												.stat(
													(
														directoryPath
													)
												)
									)
									.isDirectory( )
								);
					}
					catch( error ){
						return	(
									false
								);
					}
			}
);
//; @end-check-directory-procedure;

//; @check-file-procedure;
const checkFile = (
	async	function checkFile( filePath ){
					const fs = require( "fs" );
					const path = require( "path" );

					const fsAsync = (
						fs
						.promises
					);

						filePath
					=	(
							path
							.resolve(
								(
									filePath
								)
							)
						);

					try{
						return	(
									(
										await	fsAsync
												.stat(
													(
														filePath
													)
												)
									)
									.isFile( )
								);
					}
					catch( error ){
						return	(
									false
								);
					}
			}
);
//; @end-check-file-procedure;

//;	@get-directory-file-list-procedure;
const getDirectoryFileList = (
	async	function getDirectoryFileList( directoryPath ){
				const fs = require( "fs" );
				const path = require( "path" );

				const fsAsync = (
					fs
					.promises
				);

					directoryPath
				=	(
						path
						.resolve(
							(
								directoryPath
							)
						)
					);

				try{
					return	(
								await	fsAsync
										.readdir(
											(
												directoryPath
											),

											(
												{
													"withFileTypes": (
														true
													)
												}
											)
										)
							);
				}
				catch( error ){
					return	(
								[ ]
							);
				}
			}
);
//; @end-get-directory-file-list-procedure;

const executeShellScript = (
	async	function executeShellScript( shellScript, moduleDirectoryPath ){
				const childProcess = require( "child_process" );
				const path = require( "path" );

				const execAsync = (
					util
					.promisify(
						(
							childProcess
							.exec
						)
					)
				);

				if(
						(
								typeof
								moduleDirectoryPath
							==	"string"
						)

					&&	(
								moduleDirectoryPath
								.length
							>	0
						)
				){
					moduleDirectoryPath = (
						path
						.resolve(
							(
								moduleDirectoryPath
							)
						)
					);
				}
				else{
					moduleDirectoryPath = (
						process
						.cwd( )
					);
				}

				try{
					const	{
								stdout,
								stderr
							}
						=	(
								await	execAsync(
											(
												shellScript
											),

											(
												{
													"cwd": (
														moduleDirectoryPath
													)
												}
											)
										)
							);

					return	(
								{
									"outputLog": (
										stdout
										.trim( )
									),

									"errorLog": (
										stderr
										.trim( )
									)
								}
							);
				}
				catch( error ){
					return	(
								{
									"error": (
										util
										.inspect(
											(
												error
											)
										)
									)
								}
							);
				}
			}
);

const SETUP_TEST_DIRECTORY = (
	async	function SETUP_TEST_DIRECTORY( ){
				const shellParameterList = (
					process
					.argv
				);

				const DISABLE_SETUP_TEST_DIRECTORY_SHELL_PARAMETER = (
					"--disableSetupTestDirectory"
				);

				const DISABLE_SETUP_TEST_DIRECTORY_SHORT_SHELL_PARAMETER = (
					"--xstd"
				);

				const disableSetupTestDirectory = (
						(
								shellParameterList
								.includes(
									(
										DISABLE_SETUP_TEST_DIRECTORY_SHELL_PARAMETER
									)
								)
							===	true
						)

					||	(
								shellParameterList
								.includes(
									(
										DISABLE_SETUP_TEST_DIRECTORY_SHORT_SHELL_PARAMETER
									)
								)
							===	true
						)
				);

				if(
						(
								disableSetupTestDirectory
							===	true
						)
				){
					return	(
								true
							);
				}

				return	(
							await	executeShellScript(
										(
											"mkdir .test || true"
										)
									)
						);
			}
);

const CLEAN_TEST_DIRECTORY = (
	async	function CLEAN_TEST_DIRECTORY( ){
				const shellParameterList = (
					process
					.argv
				);

				const DISABLE_CLEAN_TEST_DIRECTORY_SHELL_PARAMETER = (
					"--disableCleanTestDirectory"
				);

				const DISABLE_CLEAN_TEST_DIRECTORY_SHORT_SHELL_PARAMETER = (
					"--xctd"
				);

				const disableCleanTestDirectory = (
						(
								shellParameterList
								.includes(
									(
										DISABLE_CLEAN_TEST_DIRECTORY_SHELL_PARAMETER
									)
								)
							===	true
						)

					||	(
								shellParameterList
								.includes(
									(
										DISABLE_CLEAN_TEST_DIRECTORY_SHORT_SHELL_PARAMETER
									)
								)
							===	true
						)
				);

				if(
						(
								disableCleanTestDirectory
							===	true
						)
				){
					return	(
								true
							);
				}

				return	(
							await	executeShellScript(
										(
											"rm -rfv .test || true"
										)
									)
						);
			}
);
//; @end-template-engine-code-space;

const createNodeShellModule = (
	require( "./create-node-shell-module.js" )
);

const TEST_CREATE_NODE_SHELL_MODULE = (
	async	function TEST_CREATE_NODE_SHELL_MODULE( ){
				(
					await	CLEAN_TEST_DIRECTORY( )
				);

				(
					await	SETUP_TEST_DIRECTORY( )
				);

				(
					await	executeShellScript(
								(
									[
										"git clone",
										"https://github.com/volkovasystem/test-create-node-shell-module.git",
										".test/test-create-node-shell-module"
									]
									.join(
										(
											" "
										)
									)
								)
							)
				);

				try{
					const actualValue = (
						await	createNodeShellModule(
									(
										".test/test-create-node-shell-module"
									)
								)
					);

					const testValue = (
						true
					);

					strictAssert
					.equal(
						(
							actualValue
						),

						(
							testValue
						),

						(
							[
								"#test-create-node-shell-module;",

								"test create node shell module;",

								`must return, ${ testValue };`
							]
						)
					);

					return	(
								true
							);
				}
				catch( error ){
					console
					.error(
						(
							error
						)
					);

					return	(
								false
							);
				}
				finally{
					(
						await	CLEAN_TEST_DIRECTORY( )
					);
				}
			}
);

const TEST_CREATE_NODE_SHELL_MODULE_FILE_LIST = (
	async	function TEST_CREATE_NODE_SHELL_MODULE_FILE_LIST( ){
				(
					await	CLEAN_TEST_DIRECTORY( )
				);

				(
					await	SETUP_TEST_DIRECTORY( )
				);

				const moduleDirectoryPath = (
					".test/test-create-node-shell-module"
				);

				(
					await	executeShellScript(
								(
									[
										"git clone",
										"https://github.com/volkovasystem/test-create-node-shell-module.git",
										moduleDirectoryPath
									]
									.join(
										(
											" "
										)
									)
								)
							)
				);

				try{


					(
						await	createNodeShellModule(
									(
										moduleDirectoryPath
									)
								)
					);

					const actualModuleFileList = (
						(
							await	getDirectoryFileList(
										(
											moduleDirectoryPath
										)
									)
						)
						.filter(
							(
								( fileData ) => (
									fileData
									.isFile( )
								)
							)
						)
						.map(
							(
								( fileData ) => (
									fileData
									.name
								)
							)
						)
					);

					const testModuleFileList = (
						[
							".editorconfig",
							".gitignore",
							".npmignore",
							"LICENSE",
							"package.json",
							"README.md",
							"test-create-node-shell-module.module.js",
							"test-create-node-shell-module.run.js",
							"test-create-node-shell-module.test.js"
						]
					);

					const actualValue = (
							(
									(
										testModuleFileList
										.length
									)
								===	(
										actualModuleFileList
										.length
									)
							)

						&&	(
								testModuleFileList
								.every(
									(
										( fileName ) => (
											actualModuleFileList
											.includes(
												(
													fileName
												)
											)
										)
									)
								)
							)
					);

					const testValue = (
						true
					);

					strictAssert
					.equal(
						(
							actualValue
						),

						(
							testValue
						),

						(
							[
								"#test-create-node-shell-module-file-list;",

								"test create node shell module file list;",
								`must contain the following, ${ testModuleFileList };`,

								`must assert to, ${ testValue };`
							]
						)
					);

					return	(
								true
							);
				}
				catch( error ){
					console
					.error(
						(
							error
						)
					);

					return	(
								false
							);
				}
				finally{
					(
						await	CLEAN_TEST_DIRECTORY( )
					);
				}
			}
);

(
	async	function TEST_SCENE_BASIC( ){
				(
					await	CLEAN_TEST_DIRECTORY( )
				);

				console
				.table(
					(
						[
							{
								"test": (
									"test create node shell module"
								),

								"result": (
									await	TEST_CREATE_NODE_SHELL_MODULE( )
								)
							},

							{
								"test": (
									"test create node shell module file list"
								),

								"result": (
									await	TEST_CREATE_NODE_SHELL_MODULE_FILE_LIST( )
								)
							}
						]
					)
				);

				(
					await	CLEAN_TEST_DIRECTORY( )
				);
			}
)( );
