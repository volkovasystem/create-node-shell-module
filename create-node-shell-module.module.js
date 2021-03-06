"use strict";

/*;
	@license;
	@module-license:
		MIT License

		Copyright (c) 2020-present Richeve S. Bebedor <richeve.bebedor@gmail.com>

		@copyright:
			Richeve S. Bebedor

			<
				@license-year-range:
					2020-present
				@end-license-year-range
			>

			<
				@contact-detail:
					richeve.bebedor@gmail.com
				@end-contact-detail
			>
		@end-copyright

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license
*/

const childProcess = require( "child_process" );
const fs = require( "fs" );
const path = require( "path" );
const util = require( "util" );

const formatPackageJSONFile = (
	require( "format-package-json-file" )
);

const createNodeModule = (
	require( "create-node-module" )
);

const fsAsync = (
	fs
	.promises
);

const MODULE_VALUE_NAMESPACE_REPLACER_PATTERN = (
	new	RegExp(
		(
			"{{ @module-value-namespace }}"
		),

		(
			"gm"
		)
	)
);

const MODULE_VARIABLE_NAMESPACE_REPLACER_PATTERN = (
	new	RegExp(
		(
			"\\$moduleVariableNamespace"
		),

		(
			"gm"
		)
	)
);

const MODULE_VARIABLE_TITLE_NAMESPACE_REPLACER_PATTERN = (
	new	RegExp(
		(
			"\\$ModuleVariableTitleNamespace"
		),

		(
			"gm"
		)
	)
);

const GET_MODULE_VALUE_NAMESPACE_SHELL_SCRIPT = (
	"basename $(git remote get-url origin) .git"
);

const RUN_TEMPLATE_FILE_PATH = (
	`${ __dirname }/run.template.js`
);

const getShellScriptResult = (
	async	function getShellScriptResult( shellScript, moduleDirectoryPath ){
				const resultList = (
					[ ]
				);

				for await (
					const result of (
						childProcess
						.exec(
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
						.stdout
					)
				){
					resultList
					.push(
						(
							result
							.trim( )
						)
					);
				}

				return	(
							resultList
							.join(
								(
									""
								)
							)
							.trim( )
						);
			}
);

const writeFile = (
	async	function writeFile( filePath, fileContent ){
				return	(
							await	fsAsync
									.writeFile(
										(
											filePath
										),

										(
											fileContent
										),

										(
											"utf8"
										)
									)
						);
			}
);

const createNodeShellModule = (
	async	function createNodeShellModule( moduleDirectoryPath, option ){
				/*;
					@procedure-definition:
						Fast bootstrap node shell module.
					@end-procedure-definition

					@parameter-definition:
						{
							"moduleDirectoryPath": "
								[
									@type:
											string
									@end-type

									<@required;>
								]
							",

							"option": "
								[
									@type:
											object with {
												"moduleValueNamespace": "
													[
														@type:
																string
														@end-type
													]
												",

												"moduleScope": "
													[
														@type:
																string
														@end-type
													]
												",

												"moduleDescription": "
													[
														@type:
																string
														@end-type
													]
												",

												"authorTitleNamespace": "
													[
														@type:
																string
														@end-type
													]
												",

												"authorContactDetail": "
													[
														@type:
																string
														@end-type
													]
												",
											}
									@end-type

									<@optional;>
								]
							"
						}
					@end-parameter-definition

					@result-definition:
						{
							"result": "
								[
									@type:
											boolean
									@end-type
								]
							"
						}
					@end-result-definition

					@trigger-definition:
						{
							"trigger": "
								[
									@type:
											object as Error
									@end-type

									<@tag:invalid-module-directory-path;>
									<@tag:undefined-module-directory;>
									<@tag:cannot-create-node-shell-module;>
								]
							"
						}
					@end-trigger-definition
				*/

				try{
					if(
							(
									typeof
									moduleDirectoryPath
								==	"string"
							)

						&&	(
									moduleDirectoryPath
									.length
								>	1
							)
					){
							moduleDirectoryPath
						=	(
								path
								.resolve(
									(
										moduleDirectoryPath
									)
								)
							);
					}
					else{
						throw	(
									new	Error(
											(
												[
													"#invalid-module-directory-path;",

													"cannot create node shell module;",
													"invalid module directory path;",

													"@module-directory-path:",
													`${ moduleDirectoryPath };`
												]
											)
										)
								);
					}

					if(
							(
									(
										await	fsAsync
												.stat(
													(
														moduleDirectoryPath
													)
												)
									)
									.isDirectory( )
								!==	true
							)
					){
						throw	(
									new	Error(
											(
												[
													"#undefined-module-directory;",

													"cannot create node shell module;",
													"undefined module directory;",

													"@module-directory-path:",
													`${ moduleDirectoryPath };`
												]
											)
										)
								);
					}

					option = (
							(
								option
							)

						||	(
								{ }
							)
					);

					(
						await	createNodeModule(
									(
										moduleDirectoryPath
									),

									(
										option
									)
								)
					);

					const moduleValueNamespace = (
							(
									(
											typeof
											option
											.moduleValueNamespace
										==	"string"
									)

								&&	(
											(
												option
												.moduleValueNamespace
											)
											.length
										>	0
									)
							)
						?	(
								option
								.moduleValueNamespace
							)
						:	(
								await	getShellScriptResult(
											(
												GET_MODULE_VALUE_NAMESPACE_SHELL_SCRIPT
											),

											(
												moduleDirectoryPath
											)
										)
							)
					);

					const moduleVariableNamespace = (
						moduleValueNamespace
						.replace(
							(
								/\-([a-z0-9])/g
							),

							(
								( match ) => (
									match
									.slice(
										(
											1
										)
									)
									.toUpperCase( )
								)
							)
						)
					);

					const moduleVariableTitleNamespace = (
						moduleVariableNamespace
						.replace(
							(
								/^[a-z]/
							),

							(
								( match ) => (
									match
									.toUpperCase( )
								)
							)
						)
					);

					const packageData = (
						JSON
						.parse(
							(
								await	fsAsync
										.readFile(
											(
												path
												.resolve(
													(
														moduleDirectoryPath
													),

													(
														"package.json"
													)
												)
											),

											(
												"utf8"
											)
										)
							)
						)
					);

					const RUN_TEMPLATE = (
						(
							await	fsAsync
									.readFile(
										(
											RUN_TEMPLATE_FILE_PATH
										),

										(
											"utf8"
										)
									)
						)
						.replace(
							(
								MODULE_VARIABLE_NAMESPACE_REPLACER_PATTERN
							),

							(
								moduleVariableNamespace
							)
						)
						.replace(
							(
								MODULE_VARIABLE_TITLE_NAMESPACE_REPLACER_PATTERN
							),

							(
								moduleVariableTitleNamespace
							)
						)
						.replace(
							(
								MODULE_VALUE_NAMESPACE_REPLACER_PATTERN
							),

							(
								moduleValueNamespace
							)
						)
					);

					const PACKAGE_TEMPLATE = (
						Object
						.assign(
							(
								{ }
							),

							(
								packageData
							),

							(
								{
									"scripts": (
										Object
										.assign(
											(
												{ }
											),

											(
												packageData
												.scripts
											),

											(
												{
													[ `${ moduleValueNamespace }` ]: (
														`node ./${ moduleValueNamespace }.run.js`
													)
												}
											)
										)
									),

									"bin": (
										Object
										.assign(
											(
												{ }
											),

											(
												packageData
												.bin
											),

											(
												{
													[ `${ moduleValueNamespace }` ]: (
														`${ moduleValueNamespace }.run.js`
													)
												}
											)
										)
									)
								}
							)
						)
					);

					(
						await	writeFile(
									(
										path
										.resolve(
											(
												moduleDirectoryPath
											),

											(
												`${ moduleValueNamespace }.run.js`
											)
										)
									),

									(
										RUN_TEMPLATE
									)
								)
					);

					(
						await	writeFile(
									(
										path
										.resolve(
											(
												moduleDirectoryPath
											),

											(
												"package.json"
											)
										)
									),

									(
										JSON
										.stringify(
											(
												PACKAGE_TEMPLATE
											)
										)
									)
								)
					);

					(
						await	formatPackageJSONFile(
									(
										moduleDirectoryPath
									),

									(
										{
											"propertyList": (
												[
													"name",
													"version",
													"description",
													"main",
													"scripts",
													"bin",
													"repository",
													"keywords",
													"author",
													"contributors",
													"license",
													"bugs",
													"homepage"
												]
											)
										}
									)
								)
					);

					return	(
								true
							);
				}
				catch( error ){
					throw	(
								new	Error(
										(
											[
												"#cannot-create-node-shell-module;",

												"cannot create node shell module;",
												"cannot execute create node shell module;",

												"@error-data:",
												`${ util.inspect( error ) };`
											]
										)
									)
							);
				}
			}
);

module.exports = createNodeShellModule;
