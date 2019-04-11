var k = "";
var l = "";

function checkAttribute_a(value) {
    return value instanceof Object ? value.constructor.prototype.hasOwnProperty("push") : !1;
};

function checkAttribute_r(value) {
    return value instanceof Object ? !value.constructor.prototype.hasOwnProperty("push") : !1;
};

function parsePropertyAssign(type, name) {
    return "@property(nonatomic, assign) " + type + " " + name + ";\n\n";
};

function parsePropertyStrong(type, name) {
    return "@property(nonatomic, strong) " + type + " " + name + ";\n\n";
}

function parseInterface(name, content) {
    return "@interface " + name + " : NSObject\n\n" + content + "@end\n\n";
};

function parseCodeUpperCase(value) {
    return value.replace(/\b[a-z]/g,function(e){
        return e.toUpperCase();
    })
}

function parseCodeLowerCase(value) {
    return value.replace(/\b[a-z]/g,function(e){
        return e.toLowerCase();
    })
}

function parseImplementation(name) {
    return "@implementation " + name + "\n\n@end\n";
};

function getJsonModel(value, modelName, type){
    modelName = parseCodeUpperCase(modelName);
    var string = parseJson(value, modelName);
    k = 0 < k.length ? k + "\r\n\r\n" + parseInterface(modelName, string) : parseInterface(modelName, string);
    l = 0 < l.length ? l + "\r\n\r\n" + parseImplementation(modelName) : parseImplementation(modelName);
    return (type == "k" ? k : l);
}

function parseJson(value, modelName) {
    var string = "";
    if (checkAttribute_a(value)) {
        if (0 < value.length && 0 < value.length) {
            for (var e = value[0], f = value.length - 1; 0 <= f; f--) {
                var b = value[f];
                checkAttribute_a(b) ? b.length > e.length && (e = b) : checkAttribute_r(b) && Object.keys(b).length > Object.keys(e).length && (e = b)
            }
            string += parseJson(e, modelName);
        }
    } else if (checkAttribute_r(value)) for (e in value) {
        b = value[e];
        var h = parseCodeUpperCase(e);
        f = parseCodeLowerCase  (e);
        if (checkAttribute_a(b)) {
            var g;
            0 < b.length && (g = b[0]);
            "string" === typeof g ? string += parsePropertyStrong("NSArray <NSString *>", f) : "number" === typeof g || "boolean" === typeof g ? string += parsePropertyStrong("NSArray <NSNumber *>", f) : "object" === typeof g && (h += "Item", string += parsePropertyStrong("NSArray <" + h + " *>", f), b = parseJson(b, e), k = 0 < k.length ? k + "\r\n\r\n" + parseInterface(h, b) : parseInterface(h, b), l = 0 < l.length ? l + "\r\n\r\n" + parseImplementation(h) : parseImplementation(h))
        } else checkAttribute_r(b) ? (b = parseJson(b, e), string += parsePropertyStrong(h, f), k = 0 < k.length ? k + "\r\n\r\n" + parseInterface(h, b) : parseInterface(h, b), l = 0 < l.length ? l + "\r\n\r\n" + parseImplementation(h) : parseImplementation(h)) : "string" === typeof b ? string += "@property(nonatomic, strong) NSString *" + f + ";\n\n": "number" === typeof b ? string = 0 <= b.toString().indexOf(".") ? string + parsePropertyAssign("CGFloat", f) : string + parsePropertyAssign("NSNumber", "*" + f) : "boolean" === typeof b && (string += parsePropertyAssign("BOOL", f))
    } else alert("key = " + d);
    return string;
}