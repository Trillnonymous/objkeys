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
});
