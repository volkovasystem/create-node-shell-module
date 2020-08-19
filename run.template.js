#! /usr/bin/env node

(
	async	function run$ModuleVariableTitleNamespace( shellParameterList ){
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

				const SAMPLE_SHELL_PARAMETER = (
					"--sampleParameter"
				);

				const SAMPLE_SHORT_SHELL_PARAMETER = (
					"--sp"
				);

				const $moduleVariableNamespace = (
					require( "./{{ @module-value-namespace }}.js" )
				);

				const sampleParameter = (
					resolveShellParameterValue(
						(
							SAMPLE_SHELL_PARAMETER
						),

						(
							SAMPLE_SHORT_SHELL_PARAMETER
						),

						(
							undefined
						)
					)
				);

				return	(
							await	$moduleVariableNamespace(
										(
											sampleParameter
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
