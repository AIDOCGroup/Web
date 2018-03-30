import * as _ from "underscore"

export var Helper = _;
export var Moment = (window as any).moment;

export var usNameWithObject = (object: any, encode: boolean) => {

    if (!object) return object;

    if (typeof object == 'object' && !Array.isArray(object)) {
        object = Object.assign({}, object)
    }

    if (Array.isArray(object)) {
        
        object.forEach((item, index) => {
            object[index] = usNameWithObject(item, encode)
        })

    }
    else {
        for(let key in object) {

            if (typeof object[key] == 'object') {
                object[key] = usNameWithObject(object[key], encode)
            }

            let newKey = encode ? key.replace(/([A-Z])/g, "_$1").toLowerCase() : key.replace(/_(\w)/g, ($0, $1) => {
                return $1.toUpperCase();
            })

            if (newKey != key) {
                object[newKey] = object[key];
                delete object[key];
            }
        }

    }

    return object;

}
