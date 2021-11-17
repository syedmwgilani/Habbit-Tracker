module.exports = {
    getNestedVal: function (obj, propArr) {
        return propArr.reduce((innerObj, prop, level) => {
            return innerObj[prop]
        }, obj);
    },


    getInnerObj: function (obj, propArr) {
        const propLessOneLev = propArr.slice(0, propArr.length - 1)
        return this.getNestedVal(obj, propLessOneLev)
    },

    setNestedVal: function (obj, propArr, value) {
        return propArr.reduce((innerObj, prop, level, arr) => {
            if (level === arr.length - 1) {
                innerObj[prop] = value;
                return innerObj;
            }

            return innerObj[prop]
        }, obj);
    },

    //obj - check object keys to see if id exists
    generateUIDKey: function (obj) {
        let ranNumStr = Math.floor(Math.random() * 1.0e+16).toString()
        while(obj[ranNumStr]) {
            ranNumStr = Math.floor(Math.random() * 1.0e+16).toString()
        }
        return ranNumStr;
    },

    addPrefix: function (condition, sting, prefix) {
        return condition() ? sting : prefix + sting
    },

    objectIsEmpty: function (obj) {
        return Object.keys(obj).length === 0;
    },

    // Used to traverse an object and its potential properties.
    // If property in list is not found then defaultVal is returned.
    // ex: dot(false, props, 'weeklyOccurrence', 'wednesday')
    dot: function (defaultVal, ...args) {
        let returnDefault = false;
    
        return args.reduce( function(acc, cur) {
            if(returnDefault)
                return defaultVal;
            if(typeof(acc[cur]) === 'undefined' || acc[cur] === null) {
                returnDefault = true;
                return defaultVal;
            }
            return acc[cur];
        })
    },
}