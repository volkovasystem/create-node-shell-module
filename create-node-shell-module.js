parcelRequire=function(modules,cache,entry,globalName){var error,previousRequire="function"==typeof parcelRequire&&parcelRequire,nodeRequire="function"==typeof require&&require;function newRequire(name,jumped){if(!cache[name]){if(!modules[name]){var currentRequire="function"==typeof parcelRequire&&parcelRequire;if(!jumped&&currentRequire)return currentRequire(name,!0);if(previousRequire)return previousRequire(name,!0);if(nodeRequire&&"string"==typeof name)return nodeRequire(name);var err=new Error("Cannot find module '"+name+"'");throw err.code="MODULE_NOT_FOUND",err}localRequire.resolve=function(x){return modules[name][1][x]||x},localRequire.cache={};var module=cache[name]=new newRequire.Module(name);modules[name][0].call(module.exports,localRequire,module,module.exports,this)}return cache[name].exports;function localRequire(x){return newRequire(localRequire.resolve(x))}}newRequire.isParcelRequire=!0,newRequire.Module=function(moduleName){this.id=moduleName,this.bundle=newRequire,this.exports={}},newRequire.modules=modules,newRequire.cache=cache,newRequire.parent=previousRequire,newRequire.register=function(id,exports){modules[id]=[function(require,module){module.exports=exports},{}]};for(var i=0;i<entry.length;i++)try{newRequire(entry[i])}catch(e){error||(error=e)}if(entry.length){var mainExports=newRequire(entry[entry.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=mainExports:"function"==typeof define&&define.amd?define((function(){return mainExports})):this.createNodeShellModule=mainExports}if(parcelRequire=newRequire,error)throw error;return newRequire}({Ntdz:[function(require,module,exports){"use strict";
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
*/const childProcess=require("child_process"),fs=require("fs"),path=require("path"),util=require("util"),formatPackageJSONFile=require("format-package-json-file"),createNodeModule=require("create-node-module"),fsAsync=fs.promises,MODULE_VALUE_NAMESPACE_REPLACER_PATTERN=new RegExp("{{ @module-value-namespace }}","gm"),MODULE_VARIABLE_NAMESPACE_REPLACER_PATTERN=new RegExp("\\$moduleVariableNamespace","gm"),MODULE_VARIABLE_TITLE_NAMESPACE_REPLACER_PATTERN=new RegExp("\\$ModuleVariableTitleNamespace","gm"),RUN_TEMPLATE_FILE_PATH=__dirname+"/run.template.js",getShellCommandResult=async function(shellCommand,moduleDirectoryPath){const resultList=[];var _iteratorError,_iteratorNormalCompletion=!0,_didIteratorError=!1;try{for(var _step,_value,_iterator=function(iterable){var method;if("undefined"!=typeof Symbol){if(Symbol.asyncIterator&&null!=(method=iterable[Symbol.asyncIterator]))return method.call(iterable);if(Symbol.iterator&&null!=(method=iterable[Symbol.iterator]))return method.call(iterable)}throw new TypeError("Object is not async iterable")}(childProcess.exec(shellCommand,{cwd:moduleDirectoryPath}).stdout);_iteratorNormalCompletion=(_step=await _iterator.next()).done,_value=await _step.value,!_iteratorNormalCompletion;_iteratorNormalCompletion=!0){const result=_value;resultList.push(result.trim())}}catch(err){_didIteratorError=!0,_iteratorError=err}finally{try{_iteratorNormalCompletion||null==_iterator.return||await _iterator.return()}finally{if(_didIteratorError)throw _iteratorError}}return resultList.join("").trim()},writeFile=async function(filePath,fileContent){return await fsAsync.writeFile(filePath,fileContent,"utf8")};module.exports=async function(moduleDirectoryPath,option){try{if("string"==typeof moduleDirectoryPath&&moduleDirectoryPath.length>1&&!0===(await fsAsync.stat(moduleDirectoryPath)).isDirectory()){option=option||{},await createNodeModule(moduleDirectoryPath,option);const moduleValueNamespace="string"==typeof option.moduleValueNamespace&&option.moduleValueNamespace.length>0?option.moduleValueNamespace:await getShellCommandResult("basename $(git remote get-url origin) .git",moduleDirectoryPath),moduleVariableNamespace=moduleValueNamespace.replace(/\-([a-z0-9])/g,match=>match.slice(1).toUpperCase()),moduleVariableTitleNamespace=moduleVariableNamespace.replace(/^[a-z]/,match=>match.toUpperCase()),packageData=JSON.parse(await fsAsync.readFile(path.resolve(moduleDirectoryPath,"package.json"),"utf8")),RUN_TEMPLATE=(await fsAsync.readFile(RUN_TEMPLATE_FILE_PATH,"utf8")).replace(MODULE_VARIABLE_NAMESPACE_REPLACER_PATTERN,moduleVariableNamespace).replace(MODULE_VARIABLE_TITLE_NAMESPACE_REPLACER_PATTERN,moduleVariableTitleNamespace).replace(MODULE_VALUE_NAMESPACE_REPLACER_PATTERN,moduleValueNamespace),PACKAGE_TEMPLATE=Object.assign({},packageData,{scripts:{[""+moduleValueNamespace]:`node ./${moduleValueNamespace}.run.js`},bin:{[""+moduleValueNamespace]:moduleValueNamespace+".run.js"}});return await writeFile(path.resolve(moduleDirectoryPath,moduleValueNamespace+".run.js"),RUN_TEMPLATE),await writeFile(path.resolve(moduleDirectoryPath,"package.json"),JSON.stringify(PACKAGE_TEMPLATE)),await formatPackageJSONFile(moduleDirectoryPath),!0}throw new Error(["#invalid-module-directory-path;","cannot create node shell module;","invalid module directory path;","@module-directory-path:",moduleDirectoryPath+";"])}catch(error){throw new Error(["#cannot-create-node-shell-module;","cannot create node shell module;","cannot execute create node shell module;","@error-data:",util.inspect(error)+";"])}}},{}]},{},["Ntdz"]);