"use strict";

const assert = require( "assert" );
const util = require( "util" );

const strictAssert = assert.strict;

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

const TEST_SAMPLE_UNIT = (
	async	function TEST_SAMPLE_UNIT( ){
				(
					await	TEST_CLEANUP_DIRECTORY( )
				);

				(
					await	TEST_SETUP_DIRECTORY( )
				);

				try{
					strictAssert
					.equal(
						(
							true
						),

						(
							true
						),

						(
							[
								"#test-sample-unit;",

								"test sample unit;",
								"must return true;"
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
					[
						{
							"test": (
								"test sample unit"
							),

							"result": (
								await	TEST_SAMPLE_UNIT( )
							)
						}
					]
				);

				(
					await	TEST_CLEANUP_DIRECTORY( )
				);
			}
)( );
