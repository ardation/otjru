;(function(window,undefined){'use strict';var freeExports=typeof exports=='object'&&exports&&(typeof global=='object'&&global&&global==global.global&&(window=global),exports);var escapes={'\\':'\\',"'":"'",'\n':'n','\r':'r','\t':'t','\u2028':'u2028','\u2029':'u2029'};var hasDontEnumBug=!{'valueOf':0}.propertyIsEnumerable('valueOf');var idCounter=0;var objectTypes={'boolean':false,'function':true,'object':true,'number':false,'string':false,'undefined':false};var oldDash=window._;var reNative=RegExp('^'+({}.valueOf+'').replace(/[.*+?^=!:${}()|[\]\/\\]/g,'\\$&').replace(/valueOf|for [^\]]+/g,'.+?')+'$');var reToken=/__token__(\d+)/g;var reUnescaped=/['\n\r\t\u2028\u2029\\]/g;var shadowed=['constructor','hasOwnProperty','isPrototypeOf','propertyIsEnumerable','toLocaleString','toString','valueOf'];var token='__token__';var tokenized=[];var arrayClass='[object Array]',boolClass='[object Boolean]',dateClass='[object Date]',funcClass='[object Function]',numberClass='[object Number]',regexpClass='[object RegExp]',stringClass='[object String]';var ArrayProto=Array.prototype,ObjectProto=Object.prototype;var concat=ArrayProto.concat,hasOwnProperty=ObjectProto.hasOwnProperty,push=ArrayProto.push,slice=ArrayProto.slice,toString=ObjectProto.toString;var nativeBind=reNative.test(nativeBind=slice.bind)&&/\n|Opera/.test(nativeBind+toString.call(window.opera))&&nativeBind;var nativeIsArray=reNative.test(nativeIsArray=Array.isArray)&&nativeIsArray,nativeIsFinite=window.isFinite,nativeKeys=reNative.test(nativeKeys=Object.keys)&&nativeKeys;var clearTimeout=window.clearTimeout,setTimeout=window.setTimeout;function lodash(value){return new LoDash(value);}
function LoDash(value){if(value&&value._wrapped){return value;}
this._wrapped=value;}
lodash.templateSettings={'escape':/<%-([\s\S]+?)%>/g,'evaluate':/<%([\s\S]+?)%>/g,'interpolate':/<%=([\s\S]+?)%>/g,'variable':'obj'};var iteratorTemplate=template('var index, result<% if (init) { %> = <%= init %><% } %>;\n'+'<%= exit %>;\n'+'<%= top %>;\n'+'<% if (arrayBranch) { %>'+'var length = <%= firstArg %>.length; index = -1;'+'  <% if (objectBranch) { %>\nif (length === +length) {<% } %>\n'+'  <%= arrayBranch.beforeLoop %>;\n'+'  while (<%= arrayBranch.loopExp %>) {\n'+'    <%= arrayBranch.inLoop %>;\n'+'  }'+'  <% if (objectBranch) { %>\n}\n<% }'+'}'+'if (objectBranch) {'+'  if (arrayBranch) { %>else {\n<% }'+'  if (!hasDontEnumBug) { %>  var skipProto = typeof <%= iteratedObject %> == \'function\';\n<% } %>'+'  <%= objectBranch.beforeLoop %>;\n'+'  for (<%= objectBranch.loopExp %>) {'+'  \n<%'+'  if (hasDontEnumBug) {'+'    if (useHas) { %>    if (<%= hasExp %>) {\n  <% } %>'+'    <%= objectBranch.inLoop %>;<%'+'    if (useHas) { %>\n    }<% }'+'  }'+'  else {'+'  %>'+'    if (!(skipProto && index == \'prototype\')<% if (useHas) { %> && <%= hasExp %><% } %>) {\n'+'      <%= objectBranch.inLoop %>;\n'+'    }'+'  <% } %>\n'+'  }'+'  <% if (hasDontEnumBug) { %>\n'+'  var ctor = <%= iteratedObject %>.constructor;\n'+'  <% for (var k = 0; k < 7; k++) { %>\n'+'  index = \'<%= shadowed[k] %>\';\n'+'  if (<%'+'      if (shadowed[k] == \'constructor\') {'+'        %>!(ctor && ctor.prototype === <%= iteratedObject %>) && <%'+'      } %><%= hasExp %>) {\n'+'    <%= objectBranch.inLoop %>;\n'+'  }<%'+'     }'+'   }'+'   if (arrayBranch) { %>\n}<% }'+'} %>\n'+'<%= bottom %>;\n'+'return result');var baseIteratorOptions={'args':'collection, callback, thisArg','init':'collection','top':'if (!callback) {\n'+'  callback = identity\n'+'}\n'+'else if (thisArg) {\n'+'  callback = bind(callback, thisArg)\n'+'}','inLoop':'callback(collection[index], index, collection)'};var everyIteratorOptions={'init':'true','inLoop':'if (!callback(collection[index], index, collection)) return !result'};var extendIteratorOptions={'args':'object','init':'object','top':'for (var source, sourceIndex = 1, length = arguments.length; sourceIndex < length; sourceIndex++) {\n'+'  source = arguments[sourceIndex];\n'+(hasDontEnumBug?'  if (source) {':''),'loopExp':'index in source','useHas':false,'inLoop':'object[index] = source[index]','bottom':(hasDontEnumBug?'  }\n':'')+'}'};var filterIteratorOptions={'init':'[]','inLoop':'callback(collection[index], index, collection) && result.push(collection[index])'};var forEachIteratorOptions={'top':'if (thisArg) callback = bind(callback, thisArg)'};var mapIteratorOptions={'init':'','exit':'if (!collection) return []','beforeLoop':{'array':'result = Array(length)','object':'result = []'},'inLoop':{'array':'result[index] = callback(collection[index], index, collection)','object':'result.push(callback(collection[index], index, collection))'}};function createIterator(){var object,prop,value,index=-1,length=arguments.length;var data={'bottom':'','exit':'','init':'','top':'','arrayBranch':{'beforeLoop':'','loopExp':'++index < length'},'objectBranch':{'beforeLoop':''}};while(++index<length){object=arguments[index];for(prop in object){value=(value=object[prop])==null?'':value;if(/beforeLoop|loopExp|inLoop/.test(prop)){if(typeof value=='string'){value={'array':value,'object':value};}
data.arrayBranch[prop]=value.array;data.objectBranch[prop]=value.object;}else{data[prop]=value;}}}
var args=data.args,arrayBranch=data.arrayBranch,objectBranch=data.objectBranch,firstArg=/^[^,]+/.exec(args)[0],loopExp=objectBranch.loopExp,iteratedObject=/\S+$/.exec(loopExp||firstArg)[0];data.firstArg=firstArg;data.hasDontEnumBug=hasDontEnumBug;data.hasExp='hasOwnProperty.call('+iteratedObject+', index)';data.iteratedObject=iteratedObject;data.shadowed=shadowed;data.useHas=data.useHas!==false;if(!data.exit){data.exit='if (!'+firstArg+') return result';}
if(firstArg=='object'||!arrayBranch.inLoop){data.arrayBranch=null;}
if(!loopExp){objectBranch.loopExp='index in '+iteratedObject;}
var factory=Function('arrayClass, bind, funcClass, hasOwnProperty, identity, objectTypes, '+'stringClass, toString, undefined','"use strict"; return function('+args+') {\n'+iteratorTemplate(data)+'\n}');return factory(arrayClass,bind,funcClass,hasOwnProperty,identity,objectTypes,stringClass,toString);}
function detokenize(match,index){return tokenized[index];}
function escapeChar(match){return'\\'+escapes[match];}
function noop(){}
function tokenizeEscape(match,value){var index=tokenized.length;tokenized[index]="'+\n((__t = ("+value+")) == null ? '' : _.escape(__t)) +\n'";return token+index;}
function tokenizeInterpolate(match,value){var index=tokenized.length;tokenized[index]="'+\n((__t = ("+value+")) == null ? '' : __t) +\n'";return token+index;}
function tokenizeEvaluate(match,value){var index=tokenized.length;tokenized[index]="';\n"+value+";\n__p += '";return token+index;}
var contains=createIterator({'args':'collection, target','init':'false','inLoop':'if (collection[index] === target) return true'});var every=createIterator(baseIteratorOptions,everyIteratorOptions);var filter=createIterator(baseIteratorOptions,filterIteratorOptions);var find=createIterator(baseIteratorOptions,forEachIteratorOptions,{'init':'','inLoop':'if (callback(collection[index], index, collection)) return collection[index]'});var forEach=createIterator(baseIteratorOptions,forEachIteratorOptions);var map=createIterator(baseIteratorOptions,mapIteratorOptions);var pluck=createIterator(mapIteratorOptions,{'args':'collection, property','inLoop':{'array':'result[index] = collection[index][property]','object':'result.push(collection[index][property])'}});var reduce=createIterator({'args':'collection, callback, accumulator, thisArg','init':'accumulator','top':'var noaccum = arguments.length < 3;\n'+'if (thisArg) callback = bind(callback, thisArg)','beforeLoop':{'array':'if (noaccum) result = collection[++index]'},'inLoop':{'array':'result = callback(result, collection[index], index, collection)','object':'result = noaccum\n'+'  ? (noaccum = false, collection[index])\n'+'  : callback(result, collection[index], index, collection)'}});function reduceRight(collection,callback,accumulator,thisArg){if(!collection){return accumulator;}
var length=collection.length,noaccum=arguments.length<3;if(thisArg){callback=bind(callback,thisArg);}
if(length===+length){if(length&&noaccum){accumulator=collection[--length];}
while(length--){accumulator=callback(accumulator,collection[length],length,collection);}
return accumulator;}
var prop,props=keys(collection);length=props.length;if(length&&noaccum){accumulator=collection[props[--length]];}
while(length--){prop=props[length];accumulator=callback(accumulator,collection[prop],prop,collection);}
return accumulator;}
var reject=createIterator(baseIteratorOptions,filterIteratorOptions,{'inLoop':'!'+filterIteratorOptions.inLoop});var some=createIterator(baseIteratorOptions,everyIteratorOptions,{'init':'false','inLoop':everyIteratorOptions.inLoop.replace('!','')});function toArray(collection){if(!collection){return[];}
if(toString.call(collection.toArray)==funcClass){return collection.toArray();}
var length=collection.length;if(length===+length){return slice.call(collection);}
return values(collection);}
var values=createIterator(mapIteratorOptions,{'args':'collection','inLoop':{'array':'result[index] = collection[index]','object':'result.push(collection[index])'}});function compact(array){var index=-1,length=array.length,result=[];while(++index<length){if(array[index]){result.push(array[index]);}}
return result;}
function difference(array){var index=-1,length=array.length,result=[],flattened=concat.apply(result,slice.call(arguments,1));while(++index<length){if(indexOf(flattened,array[index])<0){result.push(array[index]);}}
return result;}
function first(array,n,guard){return(n==undefined||guard)?array[0]:slice.call(array,0,n);}
function flatten(array,shallow){var value,index=-1,length=array.length,result=[];while(++index<length){value=array[index];if(isArray(value)){push.apply(result,shallow?value:flatten(value));}else{result.push(value);}}
return result;}
function groupBy(array,callback,thisArg){var prop,value,index=-1,isFunc=toString.call(callback)==funcClass,length=array.length,result={};if(isFunc&&thisArg){callback=bind(callback,thisArg);}
while(++index<length){value=array[index];prop=isFunc?callback(value,index,array):value[callback];(hasOwnProperty.call(result,prop)?result[prop]:result[prop]=[]).push(value);}
return result}
function sortBy(array,callback,thisArg){if(toString.call(callback)!=funcClass){var prop=callback;callback=function(array){return array[prop];};}else if(thisArg){callback=bind(callback,thisArg);}
return pluck(map(array,function(value,index){return{'criteria':callback(value,index,array),'value':value};}).sort(function(left,right){var a=left.criteria,b=right.criteria;if(a===undefined){return 1;}
if(b===undefined){return-1;}
return a<b?-1:a>b?1:0;}),'value');}
function indexOf(array,value,isSorted){var index,length;if(!array){return-1;}
if(isSorted){index=sortedIndex(array,value);return array[index]===value?index:-1;}
for(index=0,length=array.length;index<length;index++){if(array[index]===value){return index;}}
return-1;}
function initial(array,n,guard){return slice.call(array,0,-((n==undefined||guard)?1:n));}
function intersection(array){var value,index=-1,length=array.length,others=slice.call(arguments,1),result=[];while(++index<length){value=array[index];if(indexOf(result,value)<0&&every(others,function(other){return indexOf(other,value)>-1;})){result.push(value);}}
return result;}
function invoke(array,methodName){var args=slice.call(arguments,2),index=-1,length=array.length,isFunc=toString.call(methodName)==funcClass,result=[];while(++index<length){result[index]=(isFunc?methodName:array[index][methodName]).apply(array[index],args);}
return result;}
function last(array,n,guard){var length=array.length;return(n==undefined||guard)?array[length-1]:slice.call(array,-n||length);}
function lastIndexOf(array,value){if(!array){return-1;}
var index=array.length;while(index--){if(array[index]===value){return index;}}
return-1;}
function max(array,callback,thisArg){var current,computed=-Infinity,index=-1,length=array.length,result=computed;if(!callback){while(++index<length){if(array[index]>result){result=array[index];}}
return result;}
if(thisArg){callback=bind(callback,thisArg);}
while(++index<length){current=callback(array[index],index,array);if(current>computed){computed=current;result=array[index];}}
return result;}
function min(array,callback,thisArg){var current,computed=Infinity,index=-1,length=array.length,result=computed;if(!callback){while(++index<length){if(array[index]<result){result=array[index];}}
return result;}
if(thisArg){callback=bind(callback,thisArg);}
while(++index<length){current=callback(array[index],index,array);if(current<computed){computed=current;result=array[index];}}
return result;}
function range(start,end,step){step||(step=1);if(arguments.length<2){end=start||0;start=0;}
var index=-1,length=Math.max(Math.ceil((end-start)/step),0),result=Array(length);while(++index<length){result[index]=start;start+=step;}
return result;}
function rest(array,n,guard){return slice.call(array,(n==undefined||guard)?1:n);}
function shuffle(array){var rand,index=-1,length=array.length,result=Array(length);while(++index<length){rand=Math.floor(Math.random()*(index+1));result[index]=result[rand];result[rand]=array[index];}
return result;}
function sortedIndex(array,value,callback){var mid,low=0,high=array.length;if(callback){value=callback(value);}
while(low<high){mid=(low+high)>>1;if((callback?callback(array[mid]):array[mid])<value){low=mid+1;}else{high=mid;}}
return low;}
function union(){var index=-1,result=[],flattened=concat.apply(result,arguments),length=flattened.length;while(++index<length){if(indexOf(result,flattened[index])<0){result.push(flattened[index]);}}
return result;}
function uniq(array,isSorted,callback){var computed,index=-1,length=array.length,result=[],seen=[];while(++index<length){computed=callback?callback(array[index]):array[index];if(isSorted?!index||seen[seen.length-1]!==computed:indexOf(seen,computed)<0){seen.push(computed);result.push(array[index]);}}
return result;}
function without(array){var excluded=slice.call(arguments,1),index=-1,length=array.length,result=[];while(++index<length){if(indexOf(excluded,array[index])<0){result.push(array[index]);}}
return result;}
function zip(){var index=-1,length=max(pluck(arguments,'length')),result=Array(length);while(++index<length){result[index]=pluck(arguments,index);}
return result;}
function after(n,func){if(n<1){return func();}
return function(){if(--n<1){return func.apply(this,arguments);}};}
function bind(func,thisArg){var methodName,isFunc=toString.call(func)==funcClass;if(!isFunc){methodName=thisArg;thisArg=func;}
else if(nativeBind){return nativeBind.call.apply(nativeBind,arguments);}
var partialArgs=slice.call(arguments,2);function bound(){var args=arguments,thisBinding=thisArg;if(!isFunc){func=thisArg[methodName];}
if(partialArgs.length){args=args.length?concat.apply(partialArgs,args):partialArgs;}
if(this instanceof bound){noop.prototype=func.prototype;thisBinding=new noop;var result=func.apply(thisBinding,args);return objectTypes[typeof result]&&result!==null?result:thisBinding}
return func.apply(thisBinding,args);}
return bound;}
function bindAll(object){var funcs=arguments,index=1;if(funcs.length==1){index=0;funcs=functions(object);}
for(var length=funcs.length;index<length;index++){object[funcs[index]]=bind(object[funcs[index]],object);}
return object;}
function compose(){var funcs=arguments;return function(){var args=arguments,length=funcs.length;while(length--){args=[funcs[length].apply(this,args)];}
return args[0];};}
function debounce(func,wait,immediate){var args,result,thisArg,timeoutId;function delayed(){timeoutId=undefined;if(!immediate){func.apply(thisArg,args);}}
return function(){var isImmediate=immediate&&!timeoutId;args=arguments;thisArg=this;clearTimeout(timeoutId);timeoutId=setTimeout(delayed,wait);if(isImmediate){result=func.apply(thisArg,args);}
return result;};}
function delay(func,wait){var args=slice.call(arguments,2);return setTimeout(function(){return func.apply(undefined,args);},wait);}
function defer(func){var args=slice.call(arguments,1);return setTimeout(function(){return func.apply(undefined,args);},1);}
function memoize(func,resolver){var cache={};return function(){var prop=resolver?resolver.apply(this,arguments):arguments[0];return hasOwnProperty.call(cache,prop)?cache[prop]:(cache[prop]=func.apply(this,arguments));};}
function once(func){var result,ran=false;return function(){if(ran){return result;}
ran=true;result=func.apply(this,arguments);return result;};}
function partial(func){var args=slice.call(arguments,1),argsLength=args.length;return function(){var result,others=arguments;if(others.length){args.length=argsLength;push.apply(args,others);}
result=args.length==1?func.call(this,args[0]):func.apply(this,args);args.length=argsLength;return result;};}
function throttle(func,wait){var args,result,thisArg,timeoutId,lastCalled=0;function trailingCall(){lastCalled=new Date;timeoutId=undefined;func.apply(thisArg,args);}
return function(){var now=new Date,remain=wait-(now-lastCalled);args=arguments;thisArg=this;if(remain<=0){lastCalled=now;result=func.apply(thisArg,args);}
else if(!timeoutId){timeoutId=setTimeout(trailingCall,remain);}
return result;};}
function wrap(func,wrapper){return function(){var args=[func];if(arguments.length){push.apply(args,arguments);}
return wrapper.apply(this,args);};}
function clone(value){return objectTypes[typeof value]&&value!==null?(isArray(value)?value.slice():extend({},value)):value;}
var defaults=createIterator(extendIteratorOptions,{'inLoop':'if (object[index] == undefined)'+extendIteratorOptions.inLoop});var extend=createIterator(extendIteratorOptions);var functions=createIterator({'args':'object','init':'[]','useHas':false,'inLoop':'if (toString.call(object[index]) == funcClass) result.push(index)','bottom':'result.sort()'});function has(object,property){return hasOwnProperty.call(object,property);}
var isArguments=function(value){return toString.call(value)=='[object Arguments]';};if(!isArguments(arguments)){isArguments=function(value){return!!(value&&hasOwnProperty.call(value,'callee'));};}
var isArray=nativeIsArray||function(value){return toString.call(value)==arrayClass;};function isBoolean(value){return value===true||value===false||toString.call(value)==boolClass;}
function isDate(value){return toString.call(value)==dateClass;}
function isElement(value){return!!(value&&value.nodeType==1);}
var isEmpty=createIterator({'args':'value','init':'true','top':'var className = toString.call(value);\n'+'if (className == arrayClass || className == stringClass) return !value.length','inLoop':{'object':'return false'}});function isEqual(a,b,stack){stack||(stack=[]);if(a===b){return a!==0||(1/a==1/b);}
if(a==undefined||b==undefined){return a===b;}
if(a._chain){a=a._wrapped;}
if(b._chain){b=b._wrapped;}
if(a.isEqual&&toString.call(a.isEqual)==funcClass){return a.isEqual(b);}
if(b.isEqual&&toString.call(b.isEqual)==funcClass){return b.isEqual(a);}
var className=toString.call(a);if(className!=toString.call(b)){return false;}
switch(className){case stringClass:return a==String(b);case numberClass:return a!=+a?b!=+b:(a==0?(1/a==1/b):a==+b);case boolClass:case dateClass:return+a==+b;case regexpClass:return a.source==b.source&&a.global==b.global&&a.multiline==b.multiline&&a.ignoreCase==b.ignoreCase;}
if(typeof a!='object'||typeof b!='object'){return false;}
var length=stack.length;while(length--){if(stack[length]==a){return true;}}
var index=-1,result=true,size=0;stack.push(a);if(className==arrayClass){size=a.length;result=size==b.length;if(result){while(size--){if(!(result=isEqual(a[size],b[size],stack))){break;}}}}else{if('constructor'in a!='constructor'in b||a.constructor!=b.constructor){return false;}
for(var prop in a){if(hasOwnProperty.call(a,prop)){size++;if(!(result=hasOwnProperty.call(b,prop)&&isEqual(a[prop],b[prop],stack))){break;}}}
if(result){for(prop in b){if(hasOwnProperty.call(b,prop)&&!(size--))break;}
result=!size;}
if(result&&hasDontEnumBug){while(++index<7){prop=shadowed[index];if(hasOwnProperty.call(a,prop)){if(!(result=hasOwnProperty.call(b,prop)&&isEqual(a[prop],b[prop],stack))){break;}}}}}
stack.pop();return result;}
function isFinite(value){return nativeIsFinite(value)&&toString.call(value)==numberClass;}
function isFunction(value){return toString.call(value)==funcClass;}
function isObject(value){return objectTypes[typeof value]&&value!==null;}
function isNaN(value){return toString.call(value)==numberClass&&value!=+value}
function isNull(value){return value===null;}
function isNumber(value){return toString.call(value)==numberClass;}
function isRegExp(value){return toString.call(value)==regexpClass;}
function isString(value){return toString.call(value)==stringClass;}
function isUndefined(value){return value===undefined;}
var keys=nativeKeys||createIterator({'args':'object','exit':'if (!objectTypes[typeof object] || object === null) throw TypeError()','init':'[]','inLoop':'result.push(index)'});function pick(object){var prop,index=0,props=concat.apply(ArrayProto,arguments),length=props.length,result={};while(++index<length){prop=props[index];if(prop in object){result[prop]=object[prop];}}
return result;}
function size(value){var className=toString.call(value);return className==arrayClass||className==stringClass?value.length:keys(value).length;}
function tap(value,interceptor){interceptor(value);return value;}
function escape(string){return(string+'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;');}
function identity(value){return value;}
function mixin(object){forEach(functions(object),function(methodName){var func=lodash[methodName]=object[methodName];LoDash.prototype[methodName]=function(){var args=[this._wrapped];if(arguments.length){push.apply(args,arguments);}
var result=args.length==1?func.call(lodash,args[0]):func.apply(lodash,args);if(this._chain){result=new LoDash(result);result._chain=true;}
return result;};});}
function noConflict(){window._=oldDash;return this;}
function result(object,property){if(!object){return null;}
var value=object[property];return toString.call(value)==funcClass?object[property]():value;}
function template(text,data,options){options||(options={});var result,defaults=lodash.templateSettings,escapeDelimiter=options.escape,evaluateDelimiter=options.evaluate,interpolateDelimiter=options.interpolate,variable=options.variable;if(escapeDelimiter==null){escapeDelimiter=defaults.escape;}
if(evaluateDelimiter==null){evaluateDelimiter=defaults.evaluate;}
if(interpolateDelimiter==null){interpolateDelimiter=defaults.interpolate;}
if(escapeDelimiter){text=text.replace(escapeDelimiter,tokenizeEscape);}
if(interpolateDelimiter){text=text.replace(interpolateDelimiter,tokenizeInterpolate);}
if(evaluateDelimiter){text=text.replace(evaluateDelimiter,tokenizeEvaluate);}
text="__p='"+text.replace(reUnescaped,escapeChar).replace(reToken,detokenize)+"';\n";tokenized.length=0;if(!variable){variable=defaults.variable;text='with ('+variable+' || {}) {\n'+text+'\n}\n';}
text='function('+variable+') {\n'+'var __p, __t, __j = Array.prototype.join;\n'+'function print() { __p += __j.call(arguments, \'\') }\n'+text+'return __p\n}';result=Function('_','return '+text)(lodash);if(data){return result(data);}
result.source=text;return result;}
function times(n,callback,thisArg){if(thisArg){callback=bind(callback,thisArg);}
for(var index=0;index<n;index++){callback(index);}}
function uniqueId(prefix){var id=idCounter++;return prefix?prefix+id:id;}
function chain(value){value=new LoDash(value);value._chain=true;return value;}
function wrapperChain(){this._chain=true;return this;}
function wrapperValue(){return this._wrapped;}
lodash.VERSION='0.2.2';lodash.after=after;lodash.bind=bind;lodash.bindAll=bindAll;lodash.chain=chain;lodash.clone=clone;lodash.compact=compact;lodash.compose=compose;lodash.contains=contains;lodash.debounce=debounce;lodash.defaults=defaults;lodash.defer=defer;lodash.delay=delay;lodash.difference=difference;lodash.escape=escape;lodash.every=every;lodash.extend=extend;lodash.filter=filter;lodash.find=find;lodash.first=first;lodash.flatten=flatten;lodash.forEach=forEach;lodash.functions=functions;lodash.groupBy=groupBy;lodash.has=has;lodash.identity=identity;lodash.indexOf=indexOf;lodash.initial=initial;lodash.intersection=intersection;lodash.invoke=invoke;lodash.isArguments=isArguments;lodash.isArray=isArray;lodash.isBoolean=isBoolean;lodash.isDate=isDate;lodash.isElement=isElement;lodash.isEmpty=isEmpty;lodash.isEqual=isEqual;lodash.isFinite=isFinite;lodash.isFunction=isFunction;lodash.isNaN=isNaN;lodash.isNull=isNull;lodash.isNumber=isNumber;lodash.isObject=isObject;lodash.isRegExp=isRegExp;lodash.isString=isString;lodash.isUndefined=isUndefined;lodash.keys=keys;lodash.last=last;lodash.lastIndexOf=lastIndexOf;lodash.map=map;lodash.max=max;lodash.memoize=memoize;lodash.min=min;lodash.mixin=mixin;lodash.noConflict=noConflict;lodash.once=once;lodash.partial=partial;lodash.pick=pick;lodash.pluck=pluck;lodash.range=range;lodash.reduce=reduce;lodash.reduceRight=reduceRight;lodash.reject=reject;lodash.rest=rest;lodash.result=result;lodash.shuffle=shuffle;lodash.size=size;lodash.some=some;lodash.sortBy=sortBy;lodash.sortedIndex=sortedIndex;lodash.tap=tap;lodash.template=template;lodash.throttle=throttle;lodash.times=times;lodash.toArray=toArray;lodash.union=union;lodash.uniq=uniq;lodash.uniqueId=uniqueId;lodash.values=values;lodash.without=without;lodash.wrap=wrap;lodash.zip=zip;lodash.all=every;lodash.any=some;lodash.collect=map;lodash.detect=find;lodash.each=forEach;lodash.foldl=reduce;lodash.foldr=reduceRight;lodash.head=first;lodash.include=contains;lodash.inject=reduce;lodash.methods=functions;lodash.select=filter;lodash.tail=rest;lodash.take=first;lodash.unique=uniq;lodash._createIterator=createIterator;lodash._iteratorTemplate=iteratorTemplate;LoDash.prototype=lodash.prototype;mixin(lodash);LoDash.prototype.chain=wrapperChain;LoDash.prototype.value=wrapperValue;forEach(['pop','push','reverse','shift','sort','splice','unshift'],function(methodName){var func=ArrayProto[methodName];LoDash.prototype[methodName]=function(){var value=this._wrapped;if(arguments.length){func.apply(value,arguments);}else{func.call(value);}
if(value.length===0){delete value[0];}
if(this._chain){value=new LoDash(value);value._chain=true;}
return value;};});forEach(['concat','join','slice'],function(methodName){var func=ArrayProto[methodName];LoDash.prototype[methodName]=function(){var value=this._wrapped,result=arguments.length?func.apply(value,arguments):func.call(value);if(this._chain){result=new LoDash(result);result._chain=true;}
return result;};});if(typeof define=='function'&&typeof define.amd=='object'&&define.amd){window._=lodash;define(function(){return lodash;});}
else if(freeExports){if(typeof module=='object'&&module&&module.exports==freeExports){(module.exports=lodash)._=lodash;}
else{freeExports._=lodash;}}
else{window._=lodash;}}(this));