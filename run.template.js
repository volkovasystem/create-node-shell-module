#! /usr/bin/env node

const SAMPLE_SHELL_PARAMETER = (
	"--sampleParameter"
);

(
	async	function run$ModuleVariableTitleNamespace( shellParameterList ){
				"use strict";

				const $moduleVariableNamespace = (
					require( "./{{ @module-value-namespace }}.js" )
				);

				const sampleParameter = (
						(
								(
										shellParameterList
										.includes(
											(
												SAMPLE_SHELL_PARAMETER
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
												SAMPLE_SHELL_PARAMETER
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
