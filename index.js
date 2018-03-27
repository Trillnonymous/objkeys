(function(factory){
	if (typeof define == 'function' && define.amd){
		define(['objkeys'], factory);
	} else {
		factory();
	}
}(function(){
	var objkeys = {
		first: function(obj){
			var keys = Object.keys(obj),
				key = keys[0],
				value = obj[key];
			if (Array.isArray(obj)){
				return obj[0];
			} else {
				var result = {};
				result[key] = value;
				return result;
			}
		},
		fromIndex: function(obj, index){
			var keys = Object.keys(obj),
				len = keys.length;
			if (index < 0){
				index = Math.abs(len + index) % len;
			}
			if (Array.isArray(obj)){
				return obj[index];
			} else {
				var result = {}, key = keys[index], value = obj[key];
				result[key] = value;
				return result;
			}
		},
		last: function(obj){
			var keys = Object.keys(obj),
				last = keys.length - 1,
				key = keys[last],
				value = obj[key];
			if (Array.isArray(obj)){
				return obj[last];
			} else {
				var result = {};
				result[key] = value;
				return result;
			}
		}
	};
	
	objkeys.concat = function(obj){
		var args = [].slice.call(arguments, 1);
		if (Array.isArray(obj)){
			return [].concat.apply(obj, args);
		} else {
			var result = typeof obj === 'object' ? obj : {};
			for (var i = 0; i < args.length; i++){
				var arg = args[i],
					argKeys = Object.keys(arg);
				for (var j = 0; j < argKeys.length; j++){
					var argKey = argKeys[i],
						argValue = arg[argKey];
					result[argKey] = argValue;
				}
			}
			return result;
		}
	};
	
	objkeys.every = function(obj, callback){
		if (Array.isArray(obj)){
			return [].every.call(obj, callback);
		} else {
			var keys = Object.keys(obj);
			return [].every.call(keys, function(key, index){
				var value = obj[key];
				return callback.apply(this, [key, value, index, obj]);
			});
		}
	};
	
	objkeys.find = function(obj, callback){
		if (Array.isArray(obj)){
			return [].find.call(obj, callback);
		} else {
			var keys = Object.keys(obj),
				result = [].find.call(keys, function(key, index){
					var value = obj[key];
					return callback.apply(this, [key, value, index, obj]);
				});
			if (typeof result == 'undefined') return;
			return obj[result];
		}
	};
	
	objkeys.forEach = function(obj, callback){
		if (Array.isArray(obj)){
			[].forEach.call(obj, callback);
		} else {
			var keys = Object.keys(obj);
			[].forEach.call(keys, function(key, index){
				var value = obj[key];
				callback.apply(this, [key, value, index, obj]);
			});
		}
	};
	
	objkeys.map = function(obj, callback){
		if (Array.isArray(obj)){
			return [].map.call(obj, callback);
		} else {
			var keys = Object.keys(obj);
			return [].map.call(keys, function(key, index){
				var value = obj[key];
				return callback.apply(this, [key, value, index, obj]);
			});
		}
	};
	
	objkeys.reduce = function(obj, callback, acc){
		if (Array.isArray(obj)){
			acc = typeof acc !== 'undefined' ? acc : [];
			return [].reduce.call(obj, callback, acc);
		} else {
			acc = typeof acc !== 'undefined' ? acc : {};
			var keys = Object.keys(obj);
			return [].reduce.call(keys, function(accumulator, key, index){
				var value = obj[key];
				return callback.apply(this, [accumulator, key, value, index, obj]);
			}, acc);
		}
	};
	
	objkeys.reduceRight = function(obj, callback, acc){
		if (Array.isArray(obj)){
			acc = typeof acc !== 'undefined' ? acc : [];
			return [].reduceRight.call(obj, callback, acc);
		} else {
			acc = typeof acc !== 'undefined' ? acc : {};
			var keys = Object.keys(obj);
			return [].reduceRight.call(keys, function(accumulator, key, index){
				var value = obj[key];
				return callback.apply(this, [accumulator, key, value, index, obj]);
			}, acc);
		}
	};
	
	objkeys.reverse = function(obj, type){
		if (Array.isArray(obj)){
			return [].reverse.call(obj);
		} else {
			var result = {},
				keys = Object.keys(obj);
			if (typeof type == 'string'){
				var types = ['key', 'value'];
				if (types.indexOf(type) > -1){
					if (type === 'key'){
						keys = keys.reverse();
						for (var k = 0; k < keys.length; k++){
							var key = keys[k];
							result[key] = obj[key];
						}
						return result;
					} else if (type === 'value'){
						var values = keys.map(function(key){ return obj[key]; });
						values = values.reverse();
						for (var r = 0; r < values.length; r++){
							var key = keys[r];
							result[key] = values[r];
						}
						return result;
					}
				} else {
					keys = keys.reverse();
					for (var k = 0; k < keys.length; k++){
						var key = keys[k];
						result[key] = obj[key];
					}
					return result;
				}
			} else {
				keys = keys.reverse();
				for (var k = 0; k < keys.length; k++){
					var key = keys[k];
					result[key] = obj[key];
				}
				return result;
			}
		}
	};
	
	objkeys.slice = function(obj){
		var args = [].slice.call(arguments, 1);
		if (Array.isArray(obj)){
			return [].slice.apply(obj, args);
		} else {
			var result = {},
				keys = Object.keys(obj);
			keys = [].slice.apply(keys, args);
			for (var i = 0; i < keys.length; i++){
				var key = keys[i], value = obj[key];
				result[key] = value;
			}
			return result;
		}
	};
	
	objkeys.some = function(obj, callback){
		if (Array.isArray(obj)){
			return [].some.call(obj, callback);
		} else {
			var keys = Object.keys(obj);
			return [].some.call(keys, function(key, index){
				var value = obj[key];
				return callback.apply(this, [key, value, index, obj]);
			});
		}
	};
	
	objkeys.sort = function(obj, comparator){
		if (Array.isArray(obj)){
			return [].sort.call(obj, comparator);
		} else {
			var keys = Object.keys(obj);
			return [].sort.call(keys, function(key, index){
				var value = obj[key];
				return comparator.apply(this, [key, value, index, obj]);
			});
		}
	};
	
	objkeys.toString = function(obj){
		if (Array.isArray(obj)){
			return [].toString.call(obj);
		} else {
			return JSON.stringify(obj);
		}
	};
	
	function ObjKeys(obj){
		if (typeof obj === 'undefined' || obj === null){
			obj = Object.create(null);
		}
		
		return {
			concat: function(){
				var args = [obj];
				[].slice.call(arguments).forEach(function(arg){
					args[args.length] = arg;
				});
				return objkeys.concat.apply(objkeys, args);
			},
			every: function(callback){
				var args = [obj, callback];
				return objkeys.every.apply(objkeys, args);
			},
			find: function(callback){
				var args = [obj, callback];
				return objkeys.find.apply(objkeys, args);
			},
			first: function(){
				var args = [obj];
				objkeys.first.apply(objkeys, args);
			},
			forEach: function(callback){
				var args = [obj, callback];
				objkeys.forEach.apply(objkeys, args);
			},
			fromIndex: function(index){
				var args = [obj, index];
				objkeys.fromIndex.apply(objkeys, args);
			},
			last: function(){
				var args = [obj];
				objkeys.last.apply(objkeys, args);
			},
			map: function(callback){
				var args = [obj, callback];
				return objkeys.map.apply(objkeys, args);
			},
			reduce: function(callback, accumulator){
				var args = [obj, callback, accumulator];
				return objkeys.reduce.apply(objkeys, args);
			},
			reduceRight: function(callback, accumulator){
				var args = [obj, callback, accumulator];
				return objkeys.reduceRight.apply(objkeys, args);
			},
			reverse: function(type){
				var args = [obj];
				if (typeof type == 'string'){
					args[args.length] = type;
				}
				return objkeys.reverse.apply(objkeys, args);
			},
			slice: function(callback){
				var args = [obj];
				[].slice.call(arguments).forEach(function(arg){
					args[args.length] = arg;
				});
				return objkeys.reduce.apply(objkeys, args);
			},
			some: function(callback){
				var args = [obj, callback];
				return objkeys.reduce.apply(objkeys, args);
			},
			sort: function(comparator){
				var args = [obj, comparator];
				return objkeys.sort.apply(objkeys, args);
			},
			toString: function(){
				var args = [obj];
				return objkeys.toString.apply(objkeys, args);
			},
			targetObject: obj,
			keys: !Array.isArray(obj) ? Object.keys(obj) : null,
			length: Object.keys(obj).length
		};
	}
	
	window.ObjKeys = ObjKeys;
});
