"use strict";

const assert = require( "assert" );
const util = require( "util" );

const strictAssert = (
	assert
	.strict
);

const createNodeShellModule = (
	require( "./create-node-shell-module.js" )
);

const executeShellCommand = (
	async	function executeShellCommand( shellCommand, moduleDirectoryPath ){
				const childProcess = require( "child_process" );

				const executeAsync = (
					util
					.promisify(
						(
							childProcess
							.exec
						)
					)
				);

				try{
					const	{
								stdout,
								stderr
							}
						=	(
								await	executeAsync(
											(
												shellCommand
											),

											(
												{
													"moduleDirectoryPath": (
															(
																moduleDirectoryPath
															)

														||	(
																process
																.cwd( )
															)
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

const TEST_SETUP_DIRECTORY = (
	async	function TEST_SETUP_DIRECTORY( ){
				return	(
							await	executeShellCommand(
										(
											"mkdir .test || true"
										)
									)
						);
			}
);

const TEST_CLEANUP_DIRECTORY = (
	async	function TEST_CLEANUP_DIRECTORY( ){
				return	(
							await	executeShellCommand(
										(
											"rm -rfv .test || true"
										)
									)
						);
			}
);

const TEST_CREATE_NODE_SHELL_MODULE = (
	async	function TEST_CREATE_NODE_SHELL_MODULE( ){
				(
					await	TEST_CLEANUP_DIRECTORY( )
				);

				(
					await	TEST_SETUP_DIRECTORY( )
				);

				(
					await	executeShellCommand(
								(
									[
										"git clone",
										"https://github.com/volkovasystem/test-create-node-shell-module.git",
										".test/test-create-node-shell-module"
									]
									.join(
										" "
									)
								)
							)
				);

				try{
					const testValue = (
						true
					);

					strictAssert
					.equal(
						(
							await	createNodeShellModule(
										(
											".test/test-create-node-shell-module"
										)
									)
						),

						(
							testValue
						),

						(
							[
								"#test-create-node-shell-module;",

								"test create node shell module;",
								`must return ${ testValue };`
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
						await	TEST_CLEANUP_DIRECTORY( )
					);
				}
			}
);

const TEST_CREATE_NODE_SHELL_MODULE_FILE_LIST = (
	async	function TEST_CREATE_NODE_SHELL_MODULE_FILE_LIST( ){
				(
					await	TEST_CLEANUP_DIRECTORY( )
				);

				(
					await	TEST_SETUP_DIRECTORY( )
				);

				(
					await	executeShellCommand(
								(
									[
										"git clone",
										"https://github.com/volkovasystem/test-create-node-shell-module.git",
										".test/test-create-node-shell-module"
									]
									.join(
										" "
									)
								)
							)
				);

				try{
					const fs = require( "fs" );

					const fsAsync = (
						fs
						.promises
					);

					const testDirectory = (
						".test/test-create-node-shell-module"
					);

					(
						await	createNodeShellModule(
									(
										testDirectory
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

					const actualModuleFileList = (
						(
							await	fsAsync
									.readdir(
										(
											testDirectory
										),

										(
											{
												"withFileTypes": true
											}
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

					const testValue = (
						true
					);

					strictAssert
					.equal(
						(
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
						),

						(
							testValue
						),

						(
							[
								"#test-create-node-shell-module-file-list;",

								"test create node shell module file list;",
								`must contain the following, ${ testModuleFileList };`,
								`must return ${ testValue };`
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
						await	TEST_CLEANUP_DIRECTORY( )
					);
				}
			}
);

(
	async	function TEST_SCENE_BASIC( ){
				(
					await	TEST_CLEANUP_DIRECTORY( )
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
					await	TEST_CLEANUP_DIRECTORY( )
				);
			}
)( );
