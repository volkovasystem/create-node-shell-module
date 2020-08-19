#! /usr/bin/env node

(
	async	function runCreateNodeShellModule( shellParameterList ){
				"use strict";

				//; @template-engine-code-space;
				const checkShellParameter = (
					function checkShellParameter( shellParameter, shortShellParameter ){
						return	(
									[
										(
												shellParameterList
												.includes(
													(
														shortShellParameter
													)
												)
											===	true
										),

										(
												shellParameterList
												.includes(
													(
														shellParameter
													)
												)
											===	true
										),
									]
									.some(
										(
											( status ) => ( status )
										)
									)
								);
					}
				);

				const getShellParameterValue = (
					function getShellParameterValue( shellParameter, shortShellParameter ){
						if(
								(
										checkShellParameter(
											(
												shellParameter
											),

											(
												shortShellParameter
											)
										)
									===	true
								)
						){
							return	(
										shellParameterList[
											(
												[
													(
														shellParameterList
														.indexOf(
															(
																shellParameter
															)
														)
													),

													(
														shellParameterList
														.indexOf(
															(
																shortShellParameter
															)
														)
													),
												]
												.filter(
													(
														( index ) => (
																index
															>=	0
														)
													)
												)
												.pop( )+1
											)
										]
									);
						}
						else{
							return	(
										undefined
									);
						}
					}
				);

				const resolveShellParameterValue = (
					function resolveShellParameterValue( shellParameter, shortShellParameter, defaultValue ){
						return	(
										(
												(
														checkShellParameter(
															(
																shellParameter
															),

															(
																shortShellParameter
															)
														)
													===	true
												)
										)
									?	(
											getShellParameterValue(
												(
													shellParameter
												),

												(
													shortShellParameter
												)
											)
										)
									:	(
											defaultValue
										)
								);
					}
				);
				//;	@end-template-engine-code-space;

				const MODULE_DIRECTORY_PATH_SHELL_PARAMETER = (
					"--moduleDirectoryPath"
				);

				const MODULE_DIRECTORY_PATH_SHORT_SHELL_PARAMETER = (
					"--mdp"
				);

				const MODULE_VALUE_NAMESPACE_SHELL_PARAMETER = (
					"--moduleValueNamespace"
				);

				const MODULE_VALUE_NAMESPACE_SHORT_SHELL_PARAMETER = (
					"--mvn"
				);

				const MODULE_SCOPE_SHELL_PARAMETER = (
					"--moduleScope"
				);

				const MODULE_SCOPE_SHORT_SHELL_PARAMETER = (
					"--ms"
				);

				const MODULE_DESCRIPTION_SHELL_PARAMETER = (
					"--moduleDescription"
				);

				const MODULE_DESCRIPTION_SHORT_SHELL_PARAMETER = (
					"--md"
				);

				const AUTHOR_TITLE_NAMESPACE_SHELL_PARAMETER = (
					"--authorTitleNamespace"
				);

				const AUTHOR_TITLE_NAMESPACE_SHORT_SHELL_PARAMETER = (
					"--atn"
				);

				const AUTHOR_CONTACT_DETAIL_SHELL_PARAMETER = (
					"--authorContactDetail"
				);

				const AUTHOR_CONTACT_DETAIL_SHORT_SHELL_PARAMETER = (
					"--acd"
				);

				const createNodeShellModule = (
					require( "./create-node-shell-module.js" )
				);

				const moduleDirectoryPath = (
					resolveShellParameterValue(
						(
							MODULE_DIRECTORY_PATH_SHELL_PARAMETER
						),

						(
							MODULE_DIRECTORY_PATH_SHORT_SHELL_PARAMETER
						),

						(
							process
							.cwd( )
						)
					)
				);

				const moduleValueNamespace = (
					resolveShellParameterValue(
						(
							MODULE_VALUE_NAMESPACE_SHELL_PARAMETER
						),

						(
							MODULE_VALUE_NAMESPACE_SHORT_SHELL_PARAMETER
						),

						(
							undefined
						)
					)
				);

				const moduleScope = (
					resolveShellParameterValue(
						(
							MODULE_SCOPE_SHELL_PARAMETER
						),

						(
							MODULE_SCOPE_SHORT_SHELL_PARAMETER
						),

						(
							undefined
						)
					)
				);

				const moduleDescription = (
					resolveShellParameterValue(
						(
							MODULE_DESCRIPTION_SHELL_PARAMETER
						),

						(
							MODULE_DESCRIPTION_SHORT_SHELL_PARAMETER
						),

						(
							undefined
						)
					)
				);

				const authorTitleNamespace = (
					resolveShellParameterValue(
						(
							AUTHOR_TITLE_NAMESPACE_SHELL_PARAMETER
						),

						(
							AUTHOR_TITLE_NAMESPACE_SHORT_SHELL_PARAMETER
						),

						(
							undefined
						)
					)
				);

				const authorContactDetail = (
					resolveShellParameterValue(
						(
							AUTHOR_CONTACT_DETAIL_SHELL_PARAMETER
						),

						(
							AUTHOR_CONTACT_DETAIL_SHORT_SHELL_PARAMETER
						),

						(
							undefined
						)
					)
				);

				return	(
							await	createNodeShellModule(
										(
											moduleDirectoryPath
										),

										(
											{
												"moduleValueNamespace": (
													moduleValueNamespace
												),

												"moduleScope": (
													moduleScope
												),

												"moduleDescription": {
													moduleDescription
												},

												"authorTitleNamespace": (
													authorTitleNamespace
												),

												"authorContactDetail": (
													authorContactDetail
												)
											}
										)
									)
						);
			}
)(
	(
		process
		.argv
	)
);
