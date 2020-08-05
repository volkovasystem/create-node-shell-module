#! /usr/bin/env node

const MODULE_DIRECTORY_PATH_SHELL_PARAMETER = (
	"--moduleDirectoryPath"
);

const MODULE_VALUE_NAMESPACE_PARAMETER = (
	"--moduleValueNamespace"
);

const MODULE_SCOPE_SHELL_PARAMETER = (
	"--moduleScope"
);

const MODULE_DESCRIPTION_SHELL_PARAMETER = (
	"--moduleDescription"
);

const AUTHOR_TITLE_NAMESPACE_SHELL_PARAMETER = (
	"--authorTitleNamespace"
);

const AUTHOR_CONTACT_DETAIL_PARAMETER = (
	"--authorContactDetail"
);

(
	async	function runCreateNodeShellModule( shellParameterList ){
				"use strict";

				const createNodeShellModule = (
					require( "./create-node-shell-module.js" )
				);

				const moduleDirectoryPath = (
						(
								(
										shellParameterList
										.includes(
											(
												MODULE_DIRECTORY_PATH_SHELL_PARAMETER
											)
										)
									===	true
								)
						)
					?	(
							shellParameterList[
								(
									(
										shellParameterList
										.indexOf(
											(
												MODULE_DIRECTORY_PATH_SHELL_PARAMETER
											)
										)
									)+1
								)
							]
						)
					:	(
							process
							.cwd( )
						)
				);

				const moduleValueNamespace = (
						(
								(
										shellParameterList
										.includes(
											(
												MODULE_VALUE_NAMESPACE_PARAMETER
											)
										)
									===	true
								)
						)
					?	(
							shellParameterList[
								(
									(
										shellParameterList
										.indexOf(
											(
												MODULE_VALUE_NAMESPACE_PARAMETER
											)
										)
									)+1
								)
							]
						)
					:	(
							undefined
						)
				);

				const moduleScope = (
						(
								(
										shellParameterList
										.includes(
											(
												MODULE_SCOPE_SHELL_PARAMETER
											)
										)
									===	true
								)
						)
					?	(
							shellParameterList[
								(
									(
										shellParameterList
										.indexOf(
											(
												MODULE_SCOPE_SHELL_PARAMETER
											)
										)
									)+1
								)
							]
						)
					:	(
							undefined
						)
				);

				const moduleDescription = (
						(
								(
										shellParameterList
										.includes(
											(
												MODULE_DESCRIPTION_SHELL_PARAMETER
											)
										)
									===	true
								)
						)
					?	(
							shellParameterList[
								(
									(
										shellParameterList
										.indexOf(
											(
												MODULE_DESCRIPTION_SHELL_PARAMETER
											)
										)
									)+1
								)
							]
						)
					:	(
							undefined
						)
				);

				const authorTitleNamespace = (
						(
								(
										shellParameterList
										.includes(
											(
												AUTHOR_TITLE_NAMESPACE_SHELL_PARAMETER
											)
										)
									===	true
								)
						)
					?	(
							shellParameterList[
								(
									(
										shellParameterList
										.indexOf(
											(
												AUTHOR_TITLE_NAMESPACE_SHELL_PARAMETER
											)
										)
									)+1
								)
							]
						)
					:	(
							undefined
						)
				);

				const authorContactDetail = (
						(
								(
										shellParameterList
										.includes(
											(
												AUTHOR_CONTACT_DETAIL_PARAMETER
											)
										)
									===	true
								)
						)
					?	(
							shellParameterList[
								(
									(
										shellParameterList
										.indexOf(
											(
												AUTHOR_CONTACT_DETAIL_PARAMETER
											)
										)
									)+1
								)
							]
						)
					:	(
							undefined
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
