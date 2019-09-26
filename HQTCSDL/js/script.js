/*!
 * jQuery JavaScript Library v2.1.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:11Z
 */
(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ? factory(global, true) : function(w) {
            if (!w.document) {
                throw new Error("jQuery requires a window with a document");
            }
            return factory(w);
        };
    } else {
        factory(global);
    }
}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
    var arr = [];
    var slice = arr.slice;
    var concat = arr.concat;
    var push = arr.push;
    var indexOf = arr.indexOf;
    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var support = {};
    var
        document = window.document,
        version = "2.1.1",
        jQuery = function(selector, context) {
            return new jQuery.fn.init(selector, context);
        },
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,
        fcamelCase = function(all, letter) {
            return letter.toUpperCase();
        };
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        selector: "",
        length: 0,
        toArray: function() {
            return slice.call(this);
        },
        get: function(num) {
            return num != null ? (num < 0 ? this[num + this.length] : this[num]) : slice.call(this);
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            ret.prevObject = this;
            ret.context = this.context;
            return ret;
        },
        each: function(callback, args) {
            return jQuery.each(this, callback, args);
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        slice: function() {
            return this.pushStack(slice.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(i) {
            var len = this.length,
                j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: push,
        sort: arr.sort,
        splice: arr.splice
    };
    jQuery.extend = jQuery.fn.extend = function() {
        var options,
            name,
            src,
            copy,
            copyIsArray,
            clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[i] || {};
            i++;
        }
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {};
        }
        if (i === length) {
            target = this;
            i--;
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];
                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }
                        target[name] = jQuery.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };
    jQuery.extend({
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        isReady: true,
        error: function(msg) {
            throw new Error(msg);
        },
        noop: function() {},
        isFunction: function(obj) {
            return jQuery.type(obj) === "function";
        },
        isArray: Array.isArray,
        isWindow: function(obj) {
            return obj != null && obj === obj.window;
        },
        isNumeric: function(obj) {
            return !jQuery.isArray(obj) && obj - parseFloat(obj) >= 0;
        },
        isPlainObject: function(obj) {
            if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                return false;
            }
            if (obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
            return true;
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        },
        type: function(obj) {
            if (obj == null) {
                return obj + "";
            }
            return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
        },
        globalEval: function(code) {
            var script,
                indirect = eval;
            code = jQuery.trim(code);
            if (code) {
                if (code.indexOf("use strict") === 1) {
                    script = document.createElement("script");
                    script.text = code;
                    document.head.appendChild(script).parentNode.removeChild(script);
                } else {
                    indirect(code);
                }
            }
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        each: function(obj, callback, args) {
            var value,
                i = 0,
                length = obj.length,
                isArray = isArraylike(obj);
            if (args) {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.apply(obj[i], args);
                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.apply(obj[i], args);
                        if (value === false) {
                            break;
                        }
                    }
                }
            } else {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.call(obj[i], i, obj[i]);
                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.call(obj[i], i, obj[i]);
                        if (value === false) {
                            break;
                        }
                    }
                }
            }
            return obj;
        },
        trim: function(text) {
            return text == null ? "" : (text + "").replace(rtrim, "");
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            if (arr != null) {
                if (isArraylike(Object(arr))) {
                    jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
                } else {
                    push.call(ret, arr);
                }
            }
            return ret;
        },
        inArray: function(elem, arr, i) {
            return arr == null ? -1 : indexOf.call(arr, elem, i);
        },
        merge: function(first, second) {
            var len = +second.length,
                j = 0,
                i = first.length;
            for (; j < len; j++) {
                first[i++] = second[j];
            }
            first.length = i;
            return first;
        },
        grep: function(elems, callback, invert) {
            var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;
            for (; i < length; i++) {
                callbackInverse = !callback(elems[i], i);
                if (callbackInverse !== callbackExpect) {
                    matches.push(elems[i]);
                }
            }
            return matches;
        },
        map: function(elems, callback, arg) {
            var value,
                i = 0,
                length = elems.length,
                isArray = isArraylike(elems),
                ret = [];
            if (isArray) {
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret.push(value);
                    }
                }
            } else {
                for (i in elems) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret.push(value);
                    }
                }
            }
            return concat.apply([], ret);
        },
        guid: 1,
        proxy: function(fn, context) {
            var tmp,
                args,
                proxy;
            if (typeof context === "string") {
                tmp = fn[context];
                context = fn;
                fn = tmp;
            }
            if (!jQuery.isFunction(fn)) {
                return undefined;
            }
            args = slice.call(arguments, 2);
            proxy = function() {
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            };
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;
            return proxy;
        },
        now: Date.now,
        support: support
    });
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    function isArraylike(obj) {
        var length = obj.length,
            type = jQuery.type(obj);
        if (type === "function" || jQuery.isWindow(obj)) {
            return false;
        }
        if (obj.nodeType === 1 && length) {
            return true;
        }
        return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj;
    }
    var Sizzle = /*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
    (function(window) {
        var i,
            support,
            Expr,
            getText,
            isXML,
            tokenize,
            compile,
            select,
            outermostContext,
            sortInput,
            hasDuplicate,
            setDocument,
            document,
            docElem,
            documentIsHTML,
            rbuggyQSA,
            rbuggyMatches,
            matches,
            contains,
            expando = "sizzle" + -(new Date()),
            preferredDoc = window.document,
            dirruns = 0,
            done = 0,
            classCache = createCache(),
            tokenCache = createCache(),
            compilerCache = createCache(),
            sortOrder = function(a, b) {
                if (a === b) {
                    hasDuplicate = true;
                }
                return 0;
            },
            strundefined = typeof undefined,
            MAX_NEGATIVE = 1 << 31,
            hasOwn = ({}).hasOwnProperty,
            arr = [],
            pop = arr.pop,
            push_native = arr.push,
            push = arr.push,
            slice = arr.slice,
            indexOf = arr.indexOf || function(elem) {
                var i = 0,
                    len = this.length;
                for (; i < len; i++) {
                    if (this[i] === elem) {
                        return i;
                    }
                }
                return -1;
            },
            booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            whitespace = "[\\x20\\t\\r\\n\\f]",
            characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            identifier = characterEncoding.replace("w", "w#"),
            attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
            pseudos = ":(" + characterEncoding + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + ".*" + ")\\)|)",
            rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
            rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
            rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
            rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
            rpseudo = new RegExp(pseudos),
            ridentifier = new RegExp("^" + identifier + "$"),
            matchExpr = {
                "ID": new RegExp("^#(" + characterEncoding + ")"),
                "CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
                "TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
                "ATTR": new RegExp("^" + attributes),
                "PSEUDO": new RegExp("^" + pseudos),
                "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                "bool": new RegExp("^(?:" + booleans + ")$", "i"),
                "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
            },
            rinputs = /^(?:input|select|textarea|button)$/i,
            rheader = /^h\d$/i,
            rnative = /^[^{]+\{\s*\[native \w/,
            rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            rsibling = /[+~]/,
            rescape = /'|\\/g,
            runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
            funescape = function(_, escaped, escapedWhitespace) {
                var high = "0x" + escaped - 0x10000;
                return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
            };
        try {
            push.apply((arr = slice.call(preferredDoc.childNodes)), preferredDoc.childNodes);
            arr[preferredDoc.childNodes.length].nodeType;
        } catch (e) {
            push = {
                apply: arr.length ? function(target, els) {
                    push_native.apply(target, slice.call(els));
                } : function(target, els) {
                    var j = target.length,
                        i = 0;
                    while ((target[j++] = els[i++])) {}
                    target.length = j - 1;
                }
            };
        }
        function Sizzle(selector, context, results, seed) {
            var match,
                elem,
                m,
                nodeType,
                i,
                groups,
                old,
                nid,
                newContext,
                newSelector;
            if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
                setDocument(context);
            }
            context = context || document;
            results = results || [];
            if (!selector || typeof selector !== "string") {
                return results;
            }
            if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
                return [];
            }
            if (documentIsHTML && !seed) {
                if ((match = rquickExpr.exec(selector))) {
                    if ((m = match[1])) {
                        if (nodeType === 9) {
                            elem = context.getElementById(m);
                            if (elem && elem.parentNode) {
                                if (elem.id === m) {
                                    results.push(elem);
                                    return results;
                                }
                            } else {
                                return results;
                            }
                        } else {
                            if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                                results.push(elem);
                                return results;
                            }
                        }
                    } else if (match[2]) {
                        push.apply(results, context.getElementsByTagName(selector));
                        return results;
                    } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
                        push.apply(results, context.getElementsByClassName(m));
                        return results;
                    }
                }
                if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    nid = old = expando;
                    newContext = context;
                    newSelector = nodeType === 9 && selector;
                    if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                        groups = tokenize(selector);
                        if ((old = context.getAttribute("id"))) {
                            nid = old.replace(rescape, "\\$&");
                        } else {
                            context.setAttribute("id", nid);
                        }
                        nid = "[id='" + nid + "'] ";
                        i = groups.length;
                        while (i--) {
                            groups[i] = nid + toSelector(groups[i]);
                        }
                        newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                        newSelector = groups.join(",");
                    }
                    if (newSelector) {
                        try {
                            push.apply(results, newContext.querySelectorAll(newSelector));
                            return results;
                        } catch (qsaError) {} finally {
                            if (!old) {
                                context.removeAttribute("id");
                            }
                        }
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed);
        }
        function createCache() {
            var keys = [];
            function cache(key, value) {
                if (keys.push(key + " ") > Expr.cacheLength) {
                    delete cache[keys.shift()];
                }
                return ( cache[key + " "] = value) ;
            }
            return cache;
        }
        function markFunction(fn) {
            fn[expando] = true;
            return fn;
        }
        function assert(fn) {
            var div = document.createElement("div");
            try {
                return !!fn(div);
            } catch (e) {
                return false;
            } finally {
                if (div.parentNode) {
                    div.parentNode.removeChild(div);
                }
                div = null;
            }
        }
        function addHandle(attrs, handler) {
            var arr = attrs.split("|"),
                i = attrs.length;
            while (i--) {
                Expr.attrHandle[arr[i]] = handler;
            }
        }
        function siblingCheck(a, b) {
            var cur = b && a,
                diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) -
                (~a.sourceIndex || MAX_NEGATIVE);
            if (diff) {
                return diff;
            }
            if (cur) {
                while ((cur = cur.nextSibling)) {
                    if (cur === b) {
                        return -1;
                    }
                }
            }
            return a ? 1 : -1;
        }
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && elem.type === type;
            };
        }
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return (name === "input" || name === "button") && elem.type === type;
            };
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                argument = +argument;
                return markFunction(function(seed, matches) {
                    var j,
                        matchIndexes = fn([], seed.length, argument),
                        i = matchIndexes.length;
                    while (i--) {
                        if (seed[(j = matchIndexes[i])]) {
                            seed[j] = !(matches[j] = seed[j]);
                        }
                    }
                });
            });
        }
        function testContext(context) {
            return context && typeof context.getElementsByTagName !== strundefined && context;
        }
        support = Sizzle.support = {};
        isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? documentElement.nodeName !== "HTML" : false;
        };
        setDocument = Sizzle.setDocument = function(node) {
            var hasCompare,
                doc = node ? node.ownerDocument || node : preferredDoc,
                parent = doc.defaultView;
            if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                return document;
            }
            document = doc;
            docElem = doc.documentElement;
            documentIsHTML = !isXML(doc);
            if (parent && parent !== parent.top) {
                if (parent.addEventListener) {
                    parent.addEventListener("unload", function() {
                        setDocument();
                    }, false);
                } else if (parent.attachEvent) {
                    parent.attachEvent("onunload", function() {
                        setDocument();
                    });
                }
            }
            support.attributes = assert(function(div) {
                div.className = "i";
                return !div.getAttribute("className");
            });
            support.getElementsByTagName = assert(function(div) {
                div.appendChild(doc.createComment(""));
                return !div.getElementsByTagName("*").length;
            });
            support.getElementsByClassName = rnative.test(doc.getElementsByClassName) && assert(function(div) {
                div.innerHTML = "<div class='a'></div><div class='a i'></div>";
                div.firstChild.className = "i";
                return div.getElementsByClassName("i").length === 2;
            });
            support.getById = assert(function(div) {
                docElem.appendChild(div).id = expando;
                return !doc.getElementsByName || !doc.getElementsByName(expando).length;
            });
            if (support.getById) {
                Expr.find["ID"] = function(id, context) {
                    if (typeof context.getElementById !== strundefined && documentIsHTML) {
                        var m = context.getElementById(id);
                        return m && m.parentNode ? [m] : [];
                    }
                };
                Expr.filter["ID"] = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                        return elem.getAttribute("id") === attrId;
                    };
                };
            } else {
                delete Expr.find["ID"];
                Expr.filter["ID"] = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                        return node && node.value === attrId;
                    };
                };
            }
            Expr.find["TAG"] = support.getElementsByTagName ? function(tag, context) {
                if (typeof context.getElementsByTagName !== strundefined) {
                    return context.getElementsByTagName(tag);
                }
            } : function(tag, context) {
                var elem,
                    tmp = [],
                    i = 0,
                    results = context.getElementsByTagName(tag);
                if (tag === "*") {
                    while ((elem = results[i++])) {
                        if (elem.nodeType === 1) {
                            tmp.push(elem);
                        }
                    }
                    return tmp;
                }
                return results;
            };
            Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
                if (typeof context.getElementsByClassName !== strundefined && documentIsHTML) {
                    return context.getElementsByClassName(className);
                }
            };
            rbuggyMatches = [];
            rbuggyQSA = [];
            if ((support.qsa = rnative.test(doc.querySelectorAll))) {
                assert(function(div) {
                    div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";
                    if (div.querySelectorAll("[msallowclip^='']").length) {
                        rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
                    }
                    if (!div.querySelectorAll("[selected]").length) {
                        rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                    }
                    if (!div.querySelectorAll(":checked").length) {
                        rbuggyQSA.push(":checked");
                    }
                });
                assert(function(div) {
                    var input = doc.createElement("input");
                    input.setAttribute("type", "hidden");
                    div.appendChild(input).setAttribute("name", "D");
                    if (div.querySelectorAll("[name=d]").length) {
                        rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
                    }
                    if (!div.querySelectorAll(":enabled").length) {
                        rbuggyQSA.push(":enabled", ":disabled");
                    }
                    div.querySelectorAll("*,:x");
                    rbuggyQSA.push(",.*:");
                });
            }
            if ((support.matchesSelector = rnative.test((matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)))) {
                assert(function(div) {
                    support.disconnectedMatch = matches.call(div, "div");
                    matches.call(div, "[s!='']:x");
                    rbuggyMatches.push("!=", pseudos);
                });
            }
            rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
            rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
            hasCompare = rnative.test(docElem.compareDocumentPosition);
            contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                var adown = a.nodeType === 9 ? a.documentElement : a,
                    bup = b && b.parentNode;
                return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
            } : function(a, b) {
                if (b) {
                    while ((b = b.parentNode)) {
                        if (b === a) {
                            return true;
                        }
                    }
                }
                return false;
            };
            sortOrder = hasCompare ? function(a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }
                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                if (compare) {
                    return compare;
                }
                compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
                if (compare & 1 || (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
                    if (a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
                        return -1;
                    }
                    if (b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
                        return 1;
                    }
                    return sortInput ? (indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) : 0;
                }
                return compare & 4 ? -1 : 1;
            } : function(a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }
                var cur,
                    i = 0,
                    aup = a.parentNode,
                    bup = b.parentNode,
                    ap = [a],
                    bp = [b];
                if (!aup || !bup) {
                    return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? (indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) : 0;
                } else if (aup === bup) {
                    return siblingCheck(a, b);
                }
                cur = a;
                while ((cur = cur.parentNode)) {
                    ap.unshift(cur);
                }
                cur = b;
                while ((cur = cur.parentNode)) {
                    bp.unshift(cur);
                }
                while (ap[i] === bp[i]) {
                    i++;
                }
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
            };
            return doc;
        };
        Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements);
        };
        Sizzle.matchesSelector = function(elem, expr) {
            if ((elem.ownerDocument || elem) !== document) {
                setDocument(elem);
            }
            expr = expr.replace(rattributeQuotes, "='$1']");
            if (support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
                try {
                    var ret = matches.call(elem, expr);
                    if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
                        return ret;
                    }
                } catch (e) {}
            }
            return Sizzle(expr, document, null, [elem]).length > 0;
        };
        Sizzle.contains = function(context, elem) {
            if ((context.ownerDocument || context) !== document) {
                setDocument(context);
            }
            return contains(context, elem);
        };
        Sizzle.attr = function(elem, name) {
            if ((elem.ownerDocument || elem) !== document) {
                setDocument(elem);
            }
            var fn = Expr.attrHandle[name.toLowerCase()],
                val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
            return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        };
        Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        };
        Sizzle.uniqueSort = function(results) {
            var elem,
                duplicates = [],
                j = 0,
                i = 0;
            hasDuplicate = !support.detectDuplicates;
            sortInput = !support.sortStable && results.slice(0);
            results.sort(sortOrder);
            if (hasDuplicate) {
                while ((elem = results[i++])) {
                    if (elem === results[i]) {
                        j = duplicates.push(i);
                    }
                }
                while (j--) {
                    results.splice(duplicates[j], 1);
                }
            }
            sortInput = null;
            return results;
        };
        getText = Sizzle.getText = function(elem) {
            var node,
                ret = "",
                i = 0,
                nodeType = elem.nodeType;
            if (!nodeType) {
                while ((node = elem[i++])) {
                    ret += getText(node);
                }
            } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                if (typeof elem.textContent === "string") {
                    return elem.textContent;
                } else {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                        ret += getText(elem);
                    }
                }
            } else if (nodeType === 3 || nodeType === 4) {
                return elem.nodeValue;
            }
            return ret;
        };
        Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: true
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: true
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                "ATTR": function(match) {
                    match[1] = match[1].replace(runescape, funescape);
                    match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
                    if (match[2] === "~=") {
                        match[3] = " " + match[3] + " ";
                    }
                    return match.slice(0, 4);
                },
                "CHILD": function(match) {
                    match[1] = match[1].toLowerCase();
                    if (match[1].slice(0, 3) === "nth") {
                        if (!match[3]) {
                            Sizzle.error(match[0]);
                        }
                        match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                        match[5] = +((match[7] + match[8]) || match[3] === "odd");
                    } else if (match[3]) {
                        Sizzle.error(match[0]);
                    }
                    return match;
                },
                "PSEUDO": function(match) {
                    var excess,
                        unquoted = !match[6] && match[2];
                    if (matchExpr["CHILD"].test(match[0])) {
                        return null;
                    }
                    if (match[3]) {
                        match[2] = match[4] || match[5] || "";
                    } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                        match[0] = match[0].slice(0, excess);
                        match[2] = unquoted.slice(0, excess);
                    }
                    return match.slice(0, 3);
                }
            },
            filter: {
                "TAG": function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return nodeNameSelector === "*" ? function() {
                        return true;
                    } : function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    };
                },
                "CLASS": function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                            return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "");
                        });
                },
                "ATTR": function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        if (result == null) {
                            return operator === "!=";
                        }
                        if (!operator) {
                            return true;
                        }
                        result += "";
                        return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
                    };
                },
                "CHILD": function(type, what, argument, first, last) {
                    var simple = type.slice(0, 3) !== "nth",
                        forward = type.slice(-4) !== "last",
                        ofType = what === "of-type";
                    return first === 1 && last === 0 ? function(elem) {
                        return !!elem.parentNode;
                    } : function(elem, context, xml) {
                        var cache,
                            outerCache,
                            node,
                            diff,
                            nodeIndex,
                            start,
                            dir = simple !== forward ? "nextSibling" : "previousSibling",
                            parent = elem.parentNode,
                            name = ofType && elem.nodeName.toLowerCase(),
                            useCache = !xml && !ofType;
                        if (parent) {
                            if (simple) {
                                while (dir) {
                                    node = elem;
                                    while ((node = node[dir])) {
                                        if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                                            return false;
                                        }
                                    }
                                    start = dir = type === "only" && !start && "nextSibling";
                                }
                                return true;
                            }
                            start = [forward ? parent.firstChild : parent.lastChild];
                            if (forward && useCache) {
                                outerCache = parent[expando] || (parent[expando] = {});
                                cache = outerCache[type] || [];
                                nodeIndex = cache[0] === dirruns && cache[1];
                                diff = cache[0] === dirruns && cache[2];
                                node = nodeIndex && parent.childNodes[nodeIndex];
                                while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                                    if (node.nodeType === 1 && ++diff && node === elem) {
                                        outerCache[type] = [dirruns, nodeIndex, diff];
                                        break;
                                    }
                                }
                            } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
                                diff = cache[1];
                            } else {
                                while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                                        if (useCache) {
                                            (node[expando] || (node[expando] = {}))[type] = [dirruns, diff];
                                        }
                                        if (node === elem) {
                                            break;
                                        }
                                    }
                                }
                            }
                            diff -= last;
                            return diff === first || (diff % first === 0 && diff / first >= 0);
                        }
                    };
                },
                "PSEUDO": function(pseudo, argument) {
                    var args,
                        fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    if (fn[expando]) {
                        return fn(argument);
                    }
                    if (fn.length > 1) {
                        args = [pseudo, pseudo, "", argument];
                        return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                            var idx,
                                matched = fn(seed, argument),
                                i = matched.length;
                            while (i--) {
                                idx = indexOf.call(seed, matched[i]);
                                seed[idx] = !(matches[idx] = matched[i]);
                            }
                        }) : function(elem) {
                            return fn(elem, 0, args);
                        };
                    }
                    return fn;
                }
            },
            pseudos: {
                "not": markFunction(function(selector) {
                    var input = [],
                        results = [],
                        matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        var elem,
                            unmatched = matcher(seed, null, xml, []),
                            i = seed.length;
                        while (i--) {
                            if ((elem = unmatched[i])) {
                                seed[i] = !(matches[i] = elem);
                            }
                        }
                    }) : function(elem, context, xml) {
                        input[0] = elem;
                        matcher(input, null, xml, results);
                        return !results.pop();
                    };
                }),
                "has": markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),
                "contains": markFunction(function(text) {
                    return function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                    };
                }),
                "lang": markFunction(function(lang) {
                    if (!ridentifier.test(lang || "")) {
                        Sizzle.error("unsupported lang: " + lang);
                    }
                    lang = lang.replace(runescape, funescape).toLowerCase();
                    return function(elem) {
                        var elemLang;
                        do {
                            if ((elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {
                                elemLang = elemLang.toLowerCase();
                                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                            }
                        } while ((elem = elem.parentNode) && elem.nodeType === 1);
                        return false;
                    };
                }),
                "target": function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                },
                "root": function(elem) {
                    return elem === docElem;
                },
                "focus": function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },
                "enabled": function(elem) {
                    return elem.disabled === false;
                },
                "disabled": function(elem) {
                    return elem.disabled === true;
                },
                "checked": function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                },
                "selected": function(elem) {
                    if (elem.parentNode) {
                        elem.parentNode.selectedIndex;
                    }
                    return elem.selected === true;
                },
                "empty": function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                        if (elem.nodeType < 6) {
                            return false;
                        }
                    }
                    return true;
                },
                "parent": function(elem) {
                    return !Expr.pseudos["empty"](elem);
                },
                "header": function(elem) {
                    return rheader.test(elem.nodeName);
                },
                "input": function(elem) {
                    return rinputs.test(elem.nodeName);
                },
                "button": function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === "button" || name === "button";
                },
                "text": function(elem) {
                    var attr;
                    return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
                },
                "first": createPositionalPseudo(function() {
                    return [0];
                }),
                "last": createPositionalPseudo(function(matchIndexes, length) {
                    return [length - 1];
                }),
                "eq": createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [argument < 0 ? argument + length : argument];
                }),
                "even": createPositionalPseudo(function(matchIndexes, length) {
                    var i = 0;
                    for (; i < length; i += 2) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                "odd": createPositionalPseudo(function(matchIndexes, length) {
                    var i = 1;
                    for (; i < length; i += 2) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (; --i >= 0;) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (; ++i < length;) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                })
            }
        };
        Expr.pseudos["nth"] = Expr.pseudos["eq"];
        for (i in {
            radio: true,
            checkbox: true,
            file: true,
            password: true,
            image: true
        }) {
            Expr.pseudos[i] = createInputPseudo(i);
        }
        for (i in {
            submit: true,
            reset: true
        }) {
            Expr.pseudos[i] = createButtonPseudo(i);
        }
        function setFilters() {}
        setFilters.prototype = Expr.filters = Expr.pseudos;
        Expr.setFilters = new setFilters();
        tokenize = Sizzle.tokenize = function(selector, parseOnly) {
            var matched,
                match,
                tokens,
                type,
                soFar,
                groups,
                preFilters,
                cached = tokenCache[selector + " "];
            if (cached) {
                return parseOnly ? 0 : cached.slice(0);
            }
            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;
            while (soFar) {
                if (!matched || (match = rcomma.exec(soFar))) {
                    if (match) {
                        soFar = soFar.slice(match[0].length) || soFar;
                    }
                    groups.push((tokens = []));
                }
                matched = false;
                if ((match = rcombinators.exec(soFar))) {
                    matched = match.shift();
                    tokens.push({
                        value: matched,
                        type: match[0].replace(rtrim, " ")
                    });
                    soFar = soFar.slice(matched.length);
                }
                for (type in Expr.filter) {
                    if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            type: type,
                            matches: match
                        });
                        soFar = soFar.slice(matched.length);
                    }
                }
                if (!matched) {
                    break;
                }
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
        };
        function toSelector(tokens) {
            var i = 0,
                len = tokens.length,
                selector = "";
            for (; i < len; i++) {
                selector += tokens[i].value;
            }
            return selector;
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir,
                checkNonElements = base && dir === "parentNode",
                doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                while ((elem = elem[dir])) {
                    if (elem.nodeType === 1 || checkNonElements) {
                        return matcher(elem, context, xml);
                    }
                }
            } : function(elem, context, xml) {
                var oldCache,
                    outerCache,
                    newCache = [dirruns, doneName];
                if (xml) {
                    while ((elem = elem[dir])) {
                        if (elem.nodeType === 1 || checkNonElements) {
                            if (matcher(elem, context, xml)) {
                                return true;
                            }
                        }
                    }
                } else {
                    while ((elem = elem[dir])) {
                        if (elem.nodeType === 1 || checkNonElements) {
                            outerCache = elem[expando] || (elem[expando] = {});
                            if ((oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                                return ( newCache[2] = oldCache[2]) ;
                            } else {
                                outerCache[dir] = newCache;
                                if ((newCache[2] = matcher(elem, context, xml))) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            };
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                var i = matchers.length;
                while (i--) {
                    if (!matchers[i](elem, context, xml)) {
                        return false;
                    }
                }
                return true;
            } : matchers[0];
        }
        function multipleContexts(selector, contexts, results) {
            var i = 0,
                len = contexts.length;
            for (; i < len; i++) {
                Sizzle(selector, contexts[i], results);
            }
            return results;
        }
        function condense(unmatched, map, filter, context, xml) {
            var elem,
                newUnmatched = [],
                i = 0,
                len = unmatched.length,
                mapped = map != null;
            for (; i < len; i++) {
                if ((elem = unmatched[i])) {
                    if (!filter || filter(elem, context, xml)) {
                        newUnmatched.push(elem);
                        if (mapped) {
                            map.push(i);
                        }
                    }
                }
            }
            return newUnmatched;
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            if (postFilter && !postFilter[expando]) {
                postFilter = setMatcher(postFilter);
            }
            if (postFinder && !postFinder[expando]) {
                postFinder = setMatcher(postFinder, postSelector);
            }
            return markFunction(function(seed, results, context, xml) {
                var temp,
                    i,
                    elem,
                    preMap = [],
                    postMap = [],
                    preexisting = results.length,
                    elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
                    matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
                    matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher) {
                    matcher(matcherIn, matcherOut, context, xml);
                }
                if (postFilter) {
                    temp = condense(matcherOut, postMap);
                    postFilter(temp, [], context, xml);
                    i = temp.length;
                    while (i--) {
                        if ((elem = temp[i])) {
                            matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                        }
                    }
                }
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            temp = [];
                            i = matcherOut.length;
                            while (i--) {
                                if ((elem = matcherOut[i])) {
                                    temp.push((matcherIn[i] = elem));
                                }
                            }
                            postFinder(null, (matcherOut = []), temp, xml);
                        }
                        i = matcherOut.length;
                        while (i--) {
                            if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {
                                seed[temp] = !(results[temp] = elem);
                            }
                        }
                    }
                } else {
                    matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
                    if (postFinder) {
                        postFinder(null, results, matcherOut, xml);
                    } else {
                        push.apply(results, matcherOut);
                    }
                }
            });
        }
        function matcherFromTokens(tokens) {
            var checkContext,
                matcher,
                j,
                len = tokens.length,
                leadingRelative = Expr.relative[tokens[0].type],
                implicitRelative = leadingRelative || Expr.relative[" "],
                i = leadingRelative ? 1 : 0,
                matchContext = addCombinator(function(elem) {
                    return elem === checkContext;
                }, implicitRelative, true),
                matchAnyContext = addCombinator(function(elem) {
                    return indexOf.call(checkContext, elem) > -1;
                }, implicitRelative, true),
                matchers = [function(elem, context, xml) {
                    return (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                }];
            for (; i < len; i++) {
                if ((matcher = Expr.relative[tokens[i].type])) {
                    matchers = [addCombinator(elementMatcher(matchers), matcher)];
                } else {
                    matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
                    if (matcher[expando]) {
                        j = ++i;
                        for (; j < len; j++) {
                            if (Expr.relative[tokens[j].type]) {
                                break;
                            }
                        }
                        return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                            value: tokens[i - 2].type === " " ? "*" : ""
                        })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens));
                    }
                    matchers.push(matcher);
                }
            }
            return elementMatcher(matchers);
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0,
                byElement = elementMatchers.length > 0,
                superMatcher = function(seed, context, xml, results, outermost) {
                    var elem,
                        j,
                        matcher,
                        matchedCount = 0,
                        i = "0",
                        unmatched = seed && [],
                        setMatched = [],
                        contextBackup = outermostContext,
                        elems = seed || byElement && Expr.find["TAG"]("*", outermost),
                        dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                        len = elems.length;
                    if (outermost) {
                        outermostContext = context !== document && context;
                    }
                    for (; i !== len && (elem = elems[i]) != null; i++) {
                        if (byElement && elem) {
                            j = 0;
                            while ((matcher = elementMatchers[j++])) {
                                if (matcher(elem, context, xml)) {
                                    results.push(elem);
                                    break;
                                }
                            }
                            if (outermost) {
                                dirruns = dirrunsUnique;
                            }
                        }
                        if (bySet) {
                            if ((elem = !matcher && elem)) {
                                matchedCount--;
                            }
                            if (seed) {
                                unmatched.push(elem);
                            }
                        }
                    }
                    matchedCount += i;
                    if (bySet && i !== matchedCount) {
                        j = 0;
                        while ((matcher = setMatchers[j++])) {
                            matcher(unmatched, setMatched, context, xml);
                        }
                        if (seed) {
                            if (matchedCount > 0) {
                                while (i--) {
                                    if (!(unmatched[i] || setMatched[i])) {
                                        setMatched[i] = pop.call(results);
                                    }
                                }
                            }
                            setMatched = condense(setMatched);
                        }
                        push.apply(results, setMatched);
                        if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) {
                            Sizzle.uniqueSort(results);
                        }
                    }
                    if (outermost) {
                        dirruns = dirrunsUnique;
                        outermostContext = contextBackup;
                    }
                    return unmatched;
                };
            return bySet ? markFunction(superMatcher) : superMatcher;
        }
        compile = Sizzle.compile = function(selector, match) {
            var i,
                setMatchers = [],
                elementMatchers = [],
                cached = compilerCache[selector + " "];
            if (!cached) {
                if (!match) {
                    match = tokenize(selector);
                }
                i = match.length;
                while (i--) {
                    cached = matcherFromTokens(match[i]);
                    if (cached[expando]) {
                        setMatchers.push(cached);
                    } else {
                        elementMatchers.push(cached);
                    }
                }
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
                cached.selector = selector;
            }
            return cached;
        };
        select = Sizzle.select = function(selector, context, results, seed) {
            var i,
                tokens,
                token,
                type,
                find,
                compiled = typeof selector === "function" && selector,
                match = !seed && tokenize((selector = compiled.selector || selector));
            results = results || [];
            if (match.length === 1) {
                tokens = match[0] = match[0].slice(0);
                if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                    context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
                    if (!context) {
                        return results;
                    } else if (compiled) {
                        context = context.parentNode;
                    }
                    selector = selector.slice(tokens.shift().value.length);
                }
                i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
                while (i--) {
                    token = tokens[i];
                    if (Expr.relative[(type = token.type)]) {
                        break;
                    }
                    if ((find = Expr.find[type])) {
                        if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                            tokens.splice(i, 1);
                            selector = seed.length && toSelector(tokens);
                            if (!selector) {
                                push.apply(results, seed);
                                return results;
                            }
                            break;
                        }
                    }
                }
            }
            (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context);
            return results;
        };
        support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
        support.detectDuplicates = !!hasDuplicate;
        setDocument();
        support.sortDetached = assert(function(div1) {
            return div1.compareDocumentPosition(document.createElement("div")) & 1;
        });
        if (!assert(function(div) {
            div.innerHTML = "<a href='#'></a>";
            return div.firstChild.getAttribute("href") === "#";
        })) {
            addHandle("type|href|height|width", function(elem, name, isXML) {
                if (!isXML) {
                    return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
                }
            });
        }
        if (!support.attributes || !assert(function(div) {
            div.innerHTML = "<input/>";
            div.firstChild.setAttribute("value", "");
            return div.firstChild.getAttribute("value") === "";
        })) {
            addHandle("value", function(elem, name, isXML) {
                if (!isXML && elem.nodeName.toLowerCase() === "input") {
                    return elem.defaultValue;
                }
            });
        }
        if (!assert(function(div) {
            return div.getAttribute("disabled") == null;
        })) {
            addHandle(booleans, function(elem, name, isXML) {
                var val;
                if (!isXML) {
                    return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
                }
            });
        }
        return Sizzle;
    })(window);
    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[":"] = jQuery.expr.pseudos;
    jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
    var rneedsContext = jQuery.expr.match.needsContext;
    var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
    var risSimple = /^.[^:#\[\.,]*$/;
    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) {
            return jQuery.grep(elements, function(elem, i) {
                return !!qualifier.call(elem, i, elem) !== not;
            });
        }
        if (qualifier.nodeType) {
            return jQuery.grep(elements, function(elem) {
                return (elem === qualifier) !== not;
            });
        }
        if (typeof qualifier === "string") {
            if (risSimple.test(qualifier)) {
                return jQuery.filter(qualifier, elements, not);
            }
            qualifier = jQuery.filter(qualifier, elements);
        }
        return jQuery.grep(elements, function(elem) {
            return (indexOf.call(qualifier, elem) >= 0) !== not;
        });
    }
    jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];
        if (not) {
            expr = ":not(" + expr + ")";
        }
        return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
            return elem.nodeType === 1;
        }));
    };
    jQuery.fn.extend({
        find: function(selector) {
            var i,
                len = this.length,
                ret = [],
                self = this;
            if (typeof selector !== "string") {
                return this.pushStack(jQuery(selector).filter(function() {
                    for (i = 0; i < len; i++) {
                        if (jQuery.contains(self[i], this)) {
                            return true;
                        }
                    }
                }));
            }
            for (i = 0; i < len; i++) {
                jQuery.find(selector, self[i], ret);
            }
            ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
            ret.selector = this.selector ? this.selector + " " + selector : selector;
            return ret;
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], false));
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], true));
        },
        is: function(selector) {
            return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
        }
    });
    var rootjQuery,
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        init = jQuery.fn.init = function(selector, context) {
            var match,
                elem;
            if (!selector) {
                return this;
            }
            if (typeof selector === "string") {
                if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
                    match = [null, selector, null];
                } else {
                    match = rquickExpr.exec(selector);
                }
                if (match && (match[1] || !context)) {
                    if (match[1]) {
                        context = context instanceof jQuery ? context[0] : context;
                        jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                            for (match in context) {
                                if (jQuery.isFunction(this[match])) {
                                    this[match](context[match]);
                                } else {
                                    this.attr(match, context[match]);
                                }
                            }
                        }
                        return this;
                    } else {
                        elem = document.getElementById(match[2]);
                        if (elem && elem.parentNode) {
                            this.length = 1;
                            this[0] = elem;
                        }
                        this.context = document;
                        this.selector = selector;
                        return this;
                    }
                } else if (!context || context.jquery) {
                    return (context || rootjQuery).find(selector);
                } else {
                    return this.constructor(context).find(selector);
                }
            } else if (selector.nodeType) {
                this.context = this[0] = selector;
                this.length = 1;
                return this;
            } else if (jQuery.isFunction(selector)) {
                return typeof rootjQuery.ready !== "undefined" ? rootjQuery.ready(selector) : selector(jQuery);
            }
            if (selector.selector !== undefined) {
                this.selector = selector.selector;
                this.context = selector.context;
            }
            return jQuery.makeArray(selector, this);
        };
    init.prototype = jQuery.fn;
    rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/,
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
    jQuery.extend({
        dir: function(elem, dir, until) {
            var matched = [],
                truncate = until !== undefined;
            while ((elem = elem[dir]) && elem.nodeType !== 9) {
                if (elem.nodeType === 1) {
                    if (truncate && jQuery(elem).is(until)) {
                        break;
                    }
                    matched.push(elem);
                }
            }
            return matched;
        },
        sibling: function(n, elem) {
            var matched = [];
            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    matched.push(n);
                }
            }
            return matched;
        }
    });
    jQuery.fn.extend({
        has: function(target) {
            var targets = jQuery(target, this),
                l = targets.length;
            return this.filter(function() {
                var i = 0;
                for (; i < l; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true;
                    }
                }
            });
        },
        closest: function(selectors, context) {
            var cur,
                i = 0,
                l = this.length,
                matched = [],
                pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
            for (; i < l; i++) {
                for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                    if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
                        matched.push(cur);
                        break;
                    }
                }
            }
            return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
        },
        index: function(elem) {
            if (!elem) {
                return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
            }
            if (typeof elem === "string") {
                return indexOf.call(jQuery(elem), this[0]);
            }
            return indexOf.call(this, elem.jquery ? elem[0] : elem);
        },
        add: function(selector, context) {
            return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))));
        },
        addBack: function(selector) {
            return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
        }
    });
    function sibling(cur, dir) {
        while ((cur = cur[dir]) && cur.nodeType !== 1) {}
        return cur;
    }
    jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function(elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents: function(elem) {
            return elem.contentDocument || jQuery.merge([], elem.childNodes);
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var matched = jQuery.map(this, fn, until);
            if (name.slice(-5) !== "Until") {
                selector = until;
            }
            if (selector && typeof selector === "string") {
                matched = jQuery.filter(selector, matched);
            }
            if (this.length > 1) {
                if (!guaranteedUnique[name]) {
                    jQuery.unique(matched);
                }
                if (rparentsprev.test(name)) {
                    matched.reverse();
                }
            }
            return this.pushStack(matched);
        };
    });
    var rnotwhite = (/\S+/g);
    var optionsCache = {};
    function createOptions(options) {
        var object = optionsCache[options] = {};
        jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
            object[flag] = true;
        });
        return object;
    }
    jQuery.Callbacks = function(options) {
        options = typeof options === "string" ? (optionsCache[options] || createOptions(options)) : jQuery.extend({}, options);
        var
            memory,
            fired,
            firing,
            firingStart,
            firingLength,
            firingIndex,
            list = [],
            stack = !options.once && [],
            fire = function(data) {
                memory = options.memory && data;
                fired = true;
                firingIndex = firingStart || 0;
                firingStart = 0;
                firingLength = list.length;
                firing = true;
                for (; list && firingIndex < firingLength; firingIndex++) {
                    if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                        memory = false;
                        break;
                    }
                }
                firing = false;
                if (list) {
                    if (stack) {
                        if (stack.length) {
                            fire(stack.shift());
                        }
                    } else if (memory) {
                        list = [];
                    } else {
                        self.disable();
                    }
                }
            },
            self = {
                add: function() {
                    if (list) {
                        var start = list.length;
                        (function add(args) {
                            jQuery.each(args, function(_, arg) {
                                var type = jQuery.type(arg);
                                if (type === "function") {
                                    if (!options.unique || !self.has(arg)) {
                                        list.push(arg);
                                    }
                                } else if (arg && arg.length && type !== "string") {
                                    add(arg);
                                }
                            });
                        })(arguments);
                        if (firing) {
                            firingLength = list.length;
                        } else if (memory) {
                            firingStart = start;
                            fire(memory);
                        }
                    }
                    return this;
                },
                remove: function() {
                    if (list) {
                        jQuery.each(arguments, function(_, arg) {
                            var index;
                            while ((index = jQuery.inArray(arg, list, index)) > -1) {
                                list.splice(index, 1);
                                if (firing) {
                                    if (index <= firingLength) {
                                        firingLength--;
                                    }
                                    if (index <= firingIndex) {
                                        firingIndex--;
                                    }
                                }
                            }
                        });
                    }
                    return this;
                },
                has: function(fn) {
                    return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
                },
                empty: function() {
                    list = [];
                    firingLength = 0;
                    return this;
                },
                disable: function() {
                    list = stack = memory = undefined;
                    return this;
                },
                disabled: function() {
                    return !list;
                },
                lock: function() {
                    stack = undefined;
                    if (!memory) {
                        self.disable();
                    }
                    return this;
                },
                locked: function() {
                    return !stack;
                },
                fireWith: function(context, args) {
                    if (list && (!fired || stack)) {
                        args = args || [];
                        args = [context, args.slice ? args.slice() : args];
                        if (firing) {
                            stack.push(args);
                        } else {
                            fire(args);
                        }
                    }
                    return this;
                },
                fire: function() {
                    self.fireWith(this, arguments);
                    return this;
                },
                fired: function() {
                    return !!fired;
                }
            };
        return self;
    };
    jQuery.extend({
        Deferred: function(func) {
            var tuples = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]],
                state = "pending",
                promise = {
                    state: function() {
                        return state;
                    },
                    always: function() {
                        deferred.done(arguments).fail(arguments);
                        return this;
                    },
                    then: function() {
                        var fns = arguments;
                        return jQuery.Deferred(function(newDefer) {
                            jQuery.each(tuples, function(i, tuple) {
                                var fn = jQuery.isFunction(fns[i]) && fns[i];
                                deferred[tuple[1]](function() {
                                    var returned = fn && fn.apply(this, arguments);
                                    if (returned && jQuery.isFunction(returned.promise)) {
                                        returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
                                    } else {
                                        newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                                    }
                                });
                            });
                            fns = null;
                        }).promise();
                    },
                    promise: function(obj) {
                        return obj != null ? jQuery.extend(obj, promise) : promise;
                    }
                },
                deferred = {};
            promise.pipe = promise.then;
            jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2],
                    stateString = tuple[3];
                promise[tuple[1]] = list.add;
                if (stateString) {
                    list.add(function() {
                        state = stateString;
                    }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
                }
                deferred[tuple[0]] = function() {
                    deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
                    return this;
                };
                deferred[tuple[0] + "With"] = list.fireWith;
            });
            promise.promise(deferred);
            if (func) {
                func.call(deferred, deferred);
            }
            return deferred;
        },
        when: function(subordinate) {
            var i = 0,
                resolveValues = slice.call(arguments),
                length = resolveValues.length,
                remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,
                deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
                updateFunc = function(i, contexts, values) {
                    return function(value) {
                        contexts[i] = this;
                        values[i] = arguments.length > 1 ? slice.call(arguments) : value;
                        if (values === progressValues) {
                            deferred.notifyWith(contexts, values);
                        } else if (!(--remaining)) {
                            deferred.resolveWith(contexts, values);
                        }
                    };
                },
                progressValues,
                progressContexts,
                resolveContexts;
            if (length > 1) {
                progressValues = new Array(length);
                progressContexts = new Array(length);
                resolveContexts = new Array(length);
                for (; i < length; i++) {
                    if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                        resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues));
                    } else {
                        --remaining;
                    }
                }
            }
            if (!remaining) {
                deferred.resolveWith(resolveContexts, resolveValues);
            }
            return deferred.promise();
        }
    });
    var readyList;
    jQuery.fn.ready = function(fn) {
        jQuery.ready.promise().done(fn);
        return this;
    };
    jQuery.extend({
        isReady: false,
        readyWait: 1,
        holdReady: function(hold) {
            if (hold) {
                jQuery.readyWait++;
            } else {
                jQuery.ready(true);
            }
        },
        ready: function(wait) {
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                return;
            }
            jQuery.isReady = true;
            if (wait !== true && --jQuery.readyWait > 0) {
                return;
            }
            readyList.resolveWith(document, [jQuery]);
            if (jQuery.fn.triggerHandler) {
                jQuery(document).triggerHandler("ready");
                jQuery(document).off("ready");
            }
        }
    });
    function completed() {
        document.removeEventListener("DOMContentLoaded", completed, false);
        window.removeEventListener("load", completed, false);
        jQuery.ready();
    }
    jQuery.ready.promise = function(obj) {
        if (!readyList) {
            readyList = jQuery.Deferred();
            if (document.readyState === "complete") {
                setTimeout(jQuery.ready);
            } else {
                document.addEventListener("DOMContentLoaded", completed, false);
                window.addEventListener("load", completed, false);
            }
        }
        return readyList.promise(obj);
    };
    jQuery.ready.promise();
    var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0,
            len = elems.length,
            bulk = key == null;
        if (jQuery.type(key) === "object") {
            chainable = true;
            for (i in key) {
                jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
            }
        } else if (value !== undefined) {
            chainable = true;
            if (!jQuery.isFunction(value)) {
                raw = true;
            }
            if (bulk) {
                if (raw) {
                    fn.call(elems, value);
                    fn = null;
                } else {
                    bulk = fn;
                    fn = function(elem, key, value) {
                        return bulk.call(jQuery(elem), value);
                    };
                }
            }
            if (fn) {
                for (; i < len; i++) {
                    fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
                }
            }
        }
        return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
    };
    jQuery.acceptData = function(owner) {
        return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
    };
    function Data() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {};
            }
        });
        this.expando = jQuery.expando + Math.random();
    }
    Data.uid = 1;
    Data.accepts = jQuery.acceptData;
    Data.prototype = {
        key: function(owner) {
            if (!Data.accepts(owner)) {
                return 0;
            }
            var descriptor = {},
                unlock = owner[this.expando];
            if (!unlock) {
                unlock = Data.uid++;
                try {
                    descriptor[this.expando] = {
                        value: unlock
                    };
                    Object.defineProperties(owner, descriptor);
                } catch (e) {
                    descriptor[this.expando] = unlock;
                    jQuery.extend(owner, descriptor);
                }
            }
            if (!this.cache[unlock]) {
                this.cache[unlock] = {};
            }
            return unlock;
        },
        set: function(owner, data, value) {
            var prop,
                unlock = this.key(owner),
                cache = this.cache[unlock];
            if (typeof data === "string") {
                cache[data] = value;
            } else {
                if (jQuery.isEmptyObject(cache)) {
                    jQuery.extend(this.cache[unlock], data);
                } else {
                    for (prop in data) {
                        cache[prop] = data[prop];
                    }
                }
            }
            return cache;
        },
        get: function(owner, key) {
            var cache = this.cache[this.key(owner)];
            return key === undefined ? cache : cache[key];
        },
        access: function(owner, key, value) {
            var stored;
            if (key === undefined || ((key && typeof key === "string") && value === undefined)) {
                stored = this.get(owner, key);
                return stored !== undefined ? stored : this.get(owner, jQuery.camelCase(key));
            }
            this.set(owner, key, value);
            return value !== undefined ? value : key;
        },
        remove: function(owner, key) {
            var i,
                name,
                camel,
                unlock = this.key(owner),
                cache = this.cache[unlock];
            if (key === undefined) {
                this.cache[unlock] = {};
            } else {
                if (jQuery.isArray(key)) {
                    name = key.concat(key.map(jQuery.camelCase));
                } else {
                    camel = jQuery.camelCase(key);
                    if (key in cache) {
                        name = [key, camel];
                    } else {
                        name = camel;
                        name = name in cache ? [name] : (name.match(rnotwhite) || []);
                    }
                }
                i = name.length;
                while (i--) {
                    delete cache[name[i]];
                }
            }
        },
        hasData: function(owner) {
            return !jQuery.isEmptyObject(this.cache[owner[this.expando]] || {});
        },
        discard: function(owner) {
            if (owner[this.expando]) {
                delete this.cache[owner[this.expando]];
            }
        }
    };
    var data_priv = new Data();
    var data_user = new Data();
    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        rmultiDash = /([A-Z])/g;
    function dataAttr(elem, key, data) {
        var name;
        if (data === undefined && elem.nodeType === 1) {
            name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            data = elem.getAttribute(name);
            if (typeof data === "string") {
                try {
                    data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
                } catch (e) {}
                data_user.set(elem, key, data);
            } else {
                data = undefined;
            }
        }
        return data;
    }
    jQuery.extend({
        hasData: function(elem) {
            return data_user.hasData(elem) || data_priv.hasData(elem);
        },
        data: function(elem, name, data) {
            return data_user.access(elem, name, data);
        },
        removeData: function(elem, name) {
            data_user.remove(elem, name);
        },
        _data: function(elem, name, data) {
            return data_priv.access(elem, name, data);
        },
        _removeData: function(elem, name) {
            data_priv.remove(elem, name);
        }
    });
    jQuery.fn.extend({
        data: function(key, value) {
            var i,
                name,
                data,
                elem = this[0],
                attrs = elem && elem.attributes;
            if (key === undefined) {
                if (this.length) {
                    data = data_user.get(elem);
                    if (elem.nodeType === 1 && !data_priv.get(elem, "hasDataAttrs")) {
                        i = attrs.length;
                        while (i--) {
                            if (attrs[i]) {
                                name = attrs[i].name;
                                if (name.indexOf("data-") === 0) {
                                    name = jQuery.camelCase(name.slice(5));
                                    dataAttr(elem, name, data[name]);
                                }
                            }
                        }
                        data_priv.set(elem, "hasDataAttrs", true);
                    }
                }
                return data;
            }
            if (typeof key === "object") {
                return this.each(function() {
                    data_user.set(this, key);
                });
            }
            return access(this, function(value) {
                var data,
                    camelKey = jQuery.camelCase(key);
                if (elem && value === undefined) {
                    data = data_user.get(elem, key);
                    if (data !== undefined) {
                        return data;
                    }
                    data = data_user.get(elem, camelKey);
                    if (data !== undefined) {
                        return data;
                    }
                    data = dataAttr(elem, camelKey, undefined);
                    if (data !== undefined) {
                        return data;
                    }
                    return;
                }
                this.each(function() {
                    var data = data_user.get(this, camelKey);
                    data_user.set(this, camelKey, value);
                    if (key.indexOf("-") !== -1 && data !== undefined) {
                        data_user.set(this, key, value);
                    }
                });
            }, null, value, arguments.length > 1, null, true);
        },
        removeData: function(key) {
            return this.each(function() {
                data_user.remove(this, key);
            });
        }
    });
    jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            if (elem) {
                type = (type || "fx") + "queue";
                queue = data_priv.get(elem, type);
                if (data) {
                    if (!queue || jQuery.isArray(data)) {
                        queue = data_priv.access(elem, type, jQuery.makeArray(data));
                    } else {
                        queue.push(data);
                    }
                }
                return queue || [];
            }
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type),
                startLength = queue.length,
                fn = queue.shift(),
                hooks = jQuery._queueHooks(elem, type),
                next = function() {
                    jQuery.dequeue(elem, type);
                };
            if (fn === "inprogress") {
                fn = queue.shift();
                startLength--;
            }
            if (fn) {
                if (type === "fx") {
                    queue.unshift("inprogress");
                }
                delete hooks.stop;
                fn.call(elem, next, hooks);
            }
            if (!startLength && hooks) {
                hooks.empty.fire();
            }
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return data_priv.get(elem, key) || data_priv.access(elem, key, {
                    empty: jQuery.Callbacks("once memory").add(function() {
                        data_priv.remove(elem, [type + "queue", key]);
                    })
                });
        }
    });
    jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--;
            }
            if (arguments.length < setter) {
                return jQuery.queue(this[0], type);
            }
            return data === undefined ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type);
                if (type === "fx" && queue[0] !== "inprogress") {
                    jQuery.dequeue(this, type);
                }
            });
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type);
            });
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", []);
        },
        promise: function(type, obj) {
            var tmp,
                count = 1,
                defer = jQuery.Deferred(),
                elements = this,
                i = this.length,
                resolve = function() {
                    if (!(--count)) {
                        defer.resolveWith(elements, [elements]);
                    }
                };
            if (typeof type !== "string") {
                obj = type;
                type = undefined;
            }
            type = type || "fx";
            while (i--) {
                tmp = data_priv.get(elements[i], type + "queueHooks");
                if (tmp && tmp.empty) {
                    count++;
                    tmp.empty.add(resolve);
                }
            }
            resolve();
            return defer.promise(obj);
        }
    });
    var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
    var cssExpand = ["Top", "Right", "Bottom", "Left"];
    var isHidden = function(elem, el) {
        elem = el || elem;
        return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
    };
    var rcheckableType = (/^(?:checkbox|radio)$/i);
    (function() {
        var fragment = document.createDocumentFragment(),
            div = fragment.appendChild(document.createElement("div")),
            input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("checked", "checked");
        input.setAttribute("name", "t");
        div.appendChild(input);
        support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
        div.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
    })();
    var strundefined = typeof undefined;
    support.focusinBubbles = "onfocusin" in window;
    var
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    function returnTrue() {
        return true;
    }
    function returnFalse() {
        return false;
    }
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var handleObjIn,
                eventHandle,
                tmp,
                events,
                t,
                handleObj,
                special,
                handlers,
                type,
                namespaces,
                origType,
                elemData = data_priv.get(elem);
            if (!elemData) {
                return;
            }
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }
            if (!handler.guid) {
                handler.guid = jQuery.guid++;
            }
            if (!(events = elemData.events)) {
                events = elemData.events = {};
            }
            if (!(eventHandle = elemData.handle)) {
                eventHandle = elemData.handle = function(e) {
                    return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
                };
            }
            types = (types || "").match(rnotwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();
                if (!type) {
                    continue;
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                special = jQuery.event.special[type] || {};
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn);
                if (!(handlers = events[type])) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;
                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle, false);
                        }
                    }
                }
                if (special.add) {
                    special.add.call(elem, handleObj);
                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid;
                    }
                }
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj);
                } else {
                    handlers.push(handleObj);
                }
                jQuery.event.global[type] = true;
            }
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j,
                origCount,
                tmp,
                events,
                t,
                handleObj,
                special,
                handlers,
                type,
                namespaces,
                origType,
                elemData = data_priv.hasData(elem) && data_priv.get(elem);
            if (!elemData || !(events = elemData.events)) {
                return;
            }
            types = (types || "").match(rnotwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();
                if (!type) {
                    for (type in events) {
                        jQuery.event.remove(elem, type + types[t], handler, selector, true);
                    }
                    continue;
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                handlers = events[type] || [];
                tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
                origCount = j = handlers.length;
                while (j--) {
                    handleObj = handlers[j];
                    if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                        handlers.splice(j, 1);
                        if (handleObj.selector) {
                            handlers.delegateCount--;
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj);
                        }
                    }
                }
                if (origCount && !handlers.length) {
                    if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                        jQuery.removeEvent(elem, type, elemData.handle);
                    }
                    delete events[type];
                }
            }
            if (jQuery.isEmptyObject(events)) {
                delete elemData.handle;
                data_priv.remove(elem, "events");
            }
        },
        trigger: function(event, data, elem, onlyHandlers) {
            var i,
                cur,
                tmp,
                bubbleType,
                ontype,
                handle,
                special,
                eventPath = [elem || document],
                type = hasOwn.call(event, "type") ? event.type : event,
                namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            cur = tmp = elem = elem || document;
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return;
            }
            if (type.indexOf(".") >= 0) {
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;
            event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            event.result = undefined;
            if (!event.target) {
                event.target = elem;
            }
            data = data == null ? [event] : jQuery.makeArray(data, [event]);
            special = jQuery.event.special[type] || {};
            if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                return;
            }
            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                bubbleType = special.delegateType || type;
                if (!rfocusMorph.test(bubbleType + type)) {
                    cur = cur.parentNode;
                }
                for (; cur; cur = cur.parentNode) {
                    eventPath.push(cur);
                    tmp = cur;
                }
                if (tmp === (elem.ownerDocument || document)) {
                    eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
            }
            i = 0;
            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                event.type = i > 1 ? bubbleType : special.bindType || type;
                handle = (data_priv.get(cur, "events") || {})[event.type] && data_priv.get(cur, "handle");
                if (handle) {
                    handle.apply(cur, data);
                }
                handle = ontype && cur[ontype];
                if (handle && handle.apply && jQuery.acceptData(cur)) {
                    event.result = handle.apply(cur, data);
                    if (event.result === false) {
                        event.preventDefault();
                    }
                }
            }
            event.type = type;
            if (!onlyHandlers && !event.isDefaultPrevented()) {
                if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && jQuery.acceptData(elem)) {
                    if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
                        tmp = elem[ontype];
                        if (tmp) {
                            elem[ontype] = null;
                        }
                        jQuery.event.triggered = type;
                        elem[type]();
                        jQuery.event.triggered = undefined;
                        if (tmp) {
                            elem[ontype] = tmp;
                        }
                    }
                }
            }
            return event.result;
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event);
            var i,
                j,
                ret,
                matched,
                handleObj,
                handlerQueue = [],
                args = slice.call(arguments),
                handlers = (data_priv.get(this, "events") || {})[event.type] || [],
                special = jQuery.event.special[event.type] || {};
            args[0] = event;
            event.delegateTarget = this;
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                return;
            }
            handlerQueue = jQuery.event.handlers.call(this, event, handlers);
            i = 0;
            while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                event.currentTarget = matched.elem;
                j = 0;
                while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
                    if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
                        event.handleObj = handleObj;
                        event.data = handleObj.data;
                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                        if (ret !== undefined) {
                            if ((event.result = ret) === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }
            if (special.postDispatch) {
                special.postDispatch.call(this, event);
            }
            return event.result;
        },
        handlers: function(event, handlers) {
            var i,
                matches,
                sel,
                handleObj,
                handlerQueue = [],
                delegateCount = handlers.delegateCount,
                cur = event.target;
            if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) {
                for (; cur !== this; cur = cur.parentNode || this) {
                    if (cur.disabled !== true || event.type !== "click") {
                        matches = [];
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];
                            sel = handleObj.selector + " ";
                            if (matches[sel] === undefined) {
                                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length;
                            }
                            if (matches[sel]) {
                                matches.push(handleObj);
                            }
                        }
                        if (matches.length) {
                            handlerQueue.push({
                                elem: cur,
                                handlers: matches
                            });
                        }
                    }
                }
            }
            if (delegateCount < handlers.length) {
                handlerQueue.push({
                    elem: this,
                    handlers: handlers.slice(delegateCount)
                });
            }
            return handlerQueue;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                if (event.which == null) {
                    event.which = original.charCode != null ? original.charCode : original.keyCode;
                }
                return event;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var eventDoc,
                    doc,
                    body,
                    button = original.button;
                if (event.pageX == null && original.clientX != null) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;
                    event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                    event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
                }
                if (!event.which && button !== undefined) {
                    event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
                }
                return event;
            }
        },
        fix: function(event) {
            if (event[jQuery.expando]) {
                return event;
            }
            var i,
                prop,
                copy,
                type = event.type,
                originalEvent = event,
                fixHook = this.fixHooks[type];
            if (!fixHook) {
                this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
            }
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
            event = new jQuery.Event(originalEvent);
            i = copy.length;
            while (i--) {
                prop = copy[i];
                event[prop] = originalEvent[prop];
            }
            if (!event.target) {
                event.target = document;
            }
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode;
            }
            return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },
        special: {
            load: {
                noBubble: true
            },
            focus: {
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus) {
                        this.focus();
                        return false;
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === safeActiveElement() && this.blur) {
                        this.blur();
                        return false;
                    }
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
                        this.click();
                        return false;
                    }
                },
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    if (event.result !== undefined && event.originalEvent) {
                        event.originalEvent.returnValue = event.result;
                    }
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: true,
                originalEvent: {}
            });
            if (bubble) {
                jQuery.event.trigger(e, null, elem);
            } else {
                jQuery.event.dispatch.call(elem, e);
            }
            if (e.isDefaultPrevented()) {
                event.preventDefault();
            }
        }
    };
    jQuery.removeEvent = function(elem, type, handle) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handle, false);
        }
    };
    jQuery.Event = function(src, props) {
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props);
        }
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse;
        } else {
            this.type = src;
        }
        if (props) {
            jQuery.extend(this, props);
        }
        this.timeStamp = src && src.timeStamp || jQuery.now();
        this[jQuery.expando] = true;
    };
    jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue;
            if (e && e.preventDefault) {
                e.preventDefault();
            }
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue;
            if (e && e.stopPropagation) {
                e.stopPropagation();
            }
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue;
            if (e && e.stopImmediatePropagation) {
                e.stopImmediatePropagation();
            }
            this.stopPropagation();
        }
    };
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret,
                    target = this,
                    related = event.relatedTarget,
                    handleObj = event.handleObj;
                if (!related || (related !== target && !jQuery.contains(target, related))) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix;
                }
                return ret;
            }
        };
    });
    if (!support.focusinBubbles) {
        jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function(orig, fix) {
            var handler = function(event) {
                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
            };
            jQuery.event.special[fix] = {
                setup: function() {
                    var doc = this.ownerDocument || this,
                        attaches = data_priv.access(doc, fix);
                    if (!attaches) {
                        doc.addEventListener(orig, handler, true);
                    }
                    data_priv.access(doc, fix, (attaches || 0) + 1);
                },
                teardown: function() {
                    var doc = this.ownerDocument || this,
                        attaches = data_priv.access(doc, fix) - 1;
                    if (!attaches) {
                        doc.removeEventListener(orig, handler, true);
                        data_priv.remove(doc, fix);
                    } else {
                        data_priv.access(doc, fix, attaches);
                    }
                }
            };
        });
    }
    jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var origFn,
                type;
            if (typeof types === "object") {
                if (typeof selector !== "string") {
                    data = data || selector;
                    selector = undefined;
                }
                for (type in types) {
                    this.on(type, selector, data, types[type], one);
                }
                return this;
            }
            if (data == null && fn == null) {
                fn = selector;
                data = selector = undefined;
            } else if (fn == null) {
                if (typeof selector === "string") {
                    fn = data;
                    data = undefined;
                } else {
                    fn = data;
                    data = selector;
                    selector = undefined;
                }
            }
            if (fn === false) {
                fn = returnFalse;
            } else if (!fn) {
                return this;
            }
            if (one === 1) {
                origFn = fn;
                fn = function(event) {
                    jQuery().off(event);
                    return origFn.apply(this, arguments);
                };
                fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
            }
            return this.each(function() {
                jQuery.event.add(this, types, fn, data, selector);
            });
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
            var handleObj,
                type;
            if (types && types.preventDefault && types.handleObj) {
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
                return this;
            }
            if (typeof types === "object") {
                for (type in types) {
                    this.off(type, selector, types[type]);
                }
                return this;
            }
            if (selector === false || typeof selector === "function") {
                fn = selector;
                selector = undefined;
            }
            if (fn === false) {
                fn = returnFalse;
            }
            return this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
            });
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            if (elem) {
                return jQuery.event.trigger(type, data, elem, true);
            }
        }
    });
    var
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        rtagName = /<([\w:]+)/,
        rhtml = /<|&#?\w+;/,
        rnoInnerhtml = /<(?:script|style|link)/i,
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptType = /^$|\/(?:java|ecma)script/i,
        rscriptTypeMasked = /^true\/(.*)/,
        rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        wrapMap = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
    }
    function disableScript(elem) {
        elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
        return elem;
    }
    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        if (match) {
            elem.type = match[1];
        } else {
            elem.removeAttribute("type");
        }
        return elem;
    }
    function setGlobalEval(elems, refElements) {
        var i = 0,
            l = elems.length;
        for (; i < l; i++) {
            data_priv.set(elems[i], "globalEval", !refElements || data_priv.get(refElements[i], "globalEval"));
        }
    }
    function cloneCopyEvent(src, dest) {
        var i,
            l,
            type,
            pdataOld,
            pdataCur,
            udataOld,
            udataCur,
            events;
        if (dest.nodeType !== 1) {
            return;
        }
        if (data_priv.hasData(src)) {
            pdataOld = data_priv.access(src);
            pdataCur = data_priv.set(dest, pdataOld);
            events = pdataOld.events;
            if (events) {
                delete pdataCur.handle;
                pdataCur.events = {};
                for (type in events) {
                    for (i = 0, l = events[type].length; i < l; i++) {
                        jQuery.event.add(dest, type, events[type][i]);
                    }
                }
            }
        }
        if (data_user.hasData(src)) {
            udataOld = data_user.access(src);
            udataCur = jQuery.extend({}, udataOld);
            data_user.set(dest, udataCur);
        }
    }
    function getAll(context, tag) {
        var ret = context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : context.querySelectorAll ? context.querySelectorAll(tag || "*") : [];
        return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret;
    }
    function fixInput(src, dest) {
        var nodeName = dest.nodeName.toLowerCase();
        if (nodeName === "input" && rcheckableType.test(src.type)) {
            dest.checked = src.checked;
        } else if (nodeName === "input" || nodeName === "textarea") {
            dest.defaultValue = src.defaultValue;
        }
    }
    jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var i,
                l,
                srcElements,
                destElements,
                clone = elem.cloneNode(true),
                inPage = jQuery.contains(elem.ownerDocument, elem);
            if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
                destElements = getAll(clone);
                srcElements = getAll(elem);
                for (i = 0, l = srcElements.length; i < l; i++) {
                    fixInput(srcElements[i], destElements[i]);
                }
            }
            if (dataAndEvents) {
                if (deepDataAndEvents) {
                    srcElements = srcElements || getAll(elem);
                    destElements = destElements || getAll(clone);
                    for (i = 0, l = srcElements.length; i < l; i++) {
                        cloneCopyEvent(srcElements[i], destElements[i]);
                    }
                } else {
                    cloneCopyEvent(elem, clone);
                }
            }
            destElements = getAll(clone, "script");
            if (destElements.length > 0) {
                setGlobalEval(destElements, !inPage && getAll(elem, "script"));
            }
            return clone;
        },
        buildFragment: function(elems, context, scripts, selection) {
            var elem,
                tmp,
                tag,
                wrap,
                contains,
                j,
                fragment = context.createDocumentFragment(),
                nodes = [],
                i = 0,
                l = elems.length;
            for (; i < l; i++) {
                elem = elems[i];
                if (elem || elem === 0) {
                    if (jQuery.type(elem) === "object") {
                        jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
                    } else if (!rhtml.test(elem)) {
                        nodes.push(context.createTextNode(elem));
                    } else {
                        tmp = tmp || fragment.appendChild(context.createElement("div"));
                        tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                        wrap = wrapMap[tag] || wrapMap._default;
                        tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
                        j = wrap[0];
                        while (j--) {
                            tmp = tmp.lastChild;
                        }
                        jQuery.merge(nodes, tmp.childNodes);
                        tmp = fragment.firstChild;
                        tmp.textContent = "";
                    }
                }
            }
            fragment.textContent = "";
            i = 0;
            while ((elem = nodes[i++])) {
                if (selection && jQuery.inArray(elem, selection) !== -1) {
                    continue;
                }
                contains = jQuery.contains(elem.ownerDocument, elem);
                tmp = getAll(fragment.appendChild(elem), "script");
                if (contains) {
                    setGlobalEval(tmp);
                }
                if (scripts) {
                    j = 0;
                    while ((elem = tmp[j++])) {
                        if (rscriptType.test(elem.type || "")) {
                            scripts.push(elem);
                        }
                    }
                }
            }
            return fragment;
        },
        cleanData: function(elems) {
            var data,
                elem,
                type,
                key,
                special = jQuery.event.special,
                i = 0;
            for (; (elem = elems[i]) !== undefined; i++) {
                if (jQuery.acceptData(elem)) {
                    key = elem[data_priv.expando];
                    if (key && (data = data_priv.cache[key])) {
                        if (data.events) {
                            for (type in data.events) {
                                if (special[type]) {
                                    jQuery.event.remove(elem, type);
                                } else {
                                    jQuery.removeEvent(elem, type, data.handle);
                                }
                            }
                        }
                        if (data_priv.cache[key]) {
                            delete data_priv.cache[key];
                        }
                    }
                }
                delete data_user.cache[elem[data_user.expando]];
            }
        }
    });
    jQuery.fn.extend({
        text: function(value) {
            return access(this, function(value) {
                return value === undefined ? jQuery.text(this) : this.empty().each(function() {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        this.textContent = value;
                    }
                });
            }, null, value, arguments.length);
        },
        append: function() {
            return this.domManip(arguments, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, function(elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this);
                }
            });
        },
        after: function() {
            return this.domManip(arguments, function(elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this.nextSibling);
                }
            });
        },
        remove: function(selector, keepData) {
            var elem,
                elems = selector ? jQuery.filter(selector, this) : this,
                i = 0;
            for (; (elem = elems[i]) != null; i++) {
                if (!keepData && elem.nodeType === 1) {
                    jQuery.cleanData(getAll(elem));
                }
                if (elem.parentNode) {
                    if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
                        setGlobalEval(getAll(elem, "script"));
                    }
                    elem.parentNode.removeChild(elem);
                }
            }
            return this;
        },
        empty: function() {
            var elem,
                i = 0;
            for (; (elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {
                    jQuery.cleanData(getAll(elem, false));
                    elem.textContent = "";
                }
            }
            return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
            return this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function(value) {
            return access(this, function(value) {
                var elem = this[0] || {},
                    i = 0,
                    l = this.length;
                if (value === undefined && elem.nodeType === 1) {
                    return elem.innerHTML;
                }
                if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (; i < l; i++) {
                            elem = this[i] || {};
                            if (elem.nodeType === 1) {
                                jQuery.cleanData(getAll(elem, false));
                                elem.innerHTML = value;
                            }
                        }
                        elem = 0;
                    } catch (e) {}
                }
                if (elem) {
                    this.empty().append(value);
                }
            }, null, value, arguments.length);
        },
        replaceWith: function() {
            var arg = arguments[0];
            this.domManip(arguments, function(elem) {
                arg = this.parentNode;
                jQuery.cleanData(getAll(this));
                if (arg) {
                    arg.replaceChild(elem, this);
                }
            });
            return arg && (arg.length || arg.nodeType) ? this : this.remove();
        },
        detach: function(selector) {
            return this.remove(selector, true);
        },
        domManip: function(args, callback) {
            args = concat.apply([], args);
            var fragment,
                first,
                scripts,
                hasScripts,
                node,
                doc,
                i = 0,
                l = this.length,
                set = this,
                iNoClone = l - 1,
                value = args[0],
                isFunction = jQuery.isFunction(value);
            if (isFunction || (l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value))) {
                return this.each(function(index) {
                    var self = set.eq(index);
                    if (isFunction) {
                        args[0] = value.call(this, index, self.html());
                    }
                    self.domManip(args, callback);
                });
            }
            if (l) {
                fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this);
                first = fragment.firstChild;
                if (fragment.childNodes.length === 1) {
                    fragment = first;
                }
                if (first) {
                    scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                    hasScripts = scripts.length;
                    for (; i < l; i++) {
                        node = fragment;
                        if (i !== iNoClone) {
                            node = jQuery.clone(node, true, true);
                            if (hasScripts) {
                                jQuery.merge(scripts, getAll(node, "script"));
                            }
                        }
                        callback.call(this[i], node, i);
                    }
                    if (hasScripts) {
                        doc = scripts[scripts.length - 1].ownerDocument;
                        jQuery.map(scripts, restoreScript);
                        for (i = 0; i < hasScripts; i++) {
                            node = scripts[i];
                            if (rscriptType.test(node.type || "") && !data_priv.access(node, "globalEval") && jQuery.contains(doc, node)) {
                                if (node.src) {
                                    if (jQuery._evalUrl) {
                                        jQuery._evalUrl(node.src);
                                    }
                                } else {
                                    jQuery.globalEval(node.textContent.replace(rcleanScript, ""));
                                }
                            }
                        }
                    }
                }
            }
            return this;
        }
    });
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            var elems,
                ret = [],
                insert = jQuery(selector),
                last = insert.length - 1,
                i = 0;
            for (; i <= last; i++) {
                elems = i === last ? this : this.clone(true);
                jQuery(insert[i])[original](elems);
                push.apply(ret, elems.get());
            }
            return this.pushStack(ret);
        };
    });
    var iframe,
        elemdisplay = {};
    function actualDisplay(name, doc) {
        var style,
            elem = jQuery(doc.createElement(name)).appendTo(doc.body),
            display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ? style.display : jQuery.css(elem[0], "display");
        elem.detach();
        return display;
    }
    function defaultDisplay(nodeName) {
        var doc = document,
            display = elemdisplay[nodeName];
        if (!display) {
            display = actualDisplay(nodeName, doc);
            if (display === "none" || !display) {
                iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);
                doc = iframe[0].contentDocument;
                doc.write();
                doc.close();
                display = actualDisplay(nodeName, doc);
                iframe.detach();
            }
            elemdisplay[nodeName] = display;
        }
        return display;
    }
    var rmargin = (/^margin/);
    var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
    var getStyles = function(elem) {
        return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
    };
    function curCSS(elem, name, computed) {
        var width,
            minWidth,
            maxWidth,
            ret,
            style = elem.style;
        computed = computed || getStyles(elem);
        if (computed) {
            ret = computed.getPropertyValue(name) || computed[name];
        }
        if (computed) {
            if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
                ret = jQuery.style(elem, name);
            }
            if (rnumnonpx.test(ret) && rmargin.test(name)) {
                width = style.width;
                minWidth = style.minWidth;
                maxWidth = style.maxWidth;
                style.minWidth = style.maxWidth = style.width = ret;
                ret = computed.width;
                style.width = width;
                style.minWidth = minWidth;
                style.maxWidth = maxWidth;
            }
        }
        return ret !== undefined ? ret + "" : ret;
    }
    function addGetHookIf(conditionFn, hookFn) {
        return {
            get: function() {
                if (conditionFn()) {
                    delete this.get;
                    return;
                }
                return (this.get = hookFn).apply(this, arguments);
            }
        };
    }
    (function() {
        var pixelPositionVal,
            boxSizingReliableVal,
            docElem = document.documentElement,
            container = document.createElement("div"),
            div = document.createElement("div");
        if (!div.style) {
            return;
        }
        div.style.backgroundClip = "content-box";
        div.cloneNode(true).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";
        container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" + "position:absolute";
        container.appendChild(div);
        function computePixelPositionAndBoxSizingReliable() {
            div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" + "box-sizing:border-box;display:block;margin-top:1%;top:1%;" + "border:1px;padding:1px;width:4px;position:absolute";
            div.innerHTML = "";
            docElem.appendChild(container);
            var divStyle = window.getComputedStyle(div, null);
            pixelPositionVal = divStyle.top !== "1%";
            boxSizingReliableVal = divStyle.width === "4px";
            docElem.removeChild(container);
        }
        if (window.getComputedStyle) {
            jQuery.extend(support, {
                pixelPosition: function() {
                    computePixelPositionAndBoxSizingReliable();
                    return pixelPositionVal;
                },
                boxSizingReliable: function() {
                    if (boxSizingReliableVal == null) {
                        computePixelPositionAndBoxSizingReliable();
                    }
                    return boxSizingReliableVal;
                },
                reliableMarginRight: function() {
                    var ret,
                        marginDiv = div.appendChild(document.createElement("div"));
                    marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" + "box-sizing:content-box;display:block;margin:0;border:0;padding:0";
                    marginDiv.style.marginRight = marginDiv.style.width = "0";
                    div.style.width = "1px";
                    docElem.appendChild(container);
                    ret = !parseFloat(window.getComputedStyle(marginDiv, null).marginRight);
                    docElem.removeChild(container);
                    return ret;
                }
            });
        }
    })();
    jQuery.swap = function(elem, options, callback, args) {
        var ret,
            name,
            old = {};
        for (name in options) {
            old[name] = elem.style[name];
            elem.style[name] = options[name];
        }
        ret = callback.apply(elem, args || []);
        for (name in options) {
            elem.style[name] = old[name];
        }
        return ret;
    };
    var
        rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
        rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"),
        cssShow = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        cssNormalTransform = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        cssPrefixes = ["Webkit", "O", "Moz", "ms"];
    function vendorPropName(style, name) {
        if (name in style) {
            return name;
        }
        var capName = name[0].toUpperCase() + name.slice(1),
            origName = name,
            i = cssPrefixes.length;
        while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in style) {
                return name;
            }
        }
        return origName;
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0,
            val = 0;
        for (; i < 4; i += 2) {
            if (extra === "margin") {
                val += jQuery.css(elem, extra + cssExpand[i], true, styles);
            }
            if (isBorderBox) {
                if (extra === "content") {
                    val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                }
                if (extra !== "margin") {
                    val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
            } else {
                val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                if (extra !== "padding") {
                    val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
            }
        }
        return val;
    }
    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = true,
            val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
            styles = getStyles(elem),
            isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
        if (val <= 0 || val == null) {
            val = curCSS(elem, name, styles);
            if (val < 0 || val == null) {
                val = elem.style[name];
            }
            if (rnumnonpx.test(val)) {
                return val;
            }
            valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
            val = parseFloat(val) || 0;
        }
        return (val +
        augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles)) + "px";
    }
    function showHide(elements, show) {
        var display,
            elem,
            hidden,
            values = [],
            index = 0,
            length = elements.length;
        for (; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }
            values[index] = data_priv.get(elem, "olddisplay");
            display = elem.style.display;
            if (show) {
                if (!values[index] && display === "none") {
                    elem.style.display = "";
                }
                if (elem.style.display === "" && isHidden(elem)) {
                    values[index] = data_priv.access(elem, "olddisplay", defaultDisplay(elem.nodeName));
                }
            } else {
                hidden = isHidden(elem);
                if (display !== "none" || !hidden) {
                    data_priv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
                }
            }
        }
        for (index = 0; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }
            if (!show || elem.style.display === "none" || elem.style.display === "") {
                elem.style.display = show ? values[index] || "" : "none";
            }
        }
        return elements;
    }
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return ret === "" ? "1" : ret;
                    }
                }
            }
        },
        cssNumber: {
            "columnCount": true,
            "fillOpacity": true,
            "flexGrow": true,
            "flexShrink": true,
            "fontWeight": true,
            "lineHeight": true,
            "opacity": true,
            "order": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(elem, name, value, extra) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return;
            }
            var ret,
                type,
                hooks,
                origName = jQuery.camelCase(name),
                style = elem.style;
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (value !== undefined) {
                type = typeof value;
                if (type === "string" && (ret = rrelNum.exec(value))) {
                    value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
                    type = "number";
                }
                if (value == null || value !== value) {
                    return;
                }
                if (type === "number" && !jQuery.cssNumber[origName]) {
                    value += "px";
                }
                if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                    style[name] = "inherit";
                }
                if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
                    style[name] = value;
                }
            } else {
                if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                    return ret;
                }
                return style[name];
            }
        },
        css: function(elem, name, extra, styles) {
            var val,
                num,
                hooks,
                origName = jQuery.camelCase(name);
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (hooks && "get" in hooks) {
                val = hooks.get(elem, true, extra);
            }
            if (val === undefined) {
                val = curCSS(elem, name, styles);
            }
            if (val === "normal" && name in cssNormalTransform) {
                val = cssNormalTransform[name];
            }
            if (extra === "" || extra) {
                num = parseFloat(val);
                return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
            }
            return val;
        }
    });
    jQuery.each(["height", "width"], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                if (computed) {
                    return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? jQuery.swap(elem, cssShow, function() {
                        return getWidthOrHeight(elem, name, extra);
                    }) : getWidthOrHeight(elem, name, extra);
                }
            },
            set: function(elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles) : 0);
            }
        };
    });
    jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
        if (computed) {
            return jQuery.swap(elem, {
                "display": "inline-block"
            }, curCSS, [elem, "marginRight"]);
        }
    });
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                var i = 0,
                    expanded = {},
                    parts = typeof value === "string" ? value.split(" ") : [value];
                for (; i < 4; i++) {
                    expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                }
                return expanded;
            }
        };
        if (!rmargin.test(prefix)) {
            jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
        }
    });
    jQuery.fn.extend({
        css: function(name, value) {
            return access(this, function(elem, name, value) {
                var styles,
                    len,
                    map = {},
                    i = 0;
                if (jQuery.isArray(name)) {
                    styles = getStyles(elem);
                    len = name.length;
                    for (; i < len; i++) {
                        map[name[i]] = jQuery.css(elem, name[i], false, styles);
                    }
                    return map;
                }
                return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show: function() {
            return showHide(this, true);
        },
        hide: function() {
            return showHide(this);
        },
        toggle: function(state) {
            if (typeof state === "boolean") {
                return state ? this.show() : this.hide();
            }
            return this.each(function() {
                if (isHidden(this)) {
                    jQuery(this).show();
                } else {
                    jQuery(this).hide();
                }
            });
        }
    });
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    jQuery.Tween = Tween;
    Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || "swing";
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
            var eased,
                hooks = Tween.propHooks[this.prop];
            if (this.options.duration) {
                this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
            } else {
                this.pos = eased = percent;
            }
            this.now = (this.end - this.start) * eased + this.start;
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
            }
            if (hooks && hooks.set) {
                hooks.set(this);
            } else {
                Tween.propHooks._default.set(this);
            }
            return this;
        }
    };
    Tween.prototype.init.prototype = Tween.prototype;
    Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
                    return tween.elem[tween.prop];
                }
                result = jQuery.css(tween.elem, tween.prop, "");
                return !result || result === "auto" ? 0 : result;
            },
            set: function(tween) {
                if (jQuery.fx.step[tween.prop]) {
                    jQuery.fx.step[tween.prop](tween);
                } else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
                    jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                } else {
                    tween.elem[tween.prop] = tween.now;
                }
            }
        }
    };
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
                tween.elem[tween.prop] = tween.now;
            }
        }
    };
    jQuery.easing = {
        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return 0.5 - Math.cos(p * Math.PI) / 2;
        }
    };
    jQuery.fx = Tween.prototype.init;
    jQuery.fx.step = {};
    var
        fxNow,
        timerId,
        rfxtypes = /^(?:toggle|show|hide)$/,
        rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
        rrun = /queueHooks$/,
        animationPrefilters = [defaultPrefilter],
        tweeners = {
            "*": [function(prop, value) {
                var tween = this.createTween(prop, value),
                    target = tween.cur(),
                    parts = rfxnum.exec(value),
                    unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
                    start = (jQuery.cssNumber[prop] || unit !== "px" && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)),
                    scale = 1,
                    maxIterations = 20;
                if (start && start[3] !== unit) {
                    unit = unit || start[3];
                    parts = parts || [];
                    start = +target || 1;
                    do {
                        scale = scale || ".5";
                        start = start / scale;
                        jQuery.style(tween.elem, prop, start + unit);
                    } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
                }
                if (parts) {
                    start = tween.start = +start || +target || 0;
                    tween.unit = unit;
                    tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2];
                }
                return tween;
            }]
        };
    function createFxNow() {
        setTimeout(function() {
            fxNow = undefined;
        });
        return ( fxNow = jQuery.now()) ;
    }
    function genFx(type, includeWidth) {
        var which,
            i = 0,
            attrs = {
                height: type
            };
        includeWidth = includeWidth ? 1 : 0;
        for (; i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs["margin" + which] = attrs["padding" + which] = type;
        }
        if (includeWidth) {
            attrs.opacity = attrs.width = type;
        }
        return attrs;
    }
    function createTween(value, prop, animation) {
        var tween,
            collection = (tweeners[prop] || []).concat(tweeners["*"]),
            index = 0,
            length = collection.length;
        for (; index < length; index++) {
            if ((tween = collection[index].call(animation, prop, value))) {
                return tween;
            }
        }
    }
    function defaultPrefilter(elem, props, opts) {
        var prop,
            value,
            toggle,
            tween,
            hooks,
            oldfire,
            display,
            checkDisplay,
            anim = this,
            orig = {},
            style = elem.style,
            hidden = elem.nodeType && isHidden(elem),
            dataShow = data_priv.get(elem, "fxshow");
        if (!opts.queue) {
            hooks = jQuery._queueHooks(elem, "fx");
            if (hooks.unqueued == null) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function() {
                    if (!hooks.unqueued) {
                        oldfire();
                    }
                };
            }
            hooks.unqueued++;
            anim.always(function() {
                anim.always(function() {
                    hooks.unqueued--;
                    if (!jQuery.queue(elem, "fx").length) {
                        hooks.empty.fire();
                    }
                });
            });
        }
        if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
            opts.overflow = [style.overflow, style.overflowX, style.overflowY];
            display = jQuery.css(elem, "display");
            checkDisplay = display === "none" ? data_priv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;
            if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
                style.display = "inline-block";
            }
        }
        if (opts.overflow) {
            style.overflow = "hidden";
            anim.always(function() {
                style.overflow = opts.overflow[0];
                style.overflowX = opts.overflow[1];
                style.overflowY = opts.overflow[2];
            });
        }
        for (prop in props) {
            value = props[prop];
            if (rfxtypes.exec(value)) {
                delete props[prop];
                toggle = toggle || value === "toggle";
                if (value === (hidden ? "hide" : "show")) {
                    if (value === "show" && dataShow && dataShow[prop] !== undefined) {
                        hidden = true;
                    } else {
                        continue;
                    }
                }
                orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
            } else {
                display = undefined;
            }
        }
        if (!jQuery.isEmptyObject(orig)) {
            if (dataShow) {
                if ("hidden" in dataShow) {
                    hidden = dataShow.hidden;
                }
            } else {
                dataShow = data_priv.access(elem, "fxshow", {});
            }
            if (toggle) {
                dataShow.hidden = !hidden;
            }
            if (hidden) {
                jQuery(elem).show();
            } else {
                anim.done(function() {
                    jQuery(elem).hide();
                });
            }
            anim.done(function() {
                var prop;
                data_priv.remove(elem, "fxshow");
                for (prop in orig) {
                    jQuery.style(elem, prop, orig[prop]);
                }
            });
            for (prop in orig) {
                tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
                if (!(prop in dataShow)) {
                    dataShow[prop] = tween.start;
                    if (hidden) {
                        tween.end = tween.start;
                        tween.start = prop === "width" || prop === "height" ? 1 : 0;
                    }
                }
            }
        } else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
            style.display = display;
        }
    }
    function propFilter(props, specialEasing) {
        var index,
            name,
            easing,
            value,
            hooks;
        for (index in props) {
            name = jQuery.camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (jQuery.isArray(value)) {
                easing = value[1];
                value = props[index] = value[0];
            }
            if (index !== name) {
                props[name] = value;
                delete props[index];
            }
            hooks = jQuery.cssHooks[name];
            if (hooks && "expand" in hooks) {
                value = hooks.expand(value);
                delete props[name];
                for (index in value) {
                    if (!(index in props)) {
                        props[index] = value[index];
                        specialEasing[index] = easing;
                    }
                }
            } else {
                specialEasing[name] = easing;
            }
        }
    }
    function Animation(elem, properties, options) {
        var result,
            stopped,
            index = 0,
            length = animationPrefilters.length,
            deferred = jQuery.Deferred().always(function() {
                delete tick.elem;
            }),
            tick = function() {
                if (stopped) {
                    return false;
                }
                var currentTime = fxNow || createFxNow(),
                    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
                    temp = remaining / animation.duration || 0,
                    percent = 1 - temp,
                    index = 0,
                    length = animation.tweens.length;
                for (; index < length; index++) {
                    animation.tweens[index].run(percent);
                }
                deferred.notifyWith(elem, [animation, percent, remaining]);
                if (percent < 1 && length) {
                    return remaining;
                } else {
                    deferred.resolveWith(elem, [animation]);
                    return false;
                }
            },
            animation = deferred.promise({
                elem: elem,
                props: jQuery.extend({}, properties),
                opts: jQuery.extend(true, {
                    specialEasing: {}
                }, options),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function(prop, end) {
                    var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                    animation.tweens.push(tween);
                    return tween;
                },
                stop: function(gotoEnd) {
                    var index = 0,
                        length = gotoEnd ? animation.tweens.length : 0;
                    if (stopped) {
                        return this;
                    }
                    stopped = true;
                    for (; index < length; index++) {
                        animation.tweens[index].run(1);
                    }
                    if (gotoEnd) {
                        deferred.resolveWith(elem, [animation, gotoEnd]);
                    } else {
                        deferred.rejectWith(elem, [animation, gotoEnd]);
                    }
                    return this;
                }
            }),
            props = animation.props;
        propFilter(props, animation.opts.specialEasing);
        for (; index < length; index++) {
            result = animationPrefilters[index].call(animation, elem, props, animation.opts);
            if (result) {
                return result;
            }
        }
        jQuery.map(props, createTween, animation);
        if (jQuery.isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation);
        }
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        }));
        return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    }
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            if (jQuery.isFunction(props)) {
                callback = props;
                props = ["*"];
            } else {
                props = props.split(" ");
            }
            var prop,
                index = 0,
                length = props.length;
            for (; index < length; index++) {
                prop = props[index];
                tweeners[prop] = tweeners[prop] || [];
                tweeners[prop].unshift(callback);
            }
        },
        prefilter: function(callback, prepend) {
            if (prepend) {
                animationPrefilters.unshift(callback);
            } else {
                animationPrefilters.push(callback);
            }
        }
    });
    jQuery.speed = function(speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
        if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx";
        }
        opt.old = opt.complete;
        opt.complete = function() {
            if (jQuery.isFunction(opt.old)) {
                opt.old.call(this);
            }
            if (opt.queue) {
                jQuery.dequeue(this, opt.queue);
            }
        };
        return opt;
    };
    jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop),
                optall = jQuery.speed(speed, easing, callback),
                doAnimation = function() {
                    var anim = Animation(this, jQuery.extend({}, prop), optall);
                    if (empty || data_priv.get(this, "finish")) {
                        anim.stop(true);
                    }
                };
            doAnimation.finish = doAnimation;
            return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop(gotoEnd);
            };
            if (typeof type !== "string") {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if (clearQueue && type !== false) {
                this.queue(type || "fx", []);
            }
            return this.each(function() {
                var dequeue = true,
                    index = type != null && type + "queueHooks",
                    timers = jQuery.timers,
                    data = data_priv.get(this);
                if (index) {
                    if (data[index] && data[index].stop) {
                        stopQueue(data[index]);
                    }
                } else {
                    for (index in data) {
                        if (data[index] && data[index].stop && rrun.test(index)) {
                            stopQueue(data[index]);
                        }
                    }
                }
                for (index = timers.length; index--;) {
                    if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                        timers[index].anim.stop(gotoEnd);
                        dequeue = false;
                        timers.splice(index, 1);
                    }
                }
                if (dequeue || !gotoEnd) {
                    jQuery.dequeue(this, type);
                }
            });
        },
        finish: function(type) {
            if (type !== false) {
                type = type || "fx";
            }
            return this.each(function() {
                var index,
                    data = data_priv.get(this),
                    queue = data[type + "queue"],
                    hooks = data[type + "queueHooks"],
                    timers = jQuery.timers,
                    length = queue ? queue.length : 0;
                data.finish = true;
                jQuery.queue(this, type, []);
                if (hooks && hooks.stop) {
                    hooks.stop.call(this, true);
                }
                for (index = timers.length; index--;) {
                    if (timers[index].elem === this && timers[index].queue === type) {
                        timers[index].anim.stop(true);
                        timers.splice(index, 1);
                    }
                }
                for (index = 0; index < length; index++) {
                    if (queue[index] && queue[index].finish) {
                        queue[index].finish.call(this);
                    }
                }
                delete data.finish;
            });
        }
    });
    jQuery.each(["toggle", "show", "hide"], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
        };
    });
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    });
    jQuery.timers = [];
    jQuery.fx.tick = function() {
        var timer,
            i = 0,
            timers = jQuery.timers;
        fxNow = jQuery.now();
        for (; i < timers.length; i++) {
            timer = timers[i];
            if (!timer() && timers[i] === timer) {
                timers.splice(i--, 1);
            }
        }
        if (!timers.length) {
            jQuery.fx.stop();
        }
        fxNow = undefined;
    };
    jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer);
        if (timer()) {
            jQuery.fx.start();
        } else {
            jQuery.timers.pop();
        }
    };
    jQuery.fx.interval = 13;
    jQuery.fx.start = function() {
        if (!timerId) {
            timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
        }
    };
    jQuery.fx.stop = function() {
        clearInterval(timerId);
        timerId = null;
    };
    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    jQuery.fn.delay = function(time, type) {
        time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
        type = type || "fx";
        return this.queue(type, function(next, hooks) {
            var timeout = setTimeout(next, time);
            hooks.stop = function() {
                clearTimeout(timeout);
            };
        });
    };
    (function() {
        var input = document.createElement("input"),
            select = document.createElement("select"),
            opt = select.appendChild(document.createElement("option"));
        input.type = "checkbox";
        support.checkOn = input.value !== "";
        support.optSelected = opt.selected;
        select.disabled = true;
        support.optDisabled = !opt.disabled;
        input = document.createElement("input");
        input.value = "t";
        input.type = "radio";
        support.radioValue = input.value === "t";
    })();
    var nodeHook,
        boolHook,
        attrHandle = jQuery.expr.attrHandle;
    jQuery.fn.extend({
        attr: function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name);
            });
        }
    });
    jQuery.extend({
        attr: function(elem, name, value) {
            var hooks,
                ret,
                nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return;
            }
            if (typeof elem.getAttribute === strundefined) {
                return jQuery.prop(elem, name, value);
            }
            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                name = name.toLowerCase();
                hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
            }
            if (value !== undefined) {
                if (value === null) {
                    jQuery.removeAttr(elem, name);
                } else if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;
                } else {
                    elem.setAttribute(name, value + "");
                    return value;
                }
            } else if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret;
            } else {
                ret = jQuery.find.attr(elem, name);
                return ret == null ? undefined : ret;
            }
        },
        removeAttr: function(elem, value) {
            var name,
                propName,
                i = 0,
                attrNames = value && value.match(rnotwhite);
            if (attrNames && elem.nodeType === 1) {
                while ((name = attrNames[i++])) {
                    propName = jQuery.propFix[name] || name;
                    if (jQuery.expr.match.bool.test(name)) {
                        elem[propName] = false;
                    }
                    elem.removeAttribute(name);
                }
            }
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        elem.setAttribute("type", value);
                        if (val) {
                            elem.value = val;
                        }
                        return value;
                    }
                }
            }
        }
    });
    boolHook = {
        set: function(elem, value, name) {
            if (value === false) {
                jQuery.removeAttr(elem, name);
            } else {
                elem.setAttribute(name, name);
            }
            return name;
        }
    };
    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        attrHandle[name] = function(elem, name, isXML) {
            var ret,
                handle;
            if (!isXML) {
                handle = attrHandle[name];
                attrHandle[name] = ret;
                ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
                attrHandle[name] = handle;
            }
            return ret;
        };
    });
    var rfocusable = /^(?:input|select|textarea|button)$/i;
    jQuery.fn.extend({
        prop: function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
            return this.each(function() {
                delete this[jQuery.propFix[name] || name];
            });
        }
    });
    jQuery.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(elem, name, value) {
            var ret,
                hooks,
                notxml,
                nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return;
            }
            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
            if (notxml) {
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name];
            }
            if (value !== undefined) {
                return hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : (elem[name] = value);
            } else {
                return hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null ? ret : elem[name];
            }
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    return elem.hasAttribute("tabindex") || rfocusable.test(elem.nodeName) || elem.href ? elem.tabIndex : -1;
                }
            }
        }
    });
    if (!support.optSelected) {
        jQuery.propHooks.selected = {
            get: function(elem) {
                var parent = elem.parentNode;
                if (parent && parent.parentNode) {
                    parent.parentNode.selectedIndex;
                }
                return null;
            }
        };
    }
    jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        jQuery.propFix[this.toLowerCase()] = this;
    });
    var rclass = /[\t\r\n\f]/g;
    jQuery.fn.extend({
        addClass: function(value) {
            var classes,
                elem,
                cur,
                clazz,
                j,
                finalValue,
                proceed = typeof value === "string" && value,
                i = 0,
                len = this.length;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).addClass(value.call(this, j, this.className));
                });
            }
            if (proceed) {
                classes = (value || "").match(rnotwhite) || [];
                for (; i < len; i++) {
                    elem = this[i];
                    cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ");
                    if (cur) {
                        j = 0;
                        while ((clazz = classes[j++])) {
                            if (cur.indexOf(" " + clazz + " ") < 0) {
                                cur += clazz + " ";
                            }
                        }
                        finalValue = jQuery.trim(cur);
                        if (elem.className !== finalValue) {
                            elem.className = finalValue;
                        }
                    }
                }
            }
            return this;
        },
        removeClass: function(value) {
            var classes,
                elem,
                cur,
                clazz,
                j,
                finalValue,
                proceed = arguments.length === 0 || typeof value === "string" && value,
                i = 0,
                len = this.length;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).removeClass(value.call(this, j, this.className));
                });
            }
            if (proceed) {
                classes = (value || "").match(rnotwhite) || [];
                for (; i < len; i++) {
                    elem = this[i];
                    cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "");
                    if (cur) {
                        j = 0;
                        while ((clazz = classes[j++])) {
                            while (cur.indexOf(" " + clazz + " ") >= 0) {
                                cur = cur.replace(" " + clazz + " ", " ");
                            }
                        }
                        finalValue = value ? jQuery.trim(cur) : "";
                        if (elem.className !== finalValue) {
                            elem.className = finalValue;
                        }
                    }
                }
            }
            return this;
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value;
            if (typeof stateVal === "boolean" && type === "string") {
                return stateVal ? this.addClass(value) : this.removeClass(value);
            }
            if (jQuery.isFunction(value)) {
                return this.each(function(i) {
                    jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
                });
            }
            return this.each(function() {
                if (type === "string") {
                    var className,
                        i = 0,
                        self = jQuery(this),
                        classNames = value.match(rnotwhite) || [];
                    while ((className = classNames[i++])) {
                        if (self.hasClass(className)) {
                            self.removeClass(className);
                        } else {
                            self.addClass(className);
                        }
                    }
                } else if (type === strundefined || type === "boolean") {
                    if (this.className) {
                        data_priv.set(this, "__className__", this.className);
                    }
                    this.className = this.className || value === false ? "" : data_priv.get(this, "__className__") || "";
                }
            });
        },
        hasClass: function(selector) {
            var className = " " + selector + " ",
                i = 0,
                l = this.length;
            for (; i < l; i++) {
                if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
                    return true;
                }
            }
            return false;
        }
    });
    var rreturn = /\r/g;
    jQuery.fn.extend({
        val: function(value) {
            var hooks,
                ret,
                isFunction,
                elem = this[0];
            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
                    if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                        return ret;
                    }
                    ret = elem.value;
                    return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
                }
                return;
            }
            isFunction = jQuery.isFunction(value);
            return this.each(function(i) {
                var val;
                if (this.nodeType !== 1) {
                    return;
                }
                if (isFunction) {
                    val = value.call(this, i, jQuery(this).val());
                } else {
                    val = value;
                }
                if (val == null) {
                    val = "";
                } else if (typeof val === "number") {
                    val += "";
                } else if (jQuery.isArray(val)) {
                    val = jQuery.map(val, function(value) {
                        return value == null ? "" : value + "";
                    });
                }
                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                    this.value = val;
                }
            });
        }
    });
    jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return val != null ? val : jQuery.trim(jQuery.text(elem));
                }
            },
            select: {
                get: function(elem) {
                    var value,
                        option,
                        options = elem.options,
                        index = elem.selectedIndex,
                        one = elem.type === "select-one" || index < 0,
                        values = one ? null : [],
                        max = one ? index + 1 : options.length,
                        i = index < 0 ? max : one ? index : 0;
                    for (; i < max; i++) {
                        option = options[i];
                        if ((option.selected || i === index) && (support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                            value = jQuery(option).val();
                            if (one) {
                                return value;
                            }
                            values.push(value);
                        }
                    }
                    return values;
                },
                set: function(elem, value) {
                    var optionSet,
                        option,
                        options = elem.options,
                        values = jQuery.makeArray(value),
                        i = options.length;
                    while (i--) {
                        option = options[i];
                        if ((option.selected = jQuery.inArray(option.value, values) >= 0)) {
                            optionSet = true;
                        }
                    }
                    if (!optionSet) {
                        elem.selectedIndex = -1;
                    }
                    return values;
                }
            }
        }
    });
    jQuery.each(["radio", "checkbox"], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                if (jQuery.isArray(value)) {
                    return ( elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0) ;
                }
            }
        };
        if (!support.checkOn) {
            jQuery.valHooks[this].get = function(elem) {
                return elem.getAttribute("value") === null ? "on" : elem.value;
            };
        }
    });
    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
    });
    jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn);
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
            return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        }
    });
    var nonce = jQuery.now();
    var rquery = (/\?/);
    jQuery.parseJSON = function(data) {
        return JSON.parse(data + "");
    };
    jQuery.parseXML = function(data) {
        var xml,
            tmp;
        if (!data || typeof data !== "string") {
            return null;
        }
        try {
            tmp = new DOMParser();
            xml = tmp.parseFromString(data, "text/xml");
        } catch (e) {
            xml = undefined;
        }
        if (!xml || xml.getElementsByTagName("parsererror").length) {
            jQuery.error("Invalid XML: " + data);
        }
        return xml;
    };
    var
        ajaxLocParts,
        ajaxLocation,
        rhash = /#.*$/,
        rts = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        prefilters = {},
        transports = {},
        allTypes = "*/".concat("*");
    try {
        ajaxLocation = location.href;
    } catch (e) {
        ajaxLocation = document.createElement("a");
        ajaxLocation.href = "";
        ajaxLocation = ajaxLocation.href;
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }
            var dataType,
                i = 0,
                dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
            if (jQuery.isFunction(func)) {
                while ((dataType = dataTypes[i++])) {
                    if (dataType[0] === "+") {
                        dataType = dataType.slice(1) || "*";
                        (structure[dataType] = structure[dataType] || []).unshift(func);
                    } else {
                        (structure[dataType] = structure[dataType] || []).push(func);
                    }
                }
            }
        };
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        var inspected = {},
            seekingTransport = (structure === transports);
        function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
                    options.dataTypes.unshift(dataTypeOrTransport);
                    inspect(dataTypeOrTransport);
                    return false;
                } else if (seekingTransport) {
                    return !(selected = dataTypeOrTransport);
                }
            });
            return selected;
        }
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }
    function ajaxExtend(target, src) {
        var key,
            deep,
            flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) {
            if (src[key] !== undefined) {
                (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep);
        }
        return target;
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
        var ct,
            type,
            finalDataType,
            firstDataType,
            contents = s.contents,
            dataTypes = s.dataTypes;
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
            }
        }
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break;
                }
            }
        }
        if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0];
        } else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) {
                    firstDataType = type;
                }
            }
            finalDataType = finalDataType || firstDataType;
        }
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
        }
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2,
            current,
            conv,
            tmp,
            prev,
            converters = {},
            dataTypes = s.dataTypes.slice();
        if (dataTypes[1]) {
            for (conv in s.converters) {
                converters[conv.toLowerCase()] = s.converters[conv];
            }
        }
        current = dataTypes.shift();
        while (current) {
            if (s.responseFields[current]) {
                jqXHR[s.responseFields[current]] = response;
            }
            if (!prev && isSuccess && s.dataFilter) {
                response = s.dataFilter(response, s.dataType);
            }
            prev = current;
            current = dataTypes.shift();
            if (current) {
                if (current === "*") {
                    current = prev;
                } else if (prev !== "*" && prev !== current) {
                    conv = converters[prev + " " + current] || converters["* " + current];
                    if (!conv) {
                        for (conv2 in converters) {
                            tmp = conv2.split(" ");
                            if (tmp[1] === current) {
                                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                                if (conv) {
                                    if (conv === true) {
                                        conv = converters[conv2];
                                    } else if (converters[conv2] !== true) {
                                        current = tmp[0];
                                        dataTypes.unshift(tmp[1]);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    if (conv !== true) {
                        if (conv && s["throws"]) {
                            response = conv(response);
                        } else {
                            try {
                                response = conv(response);
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e : "No conversion from " + prev + " to " + current
                                };
                            }
                        }
                    }
                }
            }
        }
        return {
            state: "success",
            data: response
        };
    }
    jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": true,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: true,
                context: true
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            if (typeof url === "object") {
                options = url;
                url = undefined;
            }
            options = options || {};
            var transport,
                cacheURL,
                responseHeadersString,
                responseHeaders,
                timeoutTimer,
                parts,
                fireGlobals,
                i,
                s = jQuery.ajaxSetup({}, options),
                callbackContext = s.context || s,
                globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks("once memory"),
                statusCode = s.statusCode || {},
                requestHeaders = {},
                requestHeadersNames = {},
                state = 0,
                strAbort = "canceled",
                jqXHR = {
                    readyState: 0,
                    getResponseHeader: function(key) {
                        var match;
                        if (state === 2) {
                            if (!responseHeaders) {
                                responseHeaders = {};
                                while ((match = rheaders.exec(responseHeadersString))) {
                                    responseHeaders[match[1].toLowerCase()] = match[2];
                                }
                            }
                            match = responseHeaders[key.toLowerCase()];
                        }
                        return match == null ? null : match;
                    },
                    getAllResponseHeaders: function() {
                        return state === 2 ? responseHeadersString : null;
                    },
                    setRequestHeader: function(name, value) {
                        var lname = name.toLowerCase();
                        if (!state) {
                            name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                            requestHeaders[name] = value;
                        }
                        return this;
                    },
                    overrideMimeType: function(type) {
                        if (!state) {
                            s.mimeType = type;
                        }
                        return this;
                    },
                    statusCode: function(map) {
                        var code;
                        if (map) {
                            if (state < 2) {
                                for (code in map) {
                                    statusCode[code] = [statusCode[code], map[code]];
                                }
                            } else {
                                jqXHR.always(map[jqXHR.status]);
                            }
                        }
                        return this;
                    },
                    abort: function(statusText) {
                        var finalText = statusText || strAbort;
                        if (transport) {
                            transport.abort(finalText);
                        }
                        done(0, finalText);
                        return this;
                    }
                };
            deferred.promise(jqXHR).complete = completeDeferred.add;
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;
            s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
            s.type = options.method || options.type || s.method || s.type;
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];
            if (s.crossDomain == null) {
                parts = rurl.exec(s.url.toLowerCase());
                s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? "80" : "443")) !== (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443"))));
            }
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional);
            }
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
            if (state === 2) {
                return jqXHR;
            }
            fireGlobals = s.global;
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart");
            }
            s.type = s.type.toUpperCase();
            s.hasContent = !rnoContent.test(s.type);
            cacheURL = s.url;
            if (!s.hasContent) {
                if (s.data) {
                    cacheURL = (s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data);
                    delete s.data;
                }
                if (s.cache === false) {
                    s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
                }
            }
            if (s.ifModified) {
                if (jQuery.lastModified[cacheURL]) {
                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
                }
                if (jQuery.etag[cacheURL]) {
                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
                }
            }
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader("Content-Type", s.contentType);
            }
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i]);
            }
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
                return jqXHR.abort();
            }
            strAbort = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) {
                jqXHR[i](s[i]);
            }
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
            if (!transport) {
                done(-1, "No Transport");
            } else {
                jqXHR.readyState = 1;
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [jqXHR, s]);
                }
                if (s.async && s.timeout > 0) {
                    timeoutTimer = setTimeout(function() {
                        jqXHR.abort("timeout");
                    }, s.timeout);
                }
                try {
                    state = 1;
                    transport.send(requestHeaders, done);
                } catch (e) {
                    if (state < 2) {
                        done(-1, e);
                    } else {
                        throw e;
                    }
                }
            }
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess,
                    success,
                    error,
                    response,
                    modified,
                    statusText = nativeStatusText;
                if (state === 2) {
                    return;
                }
                state = 2;
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer);
                }
                transport = undefined;
                responseHeadersString = headers || "";
                jqXHR.readyState = status > 0 ? 4 : 0;
                isSuccess = status >= 200 && status < 300 || status === 304;
                if (responses) {
                    response = ajaxHandleResponses(s, jqXHR, responses);
                }
                response = ajaxConvert(s, response, jqXHR, isSuccess);
                if (isSuccess) {
                    if (s.ifModified) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if (modified) {
                            jQuery.lastModified[cacheURL] = modified;
                        }
                        modified = jqXHR.getResponseHeader("etag");
                        if (modified) {
                            jQuery.etag[cacheURL] = modified;
                        }
                    }
                    if (status === 204 || s.type === "HEAD") {
                        statusText = "nocontent";
                    } else if (status === 304) {
                        statusText = "notmodified";
                    } else {
                        statusText = response.state;
                        success = response.data;
                        error = response.error;
                        isSuccess = !error;
                    }
                } else {
                    error = statusText;
                    if (status || !statusText) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0;
                        }
                    }
                }
                jqXHR.status = status;
                jqXHR.statusText = (nativeStatusText || statusText) + "";
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
                } else {
                    deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
                }
                jqXHR.statusCode(statusCode);
                statusCode = undefined;
                if (fireGlobals) {
                    globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
                }
                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                    if (!(--jQuery.active)) {
                        jQuery.event.trigger("ajaxStop");
                    }
                }
            }
            return jqXHR;
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        getScript: function(url, callback) {
            return jQuery.get(url, undefined, callback, "script");
        }
    });
    jQuery.each(["get", "post"], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }
            return jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    });
    jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn);
        };
    });
    jQuery._evalUrl = function(url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            async: false,
            global: false,
            "throws": true
        });
    };
    jQuery.fn.extend({
        wrapAll: function(html) {
            var wrap;
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapAll(html.call(this, i));
                });
            }
            if (this[0]) {
                wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    wrap.insertBefore(this[0]);
                }
                wrap.map(function() {
                    var elem = this;
                    while (elem.firstElementChild) {
                        elem = elem.firstElementChild;
                    }
                    return elem;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapInner(html.call(this, i));
                });
            }
            return this.each(function() {
                var self = jQuery(this),
                    contents = self.contents();
                if (contents.length) {
                    contents.wrapAll(html);
                } else {
                    self.append(html);
                }
            });
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                if (!jQuery.nodeName(this, "body")) {
                    jQuery(this).replaceWith(this.childNodes);
                }
            }).end();
        }
    });
    jQuery.expr.filters.hidden = function(elem) {
        return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
    };
    jQuery.expr.filters.visible = function(elem) {
        return !jQuery.expr.filters.hidden(elem);
    };
    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) {
            jQuery.each(obj, function(i, v) {
                if (traditional || rbracket.test(prefix)) {
                    add(prefix, v);
                } else {
                    buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
                }
            });
        } else if (!traditional && jQuery.type(obj) === "object") {
            for (name in obj) {
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }
        } else {
            add(prefix, obj);
        }
    }
    jQuery.param = function(a, traditional) {
        var prefix,
            s = [],
            add = function(key, value) {
                value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
                s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
            };
        if (traditional === undefined) {
            traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
        }
        if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
            jQuery.each(a, function() {
                add(this.name, this.value);
            });
        } else {
            for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add);
            }
        }
        return s.join("&").replace(r20, "+");
    };
    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            }).filter(function() {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                };
            }).get();
        }
    });
    jQuery.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest();
        } catch (e) {}
    };
    var xhrId = 0,
        xhrCallbacks = {},
        xhrSuccessStatus = {
            0: 200,
            1223: 204
        },
        xhrSupported = jQuery.ajaxSettings.xhr();
    if (window.ActiveXObject) {
        jQuery(window).on("unload", function() {
            for (var key in xhrCallbacks) {
                xhrCallbacks[key]();
            }
        });
    }
    support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
    support.ajax = xhrSupported = !!xhrSupported;
    jQuery.ajaxTransport(function(options) {
        var callback;
        if (support.cors || xhrSupported && !options.crossDomain) {
            return {
                send: function(headers, complete) {
                    var i,
                        xhr = options.xhr(),
                        id = ++xhrId;
                    xhr.open(options.type, options.url, options.async, options.username, options.password);
                    if (options.xhrFields) {
                        for (i in options.xhrFields) {
                            xhr[i] = options.xhrFields[i];
                        }
                    }
                    if (options.mimeType && xhr.overrideMimeType) {
                        xhr.overrideMimeType(options.mimeType);
                    }
                    if (!options.crossDomain && !headers["X-Requested-With"]) {
                        headers["X-Requested-With"] = "XMLHttpRequest";
                    }
                    for (i in headers) {
                        xhr.setRequestHeader(i, headers[i]);
                    }
                    callback = function(type) {
                        return function() {
                            if (callback) {
                                delete xhrCallbacks[id];
                                callback = xhr.onload = xhr.onerror = null;
                                if (type === "abort") {
                                    xhr.abort();
                                } else if (type === "error") {
                                    complete(xhr.status, xhr.statusText);
                                } else {
                                    complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, typeof xhr.responseText === "string" ? {
                                        text: xhr.responseText
                                    } : undefined, xhr.getAllResponseHeaders());
                                }
                            }
                        };
                    };
                    xhr.onload = callback();
                    xhr.onerror = callback("error");
                    callback = xhrCallbacks[id] = callback("abort");
                    try {
                        xhr.send(options.hasContent && options.data || null);
                    } catch (e) {
                        if (callback) {
                            throw e;
                        }
                    }
                },
                abort: function() {
                    if (callback) {
                        callback();
                    }
                }
            };
        }
    });
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(text) {
                jQuery.globalEval(text);
                return text;
            }
        }
    });
    jQuery.ajaxPrefilter("script", function(s) {
        if (s.cache === undefined) {
            s.cache = false;
        }
        if (s.crossDomain) {
            s.type = "GET";
        }
    });
    jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script,
                callback;
            return {
                send: function(_, complete) {
                    script = jQuery("<script>").prop({
                        async: true,
                        charset: s.scriptCharset,
                        src: s.url
                    }).on("load error", callback = function(evt) {
                        script.remove();
                        callback = null;
                        if (evt) {
                            complete(evt.type === "error" ? 404 : 200, evt.type);
                        }
                    });
                    document.head.appendChild(script[0]);
                },
                abort: function() {
                    if (callback) {
                        callback();
                    }
                }
            };
        }
    });
    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
            this[callback] = true;
            return callback;
        }
    });
    jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName,
            overwritten,
            responseContainer,
            jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        if (jsonProp || s.dataTypes[0] === "jsonp") {
            callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
            if (jsonProp) {
                s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
            } else if (s.jsonp !== false) {
                s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
            }
            s.converters["script json"] = function() {
                if (!responseContainer) {
                    jQuery.error(callbackName + " was not called");
                }
                return responseContainer[0];
            };
            s.dataTypes[0] = "json";
            overwritten = window[callbackName];
            window[callbackName] = function() {
                responseContainer = arguments;
            };
            jqXHR.always(function() {
                window[callbackName] = overwritten;
                if (s[callbackName]) {
                    s.jsonpCallback = originalSettings.jsonpCallback;
                    oldCallbacks.push(callbackName);
                }
                if (responseContainer && jQuery.isFunction(overwritten)) {
                    overwritten(responseContainer[0]);
                }
                responseContainer = overwritten = undefined;
            });
            return "script";
        }
    });
    jQuery.parseHTML = function(data, context, keepScripts) {
        if (!data || typeof data !== "string") {
            return null;
        }
        if (typeof context === "boolean") {
            keepScripts = context;
            context = false;
        }
        context = context || document;
        var parsed = rsingleTag.exec(data),
            scripts = !keepScripts && [];
        if (parsed) {
            return [context.createElement(parsed[1])];
        }
        parsed = jQuery.buildFragment([data], context, scripts);
        if (scripts && scripts.length) {
            jQuery(scripts).remove();
        }
        return jQuery.merge([], parsed.childNodes);
    };
    var _load = jQuery.fn.load;
    jQuery.fn.load = function(url, params, callback) {
        if (typeof url !== "string" && _load) {
            return _load.apply(this, arguments);
        }
        var selector,
            type,
            response,
            self = this,
            off = url.indexOf(" ");
        if (off >= 0) {
            selector = jQuery.trim(url.slice(off));
            url = url.slice(0, off);
        }
        if (jQuery.isFunction(params)) {
            callback = params;
            params = undefined;
        } else if (params && typeof params === "object") {
            type = "POST";
        }
        if (self.length > 0) {
            jQuery.ajax({
                url: url,
                type: type,
                dataType: "html",
                data: params
            }).done(function(responseText) {
                response = arguments;
                self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
            }).complete(callback && function(jqXHR, status) {
                self.each(callback, response || [jqXHR.responseText, status, jqXHR]);
            });
        }
        return this;
    };
    jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
        }).length;
    };
    var docElem = window.document.documentElement;
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }
    jQuery.offset = {
        setOffset: function(elem, options, i) {
            var curPosition,
                curLeft,
                curCSSTop,
                curTop,
                curOffset,
                curCSSLeft,
                calculatePosition,
                position = jQuery.css(elem, "position"),
                curElem = jQuery(elem),
                props = {};
            if (position === "static") {
                elem.style.position = "relative";
            }
            curOffset = curElem.offset();
            curCSSTop = jQuery.css(elem, "top");
            curCSSLeft = jQuery.css(elem, "left");
            calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;
            } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0;
            }
            if (jQuery.isFunction(options)) {
                options = options.call(elem, i, curOffset);
            }
            if (options.top != null) {
                props.top = (options.top - curOffset.top) + curTop;
            }
            if (options.left != null) {
                props.left = (options.left - curOffset.left) + curLeft;
            }
            if ("using" in options) {
                options.using.call(elem, props);
            } else {
                curElem.css(props);
            }
        }
    };
    jQuery.fn.extend({
        offset: function(options) {
            if (arguments.length) {
                return options === undefined ? this : this.each(function(i) {
                    jQuery.offset.setOffset(this, options, i);
                });
            }
            var docElem,
                win,
                elem = this[0],
                box = {
                    top: 0,
                    left: 0
                },
                doc = elem && elem.ownerDocument;
            if (!doc) {
                return;
            }
            docElem = doc.documentElement;
            if (!jQuery.contains(docElem, elem)) {
                return box;
            }
            if (typeof elem.getBoundingClientRect !== strundefined) {
                box = elem.getBoundingClientRect();
            }
            win = getWindow(doc);
            return {
                top: box.top + win.pageYOffset - docElem.clientTop,
                left: box.left + win.pageXOffset - docElem.clientLeft
            };
        },
        position: function() {
            if (!this[0]) {
                return;
            }
            var offsetParent,
                offset,
                elem = this[0],
                parentOffset = {
                    top: 0,
                    left: 0
                };
            if (jQuery.css(elem, "position") === "fixed") {
                offset = elem.getBoundingClientRect();
            } else {
                offsetParent = this.offsetParent();
                offset = this.offset();
                if (!jQuery.nodeName(offsetParent[0], "html")) {
                    parentOffset = offsetParent.offset();
                }
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
                parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
            }
            return {
                top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
            };
        },
        offsetParent: function() {
            return this.map(function() {
                var offsetParent = this.offsetParent || docElem;
                while (offsetParent && (!jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static")) {
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent || docElem;
            });
        }
    });
    jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = "pageYOffset" === prop;
        jQuery.fn[method] = function(val) {
            return access(this, function(elem, method, val) {
                var win = getWindow(elem);
                if (val === undefined) {
                    return win ? win[prop] : elem[method];
                }
                if (win) {
                    win.scrollTo(!top ? val : window.pageXOffset, top ? val : window.pageYOffset);
                } else {
                    elem[method] = val;
                }
            }, method, val, arguments.length, null);
        };
    });
    jQuery.each(["top", "left"], function(i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
            if (computed) {
                computed = curCSS(elem, prop);
                return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
            }
        });
    });
    jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
                    extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
                return access(this, function(elem, type, value) {
                    var doc;
                    if (jQuery.isWindow(elem)) {
                        return elem.document.documentElement["client" + name];
                    }
                    if (elem.nodeType === 9) {
                        doc = elem.documentElement;
                        return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
                    }
                    return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : undefined, chainable, null);
            };
        });
    });
    jQuery.fn.size = function() {
        return this.length;
    };
    jQuery.fn.andSelf = jQuery.fn.addBack;
    if (typeof define === "function" && define.amd) {
        define("jquery", [], function() {
            return jQuery;
        });
    }
    var
        _jQuery = window.jQuery,
        _$ = window.$;
    jQuery.noConflict = function(deep) {
        if (window.$ === jQuery) {
            window.$ = _$;
        }
        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery;
        }
        return jQuery;
    };
    if (typeof noGlobal === strundefined) {
        window.jQuery = window.$ = jQuery;
    }
    return jQuery;
}));
; /*!
 * Bootstrap v3.3.4 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */




if ("undefined" == typeof jQuery)
    throw new Error("Bootstrap's JavaScript requires jQuery");
+function(a) {
    "use strict";
    var b = a.fn.jquery.split(" ")[0].split(".");
    if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1)
        throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(jQuery), +function(a) {
    "use strict";
    function b() {
        var a = document.createElement("bootstrap"),
            b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var c in b)
            if (void 0 !== a.style[c])
                return {
                    end: b[c]
                };
        return !1
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1,
            d = this;
        a(this).one("bsTransitionEnd", function() {
            c = !0
        });
        var e = function() {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function() {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function(b) {
                return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
        })
    }
    var c = '[data-dismiss="alert"]',
        d = function(b) {
            a(b).on("click", c, this.close)
        };
    d.VERSION = "3.3.4", d.TRANSITION_DURATION = 150, d.prototype.close = function(b) {
        function c() {
            g.detach().trigger("closed.bs.alert").remove()
        }
        var e = a(this),
            f = e.attr("data-target");
        f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
        var g = a(f);
        b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function() {
        return a.fn.alert = e, this
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.button"),
                f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
        })
    }
    var c = function(b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
    };
    c.VERSION = "3.3.4", c.DEFAULTS = {
        loadingText: "loading..."
    }, c.prototype.setState = function(b) {
        var c = "disabled",
            d = this.$element,
            e = d.is("input") ? "val" : "html",
            f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function() {
            d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
        }, this), 0)
    }, c.prototype.toggle = function() {
        var a = !0,
            b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")), a && c.prop("checked", !this.$element.hasClass("active")).trigger("change")
        } else
            this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
        a && this.$element.toggleClass("active")
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() {
        return a.fn.button = d, this
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
        var d = a(c.target);
        d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), c.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(b) {
        a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
    })
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.carousel"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
                g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }
    var c = function(b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
    };
    c.VERSION = "3.3.4", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, c.prototype.keydown = function(a) {
        if (!/input|textarea/i.test(a.target.tagName)) {
            switch (a.which) {
            case 37:
                this.prev();
                break;
            case 39:
                this.next();
                break;
            default:
                return
            }
            a.preventDefault()
        }
    }, c.prototype.cycle = function(b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, c.prototype.getItemIndex = function(a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
    }, c.prototype.getItemForDirection = function(a, b) {
        var c = this.getItemIndex(b),
            d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
        if (d && !this.options.wrap)
            return b;
        var e = "prev" == a ? -1 : 1,
            f = (c + e) % this.$items.length;
        return this.$items.eq(f)
    }, c.prototype.to = function(a) {
        var b = this,
            c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            b.to(a)
        }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
    }, c.prototype.pause = function(b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, c.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, c.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, c.prototype.slide = function(b, d) {
        var e = this.$element.find(".item.active"),
            f = d || this.getItemForDirection(b, e),
            g = this.interval,
            h = "next" == b ? "left" : "right",
            i = this;
        if (f.hasClass("active"))
            return this.sliding = !1;
        var j = f[0],
            k = a.Event("slide.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(f)]);
                l && l.addClass("active")
            }
            var m = a.Event("slid.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
            return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function() {
                f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function() {
                    i.$element.trigger(m)
                }, 0)
            }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() {
        return a.fn.carousel = d, this
    };
    var e = function(c) {
        var d,
            e = a(this),
            f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()),
                h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
        }
    };
    a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function() {
        a('[data-ride="carousel"]').each(function() {
            var c = a(this);
            b.call(c, c.data())
        })
    })
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        var c,
            d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
        return a(d)
    }
    function c(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.collapse"),
                f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
            !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
        })
    }
    var d = function(b, c) {
        this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    d.VERSION = "3.3.4", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
        toggle: !0
    }, d.prototype.dimension = function() {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, d.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b,
                e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
                var f = a.Event("show.bs.collapse");
                if (this.$element.trigger(f), !f.isDefaultPrevented()) {
                    e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
                    var g = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var h = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!a.support.transition)
                        return h.call(this);
                    var i = a.camelCase(["scroll", g].join("-"));
                    this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
                }
            }
        }
    }, d.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var e = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
            }
        }
    }, d.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, d.prototype.getParent = function() {
        return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function(c, d) {
            var e = a(d);
            this.addAriaAndCollapsedClass(b(e), e)
        }, this)).end()
    }, d.prototype.addAriaAndCollapsedClass = function(a, b) {
        var c = a.hasClass("in");
        a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
    };
    var e = a.fn.collapse;
    a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function() {
        return a.fn.collapse = e, this
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(d) {
        var e = a(this);
        e.attr("data-target") || d.preventDefault();
        var f = b(e),
            g = f.data("bs.collapse"),
            h = g ? "toggle" : e.data();
        c.call(f, h)
    })
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        b && 3 === b.which || (a(e).remove(), a(f).each(function() {
            var d = a(this),
                e = c(d),
                f = {
                    relatedTarget: this
                };
            e.hasClass("open") && (e.trigger(b = a.Event("hide.bs.dropdown", f)), b.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger("hidden.bs.dropdown", f)))
        }))
    }
    function c(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }
    function d(b) {
        return this.each(function() {
            var c = a(this),
                d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
        })
    }
    var e = ".dropdown-backdrop",
        f = '[data-toggle="dropdown"]',
        g = function(b) {
            a(b).on("click.bs.dropdown", this.toggle)
        };
    g.VERSION = "3.3.4", g.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = c(e),
                g = f.hasClass("open");
            if (b(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented())
                    return;
                e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger("shown.bs.dropdown", h)
            }
            return !1
        }
    }, g.prototype.keydown = function(b) {
        if (/(38|40|27|32)/.test(b.which) && !/input|textarea/i.test(b.target.tagName)) {
            var d = a(this);
            if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = c(d),
                    g = e.hasClass("open");
                if (!g && 27 != b.which || g && 27 == b.which)
                    return 27 == b.which && e.find(f).trigger("focus"), d.trigger("click");
                var h = " li:not(.disabled):visible a",
                    i = e.find('[role="menu"]' + h + ', [role="listbox"]' + h);
                if (i.length) {
                    var j = i.index(b.target);
                    38 == b.which && j > 0 && j--, 40 == b.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = h, this
    }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', g.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', g.prototype.keydown)
}(jQuery), +function(a) {
    "use strict";
    function b(b, d) {
        return this.each(function() {
            var e = a(this),
                f = e.data("bs.modal"),
                g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
        })
    }
    var c = function(b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    c.VERSION = "3.3.4", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, c.prototype.toggle = function(a) {
        return this.isShown ? this.hide() : this.show(a)
    }, c.prototype.show = function(b) {
        var d = this,
            e = a.Event("show.bs.modal", {
                relatedTarget: b
            });
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            d.$element.one("mouseup.dismiss.bs.modal", function(b) {
                a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function() {
            var e = a.support.transition && d.$element.hasClass("fade");
            d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in").attr("aria-hidden", !1), d.enforceFocus();
            var f = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            e ? d.$dialog.one("bsTransitionEnd", function() {
                d.$element.trigger("focus").trigger(f)
            }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
        }))
    }, c.prototype.hide = function(b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
    }, c.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
        }, this))
    }, c.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function(a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, c.prototype.resize = function() {
        this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
    }, c.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(), this.backdrop(function() {
            a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
        })
    }, c.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, c.prototype.backdrop = function(b) {
        var d = this,
            e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var f = a.support.transition && e;
            if (this.$backdrop = a('<div class="modal-backdrop ' + e + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
                return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
            }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b)
                return;
            f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var g = function() {
                d.removeBackdrop(), b && b()
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
        } else
            b && b()
    }, c.prototype.handleUpdate = function() {
        this.adjustDialog()
    }, c.prototype.adjustDialog = function() {
        var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
        })
    }, c.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, c.prototype.checkScrollbar = function() {
        var a = window.innerWidth;
        if (!a) {
            var b = document.documentElement.getBoundingClientRect();
            a = b.right - Math.abs(b.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
    }, c.prototype.setScrollbar = function() {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
    }, c.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }, c.prototype.measureScrollbar = function() {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function() {
        return a.fn.modal = d, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
        var d = a(this),
            e = d.attr("href"),
            f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
            g = f.data("bs.modal") ? "toggle" : a.extend({
                remote: !/#/.test(e) && e
            }, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function(a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function() {
                d.is(":visible") && d.trigger("focus")
            })
        }), b.call(f, g, this)
    })
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tooltip"),
                f = "object" == typeof b && b;
            (e || !/destroy|hide/.test(b)) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.init("tooltip", a, b)
    };
    c.VERSION = "3.3.4", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, c.prototype.init = function(b, c, d) {
        if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(this.options.viewport.selector || this.options.viewport), this.$element[0] instanceof document.constructor && !this.options.selector)
            throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g)
                this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin",
                    i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, c.prototype.getDelegateOptions = function() {
        var b = {},
            c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, c.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c && c.$tip && c.$tip.is(":visible") ? void (c.hoverState = "in") : (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void (c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show)) : c.show())
    }, c.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void (c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide)) : c.hide()
    }, c.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !d)
                return;
            var e = this,
                f = this.tip(),
                g = this.getUID(this.type);
            this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
            var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
                i = /\s?auto?\s?/i,
                j = i.test(h);
            j && (h = h.replace(i, "") || "top"), f.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element);
            var k = this.getPosition(),
                l = f[0].offsetWidth,
                m = f[0].offsetHeight;
            if (j) {
                var n = h,
                    o = this.options.container ? a(this.options.container) : this.$element.parent(),
                    p = this.getPosition(o);
                h = "bottom" == h && k.bottom + m > p.bottom ? "top" : "top" == h && k.top - m < p.top ? "bottom" : "right" == h && k.right + l > p.width ? "left" : "left" == h && k.left - l < p.left ? "right" : h, f.removeClass(n).addClass(h)
            }
            var q = this.getCalculatedOffset(h, k, l, m);
            this.applyPlacement(q, h);
            var r = function() {
                var a = e.hoverState;
                e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
            };
            a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", r).emulateTransitionEnd(c.TRANSITION_DURATION) : r()
        }
    }, c.prototype.applyPlacement = function(b, c) {
        var d = this.tip(),
            e = d[0].offsetWidth,
            f = d[0].offsetHeight,
            g = parseInt(d.css("margin-top"), 10),
            h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top = b.top + g, b.left = b.left + h, a.offset.setOffset(d[0], a.extend({
            using: function(a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth,
            j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = /top|bottom/.test(c),
            m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
            n = l ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(m, d[0][n], l)
    }, c.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, c.prototype.hide = function(b) {
        function d() {
            "in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
        }
        var e = this,
            f = a(this.$tip),
            g = a.Event("hide.bs." + this.type);
        return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this)
    }, c.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, c.prototype.hasContent = function() {
        return this.getTitle()
    }, c.prototype.getPosition = function(b) {
        b = b || this.$element;
        var c = b[0],
            d = "BODY" == c.tagName,
            e = c.getBoundingClientRect();
        null == e.width && (e = a.extend({}, e, {
            width: e.right - e.left,
            height: e.bottom - e.top
        }));
        var f = d ? {
                top: 0,
                left: 0
            } : b.offset(),
            g = {
                scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
            },
            h = d ? {
                width: a(window).width(),
                height: a(window).height()
            } : null;
        return a.extend({}, e, g, h, f)
    }, c.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport)
            return e;
        var f = this.options.viewport && this.options.viewport.padding || 0,
            g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll,
                i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
        } else {
            var j = b.left - f,
                k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.width && (e.left = g.left + g.width - k)
        }
        return e
    }, c.prototype.getTitle = function() {
        var a,
            b = this.$element,
            c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, c.prototype.getUID = function(a) {
        do a += ~~(1e6 * Math.random());
        while (document.getElementById(a));
        return a
    }, c.prototype.tip = function() {
        return this.$tip = this.$tip || a(this.options.template)
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, c.prototype.enable = function() {
        this.enabled = !0
    }, c.prototype.disable = function() {
        this.enabled = !1
    }, c.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, c.prototype.toggle = function(b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, c.prototype.destroy = function() {
        var a = this;
        clearTimeout(this.timeout), this.hide(function() {
            a.$element.off("." + a.type).removeData("bs." + a.type)
        })
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = d, this
    }
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.popover"),
                f = "object" == typeof b && b;
            (e || !/destroy|hide/.test(b)) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip)
        throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.3.4", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle(),
            c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, c.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, c.prototype.getContent = function() {
        var a = this.$element,
            b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() {
        return a.fn.popover = d, this
    }
}(jQuery), +function(a) {
    "use strict";
    function b(c, d) {
        this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
    }
    function c(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.scrollspy"),
                f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }
    b.VERSION = "3.3.4", b.DEFAULTS = {
        offset: 10
    }, b.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, b.prototype.refresh = function() {
        var b = this,
            c = "offset",
            d = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var b = a(this),
                e = b.data("target") || b.attr("href"),
                f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [[f[c]().top + d, e]] || null
        }).sort(function(a, b) {
            return a[0] - b[0]
        }).each(function() {
            b.offsets.push(this[0]), b.targets.push(this[1])
        })
    }, b.prototype.process = function() {
        var a,
            b = this.$scrollElement.scrollTop() + this.options.offset,
            c = this.getScrollHeight(),
            d = this.options.offset + c - this.$scrollElement.height(),
            e = this.offsets,
            f = this.targets,
            g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d)
            return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b < e[0])
            return this.activeTarget = null, this.clear();
        for (a = e.length; a--;)
            g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function(b) {
        this.activeTarget = b, this.clear();
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
    }, b.prototype.clear = function() {
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
        return a.fn.scrollspy = d, this
    }, a(window).on("load.bs.scrollspy.data-api", function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            c.call(b, b.data())
        })
    })
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b) {
        this.element = a(b)
    };
    c.VERSION = "3.3.4", c.TRANSITION_DURATION = 150, c.prototype.show = function() {
        var b = this.element,
            c = b.closest("ul:not(.dropdown-menu)"),
            d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a"),
                f = a.Event("hide.bs.tab", {
                    relatedTarget: b[0]
                }),
                g = a.Event("show.bs.tab", {
                    relatedTarget: e[0]
                });
            if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
                var h = a(d);
                this.activate(b.closest("li"), c), this.activate(h, h.parent(), function() {
                    e.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: b[0]
                    }), b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e[0]
                    })
                })
            }
        }
    }, c.prototype.activate = function(b, d, e) {
        function f() {
            g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
        }
        var g = d.find("> .active"),
            h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
        g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() {
        return a.fn.tab = d, this
    };
    var e = function(c) {
        c.preventDefault(), b.call(a(this), "show")
    };
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.affix"),
                f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    c.VERSION = "3.3.4", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getState = function(a, b, c, d) {
        var e = this.$target.scrollTop(),
            f = this.$element.offset(),
            g = this.$target.height();
        if (null != c && "top" == this.affixed)
            return c > e ? "top" : !1;
        if ("bottom" == this.affixed)
            return null != c ? e + this.unpin <= f.top ? !1 : "bottom" : a - d >= e + g ? !1 : "bottom";
        var h = null == this.affixed,
            i = h ? e : f.top,
            j = h ? g : b;
        return null != c && c >= e ? "top" : null != d && i + j >= a - d ? "bottom" : !1
    }, c.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset)
            return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(),
            b = this.$element.offset();
        return this.pinnedOffset = b.top - a
    }, c.prototype.checkPositionWithEventLoop = function() {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, c.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var b = this.$element.height(),
                d = this.options.offset,
                e = d.top,
                f = d.bottom,
                g = a(document.body).height();
            "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
            var h = this.getState(g, b, e, f);
            if (this.affixed != h) {
                null != this.unpin && this.$element.css("top", "");
                var i = "affix" + (h ? "-" + h : ""),
                    j = a.Event(i + ".bs.affix");
                if (this.$element.trigger(j), j.isDefaultPrevented())
                    return;
                this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == h && this.$element.offset({
                top: g - b - f
            })
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() {
        return a.fn.affix = d, this
    }, a(window).on("load", function() {
        a('[data-spy="affix"]').each(function() {
            var c = a(this),
                d = c.data();
            d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
        })
    })
}(jQuery);
;
!function(t) {
    var e = {},
        s = {
            mode: "horizontal",
            slideSelector: "",
            infiniteLoop: !0,
            hideControlOnEnd: !1,
            speed: 500,
            easing: null,
            slideMargin: 0,
            startSlide: 0,
            randomStart: !1,
            captions: !1,
            ticker: !1,
            tickerHover: !1,
            adaptiveHeight: !1,
            adaptiveHeightSpeed: 500,
            video: !1,
            useCSS: !0,
            preloadImages: "visible",
            responsive: !0,
            slideZIndex: 50,
            touchEnabled: !0,
            swipeThreshold: 50,
            oneToOneTouch: !0,
            preventDefaultSwipeX: !0,
            preventDefaultSwipeY: !1,
            pager: !0,
            pagerType: "full",
            pagerShortSeparator: " / ",
            pagerSelector: null,
            buildPager: null,
            pagerCustom: null,
            controls: !0,
            nextText: "Next",
            prevText: "Prev",
            nextSelector: null,
            prevSelector: null,
            autoControls: !1,
            startText: "Start",
            stopText: "Stop",
            autoControlsCombine: !1,
            autoControlsSelector: null,
            auto: !1,
            pause: 4e3,
            autoStart: !0,
            autoDirection: "next",
            autoHover: !1,
            autoDelay: 0,
            minSlides: 1,
            maxSlides: 1,
            moveSlides: 0,
            slideWidth: 0,
            onSliderLoad: function() {},
            onSlideBefore: function() {},
            onSlideAfter: function() {},
            onSlideNext: function() {},
            onSlidePrev: function() {},
            onSliderResize: function() {}
        };
    t.fn.bxSlider = function(n) {
        if (0 == this.length)
            return this;
        if (this.length > 1)
            return this.each(function() {
                t(this).bxSlider(n)
            }), this;
        var o = {},
            r = this;
        e.el = this;
        var a = t(window).width(),
            l = t(window).height(),
            d = function() {
                o.settings = t.extend({}, s, n), o.settings.slideWidth = parseInt(o.settings.slideWidth), o.children = r.children(o.settings.slideSelector), o.children.length < o.settings.minSlides && (o.settings.minSlides = o.children.length), o.children.length < o.settings.maxSlides && (o.settings.maxSlides = o.children.length), o.settings.randomStart && (o.settings.startSlide = Math.floor(Math.random() * o.children.length)), o.active = {
                    index: o.settings.startSlide
                }, o.carousel = o.settings.minSlides > 1 || o.settings.maxSlides > 1, o.carousel && (o.settings.preloadImages = "all"), o.minThreshold = o.settings.minSlides * o.settings.slideWidth + (o.settings.minSlides - 1) * o.settings.slideMargin, o.maxThreshold = o.settings.maxSlides * o.settings.slideWidth + (o.settings.maxSlides - 1) * o.settings.slideMargin, o.working = !1, o.controls = {}, o.interval = null, o.animProp = "vertical" == o.settings.mode ? "top" : "left", o.usingCSS = o.settings.useCSS && "fade" != o.settings.mode && function() {
                    var t = document.createElement("div"),
                        e = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var i in e)
                        if (void 0 !== t.style[e[i]])
                            return o.cssPrefix = e[i].replace("Perspective", "").toLowerCase(), o.animProp = "-" + o.cssPrefix + "-transform", !0;
                    return !1
                }(), "vertical" == o.settings.mode && (o.settings.maxSlides = o.settings.minSlides), r.data("origStyle", r.attr("style")), r.children(o.settings.slideSelector).each(function() {
                    t(this).data("origStyle", t(this).attr("style"))
                }), c()
            },
            c = function() {
                r.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'), o.viewport = r.parent(), o.loader = t('<div class="bx-loading" />'), o.viewport.prepend(o.loader), r.css({
                    width: "horizontal" == o.settings.mode ? 100 * o.children.length + 215 + "%" : "auto",
                    position: "relative"
                }), o.usingCSS && o.settings.easing ? r.css("-" + o.cssPrefix + "-transition-timing-function", o.settings.easing) : o.settings.easing || (o.settings.easing = "swing"), f(), o.viewport.css({
                    width: "100%",
                    overflow: "hidden",
                    position: "relative"
                }), o.viewport.parent().css({
                    maxWidth: p()
                }), o.settings.pager || o.viewport.parent().css({
                    margin: "0 auto 0px"
                }), o.children.css({
                    "float": "horizontal" == o.settings.mode ? "left" : "none",
                    listStyle: "none",
                    position: "relative"
                }), o.children.css("width", u()), "horizontal" == o.settings.mode && o.settings.slideMargin > 0 && o.children.css("marginRight", o.settings.slideMargin), "vertical" == o.settings.mode && o.settings.slideMargin > 0 && o.children.css("marginBottom", o.settings.slideMargin), "fade" == o.settings.mode && (o.children.css({
                    position: "absolute",
                    zIndex: 0,
                    display: "none"
                }), o.children.eq(o.settings.startSlide).css({
                    zIndex: o.settings.slideZIndex,
                    display: "block"
                })), o.controls.el = t('<div class="bx-controls" />'), o.settings.captions && P(), o.active.last = o.settings.startSlide == x() - 1, o.settings.video && r.fitVids();
                var e = o.children.eq(o.settings.startSlide);
                "all" == o.settings.preloadImages && (e = o.children), o.settings.ticker ? o.settings.pager = !1 : (o.settings.pager && T(), o.settings.controls && C(), o.settings.auto && o.settings.autoControls && E(), (o.settings.controls || o.settings.autoControls || o.settings.pager) && o.viewport.after(o.controls.el)), g(e, h)
            },
            g = function(e, i) {
                var s = e.find("img, iframe").length;
                if (0 == s)
                    return i(), void 0;
                var n = 0;
                e.find("img, iframe").each(function() {
                    t(this).one("load", function() {
                        ++n == s && i()
                    }).each(function() {
                        this.complete && t(this).load()
                    })
                })
            },
            h = function() {
                if (o.settings.infiniteLoop && "fade" != o.settings.mode && !o.settings.ticker) {
                    var e = "vertical" == o.settings.mode ? o.settings.minSlides : o.settings.maxSlides,
                        i = o.children.slice(0, e).clone().addClass("bx-clone"),
                        s = o.children.slice(-e).clone().addClass("bx-clone");
                    r.append(i).prepend(s)
                }
                o.loader.remove(), S(), "vertical" == o.settings.mode && (o.settings.adaptiveHeight = !0), o.viewport.height(v()), r.redrawSlider(), o.settings.onSliderLoad(o.active.index), o.initialized = !0, o.settings.responsive && t(window).bind("resize", Z), o.settings.auto && o.settings.autoStart && H(), o.settings.ticker && L(), o.settings.pager && q(o.settings.startSlide), o.settings.controls && W(), o.settings.touchEnabled && !o.settings.ticker && O()
            },
            v = function() {
                var e = 0,
                    s = t();
                if ("vertical" == o.settings.mode || o.settings.adaptiveHeight)
                    if (o.carousel) {
                        var n = 1 == o.settings.moveSlides ? o.active.index : o.active.index * m();
                        for (s = o.children.eq(n), i = 1; i <= o.settings.maxSlides - 1; i++)
                            s = n + i >= o.children.length ? s.add(o.children.eq(i - 1)) : s.add(o.children.eq(n + i))
                    } else
                        s = o.children.eq(o.active.index);
                else
                    s = o.children;
                return "vertical" == o.settings.mode ? (s.each(function() {
                    e += t(this).outerHeight()
                }), o.settings.slideMargin > 0 && (e += o.settings.slideMargin * (o.settings.minSlides - 1))) : e = Math.max.apply(Math, s.map(function() {
                    return t(this).outerHeight(!1)
                }).get()), e
            },
            p = function() {
                var t = "100%";
                return o.settings.slideWidth > 0 && (t = "horizontal" == o.settings.mode ? o.settings.maxSlides * o.settings.slideWidth + (o.settings.maxSlides - 1) * o.settings.slideMargin : o.settings.slideWidth), t
            },
            u = function() {
                var t = o.settings.slideWidth,
                    e = o.viewport.width();
                return 0 == o.settings.slideWidth || o.settings.slideWidth > e && !o.carousel || "vertical" == o.settings.mode ? t = e : o.settings.maxSlides > 1 && "horizontal" == o.settings.mode && (e > o.maxThreshold || e < o.minThreshold && (t = (e - o.settings.slideMargin * (o.settings.minSlides - 1)) / o.settings.minSlides)), t
            },
            f = function() {
                var t = 1;
                if ("horizontal" == o.settings.mode && o.settings.slideWidth > 0)
                    if (o.viewport.width() < o.minThreshold)
                        t = o.settings.minSlides;
                    else if (o.viewport.width() > o.maxThreshold)
                        t = o.settings.maxSlides;
                    else {
                        var e = o.children.first().width();
                        t = Math.floor(o.viewport.width() / e)
                    }
                else
                    "vertical" == o.settings.mode && (t = o.settings.minSlides);
                return t
            },
            x = function() {
                var t = 0;
                if (o.settings.moveSlides > 0)
                    if (o.settings.infiniteLoop)
                        t = o.children.length / m();
                    else
                        for (var e = 0, i = 0; e < o.children.length;)
                            ++t, e = i + f(), i += o.settings.moveSlides <= f() ? o.settings.moveSlides : f();
                else
                    t = Math.ceil(o.children.length / f());
                return t
            },
            m = function() {
                return o.settings.moveSlides > 0 && o.settings.moveSlides <= f() ? o.settings.moveSlides : f()
            },
            S = function() {
                if (o.children.length > o.settings.maxSlides && o.active.last && !o.settings.infiniteLoop) {
                    if ("horizontal" == o.settings.mode) {
                        var t = o.children.last(),
                            e = t.position();
                        b(-(e.left - (o.viewport.width() - t.width())), "reset", 0)
                    } else if ("vertical" == o.settings.mode) {
                        var i = o.children.length - o.settings.minSlides,
                            e = o.children.eq(i).position();
                        b(-e.top, "reset", 0)
                    }
                } else {
                    var e = o.children.eq(o.active.index * m()).position();
                    o.active.index == x() - 1 && (o.active.last = !0), void 0 != e && ("horizontal" == o.settings.mode ? b(-e.left, "reset", 0) : "vertical" == o.settings.mode && b(-e.top, "reset", 0))
                }
            },
            b = function(t, e, i, s) {
                if (o.usingCSS) {
                    var n = "vertical" == o.settings.mode ? "translate3d(0, " + t + "px, 0)" : "translate3d(" + t + "px, 0, 0)";
                    r.css("-" + o.cssPrefix + "-transition-duration", i / 1e3 + "s"), "slide" == e ? (r.css(o.animProp, n), r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                        r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), D()
                    })) : "reset" == e ? r.css(o.animProp, n) : "ticker" == e && (r.css("-" + o.cssPrefix + "-transition-timing-function", "linear"), r.css(o.animProp, n), r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                        r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), b(s.resetValue, "reset", 0), N()
                    }))
                } else {
                    var a = {};
                    a[o.animProp] = t, "slide" == e ? r.animate(a, i, o.settings.easing, function() {
                        D()
                    }) : "reset" == e ? r.css(o.animProp, t) : "ticker" == e && r.animate(a, speed, "linear", function() {
                        b(s.resetValue, "reset", 0), N()
                    })
                }
            },
            w = function() {
                for (var e = "", i = x(), s = 0; i > s; s++) {
                    var n = "";
                    o.settings.buildPager && t.isFunction(o.settings.buildPager) ? (n = o.settings.buildPager(s), o.pagerEl.addClass("bx-custom-pager")) : (n = s + 1, o.pagerEl.addClass("bx-default-pager")), e += '<div class="bx-pager-item"><a href="" data-slide-index="' + s + '" class="bx-pager-link">' + n + "</a></div>"
                }
                o.pagerEl.html(e)
            },
            T = function() {
                o.settings.pagerCustom ? o.pagerEl = t(o.settings.pagerCustom) : (o.pagerEl = t('<div class="bx-pager" />'), o.settings.pagerSelector ? t(o.settings.pagerSelector).html(o.pagerEl) : o.controls.el.addClass("bx-has-pager").append(o.pagerEl), w()), o.pagerEl.on("click", "a", I)
            },
            C = function() {
                o.controls.next = t('<a class="bx-next" href="">' + o.settings.nextText + "</a>"), o.controls.prev = t('<a class="bx-prev" href="">' + o.settings.prevText + "</a>"), o.controls.next.bind("click", y), o.controls.prev.bind("click", z), o.settings.nextSelector && t(o.settings.nextSelector).append(o.controls.next), o.settings.prevSelector && t(o.settings.prevSelector).append(o.controls.prev), o.settings.nextSelector || o.settings.prevSelector || (o.controls.directionEl = t('<div class="bx-controls-direction" />'), o.controls.directionEl.append(o.controls.prev).append(o.controls.next), o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl))
            },
            E = function() {
                o.controls.start = t('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + o.settings.startText + "</a></div>"), o.controls.stop = t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + o.settings.stopText + "</a></div>"), o.controls.autoEl = t('<div class="bx-controls-auto" />'), o.controls.autoEl.on("click", ".bx-start", k), o.controls.autoEl.on("click", ".bx-stop", M), o.settings.autoControlsCombine ? o.controls.autoEl.append(o.controls.start) : o.controls.autoEl.append(o.controls.start).append(o.controls.stop), o.settings.autoControlsSelector ? t(o.settings.autoControlsSelector).html(o.controls.autoEl) : o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl), A(o.settings.autoStart ? "stop" : "start")
            },
            P = function() {
                o.children.each(function() {
                    var e = t(this).find("img:first").attr("title");
                    void 0 != e && ("" + e).length && t(this).append('<div class="bx-caption"><span>' + e + "</span></div>")
                })
            },
            y = function(t) {
                o.settings.auto && r.stopAuto(), r.goToNextSlide(), t.preventDefault()
            },
            z = function(t) {
                o.settings.auto && r.stopAuto(), r.goToPrevSlide(), t.preventDefault()
            },
            k = function(t) {
                r.startAuto(), t.preventDefault()
            },
            M = function(t) {
                r.stopAuto(), t.preventDefault()
            },
            I = function(e) {
                o.settings.auto && r.stopAuto();
                var i = t(e.currentTarget),
                    s = parseInt(i.attr("data-slide-index"));
                s != o.active.index && r.goToSlide(s), e.preventDefault()
            },
            q = function(e) {
                var i = o.children.length;
                return "short" == o.settings.pagerType ? (o.settings.maxSlides > 1 && (i = Math.ceil(o.children.length / o.settings.maxSlides)), o.pagerEl.html(e + 1 + o.settings.pagerShortSeparator + i), void 0) : (o.pagerEl.find("a").removeClass("active"), o.pagerEl.each(function(i, s) {
                    t(s).find("a").eq(e).addClass("active")
                }), void 0)
            },
            D = function() {
                if (o.settings.infiniteLoop) {
                    var t = "";
                    0 == o.active.index ? t = o.children.eq(0).position() : o.active.index == x() - 1 && o.carousel ? t = o.children.eq((x() - 1) * m()).position() : o.active.index == o.children.length - 1 && (t = o.children.eq(o.children.length - 1).position()), t && ("horizontal" == o.settings.mode ? b(-t.left, "reset", 0) : "vertical" == o.settings.mode && b(-t.top, "reset", 0))
                }
                o.working = !1, o.settings.onSlideAfter(o.children.eq(o.active.index), o.oldIndex, o.active.index)
            },
            A = function(t) {
                o.settings.autoControlsCombine ? o.controls.autoEl.html(o.controls[t]) : (o.controls.autoEl.find("a").removeClass("active"), o.controls.autoEl.find("a:not(.bx-" + t + ")").addClass("active"))
            },
            W = function() {
                1 == x() ? (o.controls.prev.addClass("disabled"), o.controls.next.addClass("disabled")) : !o.settings.infiniteLoop && o.settings.hideControlOnEnd && (0 == o.active.index ? (o.controls.prev.addClass("disabled"), o.controls.next.removeClass("disabled")) : o.active.index == x() - 1 ? (o.controls.next.addClass("disabled"), o.controls.prev.removeClass("disabled")) : (o.controls.prev.removeClass("disabled"), o.controls.next.removeClass("disabled")))
            },
            H = function() {
                o.settings.autoDelay > 0 ? setTimeout(r.startAuto, o.settings.autoDelay) : r.startAuto(), o.settings.autoHover && r.hover(function() {
                    o.interval && (r.stopAuto(!0), o.autoPaused = !0)
                }, function() {
                    o.autoPaused && (r.startAuto(!0), o.autoPaused = null)
                })
            },
            L = function() {
                var e = 0;
                if ("next" == o.settings.autoDirection)
                    r.append(o.children.clone().addClass("bx-clone"));
                else {
                    r.prepend(o.children.clone().addClass("bx-clone"));
                    var i = o.children.first().position();
                    e = "horizontal" == o.settings.mode ? -i.left : -i.top
                }
                b(e, "reset", 0), o.settings.pager = !1, o.settings.controls = !1, o.settings.autoControls = !1, o.settings.tickerHover && !o.usingCSS && o.viewport.hover(function() {
                    r.stop()
                }, function() {
                    var e = 0;
                    o.children.each(function() {
                        e += "horizontal" == o.settings.mode ? t(this).outerWidth(!0) : t(this).outerHeight(!0)
                    });
                    var i = o.settings.speed / e,
                        s = "horizontal" == o.settings.mode ? "left" : "top",
                        n = i * (e - Math.abs(parseInt(r.css(s))));
                    N(n)
                }), N()
            },
            N = function(t) {
                speed = t ? t : o.settings.speed;
                var e = {
                        left: 0,
                        top: 0
                    },
                    i = {
                        left: 0,
                        top: 0
                    };
                "next" == o.settings.autoDirection ? e = r.find(".bx-clone").first().position() : i = o.children.first().position();
                var s = "horizontal" == o.settings.mode ? -e.left : -e.top,
                    n = "horizontal" == o.settings.mode ? -i.left : -i.top,
                    a = {
                        resetValue: n
                    };
                b(s, "ticker", speed, a)
            },
            O = function() {
                o.touch = {
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    }
                }, o.viewport.bind("touchstart", X)
            },
            X = function(t) {
                if (o.working)
                    t.preventDefault();
                else {
                    o.touch.originalPos = r.position();
                    var e = t.originalEvent;
                    o.touch.start.x = e.changedTouches[0].pageX, o.touch.start.y = e.changedTouches[0].pageY, o.viewport.bind("touchmove", Y), o.viewport.bind("touchend", V)
                }
            },
            Y = function(t) {
                var e = t.originalEvent,
                    i = Math.abs(e.changedTouches[0].pageX - o.touch.start.x),
                    s = Math.abs(e.changedTouches[0].pageY - o.touch.start.y);
                if (3 * i > s && o.settings.preventDefaultSwipeX ? t.preventDefault() : 3 * s > i && o.settings.preventDefaultSwipeY && t.preventDefault(), "fade" != o.settings.mode && o.settings.oneToOneTouch) {
                    var n = 0;
                    if ("horizontal" == o.settings.mode) {
                        var r = e.changedTouches[0].pageX - o.touch.start.x;
                        n = o.touch.originalPos.left + r
                    } else {
                        var r = e.changedTouches[0].pageY - o.touch.start.y;
                        n = o.touch.originalPos.top + r
                    }
                    b(n, "reset", 0)
                }
            },
            V = function(t) {
                o.viewport.unbind("touchmove", Y);
                var e = t.originalEvent,
                    i = 0;
                if (o.touch.end.x = e.changedTouches[0].pageX, o.touch.end.y = e.changedTouches[0].pageY, "fade" == o.settings.mode) {
                    var s = Math.abs(o.touch.start.x - o.touch.end.x);
                    s >= o.settings.swipeThreshold && (o.touch.start.x > o.touch.end.x ? r.goToNextSlide() : r.goToPrevSlide(), r.stopAuto())
                } else {
                    var s = 0;
                    "horizontal" == o.settings.mode ? (s = o.touch.end.x - o.touch.start.x, i = o.touch.originalPos.left) : (s = o.touch.end.y - o.touch.start.y, i = o.touch.originalPos.top), !o.settings.infiniteLoop && (0 == o.active.index && s > 0 || o.active.last && 0 > s) ? b(i, "reset", 200) : Math.abs(s) >= o.settings.swipeThreshold ? (0 > s ? r.goToNextSlide() : r.goToPrevSlide(), r.stopAuto()) : b(i, "reset", 200)
                }
                o.viewport.unbind("touchend", V)
            },
            Z = function() {
                var e = t(window).width(),
                    i = t(window).height();
                (a != e || l != i) && (a = e, l = i, r.redrawSlider(), o.settings.onSliderResize.call(r, o.active.index))
            };
        return r.goToSlide = function(e, i) {
            if (!o.working && o.active.index != e)
                if (o.working = !0, o.oldIndex = o.active.index, o.active.index = 0 > e ? x() - 1 : e >= x() ? 0 : e, o.settings.onSlideBefore(o.children.eq(o.active.index), o.oldIndex, o.active.index), "next" == i ? o.settings.onSlideNext(o.children.eq(o.active.index), o.oldIndex, o.active.index) : "prev" == i && o.settings.onSlidePrev(o.children.eq(o.active.index), o.oldIndex, o.active.index), o.active.last = o.active.index >= x() - 1, o.settings.pager && q(o.active.index), o.settings.controls && W(), "fade" == o.settings.mode)
                    o.settings.adaptiveHeight && o.viewport.height() != v() && o.viewport.animate({
                        height: v()
                    }, o.settings.adaptiveHeightSpeed), o.children.filter(":visible").fadeOut(o.settings.speed).css({
                        zIndex: 0
                    }), o.children.eq(o.active.index).css("zIndex", o.settings.slideZIndex + 1).fadeIn(o.settings.speed, function() {
                        t(this).css("zIndex", o.settings.slideZIndex), D()
                    });
                else {
                    o.settings.adaptiveHeight && o.viewport.height() != v() && o.viewport.animate({
                        height: v()
                    }, o.settings.adaptiveHeightSpeed);
                    var s = 0,
                        n = {
                            left: 0,
                            top: 0
                        };
                    if (!o.settings.infiniteLoop && o.carousel && o.active.last)
                        if ("horizontal" == o.settings.mode) {
                            var a = o.children.eq(o.children.length - 1);
                            n = a.position(), s = o.viewport.width() - a.outerWidth()
                        } else {
                            var l = o.children.length - o.settings.minSlides;
                            n = o.children.eq(l).position()
                        }
                    else if (o.carousel && o.active.last && "prev" == i) {
                        var d = 1 == o.settings.moveSlides ? o.settings.maxSlides - m() : (x() - 1) * m() - (o.children.length - o.settings.maxSlides),
                            a = r.children(".bx-clone").eq(d);
                        n = a.position()
                    } else if ("next" == i && 0 == o.active.index)
                        n = r.find("> .bx-clone").eq(o.settings.maxSlides).position(), o.active.last = !1;
                    else if (e >= 0) {
                        var c = e * m();
                        n = o.children.eq(c).position()
                    }
                    if ("undefined" != typeof n) {
                        var g = "horizontal" == o.settings.mode ? -(n.left - s) : -n.top;
                        b(g, "slide", o.settings.speed)
                    }
                }
        }, r.goToNextSlide = function() {
            if (o.settings.infiniteLoop || !o.active.last) {
                var t = parseInt(o.active.index) + 1;
                r.goToSlide(t, "next")
            }
        }, r.goToPrevSlide = function() {
            if (o.settings.infiniteLoop || 0 != o.active.index) {
                var t = parseInt(o.active.index) - 1;
                r.goToSlide(t, "prev")
            }
        }, r.startAuto = function(t) {
            o.interval || (o.interval = setInterval(function() {
                "next" == o.settings.autoDirection ? r.goToNextSlide() : r.goToPrevSlide()
            }, o.settings.pause), o.settings.autoControls && 1 != t && A("stop"))
        }, r.stopAuto = function(t) {
            o.interval && (clearInterval(o.interval), o.interval = null, o.settings.autoControls && 1 != t && A("start"))
        }, r.getCurrentSlide = function() {
            return o.active.index
        }, r.getCurrentSlideElement = function() {
            return o.children.eq(o.active.index)
        }, r.getSlideCount = function() {
            return o.children.length
        }, r.redrawSlider = function() {
            o.children.add(r.find(".bx-clone")).outerWidth(u()), o.viewport.css("height", v()), o.settings.ticker || S(), o.active.last && (o.active.index = x() - 1), o.active.index >= x() && (o.active.last = !0), o.settings.pager && !o.settings.pagerCustom && (w(), q(o.active.index))
        }, r.destroySlider = function() {
            o.initialized && (o.initialized = !1, t(".bx-clone", this).remove(), o.children.each(function() {
                void 0 != t(this).data("origStyle") ? t(this).attr("style", t(this).data("origStyle")) : t(this).removeAttr("style")
            }), void 0 != t(this).data("origStyle") ? this.attr("style", t(this).data("origStyle")) : t(this).removeAttr("style"), t(this).unwrap().unwrap(), o.controls.el && o.controls.el.remove(), o.controls.next && o.controls.next.remove(), o.controls.prev && o.controls.prev.remove(), o.pagerEl && o.settings.controls && o.pagerEl.remove(), t(".bx-caption", this).remove(), o.controls.autoEl && o.controls.autoEl.remove(), clearInterval(o.interval), o.settings.responsive && t(window).unbind("resize", Z))
        }, r.reloadSlider = function(t) {
            void 0 != t && (n = t), r.destroySlider(), d()
        }, d(), this
    }
}(jQuery);
;
(function() {
    var MutationObserver,
        Util,
        WeakMap,
        __bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        __indexOf = [].indexOf || function(item) {
            for (var i = 0, l = this.length; i < l; i++) {
                if (i in this && this[i] === item)
                    return i;
            }
            return -1;
        };
    Util = (function() {
        function Util() {}
        Util.prototype.extend = function(custom, defaults) {
            var key,
                value;
            for (key in custom) {
                value = custom[key];
                if (value != null) {
                    defaults[key] = value;
                }
            }
            return defaults;
        };
        Util.prototype.isMobile = function(agent) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
        };
        return Util;
    })();
    WeakMap = this.WeakMap || this.MozWeakMap || (WeakMap = (function() {
        function WeakMap() {
            this.keys = [];
            this.values = [];
        }
        WeakMap.prototype.get = function(key) {
            var i,
                item,
                _i,
                _len,
                _ref;
            _ref = this.keys;
            for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
                item = _ref[i];
                if (item === key) {
                    return this.values[i];
                }
            }
        };
        WeakMap.prototype.set = function(key, value) {
            var i,
                item,
                _i,
                _len,
                _ref;
            _ref = this.keys;
            for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
                item = _ref[i];
                if (item === key) {
                    this.values[i] = value;
                    return;
                }
            }
            this.keys.push(key);
            return this.values.push(value);
        };
        return WeakMap;
    })());
    MutationObserver = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (MutationObserver = (function() {
        function MutationObserver() {
            console.warn('MutationObserver is not supported by your browser.');
            console.warn('WOW.js cannot detect dom mutations, please call .sync() after loading new content.');
        }
        MutationObserver.notSupported = true;
        MutationObserver.prototype.observe = function() {};
        return MutationObserver;
    })());
    this.WOW = (function() {
        WOW.prototype.defaults = {
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: true,
            live: true
        };
        function WOW(options) {
            if (options == null) {
                options = {};
            }
            this.scrollCallback = __bind(this.scrollCallback, this);
            this.scrollHandler = __bind(this.scrollHandler, this);
            this.start = __bind(this.start, this);
            this.scrolled = true;
            this.config = this.util().extend(options, this.defaults);
            this.animationNameCache = new WeakMap();
        }
        WOW.prototype.init = function() {
            var _ref;
            this.element = window.document.documentElement;
            if ((_ref = document.readyState) === "interactive" || _ref === "complete") {
                this.start();
            } else {
                document.addEventListener('DOMContentLoaded', this.start);
            }
            return this.finished = [];
        };
        WOW.prototype.start = function() {
            var box,
                _i,
                _len,
                _ref;
            this.stopped = false;
            this.boxes = this.element.getElementsByClassName(this.config.boxClass);
            this.all = (function() {
                var _i,
                    _len,
                    _ref,
                    _results;
                _ref = this.boxes;
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    box = _ref[_i];
                    _results.push(box);
                }
                return _results;
            }).call(this);
            if (this.boxes.length) {
                if (this.disabled()) {
                    this.resetStyle();
                } else {
                    _ref = this.boxes;
                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                        box = _ref[_i];
                        this.applyStyle(box, true);
                    }
                    window.addEventListener('scroll', this.scrollHandler, false);
                    window.addEventListener('resize', this.scrollHandler, false);
                    this.interval = setInterval(this.scrollCallback, 50);
                }
            }
            if (this.config.live) {
                return new MutationObserver((function(_this) {
                    return function(records) {
                        var node,
                            record,
                            _j,
                            _len1,
                            _results;
                        _results = [];
                        for (_j = 0, _len1 = records.length; _j < _len1; _j++) {
                            record = records[_j];
                            _results.push((function() {
                                var _k,
                                    _len2,
                                    _ref1,
                                    _results1;
                                _ref1 = record.addedNodes || [];
                                _results1 = [];
                                for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
                                    node = _ref1[_k];
                                    _results1.push(this.doSync(node));
                                }
                                return _results1;
                            }).call(_this));
                        }
                        return _results;
                    };
                })(this)).observe(document.body, {
                    childList: true,
                    subtree: true
                });
            }
        };
        WOW.prototype.stop = function() {
            this.stopped = true;
            window.removeEventListener('scroll', this.scrollHandler, false);
            window.removeEventListener('resize', this.scrollHandler, false);
            if (this.interval != null) {
                return clearInterval(this.interval);
            }
        };
        WOW.prototype.sync = function(element) {
            if (MutationObserver.notSupported) {
                return this.doSync(this.element);
            }
        };
        WOW.prototype.doSync = function(element) {
            var box,
                _i,
                _len,
                _ref,
                _results;
            if (!this.stopped) {
                element || (element = this.element);
                element = element.parentNode || element;
                _ref = element.getElementsByClassName(this.config.boxClass);
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    box = _ref[_i];
                    if (__indexOf.call(this.all, box) < 0) {
                        this.applyStyle(box, true);
                        this.boxes.push(box);
                        this.all.push(box);
                        _results.push(this.scrolled = true);
                    } else {
                        _results.push(void 0);
                    }
                }
                return _results;
            }
        };
        WOW.prototype.show = function(box) {
            this.applyStyle(box);
            return box.className = "" + box.className + " " + this.config.animateClass;
        };
        WOW.prototype.applyStyle = function(box, hidden) {
            var delay,
                duration,
                iteration;
            duration = box.getAttribute('data-wow-duration');
            delay = box.getAttribute('data-wow-delay');
            iteration = box.getAttribute('data-wow-iteration');
            return this.animate((function(_this) {
                return function() {
                    return _this.customStyle(box, hidden, duration, delay, iteration);
                };
            })(this));
        };
        WOW.prototype.animate = (function() {
            if ('requestAnimationFrame' in window) {
                return function(callback) {
                    return window.requestAnimationFrame(callback);
                };
            } else {
                return function(callback) {
                    return callback();
                };
            }
        })();
        WOW.prototype.resetStyle = function() {
            var box,
                _i,
                _len,
                _ref,
                _results;
            _ref = this.boxes;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                box = _ref[_i];
                _results.push(box.setAttribute('style', 'visibility: visible;'));
            }
            return _results;
        };
        WOW.prototype.customStyle = function(box, hidden, duration, delay, iteration) {
            if (hidden) {
                this.cacheAnimationName(box);
            }
            box.style.visibility = hidden ? 'hidden' : 'visible';
            if (duration) {
                this.vendorSet(box.style, {
                    animationDuration: duration
                });
            }
            if (delay) {
                this.vendorSet(box.style, {
                    animationDelay: delay
                });
            }
            if (iteration) {
                this.vendorSet(box.style, {
                    animationIterationCount: iteration
                });
            }
            this.vendorSet(box.style, {
                animationName: hidden ? 'none' : this.cachedAnimationName(box)
            });
            return box;
        };
        WOW.prototype.vendors = ["moz", "webkit"];
        WOW.prototype.vendorSet = function(elem, properties) {
            var name,
                value,
                vendor,
                _results;
            _results = [];
            for (name in properties) {
                value = properties[name];
                elem["" + name] = value;
                _results.push((function() {
                    var _i,
                        _len,
                        _ref,
                        _results1;
                    _ref = this.vendors;
                    _results1 = [];
                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                        vendor = _ref[_i];
                        _results1.push(elem["" + vendor + (name.charAt(0).toUpperCase()) + (name.substr(1))] = value);
                    }
                    return _results1;
                }).call(this));
            }
            return _results;
        };
        WOW.prototype.vendorCSS = function(elem, property) {
            var result,
                style,
                vendor,
                _i,
                _len,
                _ref;
            style = window.getComputedStyle(elem);
            result = style.getPropertyCSSValue(property);
            _ref = this.vendors;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                vendor = _ref[_i];
                result = result || style.getPropertyCSSValue("-" + vendor + "-" + property);
            }
            return result;
        };
        WOW.prototype.animationName = function(box) {
            var animationName;
            try {
                animationName = this.vendorCSS(box, 'animation-name').cssText;
            } catch (_error) {
                animationName = window.getComputedStyle(box).getPropertyValue('animation-name');
            }
            if (animationName === 'none') {
                return '';
            } else {
                return animationName;
            }
        };
        WOW.prototype.cacheAnimationName = function(box) {
            return this.animationNameCache.set(box, this.animationName(box));
        };
        WOW.prototype.cachedAnimationName = function(box) {
            return this.animationNameCache.get(box);
        };
        WOW.prototype.scrollHandler = function() {
            return this.scrolled = true;
        };
        WOW.prototype.scrollCallback = function() {
            var box;
            if (this.scrolled) {
                this.scrolled = false;
                this.boxes = (function() {
                    var _i,
                        _len,
                        _ref,
                        _results;
                    _ref = this.boxes;
                    _results = [];
                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                        box = _ref[_i];
                        if (!(box)) {
                            continue;
                        }
                        if (this.isVisible(box)) {
                            this.show(box);
                            continue;
                        }
                        _results.push(box);
                    }
                    return _results;
                }).call(this);
                if (!(this.boxes.length || this.config.live)) {
                    return this.stop();
                }
            }
        };
        WOW.prototype.offsetTop = function(element) {
            var top;
            while (element.offsetTop === void 0) {
                element = element.parentNode;
            }
            top = element.offsetTop;
            while (element = element.offsetParent) {
                top += element.offsetTop;
            }
            return top;
        };
        WOW.prototype.isVisible = function(box) {
            var bottom,
                offset,
                top,
                viewBottom,
                viewTop;
            offset = box.getAttribute('data-wow-offset') || this.config.offset;
            viewTop = window.pageYOffset;
            viewBottom = viewTop + this.element.clientHeight - offset;
            top = this.offsetTop(box);
            bottom = top + box.clientHeight;
            return top <= viewBottom && bottom >= viewTop;
        };
        WOW.prototype.util = function() {
            return this._util || (this._util = new Util());
        };
        WOW.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent);
        };
        return WOW;
    })();
}).call(this);
;
sfHover = function() {
    var sfEls = document.getElementById("ja-cssmenu").getElementsByTagName("li");
    for (var i = 0; i < sfEls.length; ++i) {
        sfEls[i].onmouseover = function() {
            clearTimeout(this.timer);
            if (this.className.indexOf("sfhover") == -1)
                this.className += "sfhover";
        }
        sfEls[i].onmouseout = function() {
            this.timer = setTimeout(sfHoverOut.bind(this), 20);
        }
    }
}
function sfHoverOut() {
    clearTimeout(this.timer);
    this.className = this.className.replace(new RegExp("sfhover\\b"), "");
}
if (window.attachEvent)
    window.attachEvent("onload", sfHover);
;
/*!
 * fancyBox - jQuery Plugin
 * version: 2.1.5 (Fri, 14 Jun 2013)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */
(function(window, document, $, undefined) {
    "use strict";
    var H = $("html"),
        W = $(window),
        D = $(document),
        F = $.fancybox = function() {
            F.open.apply(this, arguments);
        },
        IE = navigator.userAgent.match(/msie/i),
        didUpdate = null,
        isTouch = document.createTouch !== undefined,
        isQuery = function(obj) {
            return obj && obj.hasOwnProperty && obj instanceof $;
        },
        isString = function(str) {
            return str && $.type(str) === "string";
        },
        isPercentage = function(str) {
            return isString(str) && str.indexOf('%') > 0;
        },
        isScrollable = function(el) {
            return ( el && !(el.style.overflow && el.style.overflow === 'hidden') && ((el.clientWidth && el.scrollWidth > el.clientWidth) || (el.clientHeight && el.scrollHeight > el.clientHeight))) ;
        },
        getScalar = function(orig, dim) {
            var value = parseInt(orig, 10) || 0;
            if (dim && isPercentage(orig)) {
                value = F.getViewport()[dim] / 100 * value;
            }
            return Math.ceil(value);
        },
        getValue = function(value, dim) {
            return getScalar(value, dim) + 'px';
        };
    $.extend(F, {
        version: '2.1.5',
        defaults: {
            padding: 15,
            margin: 20,
            width: 800,
            height: 600,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 9999,
            maxHeight: 9999,
            pixelRatio: 1,
            autoSize: true,
            autoHeight: false,
            autoWidth: false,
            autoResize: true,
            autoCenter: !isTouch,
            fitToView: true,
            aspectRatio: false,
            topRatio: 0.5,
            leftRatio: 0.5,
            scrolling: 'auto',
            wrapCSS: '',
            arrows: true,
            closeBtn: true,
            closeClick: false,
            nextClick: false,
            mouseWheel: true,
            autoPlay: false,
            playSpeed: 3000,
            preload: 3,
            modal: false,
            loop: true,
            ajax: {
                dataType: 'html',
                headers: {
                    'X-fancyBox': true
                }
            },
            iframe: {
                scrolling: 'auto',
                preload: true
            },
            swf: {
                wmode: 'transparent',
                allowfullscreen: 'true',
                allowscriptaccess: 'always'
            },
            keys: {
                next: {
                    13: 'left',
                    34: 'up',
                    39: 'left',
                    40: 'up'
                },
                prev: {
                    8: 'right',
                    33: 'down',
                    37: 'right',
                    38: 'down'
                },
                close: [27],
                play: [32],
                toggle: [70]
            },
            direction: {
                next: 'left',
                prev: 'right'
            },
            scrollOutside: true,
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (IE ? ' allowtransparency="true"' : '') + '></iframe>',
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            },
            openEffect: 'fade',
            openSpeed: 250,
            openEasing: 'swing',
            openOpacity: true,
            openMethod: 'zoomIn',
            closeEffect: 'fade',
            closeSpeed: 250,
            closeEasing: 'swing',
            closeOpacity: true,
            closeMethod: 'zoomOut',
            nextEffect: 'elastic',
            nextSpeed: 250,
            nextEasing: 'swing',
            nextMethod: 'changeIn',
            prevEffect: 'elastic',
            prevSpeed: 250,
            prevEasing: 'swing',
            prevMethod: 'changeOut',
            helpers: {
                overlay: true,
                title: true
            },
            onCancel: $.noop,
            beforeLoad: $.noop,
            afterLoad: $.noop,
            beforeShow: $.noop,
            afterShow: $.noop,
            beforeChange: $.noop,
            beforeClose: $.noop,
            afterClose: $.noop
        },
        group: {},
        opts: {},
        previous: null,
        coming: null,
        current: null,
        isActive: false,
        isOpen: false,
        isOpened: false,
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: {
            timer: null,
            isActive: false
        },
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function(group, opts) {
            if (!group) {
                return;
            }
            if (!$.isPlainObject(opts)) {
                opts = {};
            }
            if (false === F.close(true)) {
                return;
            }
            if (!$.isArray(group)) {
                group = isQuery(group) ? $(group).get() : [group];
            }
            $.each(group, function(i, element) {
                var obj = {},
                    href,
                    title,
                    content,
                    type,
                    rez,
                    hrefParts,
                    selector;
                if ($.type(element) === "object") {
                    if (element.nodeType) {
                        element = $(element);
                    }
                    if (isQuery(element)) {
                        obj = {
                            href: element.data('fancybox-href') || element.attr('href'),
                            title: element.data('fancybox-title') || element.attr('title'),
                            isDom: true,
                            element: element
                        };
                        if ($.metadata) {
                            $.extend(true, obj, element.metadata());
                        }
                    } else {
                        obj = element;
                    }
                }
                href = opts.href || obj.href || (isString(element) ? element : null);
                title = opts.title !== undefined ? opts.title : obj.title || '';
                content = opts.content || obj.content;
                type = content ? 'html' : (opts.type || obj.type);
                if (!type && obj.isDom) {
                    type = element.data('fancybox-type');
                    if (!type) {
                        rez = element.prop('class').match(/fancybox\.(\w+)/);
                        type = rez ? rez[1] : null;
                    }
                }
                if (isString(href)) {
                    if (!type) {
                        if (F.isImage(href)) {
                            type = 'image';
                        } else if (F.isSWF(href)) {
                            type = 'swf';
                        } else if (href.charAt(0) === '#') {
                            type = 'inline';
                        } else if (isString(element)) {
                            type = 'html';
                            content = element;
                        }
                    }
                    if (type === 'ajax') {
                        hrefParts = href.split(/\s+/, 2);
                        href = hrefParts.shift();
                        selector = hrefParts.shift();
                    }
                }
                if (!content) {
                    if (type === 'inline') {
                        if (href) {
                            content = $(isString(href) ? href.replace(/.*(?=#[^\s]+$)/, '') : href);
                        } else if (obj.isDom) {
                            content = element;
                        }
                    } else if (type === 'html') {
                        content = href;
                    } else if (!type && !href && obj.isDom) {
                        type = 'inline';
                        content = element;
                    }
                }
                $.extend(obj, {
                    href: href,
                    type: type,
                    content: content,
                    title: title,
                    selector: selector
                });
                group[i] = obj;
            });
            F.opts = $.extend(true, {}, F.defaults, opts);
            if (opts.keys !== undefined) {
                F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
            }
            F.group = group;
            return F._start(F.opts.index);
        },
        cancel: function() {
            var coming = F.coming;
            if (!coming || false === F.trigger('onCancel')) {
                return;
            }
            F.hideLoading();
            if (F.ajaxLoad) {
                F.ajaxLoad.abort();
            }
            F.ajaxLoad = null;
            if (F.imgPreload) {
                F.imgPreload.onload = F.imgPreload.onerror = null;
            }
            if (coming.wrap) {
                coming.wrap.stop(true, true).trigger('onReset').remove();
            }
            F.coming = null;
            if (!F.current) {
                F._afterZoomOut(coming);
            }
        },
        close: function(event) {
            F.cancel();
            if (false === F.trigger('beforeClose')) {
                return;
            }
            F.unbindEvents();
            if (!F.isActive) {
                return;
            }
            if (!F.isOpen || event === true) {
                $('.fancybox-wrap').stop(true).trigger('onReset').remove();
                F._afterZoomOut();
            } else {
                F.isOpen = F.isOpened = false;
                F.isClosing = true;
                $('.fancybox-item, .fancybox-nav').remove();
                F.wrap.stop(true, true).removeClass('fancybox-opened');
                F.transitions[F.current.closeMethod]();
            }
        },
        play: function(action) {
            var clear = function() {
                    clearTimeout(F.player.timer);
                },
                set = function() {
                    clear();
                    if (F.current && F.player.isActive) {
                        F.player.timer = setTimeout(F.next, F.current.playSpeed);
                    }
                },
                stop = function() {
                    clear();
                    D.unbind('.player');
                    F.player.isActive = false;
                    F.trigger('onPlayEnd');
                },
                start = function() {
                    if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
                        F.player.isActive = true;
                        D.bind({
                            'onCancel.player beforeClose.player': stop,
                            'onUpdate.player': set,
                            'beforeLoad.player': clear
                        });
                        set();
                        F.trigger('onPlayStart');
                    }
                };
            if (action === true || (!F.player.isActive && action !== false)) {
                start();
            } else {
                stop();
            }
        },
        next: function(direction) {
            var current = F.current;
            if (current) {
                if (!isString(direction)) {
                    direction = current.direction.next;
                }
                F.jumpto(current.index + 1, direction, 'next');
            }
        },
        prev: function(direction) {
            var current = F.current;
            if (current) {
                if (!isString(direction)) {
                    direction = current.direction.prev;
                }
                F.jumpto(current.index - 1, direction, 'prev');
            }
        },
        jumpto: function(index, direction, router) {
            var current = F.current;
            if (!current) {
                return;
            }
            index = getScalar(index);
            F.direction = direction || current.direction[(index >= current.index ? 'next' : 'prev')];
            F.router = router || 'jumpto';
            if (current.loop) {
                if (index < 0) {
                    index = current.group.length + (index % current.group.length);
                }
                index = index % current.group.length;
            }
            if (current.group[index] !== undefined) {
                F.cancel();
                F._start(index);
            }
        },
        reposition: function(e, onlyAbsolute) {
            var current = F.current,
                wrap = current ? current.wrap : null,
                pos;
            if (wrap) {
                pos = F._getPosition(onlyAbsolute);
                if (e && e.type === 'scroll') {
                    delete pos.position;
                    wrap.stop(true, true).animate(pos, 200);
                } else {
                    wrap.css(pos);
                    current.pos = $.extend({}, current.dim, pos);
                }
            }
        },
        update: function(e) {
            var type = (e && e.type),
                anyway = !type || type === 'orientationchange';
            if (anyway) {
                clearTimeout(didUpdate);
                didUpdate = null;
            }
            if (!F.isOpen || didUpdate) {
                return;
            }
            didUpdate = setTimeout(function() {
                var current = F.current;
                if (!current || F.isClosing) {
                    return;
                }
                F.wrap.removeClass('fancybox-tmp');
                if (anyway || type === 'load' || (type === 'resize' && current.autoResize)) {
                    F._setDimension();
                }
                if (!(type === 'scroll' && current.canShrink)) {
                    F.reposition(e);
                }
                F.trigger('onUpdate');
                didUpdate = null;
            }, (anyway && !isTouch ? 0 : 300));
        },
        toggle: function(action) {
            if (F.isOpen) {
                F.current.fitToView = $.type(action) === "boolean" ? action : !F.current.fitToView;
                if (isTouch) {
                    F.wrap.removeAttr('style').addClass('fancybox-tmp');
                    F.trigger('onUpdate');
                }
                F.update();
            }
        },
        hideLoading: function() {
            D.unbind('.loading');
            $('#fancybox-loading').remove();
        },
        showLoading: function() {
            var el,
                viewport;
            F.hideLoading();
            el = $('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo('body');
            D.bind('keydown.loading', function(e) {
                if ((e.which || e.keyCode) === 27) {
                    e.preventDefault();
                    F.cancel();
                }
            });
            if (!F.defaults.fixed) {
                viewport = F.getViewport();
                el.css({
                    position: 'absolute',
                    top: (viewport.h * 0.5) + viewport.y,
                    left: (viewport.w * 0.5) + viewport.x
                });
            }
        },
        getViewport: function() {
            var locked = (F.current && F.current.locked) || false,
                rez = {
                    x: W.scrollLeft(),
                    y: W.scrollTop()
                };
            if (locked) {
                rez.w = locked[0].clientWidth;
                rez.h = locked[0].clientHeight;
            } else {
                rez.w = isTouch && window.innerWidth ? window.innerWidth : W.width();
                rez.h = isTouch && window.innerHeight ? window.innerHeight : W.height();
            }
            return rez;
        },
        unbindEvents: function() {
            if (F.wrap && isQuery(F.wrap)) {
                F.wrap.unbind('.fb');
            }
            D.unbind('.fb');
            W.unbind('.fb');
            $('body').undelegate('*', 'touchmove', this._preventTouchMove);
        },
        bindEvents: function() {
            var current = F.current,
                keys;
            if (!current) {
                return;
            }
            W.bind('orientationchange.fb' + (isTouch ? '' : ' resize.fb') + (current.autoCenter && !current.locked ? ' scroll.fb' : ''), F.update);
            keys = current.keys;
            if (keys) {
                D.bind('keydown.fb', function(e) {
                    var code = e.which || e.keyCode,
                        target = e.target || e.srcElement;
                    if (code === 27 && F.coming) {
                        return false;
                    }
                    if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || $(target).is('[contenteditable]')))) {
                        $.each(keys, function(i, val) {
                            if (current.group.length > 1 && val[code] !== undefined) {
                                F[i](val[code]);
                                e.preventDefault();
                                return false;
                            }
                            if ($.inArray(code, val) > -1) {
                                F[i]();
                                e.preventDefault();
                                return false;
                            }
                        });
                    }
                });
            }
            if ($.fn.mousewheel && current.mouseWheel) {
                F.wrap.bind('mousewheel.fb', function(e, delta, deltaX, deltaY) {
                    var target = e.target || null,
                        parent = $(target),
                        canScroll = false;
                    while (parent.length) {
                        if (canScroll || parent.is('.fancybox-skin') || parent.is('.fancybox-wrap')) {
                            break;
                        }
                        canScroll = isScrollable(parent[0]);
                        parent = $(parent).parent();
                    }
                    if (delta !== 0 && !canScroll) {
                        if (F.group.length > 1 && !current.canShrink) {
                            if (deltaY > 0 || deltaX > 0) {
                                F.prev(deltaY > 0 ? 'down' : 'left');
                            } else if (deltaY < 0 || deltaX < 0) {
                                F.next(deltaY < 0 ? 'up' : 'right');
                            }
                            e.preventDefault();
                        }
                    }
                });
            }
            $('body').delegate('*', 'touchmove', this._preventTouchMove);
        },
        trigger: function(event, o) {
            var ret,
                obj = o || F.coming || F.current;
            if (!obj) {
                return;
            }
            if ($.isFunction(obj[event])) {
                ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
            }
            if (ret === false) {
                return false;
            }
            if (obj.helpers) {
                $.each(obj.helpers, function(helper, opts) {
                    if (opts && F.helpers[helper] && $.isFunction(F.helpers[helper][event])) {
                        F.helpers[helper][event]($.extend(true, {}, F.helpers[helper].defaults, opts), obj);
                    }
                });
            }
            D.trigger(event);
        },
        isImage: function(str) {
            return isString(str) && str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
        },
        isSWF: function(str) {
            return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
        },
        _preventTouchMove: function(e) {
            e.preventDefault();
            return false;
        },
        _start: function(index) {
            var coming = {},
                obj,
                href,
                type,
                margin,
                padding;
            index = getScalar(index);
            obj = F.group[index] || null;
            if (!obj) {
                return false;
            }
            coming = $.extend(true, {}, F.opts, obj);
            margin = coming.margin;
            padding = coming.padding;
            if ($.type(margin) === 'number') {
                coming.margin = [$('.rd-mobilepanel').length ? $('.rd-mobilepanel').outerHeight() + margin : margin, margin, margin, margin];
            }
            if ($.type(padding) === 'number') {
                coming.padding = [padding, padding, padding, padding];
            }
            if (coming.modal) {
                $.extend(true, coming, {
                    closeBtn: false,
                    closeClick: false,
                    nextClick: false,
                    arrows: false,
                    mouseWheel: false,
                    keys: null,
                    helpers: {
                        overlay: {
                            closeClick: false
                        }
                    }
                });
            }
            if (coming.autoSize) {
                coming.autoWidth = coming.autoHeight = true;
            }
            if (coming.width === 'auto') {
                coming.autoWidth = true;
            }
            if (coming.height === 'auto') {
                coming.autoHeight = true;
            }
            coming.group = F.group;
            coming.index = index;
            F.coming = coming;
            if (false === F.trigger('beforeLoad')) {
                F.coming = null;
                return;
            }
            type = coming.type;
            href = coming.href;
            if (!type) {
                F.coming = null;
                if (F.current && F.router && F.router !== 'jumpto') {
                    F.current.index = index;
                    return F[F.router](F.direction);
                }
                return false;
            }
            F.isActive = true;
            if (type === 'image' || type === 'swf') {
                coming.autoHeight = coming.autoWidth = false;
                coming.scrolling = 'visible';
            }
            if (type === 'image') {
                coming.aspectRatio = true;
            }
            if (type === 'iframe' && isTouch) {
                coming.scrolling = 'scroll';
            }
            coming.wrap = $(coming.tpl.wrap).addClass('fancybox-' + (isTouch ? 'mobile' : 'desktop') + ' fancybox-type-' + type + ' fancybox-tmp ' + coming.wrapCSS).appendTo(coming.parent || 'body');
            $.extend(coming, {
                skin: $('.fancybox-skin', coming.wrap),
                outer: $('.fancybox-outer', coming.wrap),
                inner: $('.fancybox-inner', coming.wrap)
            });
            $.each(["Top", "Right", "Bottom", "Left"], function(i, v) {
                coming.skin.css('padding' + v, getValue(coming.padding[i]));
            });
            F.trigger('onReady');
            if (type === 'inline' || type === 'html') {
                if (!coming.content || !coming.content.length) {
                    return F._error('content');
                }
            } else if (!href) {
                return F._error('href');
            }
            if (type === 'image') {
                F._loadImage();
            } else if (type === 'ajax') {
                F._loadAjax();
            } else if (type === 'iframe') {
                F._loadIframe();
            } else {
                F._afterLoad();
            }
        },
        _error: function(type) {
            $.extend(F.coming, {
                type: 'html',
                autoWidth: true,
                autoHeight: true,
                minWidth: 0,
                minHeight: 0,
                scrolling: 'no',
                hasError: type,
                content: F.coming.tpl.error
            });
            F._afterLoad();
        },
        _loadImage: function() {
            var img = F.imgPreload = new Image();
            img.onload = function() {
                this.onload = this.onerror = null;
                F.coming.width = this.width / F.opts.pixelRatio;
                F.coming.height = this.height / F.opts.pixelRatio;
                F._afterLoad();
            };
            img.onerror = function() {
                this.onload = this.onerror = null;
                F._error('image');
            };
            img.src = F.coming.href;
            if (img.complete !== true) {
                F.showLoading();
            }
        },
        _loadAjax: function() {
            var coming = F.coming;
            F.showLoading();
            F.ajaxLoad = $.ajax($.extend({}, coming.ajax, {
                url: coming.href,
                error: function(jqXHR, textStatus) {
                    if (F.coming && textStatus !== 'abort') {
                        F._error('ajax', jqXHR);
                    } else {
                        F.hideLoading();
                    }
                },
                success: function(data, textStatus) {
                    if (textStatus === 'success') {
                        coming.content = data;
                        F._afterLoad();
                    }
                }
            }));
        },
        _loadIframe: function() {
            var coming = F.coming,
                iframe = $(coming.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime())).attr('scrolling', isTouch ? 'auto' : coming.iframe.scrolling).attr('src', coming.href);
            $(coming.wrap).bind('onReset', function() {
                try {
                    $(this).find('iframe').hide().attr('src', '//about:blank').end().empty();
                } catch (e) {}
            });
            if (coming.iframe.preload) {
                F.showLoading();
                iframe.one('load', function() {
                    $(this).data('ready', 1);
                    if (!isTouch) {
                        $(this).bind('load.fb', F.update);
                    }
                    $(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp').show();
                    F._afterLoad();
                });
            }
            coming.content = iframe.appendTo(coming.inner);
            if (!coming.iframe.preload) {
                F._afterLoad();
            }
        },
        _preloadImages: function() {
            var group = F.group,
                current = F.current,
                len = group.length,
                cnt = current.preload ? Math.min(current.preload, len - 1) : 0,
                item,
                i;
            for (i = 1; i <= cnt; i += 1) {
                item = group[(current.index + i) % len];
                if (item.type === 'image' && item.href) {
                    new Image().src = item.href;
                }
            }
        },
        _afterLoad: function() {
            var coming = F.coming,
                previous = F.current,
                placeholder = 'fancybox-placeholder',
                current,
                content,
                type,
                scrolling,
                href,
                embed;
            F.hideLoading();
            if (!coming || F.isActive === false) {
                return;
            }
            if (false === F.trigger('afterLoad', coming, previous)) {
                coming.wrap.stop(true).trigger('onReset').remove();
                F.coming = null;
                return;
            }
            if (previous) {
                F.trigger('beforeChange', previous);
                previous.wrap.stop(true).removeClass('fancybox-opened').find('.fancybox-item, .fancybox-nav').remove();
            }
            F.unbindEvents();
            current = coming;
            content = coming.content;
            type = coming.type;
            scrolling = coming.scrolling;
            $.extend(F, {
                wrap: current.wrap,
                skin: current.skin,
                outer: current.outer,
                inner: current.inner,
                current: current,
                previous: previous
            });
            href = current.href;
            switch (type) {
            case 'inline':
            case 'ajax':
            case 'html':
                if (current.selector) {
                    content = $('<div>').html(content).find(current.selector);
                } else if (isQuery(content)) {
                    if (!content.data(placeholder)) {
                        content.data(placeholder, $('<div class="' + placeholder + '"></div>').insertAfter(content).hide());
                    }
                    content = content.show().detach();
                    current.wrap.bind('onReset', function() {
                        if ($(this).find(content).length) {
                            content.hide().replaceAll(content.data(placeholder)).data(placeholder, false);
                        }
                    });
                }
                break;
            case 'image':
                content = current.tpl.image.replace('{href}', href);
                break;
            case 'swf':
                content = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + href + '"></param>';
                embed = '';
                $.each(current.swf, function(name, val) {
                    content += '<param name="' + name + '" value="' + val + '"></param>';
                    embed += ' ' + name + '="' + val + '"';
                });
                content += '<embed src="' + href + '" type="application/x-shockwave-flash" width="100%" height="100%"' + embed + '></embed></object>';
                break;
            }
            if (!(isQuery(content) && content.parent().is(current.inner))) {
                current.inner.append(content);
            }
            F.trigger('beforeShow');
            current.inner.css('overflow', scrolling === 'yes' ? 'scroll' : (scrolling === 'no' ? 'hidden' : scrolling));
            F._setDimension();
            F.reposition();
            F.isOpen = false;
            F.coming = null;
            F.bindEvents();
            if (!F.isOpened) {
                $('.fancybox-wrap').not(current.wrap).stop(true).trigger('onReset').remove();
            } else if (previous.prevMethod) {
                F.transitions[previous.prevMethod]();
            }
            F.transitions[F.isOpened ? current.nextMethod : current.openMethod]();
            F._preloadImages();
        },
        _setDimension: function() {
            var viewport = F.getViewport(),
                steps = 0,
                canShrink = false,
                canExpand = false,
                wrap = F.wrap,
                skin = F.skin,
                inner = F.inner,
                current = F.current,
                width = current.width,
                height = current.height,
                minWidth = current.minWidth,
                minHeight = current.minHeight,
                maxWidth = current.maxWidth,
                maxHeight = current.maxHeight,
                scrolling = current.scrolling,
                scrollOut = current.scrollOutside ? current.scrollbarWidth : 0,
                margin = current.margin,
                wMargin = getScalar(margin[1] + margin[3]),
                hMargin = getScalar(margin[0] + margin[2]),
                wPadding,
                hPadding,
                wSpace,
                hSpace,
                origWidth,
                origHeight,
                origMaxWidth,
                origMaxHeight,
                ratio,
                width_,
                height_,
                maxWidth_,
                maxHeight_,
                iframe,
                body;
            wrap.add(skin).add(inner).width('auto').height('auto').removeClass('fancybox-tmp');
            wPadding = getScalar(skin.outerWidth(true) - skin.width());
            hPadding = getScalar(skin.outerHeight(true) - skin.height());
            wSpace = wMargin + wPadding;
            hSpace = hMargin + hPadding;
            origWidth = isPercentage(width) ? (viewport.w - wSpace) * getScalar(width) / 100 : width;
            origHeight = isPercentage(height) ? (viewport.h - hSpace) * getScalar(height) / 100 : height;
            if (current.type === 'iframe') {
                iframe = current.content;
                if (current.autoHeight && iframe.data('ready') === 1) {
                    try {
                        if (iframe[0].contentWindow.document.location) {
                            inner.width(origWidth).height(9999);
                            body = iframe.contents().find('body');
                            if (scrollOut) {
                                body.css('overflow-x', 'hidden');
                            }
                            origHeight = body.outerHeight(true);
                        }
                    } catch (e) {}
                }
            } else if (current.autoWidth || current.autoHeight) {
                inner.addClass('fancybox-tmp');
                if (!current.autoWidth) {
                    inner.width(origWidth);
                }
                if (!current.autoHeight) {
                    inner.height(origHeight);
                }
                if (current.autoWidth) {
                    origWidth = inner.width();
                }
                if (current.autoHeight) {
                    origHeight = inner.height();
                }
                inner.removeClass('fancybox-tmp');
            }
            width = getScalar(origWidth);
            height = getScalar(origHeight);
            ratio = origWidth / origHeight;
            minWidth = getScalar(isPercentage(minWidth) ? getScalar(minWidth, 'w') - wSpace : minWidth);
            maxWidth = getScalar(isPercentage(maxWidth) ? getScalar(maxWidth, 'w') - wSpace : maxWidth);
            minHeight = getScalar(isPercentage(minHeight) ? getScalar(minHeight, 'h') - hSpace : minHeight);
            maxHeight = getScalar(isPercentage(maxHeight) ? getScalar(maxHeight, 'h') - hSpace : maxHeight);
            origMaxWidth = maxWidth;
            origMaxHeight = maxHeight;
            if (current.fitToView) {
                maxWidth = Math.min(viewport.w - wSpace, maxWidth);
                maxHeight = Math.min(viewport.h - hSpace, maxHeight);
            }
            maxWidth_ = viewport.w - wMargin;
            maxHeight_ = viewport.h - hMargin;
            if (current.aspectRatio) {
                if (width > maxWidth) {
                    width = maxWidth;
                    height = getScalar(width / ratio);
                }
                if (height > maxHeight) {
                    height = maxHeight;
                    width = getScalar(height * ratio);
                }
                if (width < minWidth) {
                    width = minWidth;
                    height = getScalar(width / ratio);
                }
                if (height < minHeight) {
                    height = minHeight;
                    width = getScalar(height * ratio);
                }
            } else {
                width = Math.max(minWidth, Math.min(width, maxWidth));
                if (current.autoHeight && current.type !== 'iframe') {
                    inner.width(width);
                    height = inner.height();
                }
                height = Math.max(minHeight, Math.min(height, maxHeight));
            }
            if (current.fitToView) {
                inner.width(width).height(height);
                wrap.width(width + wPadding);
                width_ = wrap.width();
                height_ = wrap.height();
                if (current.aspectRatio) {
                    while ((width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight) {
                        if (steps++ > 19) {
                            break;
                        }
                        height = Math.max(minHeight, Math.min(maxHeight, height - 10));
                        width = getScalar(height * ratio);
                        if (width < minWidth) {
                            width = minWidth;
                            height = getScalar(width / ratio);
                        }
                        if (width > maxWidth) {
                            width = maxWidth;
                            height = getScalar(width / ratio);
                        }
                        inner.width(width).height(height);
                        wrap.width(width + wPadding);
                        width_ = wrap.width();
                        height_ = wrap.height();
                    }
                } else {
                    width = Math.max(minWidth, Math.min(width, width - (width_ - maxWidth_)));
                    height = Math.max(minHeight, Math.min(height, height - (height_ - maxHeight_)));
                }
            }
            if (scrollOut && scrolling === 'auto' && height < origHeight && (width + wPadding + scrollOut) < maxWidth_) {
                width += scrollOut;
            }
            inner.width(width).height(height);
            wrap.width(width + wPadding);
            width_ = wrap.width();
            height_ = wrap.height();
            canShrink = (width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight;
            canExpand = current.aspectRatio ? (width < origMaxWidth && height < origMaxHeight && width < origWidth && height < origHeight) : ((width < origMaxWidth || height < origMaxHeight) && (width < origWidth || height < origHeight));
            $.extend(current, {
                dim: {
                    width: getValue(width_),
                    height: getValue(height_)
                },
                origWidth: origWidth,
                origHeight: origHeight,
                canShrink: canShrink,
                canExpand: canExpand,
                wPadding: wPadding,
                hPadding: hPadding,
                wrapSpace: height_ - skin.outerHeight(true),
                skinSpace: skin.height() - height
            });
            if (!iframe && current.autoHeight && height > minHeight && height < maxHeight && !canExpand) {
                inner.height('auto');
            }
        },
        _getPosition: function(onlyAbsolute) {
            var current = F.current,
                viewport = F.getViewport(),
                margin = current.margin,
                width = F.wrap.width() + margin[1] + margin[3],
                height = F.wrap.height() + margin[0] + margin[2],
                rez = {
                    position: 'absolute',
                    top: margin[0],
                    left: margin[3]
                };
            if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) {
                rez.position = 'fixed';
            } else if (!current.locked) {
                rez.top += viewport.y;
                rez.left += viewport.x;
            }
            rez.top = getValue(Math.max(rez.top, rez.top + ((viewport.h - height) * current.topRatio)));
            rez.left = getValue(Math.max(rez.left, rez.left + ((viewport.w - width) * current.leftRatio)));
            return rez;
        },
        _afterZoomIn: function() {
            var current = F.current;
            if (!current) {
                return;
            }
            F.isOpen = F.isOpened = true;
            F.wrap.css('overflow', 'visible').addClass('fancybox-opened');
            F.update();
            if (current.closeClick || (current.nextClick && F.group.length > 1)) {
                F.inner.css('cursor', 'pointer').bind('click.fb', function(e) {
                    if (!$(e.target).is('a') && !$(e.target).parent().is('a')) {
                        e.preventDefault();
                        F[current.closeClick ? 'close' : 'next']();
                    }
                });
            }
            if (current.closeBtn) {
                $(current.tpl.closeBtn).appendTo(F.skin).bind('click.fb', function(e) {
                    e.preventDefault();
                    F.close();
                });
            }
            if (current.arrows && F.group.length > 1) {
                if (current.loop || current.index > 0) {
                    $(current.tpl.prev).appendTo(F.outer).bind('click.fb', F.prev);
                }
                if (current.loop || current.index < F.group.length - 1) {
                    $(current.tpl.next).appendTo(F.outer).bind('click.fb', F.next);
                }
            }
            F.trigger('afterShow');
            if (!current.loop && current.index === current.group.length - 1) {
                F.play(false);
            } else if (F.opts.autoPlay && !F.player.isActive) {
                F.opts.autoPlay = false;
                F.play();
            }
        },
        _afterZoomOut: function(obj) {
            obj = obj || F.current;
            $('.fancybox-wrap').trigger('onReset').remove();
            $.extend(F, {
                group: {},
                opts: {},
                router: false,
                current: null,
                isActive: false,
                isOpened: false,
                isOpen: false,
                isClosing: false,
                wrap: null,
                skin: null,
                outer: null,
                inner: null
            });
            F.trigger('afterClose', obj);
        }
    });
    F.transitions = {
        getOrigPosition: function() {
            var current = F.current,
                element = current.element,
                orig = current.orig,
                pos = {},
                width = 50,
                height = 50,
                hPadding = current.hPadding,
                wPadding = current.wPadding,
                viewport = F.getViewport();
            if (!orig && current.isDom && element.is(':visible')) {
                orig = element.find('img:first');
                if (!orig.length) {
                    orig = element;
                }
            }
            if (isQuery(orig)) {
                pos = orig.offset();
                if (orig.is('img')) {
                    width = orig.outerWidth();
                    height = orig.outerHeight();
                }
            } else {
                pos.top = viewport.y + (viewport.h - height) * current.topRatio;
                pos.left = viewport.x + (viewport.w - width) * current.leftRatio;
            }
            if (F.wrap.css('position') === 'fixed' || current.locked) {
                pos.top -= viewport.y;
                pos.left -= viewport.x;
            }
            pos = {
                top: getValue(pos.top - hPadding * current.topRatio),
                left: getValue(pos.left - wPadding * current.leftRatio),
                width: getValue(width + wPadding),
                height: getValue(height + hPadding)
            };
            return pos;
        },
        step: function(now, fx) {
            var ratio,
                padding,
                value,
                prop = fx.prop,
                current = F.current,
                wrapSpace = current.wrapSpace,
                skinSpace = current.skinSpace;
            if (prop === 'width' || prop === 'height') {
                ratio = fx.end === fx.start ? 1 : (now - fx.start) / (fx.end - fx.start);
                if (F.isClosing) {
                    ratio = 1 - ratio;
                }
                padding = prop === 'width' ? current.wPadding : current.hPadding;
                value = now - padding;
                F.skin[prop](getScalar(prop === 'width' ? value : value - (wrapSpace * ratio)));
                F.inner[prop](getScalar(prop === 'width' ? value : value - (wrapSpace * ratio) - (skinSpace * ratio)));
            }
        },
        zoomIn: function() {
            var current = F.current,
                startPos = current.pos,
                effect = current.openEffect,
                elastic = effect === 'elastic',
                endPos = $.extend({
                    opacity: 1
                }, startPos);
            delete endPos.position;
            if (elastic) {
                startPos = this.getOrigPosition();
                if (current.openOpacity) {
                    startPos.opacity = 0.1;
                }
            } else if (effect === 'fade') {
                startPos.opacity = 0.1;
            }
            F.wrap.css(startPos).animate(endPos, {
                duration: effect === 'none' ? 0 : current.openSpeed,
                easing: current.openEasing,
                step: elastic ? this.step : null,
                complete: F._afterZoomIn
            });
        },
        zoomOut: function() {
            var current = F.current,
                effect = current.closeEffect,
                elastic = effect === 'elastic',
                endPos = {
                    opacity: 0.1
                };
            if (elastic) {
                endPos = this.getOrigPosition();
                if (current.closeOpacity) {
                    endPos.opacity = 0.1;
                }
            }
            F.wrap.animate(endPos, {
                duration: effect === 'none' ? 0 : current.closeSpeed,
                easing: current.closeEasing,
                step: elastic ? this.step : null,
                complete: F._afterZoomOut
            });
        },
        changeIn: function() {
            var current = F.current,
                effect = current.nextEffect,
                startPos = current.pos,
                endPos = {
                    opacity: 1
                },
                direction = F.direction,
                distance = 200,
                field;
            startPos.opacity = 0.1;
            if (effect === 'elastic') {
                field = direction === 'down' || direction === 'up' ? 'top' : 'left';
                if (direction === 'down' || direction === 'right') {
                    startPos[field] = getValue(getScalar(startPos[field]) - distance);
                    endPos[field] = '+=' + distance + 'px';
                } else {
                    startPos[field] = getValue(getScalar(startPos[field]) + distance);
                    endPos[field] = '-=' + distance + 'px';
                }
            }
            if (effect === 'none') {
                F._afterZoomIn();
            } else {
                F.wrap.css(startPos).animate(endPos, {
                    duration: current.nextSpeed,
                    easing: current.nextEasing,
                    complete: F._afterZoomIn
                });
            }
        },
        changeOut: function() {
            var previous = F.previous,
                effect = previous.prevEffect,
                endPos = {
                    opacity: 0.1
                },
                direction = F.direction,
                distance = 200;
            if (effect === 'elastic') {
                endPos[direction === 'down' || direction === 'up' ? 'top' : 'left'] = (direction === 'up' || direction === 'left' ? '-' : '+') + '=' + distance + 'px';
            }
            previous.wrap.animate(endPos, {
                duration: effect === 'none' ? 0 : previous.prevSpeed,
                easing: previous.prevEasing,
                complete: function() {
                    $(this).trigger('onReset').remove();
                }
            });
        }
    };
    F.helpers.overlay = {
        defaults: {
            closeClick: true,
            speedOut: 200,
            showEarly: true,
            css: {},
            locked: !isTouch,
            fixed: true
        },
        overlay: null,
        fixed: false,
        el: $('html'),
        create: function(opts) {
            opts = $.extend({}, this.defaults, opts);
            if (this.overlay) {
                this.close();
            }
            this.overlay = $('<div class="fancybox-overlay"></div>').appendTo(F.coming ? F.coming.parent : opts.parent);
            this.fixed = false;
            if (opts.fixed && F.defaults.fixed) {
                this.overlay.addClass('fancybox-overlay-fixed');
                this.fixed = true;
            }
        },
        open: function(opts) {
            var that = this;
            opts = $.extend({}, this.defaults, opts);
            if (this.overlay) {
                this.overlay.unbind('.overlay').width('auto').height('auto');
            } else {
                this.create(opts);
            }
            if (!this.fixed) {
                W.bind('resize.overlay', $.proxy(this.update, this));
                this.update();
            }
            if (opts.closeClick) {
                this.overlay.bind('click.overlay', function(e) {
                    if ($(e.target).hasClass('fancybox-overlay')) {
                        if (F.isActive) {
                            F.close();
                        } else {
                            that.close();
                        }
                        return false;
                    }
                });
            }
            this.overlay.css(opts.css).show();
        },
        close: function() {
            var scrollV,
                scrollH;
            W.unbind('resize.overlay');
            if (this.el.hasClass('fancybox-lock')) {
                $('.fancybox-margin').removeClass('fancybox-margin');
                scrollV = W.scrollTop();
                scrollH = W.scrollLeft();
                this.el.removeClass('fancybox-lock');
                W.scrollTop(scrollV).scrollLeft(scrollH);
            }
            $('.fancybox-overlay').remove().hide();
            $.extend(this, {
                overlay: null,
                fixed: false
            });
        },
        update: function() {
            var width = '100%',
                offsetWidth;
            this.overlay.width(width).height('100%');
            if (IE) {
                offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
                if (D.width() > offsetWidth) {
                    width = D.width();
                }
            } else if (D.width() > W.width()) {
                width = D.width();
            }
            this.overlay.width(width).height(D.height());
        },
        onReady: function(opts, obj) {
            var overlay = this.overlay;
            $('.fancybox-overlay').stop(true, true);
            if (!overlay) {
                this.create(opts);
            }
            if (opts.locked && this.fixed && obj.fixed) {
                if (!overlay) {
                    this.margin = D.height() > W.height() ? $('html').css('margin-right').replace("px", "") : false;
                }
                obj.locked = this.overlay.append(obj.wrap);
                obj.fixed = false;
            }
            if (opts.showEarly === true) {
                this.beforeShow.apply(this, arguments);
            }
        },
        beforeShow: function(opts, obj) {
            var scrollV,
                scrollH;
            if (obj.locked) {
                if (this.margin !== false) {
                    $('*').filter(function() {
                        return ( $(this).css('position') === 'fixed' && !$(this).hasClass("fancybox-overlay") && !$(this).hasClass("fancybox-wrap")) ;
                    }).addClass('fancybox-margin');
                    this.el.addClass('fancybox-margin');
                }
                scrollV = W.scrollTop();
                scrollH = W.scrollLeft();
                this.el.addClass('fancybox-lock');
                W.scrollTop(scrollV).scrollLeft(scrollH);
            }
            this.open(opts);
        },
        onUpdate: function() {
            if (!this.fixed) {
                this.update();
            }
        },
        afterClose: function(opts) {
            if (this.overlay && !F.coming) {
                this.overlay.fadeOut(opts.speedOut, $.proxy(this.close, this));
            }
        }
    };
    F.helpers.title = {
        defaults: {
            type: 'float',
            position: 'bottom'
        },
        beforeShow: function(opts) {
            var current = F.current,
                text = current.title,
                type = opts.type,
                title,
                target;
            if ($.isFunction(text)) {
                text = text.call(current.element, current);
            }
            if (!isString(text) || $.trim(text) === '') {
                return;
            }
            title = $('<div class="fancybox-title fancybox-title-' + type + '-wrap">' + text + '</div>');
            switch (type) {
            case 'inside':
                target = F.skin;
                break;
            case 'outside':
                target = F.wrap;
                break;
            case 'over':
                target = F.inner;
                break;
            default:
                target = F.skin;
                title.appendTo('body');
                if (IE) {
                    title.width(title.width());
                }
                title.wrapInner('<span class="child"></span>');
                F.current.margin[2] += Math.abs(getScalar(title.css('margin-bottom')));
                break;
            }
            title[(opts.position === 'top' ? 'prependTo' : 'appendTo')](target);
        }
    };
    $.fn.fancybox = function(options) {
        var index,
            that = $(this),
            selector = this.selector || '',
            run = function(e) {
                var what = $(this).blur(),
                    idx = index,
                    relType,
                    relVal;
                if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !what.is('.fancybox-wrap')) {
                    relType = options.groupAttr || 'data-fancybox-group';
                    relVal = what.attr(relType);
                    if (!relVal) {
                        relType = 'rel';
                        relVal = what.get(0)[relType];
                    }
                    if (relVal && relVal !== '' && relVal !== 'nofollow') {
                        what = selector.length ? $(selector) : that;
                        what = what.filter('[' + relType + '="' + relVal + '"]');
                        idx = what.index(this);
                    }
                    options.index = idx;
                    if (F.open(what, options) !== false) {
                        e.preventDefault();
                    }
                }
            };
        options = options || {};
        index = options.index || 0;
        if (!selector || options.live === false) {
            that.unbind('click.fb-start').bind('click.fb-start', run);
        } else {
            D.undelegate(selector, 'click.fb-start').delegate(selector + ":not('.fancybox-item, .fancybox-nav')", 'click.fb-start', run);
        }
        this.filter('[data-fancybox-start=1]').trigger('click');
        return this;
    };
    D.ready(function() {
        var w1,
            w2;
        if ($.scrollbarWidth === undefined) {
            $.scrollbarWidth = function() {
                var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
                    child = parent.children(),
                    width = child.innerWidth() - child.height(99).innerWidth();
                parent.remove();
                return width;
            };
        }
        if ($.support.fixedPosition === undefined) {
            $.support.fixedPosition = (function() {
                var elem = $('<div style="position:fixed;top:20px;"></div>').appendTo('body'),
                    fixed = (elem[0].offsetTop === 20 || elem[0].offsetTop === 15);
                elem.remove();
                return fixed;
            }());
        }
        $.extend(F.defaults, {
            scrollbarWidth: $.scrollbarWidth(),
            fixed: $.support.fixedPosition,
            parent: $('body')
        });
        w1 = $(window).width();
        H.addClass('fancybox-lock-test');
        w2 = $(window).width();
        H.removeClass('fancybox-lock-test');
        $("<style type='text/css'>.fancybox-margin{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");
    });
}(window, document, jQuery));
;
/*!
 * Buttons helper for fancyBox
 * version: 1.0.5 (Mon, 15 Oct 2012)
 * @requires fancyBox v2.0 or later
 *
 * Usage:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             buttons: {
 *                 position : 'top'
 *             }
 *         }
 *     });
 *
 */
(function($) {
    var F = $.fancybox;
    F.helpers.buttons = {
        defaults: {
            skipSingle: false,
            position: 'top',
            tpl: '<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="Previous" href="javascript:;"></a></li><li><a class="btnPlay" title="Start slideshow" href="javascript:;"></a></li><li><a class="btnNext" title="Next" href="javascript:;"></a></li><li><a class="btnToggle" title="Toggle size" href="javascript:;"></a></li><li><a class="btnClose" title="Close" href="javascript:;"></a></li></ul></div>'
        },
        list: null,
        buttons: null,
        beforeLoad: function(opts, obj) {
            if (opts.skipSingle && obj.group.length < 2) {
                obj.helpers.buttons = false;
                obj.closeBtn = true;
                return;
            }
            obj.margin[opts.position === 'bottom' ? 2 : 0] += 30;
        },
        onPlayStart: function() {
            if (this.buttons) {
                this.buttons.play.attr('title', 'Pause slideshow').addClass('btnPlayOn');
            }
        },
        onPlayEnd: function() {
            if (this.buttons) {
                this.buttons.play.attr('title', 'Start slideshow').removeClass('btnPlayOn');
            }
        },
        afterShow: function(opts, obj) {
            var buttons = this.buttons;
            if (!buttons) {
                this.list = $(opts.tpl).addClass(opts.position).appendTo('body');
                buttons = {
                    prev: this.list.find('.btnPrev').click(F.prev),
                    next: this.list.find('.btnNext').click(F.next),
                    play: this.list.find('.btnPlay').click(F.play),
                    toggle: this.list.find('.btnToggle').click(F.toggle),
                    close: this.list.find('.btnClose').click(F.close)
                }
            }
            if (obj.index > 0 || obj.loop) {
                buttons.prev.removeClass('btnDisabled');
            } else {
                buttons.prev.addClass('btnDisabled');
            }
            if (obj.loop || obj.index < obj.group.length - 1) {
                buttons.next.removeClass('btnDisabled');
                buttons.play.removeClass('btnDisabled');
            } else {
                buttons.next.addClass('btnDisabled');
                buttons.play.addClass('btnDisabled');
            }
            this.buttons = buttons;
            this.onUpdate(opts, obj);
        },
        onUpdate: function(opts, obj) {
            var toggle;
            if (!this.buttons) {
                return;
            }
            toggle = this.buttons.toggle.removeClass('btnDisabled btnToggleOn');
            if (obj.canShrink) {
                toggle.addClass('btnToggleOn');
            } else if (!obj.canExpand) {
                toggle.addClass('btnDisabled');
            }
        },
        beforeClose: function() {
            if (this.list) {
                this.list.remove();
            }
            this.list = null;
            this.buttons = null;
        }
    };
}(jQuery));
;
function in_array(p_val, arrData)
{
    var i = 0;
    var count = arrData.length;
    for (i = 0; i < count; i++)
    {
        if (arrData[i] === p_val)
        {
            return true;
        }
    }
    return false;
}
function time()
{
    var $time = new Date();
    return Math.ceil($time.getTime() / 1000);
}
function isset(val)
{
    var outPut = true;
    try
    {
        eval(val);
    }
    catch (e)
    {
        outPut = false;
    }
    return outPut;
}
function is_int(val)
{
    return parseInt(val) === val;
}
function number_format(nStr)
{
    nStr += "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(nStr))
    {
        nStr = nStr.replace(rgx, '$1' + ',' + '$2');
    }
    return nStr;
}
function mktime()
{
    var d = new Date(),
        r = arguments,
        i = 0,
        e = ['Hours', 'Minutes', 'Seconds', 'Month', 'Date', 'FullYear'];
    for (i = 0; i < e.length; i++) {
        if (typeof r[i] === 'undefined') {
            r[i] = d['get' + e[i]]();
            r[i] += (i === 3);
        } else {
            r[i] = parseInt(r[i], 10);
            if (isNaN(r[i])) {
                return false;
            }
        }
    }
    r[5] += (r[5] >= 0 ? (r[5] <= 69 ? 2e3 : (r[5] <= 100 ? 1900 : 0)) : 0);
    d.setFullYear(r[5], r[3] - 1, r[4]);
    d.setHours(r[0], r[1], r[2]);
    return (d.getTime() / 1e3 >> 0) - (d.getTime() < 0);
}
function date(format, timestamp)
{
    var that = this,
        jsdate,
        f,
        formatChr = /\\?([a-z])/gi,
        formatChrCb,
        _pad = function(n, c) {
            n = n.toString();
            return n.length < c ? _pad('0' + n, c, '0') : n;
        },
        txt_words = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    formatChrCb = function(t, s) {
        return f[t] ? f[t]() : s;
    };
    f = {
        d: function() {
            return _pad(f.j(), 2);
        },
        D: function() {
            return f.l().slice(0, 3);
        },
        j: function() {
            return jsdate.getDate();
        },
        l: function() {
            return txt_words[f.w()] + 'day';
        },
        N: function() {
            return f.w() || 7;
        },
        S: function() {
            var j = f.j()
            i = j % 10;
            if (i <= 3 && parseInt((j % 100) / 10) == 1)
                i = 0;
            return ['st', 'nd', 'rd'][i - 1] || 'th';
        },
        w: function() {
            return jsdate.getDay();
        },
        z: function() {
            var a = new Date(f.Y(), f.n() - 1, f.j()),
                b = new Date(f.Y(), 0, 1);
            return Math.round((a - b) / 864e5);
        },
        W: function() {
            var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3),
                b = new Date(a.getFullYear(), 0, 4);
            return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
        },
        F: function() {
            return txt_words[6 + f.n()];
        },
        m: function() {
            return _pad(f.n(), 2);
        },
        M: function() {
            return f.F().slice(0, 3);
        },
        n: function() {
            return jsdate.getMonth() + 1;
        },
        t: function() {
            return (new Date(f.Y(), f.n(), 0)).getDate();
        },
        L: function() {
            var j = f.Y();
            return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0;
        },
        o: function() {
            var n = f.n(),
                W = f.W(),
                Y = f.Y();
            return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
        },
        Y: function() {
            return jsdate.getFullYear();
        },
        y: function() {
            return f.Y().toString().slice(-2);
        },
        a: function() {
            return jsdate.getHours() > 11 ? "pm" : "am";
        },
        A: function() {
            return f.a().toUpperCase();
        },
        B: function() {
            var H = jsdate.getUTCHours() * 36e2,
                i = jsdate.getUTCMinutes() * 60,
                s = jsdate.getUTCSeconds();
            return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
        },
        g: function() {
            return f.G() % 12 || 12;
        },
        G: function() {
            return jsdate.getHours();
        },
        h: function() {
            return _pad(f.g(), 2);
        },
        H: function() {
            return _pad(f.G(), 2);
        },
        i: function() {
            return _pad(jsdate.getMinutes(), 2);
        },
        s: function() {
            return _pad(jsdate.getSeconds(), 2);
        },
        u: function() {
            return _pad(jsdate.getMilliseconds() * 1000, 6);
        },
        e: function() {
            throw 'Not supported (see source code of date() for timezone on how to add support)';
        },
        I: function() {
            var a = new Date(f.Y(), 0),
                c = Date.UTC(f.Y(), 0),
                b = new Date(f.Y(), 6),
                d = Date.UTC(f.Y(), 6);
            return ((a - c) !== (b - d)) ? 1 : 0;
        },
        O: function() {
            var tzo = jsdate.getTimezoneOffset(),
                a = Math.abs(tzo);
            return (tzo > 0 ? "-" : "+") + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
        },
        P: function() {
            var O = f.O();
            return ( O.substr(0, 3) + ":" + O.substr(3, 2)) ;
        },
        T: function() {
            return 'UTC';
        },
        Z: function() {
            return -jsdate.getTimezoneOffset() * 60;
        },
        c: function() {
            return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
        },
        r: function() {
            return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
        },
        U: function() {
            return jsdate / 1000 | 0;
        }
    };
    this.date = function(format, timestamp) {
        that = this;
        jsdate = (timestamp === undefined ? new Date() : (timestamp instanceof Date) ? new Date(timestamp) : new Date(timestamp * 1000));
        return format.replace(formatChr, formatChrCb);
    };
    return this.date(format, timestamp);
}
function strip_tags(input, allowed)
{
    if (!input)
    {
        return '';
    }
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
}
function stripslashes(str)
{
    str = (str + '').replace(/\\(.?)/g, function(s, n1)
    {
        switch (n1)
        {
        case '\\':
            return '';
        case '0':
            return '\u0000';
        case '':
            return '';
        default:
            return n1;
        }
    });
    str = (str + '').replace(/\/(.?)/g, function(s, n1)
    {
        switch (n1)
        {
        case '\/':
            return '';
        default:
            return n1;
        }
    });
    return str;
}
function str_replace(search, replace, subject, count)
{
    var i = 0,
        j = 0,
        temp = '',
        repl = '',
        sl = 0,
        fl = 0,
        f = [].concat(search),
        r = [].concat(replace),
        s = subject,
        ra = Object.prototype.toString.call(r) === '[object Array]',
        sa = Object.prototype.toString.call(s) === '[object Array]';
    s = [].concat(s);
    if (count) {
        this.window[count] = 0;
    }
    for (i = 0, sl = s.length; i < sl; i++) {
        if (s[i] === '') {
            continue;
        }
        for (j = 0, fl = f.length; j < fl; j++) {
            temp = s[i] + '';
            repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
            s[i] = (temp).split(f[j]).join(repl);
            if (count && s[i] !== temp) {
                this.window[count] += (temp.length - s[i].length) / f[j].length;
            }
        }
    }
    return sa ? s : s[0];
}
function trim(str, charlist)
{
    var whitespace,
        l = 0,
        i = 0;
    str += '';
    if (!charlist)
    {
        whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
    }
    else
    {
        charlist += '';
        whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
    }
    l = str.length;
    for (i = 0; i < l; i++)
    {
        if (whitespace.indexOf(str.charAt(i)) === -1)
        {
            str = str.substring(i);
            break;
        }
    }
    l = str.length;
    for (i = l - 1; i >= 0; i--)
    {
        if (whitespace.indexOf(str.charAt(i)) === -1)
        {
            str = str.substring(0, i + 1);
            break;
        }
    }
    var outPut = whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
    outPut.replace(/\s\s+/g, ' ');
    return outPut;
}
function clear_str(str)
{
    var str_strip_tags,
        str_stripslashes,
        str_trim,
        outPut;
    str_strip_tags = strip_tags(str);
    str_stripslashes = stripslashes(str_strip_tags);
    str_trim = trim(str_stripslashes, '-');
    outPut = str_replace(' ', '-', str_trim);
    return outPut;
}
function nl2br(str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
function explode(delimiter, string, limit) {
    if (arguments.length < 2 || typeof delimiter === 'undefined' || typeof string === 'undefined')
        return null;
    if (delimiter === '' || delimiter === false || delimiter === null)
        return false;
    if (typeof delimiter === 'function' || typeof delimiter === 'object' || typeof string === 'function' || typeof string === 'object') {
        return {
            0: ''
        };
    }
    if (delimiter === true)
        delimiter = '1';
    delimiter += '';
    string += '';
    var s = string.split(delimiter);
    if (typeof limit === 'undefined')
        return s;
    if (limit === 0)
        limit = 1;
    if (limit > 0) {
        if (limit >= s.length)
            return s;
        return s.slice(0, limit - 1).concat([s.slice(limit - 1).join(delimiter)]);
    }
    if (-limit >= s.length)
        return [];
    s.splice(s.length + limit);
    return s;
}
function timeStartOfThisDay(time_now)
{
    var output;
    time_now = time_now ? time_now : time();
    output = mktime(0, 0, 0, date('m', time_now), date('d', time_now), date('Y', time_now));
    return output;
}
function strpos(haystack, needle, offset) {
    var i = (haystack + '').indexOf(needle, (offset || 0));
    return i === -1 ? false : i;
}
function require(filename)
{
    document.write('<script type="text/javascript" src="' + filename + '"></script>');
}
function str_to_time(str_date)
{
    var sep,
        arrDate;
    sep = strpos(str_date, '/') > 0 ? '/' : (strpos(str_date, '-') > 0 ? '-' : '.');
    arrDate = explode(sep, str_date);
    return mktime(0, 0, 0, arrDate[1], arrDate[0], arrDate[2]);
}
function base64_encode(data)
{
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1,
        o2,
        o3,
        h1,
        h2,
        h3,
        h4,
        bits,
        i = 0,
        ac = 0,
        enc = "",
        tmp_arr = [];
    if (!data) {
        return data;
    }
    do {
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);
        bits = o1 << 16 | o2 << 8 | o3;
        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);
    enc = tmp_arr.join('');
    var r = data.length % 3;
    return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}
function base64_decode(data)
{
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1,
        o2,
        o3,
        h1,
        h2,
        h3,
        h4,
        bits,
        i = 0,
        ac = 0,
        dec = "",
        tmp_arr = [];
    if (!data) {
        return data;
    }
    data += '';
    do {
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;
        if (h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < data.length);
    dec = tmp_arr.join('');
    return dec;
}
function utf8_encode(argString) {
    if (argString === null || typeof argString === "undefined") {
        return "";
    }
    var string = (argString + '');
    var utftext = '',
        start,
        end,
        stringl = 0;
    start = end = 0;
    stringl = string.length;
    for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;
        if (c1 < 128) {
            end++;
        } else if (c1 > 127 && c1 < 2048) {
            enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128);
        } else if (c1 & 0xF800 != 0xD800) {
            enc = String.fromCharCode((c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
        } else {
            if (c1 & 0xFC00 != 0xD800) {
                throw new RangeError("Unmatched trail surrogate at " + n);
            }
            var c2 = string.charCodeAt(++n);
            if (c2 & 0xFC00 != 0xDC00) {
                throw new RangeError("Unmatched lead surrogate at " + (n - 1));
            }
            c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
            enc = String.fromCharCode((c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.slice(start, end);
            }
            utftext += enc;
            start = end = n + 1;
        }
    }
    if (end > start) {
        utftext += string.slice(start, stringl);
    }
    return utftext;
}
function md5(str) {
    var xl;
    var rotateLeft = function(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    };
    var addUnsigned = function(lX, lY) {
        var lX4,
            lY4,
            lX8,
            lY8,
            lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return ( lResult ^ 0x80000000 ^ lX8 ^ lY8) ;
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return ( lResult ^ 0xC0000000 ^ lX8 ^ lY8) ;
            } else {
                return ( lResult ^ 0x40000000 ^ lX8 ^ lY8) ;
            }
        } else {
            return ( lResult ^ lX8 ^ lY8) ;
        }
    };
    var _F = function(x, y, z) {
        return (x & y) | ((~x) & z);
    };
    var _G = function(x, y, z) {
        return (x & z) | (y & (~z));
    };
    var _H = function(x, y, z) {
        return ( x ^ y ^ z) ;
    };
    var _I = function(x, y, z) {
        return ( y ^ (x | (~z))) ;
    };
    var _FF = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    var _GG = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    var _HH = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    var _II = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    var convertToWordArray = function(str) {
        var lWordCount;
        var lMessageLength = str.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = new Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };
    var wordToHex = function(lValue) {
        var wordToHexValue = "",
            wordToHexValue_temp = "",
            lByte,
            lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            wordToHexValue_temp = "0" + lByte.toString(16);
            wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
        }
        return wordToHexValue;
    };
    var x = [],
        k,
        AA,
        BB,
        CC,
        DD,
        a,
        b,
        c,
        d,
        S11 = 7,
        S12 = 12,
        S13 = 17,
        S14 = 22,
        S21 = 5,
        S22 = 9,
        S23 = 14,
        S24 = 20,
        S31 = 4,
        S32 = 11,
        S33 = 16,
        S34 = 23,
        S41 = 6,
        S42 = 10,
        S43 = 15,
        S44 = 21;
    str = this.utf8_encode(str);
    x = convertToWordArray(str);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;
    xl = x.length;
    for (k = 0; k < xl; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = addUnsigned(a, AA);
        b = addUnsigned(b, BB);
        c = addUnsigned(c, CC);
        d = addUnsigned(d, DD);
    }
    var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
    return temp.toLowerCase();
}
function strlen(string) {
    var str = string + '';
    var i = 0,
        chr = '',
        lgth = 0;
    if (!this.php_js || !this.php_js.ini || !this.php_js.ini['unicode.semantics'] || this.php_js.ini['unicode.semantics'].local_value.toLowerCase() !== 'on') {
        return string.length;
    }
    var getWholeChar = function(str, i) {
        var code = str.charCodeAt(i);
        var next = '',
            prev = '';
        if (0xD800 <= code && code <= 0xDBFF) {
            if (str.length <= (i + 1)) {
                throw 'High surrogate without following low surrogate';
            }
            next = str.charCodeAt(i + 1);
            if (0xDC00 > next || next > 0xDFFF) {
                throw 'High surrogate without following low surrogate';
            }
            return str.charAt(i) + str.charAt(i + 1);
        } else if (0xDC00 <= code && code <= 0xDFFF) {
            if (i === 0) {
                throw 'Low surrogate without preceding high surrogate';
            }
            prev = str.charCodeAt(i - 1);
            if (0xD800 > prev || prev > 0xDBFF) {
                throw 'Low surrogate without preceding high surrogate';
            }
            return false;
        }
        return str.charAt(i);
    };
    for (i = 0, lgth = 0; i < str.length; i++) {
        if ((chr = getWholeChar(str, i)) === false) {
            continue;
        }
        lgth++;
    }
    return lgth;
}
function array_rand(input, num_req) {
    var indexes = [];
    var ticks = num_req || 1;
    var checkDuplicate = function(input, value) {
        var exist = false,
            index = 0,
            il = input.length;
        while (index < il) {
            if (input[index] === value) {
                exist = true;
                break;
            }
            index++;
        }
        return exist;
    };
    if (Object.prototype.toString.call(input) === '[object Array]' && ticks <= input.length) {
        while (true) {
            var rand = Math.floor((Math.random() * input.length));
            if (indexes.length === ticks) {
                break;
            }
            if (!checkDuplicate(indexes, rand)) {
                indexes.push(rand);
            }
        }
    } else {
        indexes = null;
    }
    return ( (ticks == 1) ? indexes.join() : indexes) ;
}
function nl2br(str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
;
function is_email(email)
{
    var regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(email);
}
function array_toggle(element, arrData)
{
    if (in_array(element, arrData))
    {
        delete arrData[arrData.indexOf(element)];
    }
    else
    {
        arrData.push(element);
    }
    return arrData;
}
;
function is_simple_char(c)
{
    var outPut = false;
    if (c >= 65 && c <= 90 || c >= 48 && c <= 57)
    {
        outPut = true;
    }
    return outPut;
}
;
function full_trim(str)
{
    return trim(str.replace(/\s+/g, ' '));
}
;
function clear_vn_sign(str)
{
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
    str = str.replace(/-+-/g, "-");
    str = str.replace(/^\-+|\-+$/g, "");
    return str;
}
;
function isURL(str)
{
    var urlregex = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
    if (urlregex.test(str))
    {
        return ( true) ;
    }
    return ( false) ;
}
;
function check_search() {
    var tukhoa = document.getElementById('qtukhoa1');
    var group = document.getElementById('group');
    if (group.innerHTML.toString() === 'root') {
        window.location = "//www.hutech.edu.vn/tim-kiem-thong-tin";
    }
    else {
        window.location = "//www.hutech.edu.vn/" + group.innerHTML.toString() + "/tim-kiem-thong-tin";
    }
}
;
function check_search_mobile() {
    var tukhoa = document.getElementById('qtukhoa2');
    if (group.innerHTML.toString() === 'root') {
        window.location = "//www.hutech.edu.vn/tim-kiem-thong-tin";
    }
    else {
        window.location = "//www.hutech.edu.vn/" + group.innerHTML.toString() + "/tim-kiem-thong-tin";
    }
}
;
function change_alias(alias)
{
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ  |ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ  |ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
    str = str.replace(/-+-/g, "-");
    str = str.replace(/^\-+|\-+$/g, "");
    return str;
}
;
;
(function($) {
    $.alerts = {
        verticalOffset: -75,
        horizontalOffset: 0,
        repositionOnResize: true,
        overlayOpacity: .01,
        overlayColor: '#FFF',
        draggable: true,
        okButton: '&nbsp;Đồng ý&nbsp;',
        cancelButton: '&nbsp;Hủy&nbsp;',
        dialogClass: null,
        alert: function(message, title, callback) {
            if (title == null)
                title = 'Alert';
            $.alerts._show(title, message, null, 'alert', function(result) {
                if (callback)
                    callback(result);
            });
        },
        confirm: function(message, title, callback) {
            if (title == null)
                title = 'Confirm';
            $.alerts._show(title, message, null, 'confirm', function(result) {
                if (callback)
                    callback(result);
            });
        },
        prompt: function(message, value, title, callback) {
            if (title == null)
                title = 'Prompt';
            $.alerts._show(title, message, value, 'prompt', function(result) {
                if (callback)
                    callback(result);
            });
        },
        _show: function(title, msg, value, type, callback) {
            $.alerts._hide();
            $.alerts._overlay('show');
            $("BODY").append('<div id="popup_container">' + '<h1 id="popup_title"></h1>' + '<div id="popup_content">' + '<div id="popup_message"></div>' + '</div>' + '</div>');
            if ($.alerts.dialogClass)
                $("#popup_container").addClass($.alerts.dialogClass);
            var pos = 'fixed';
            $("#popup_container").css({
                position: pos,
                zIndex: 99999,
                padding: 0,
                margin: 0
            });
            $("#popup_title").text(title);
            $("#popup_content").addClass(type);
            $("#popup_message").text(msg);
            $("#popup_message").html($("#popup_message").text().replace(/\n/g, '<br />'));
            $("#popup_container").css({
                minWidth: $("#popup_container").outerWidth(),
                maxWidth: $("#popup_container").outerWidth()
            });
            $.alerts._reposition();
            $.alerts._maintainPosition(true);
            switch (type) {
            case 'alert':
                $("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
                $("#popup_ok").click(function() {
                    $.alerts._hide();
                    callback(true);
                });
                $("#popup_ok").focus().keypress(function(e) {
                    if (e.keyCode == 13 || e.keyCode == 27)
                        $("#popup_ok").trigger('click');
                });
                break;
            case 'confirm':
                $("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
                $("#popup_ok").click(function() {
                    $.alerts._hide();
                    if (callback)
                        callback(true);
                });
                $("#popup_cancel").click(function() {
                    $.alerts._hide();
                    if (callback)
                        callback(false);
                });
                $("#popup_ok").focus();
                $("#popup_ok, #popup_cancel").keypress(function(e) {
                    if (e.keyCode == 13)
                        $("#popup_ok").trigger('click');
                    if (e.keyCode == 27)
                        $("#popup_cancel").trigger('click');
                });
                break;
            case 'prompt':
                $("#popup_message").append('<br /><textarea rows="4" id="popup_prompt" ></textarea>').after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
                $("#popup_prompt").width($("#popup_message").width());
                $("#popup_ok").click(function() {
                    var val = $("#popup_prompt").val();
                    $.alerts._hide();
                    if (callback)
                        callback(val);
                });
                $("#popup_cancel").click(function() {
                    $.alerts._hide();
                    if (callback)
                        callback(null);
                });
                $("#popup_prompt, #popup_ok, #popup_cancel").keypress(function(e) {
                    if (e.keyCode == 27)
                        $("#popup_cancel").trigger('click');
                });
                if (value)
                    $("#popup_prompt").val(value);
                $("#popup_prompt").focus().select();
                break;
            }
            if ($.alerts.draggable) {
                try {
                    $("#popup_container").draggable({
                        handle: $("#popup_title")
                    });
                    $("#popup_title").css({
                        cursor: 'move'
                    });
                } catch (e) {}
            }
        },
        _hide: function() {
            $("#popup_container").remove();
            $.alerts._overlay('hide');
            $.alerts._maintainPosition(false);
        },
        _overlay: function(status) {
            switch (status) {
            case 'show':
                $.alerts._overlay('hide');
                $("BODY").append('<div id="popup_overlay"></div>');
                $("#popup_overlay").css({
                    position: 'absolute',
                    zIndex: 99998,
                    top: '0px',
                    left: '0px',
                    width: '100%',
                    height: $(document).height(),
                    background: $.alerts.overlayColor,
                    opacity: $.alerts.overlayOpacity
                });
                break;
            case 'hide':
                $("#popup_overlay").remove();
                break;
            }
        },
        _reposition: function() {
            var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
            var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
            if (top < 0)
                top = 0;
            if (left < 0)
                left = 0;
            $("#popup_container").css({
                top: '200px',
                left: left + 'px'
            });
            $("#popup_overlay").height($(document).height());
        },
        _maintainPosition: function(status) {
            if ($.alerts.repositionOnResize) {
                switch (status) {
                case true:
                    $(window).bind('resize', $.alerts._reposition);
                    break;
                case false:
                    $(window).unbind('resize', $.alerts._reposition);
                    break;
                }
            }
        }
    }
    jAlert = function(message, title, callback) {
        $.alerts.alert(message, title, callback);
    }
    jConfirm = function(message, title, callback) {
        $.alerts.confirm(message, title, callback);
    };
    jPrompt = function(message, value, title, callback) {
        $.alerts.prompt(message, value, title, callback);
    };
})(jQuery);
function ialert(msg, callback, obj, title, options)
{
    var func;
    if (callback)
    {
        if (typeof callback === 'function')
        {
            options = title;
            title = obj;
            func = callback;
        }
        else if (typeof obj === 'object')
        {
            if (typeof obj[callback] === 'function')
            {
                func = function()
                {
                    (obj[callback])();
                };
            }
            if (typeof title === 'object')
            {
                options = title;
                title = undefined;
            }
        }
        else if (typeof callback === 'string')
        {
            title = callback;
        }
    }
    if (!title)
    {
        title = 'Thông báo';
    }
    $.alerts.alert(msg, title, func, options);
}
function iprompt(msg, callback, obj, value, title)
{
    var func;
    if (typeof callback === 'function')
    {
        title = value;
        value = obj;
        func = callback;
    }
    else if (typeof obj[callback] === 'function')
    {
        func = function(result)
        {
            (obj[callback])(result);
        };
    }
    if (!title)
    {
        title = 'Edunet.com.vn';
    }
    $.alerts.prompt(msg, value, title, func);
}
function iconfirm(msg, callback, obj, title)
{
    var func;
    if (typeof callback === 'function')
    {
        title = obj;
        func = callback;
    }
    else if (typeof obj[callback] === 'function')
    {
        func = function(result)
        {
            (obj[callback])(result);
        };
    }
    if (!title)
    {
        title = 'Edunet xác nhận';
    }
    $.alerts.confirm(msg, title, func);
}
;
(function($) {
    jQuery.fn.extend({
        elastic: function(method)
        {
            var mimics = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'fontSize', 'lineHeight', 'fontFamily', 'width', 'fontWeight', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width', 'borderTopStyle', 'borderTopColor', 'borderRightStyle', 'borderRightColor', 'borderBottomStyle', 'borderBottomColor', 'borderLeftStyle', 'borderLeftColor'];
            var attrs = {
                private: {
                    data: {}
                },
                public: {}
            };
            var methods = {
                private: {
                    markElastic: function()
                    {
                        $(this).addClass('elastic');
                    },
                    init: function()
                    {
                        var $textarea = $(this);
                        if (!$textarea.isElastic())
                        {
                            methods.private.markElastic.call(this);
                        }
                        var
                            $twin = $('<div />').css({
                                'position': 'absolute',
                                'display': 'none',
                                'word-wrap': 'break-word',
                                'white-space': 'pre-wrap'
                            }),
                            lineHeight = parseInt($textarea.css('line-height'), 10) || parseInt($textarea.css('font-size'), '10'),
                            minHeight = parseInt($textarea.css('height'), 10) || lineHeight * 3,
                            maxHeight = parseInt($textarea.css('max-height'), 10) || Number.MAX_VALUE,
                            goalHeight = 0;
                        if (maxHeight < 0)
                        {
                            maxHeight = Number.MAX_VALUE;
                        }
                        $twin.appendTo($textarea.parent());
                        var i = mimics.length;
                        while (i--)
                        {
                            $twin.css(mimics[i].toString(), $textarea.css(mimics[i].toString()));
                        }
                        $textarea.css({
                            'overflow': 'hidden'
                        });
                        var data = {
                            minHeight: minHeight,
                            maxHeight: maxHeight,
                            lineHeight: lineHeight,
                            goalHeight: goalHeight,
                            $twin: $twin
                        };
                        methods.private.setData.call(this, data);
                        methods.private.update.call(this);
                        methods.private.bindEvents.call(this);
                    },
                    resize: function()
                    {
                        var $textarea = $(this),
                            data = methods.private.getData.call(this),
                            $twin = data.$twin,
                            minHeight = data.minHeight,
                            maxHeight = data.maxHeight;
                        if ($twin.height() < maxHeight)
                        {
                            if ($twin.height() > minHeight)
                            {
                                $textarea.height($twin.height());
                            }
                            else
                            {
                                $textarea.height(minHeight);
                            }
                        }
                    },
                    getData: function()
                    {
                        return $(this).data('elastic');
                    },
                    setData: function(data)
                    {
                        $(this).data('elastic', data);
                    },
                    removeData: function()
                    {
                        $(this).removeData('elastic');
                    },
                    bindEvents: function()
                    {
                        var $textarea = $(this);
                        $textarea.bind('keydown', function(e)
                        {
                            if ($textarea.hasClass('j-enter-submit') && e.which === 13 && !e.shiftKey)
                            {
                                e.preventDefault();
                            }
                        });
                        $textarea.bind('keyup keydown change cut paste', function(e)
                        {
                            if ($textarea.hasClass('j-enter-submit') && e.type === 'keyup' && e.which === 13 && !e.shiftKey)
                            {
                                e.preventDefault();
                                $textarea.addClass('j-lock');
                                $textarea.trigger('submit', [$textarea.val()]);
                            }
                            else
                            {
                                methods.private.update.call($textarea);
                            }
                        });
                        $(window).bind('resize', function()
                        {
                            methods.private.setTwinWidth.call($textarea);
                        });
                        $textarea.bind('resize', function()
                        {
                            methods.private.setTwinWidth.call($textarea);
                        });
                        $textarea.bind('update', function()
                        {
                            methods.private.update.call($textarea);
                        });
                        $textarea.bind('blur', function()
                        {
                            methods.private.resize.call($textarea);
                        });
                        $textarea.bind('input paste', function(e)
                        {
                            var obj = this;
                            setTimeout(function()
                            {
                                if (!$textarea.hasClass('j-lock'))
                                {
                                    methods.private.update.call(obj);
                                }
                            }, 250);
                        });
                    },
                    setTwinWidth: function()
                    {
                        var
                            $textarea = $(this),
                            curatedWidth = Math.floor(parseInt($textarea.width(), 10)),
                            data = methods.private.getData.call(this),
                            $twin = data.$twin;
                        if ($twin.width() !== curatedWidth)
                        {
                            $twin.css({
                                'width': curatedWidth + 'px'
                            });
                            methods.private.update.call(this, true);
                        }
                    },
                    update: function(forced)
                    {
                        var
                            $textarea = $(this),
                            data = methods.private.getData.call(this);
                        var
                            lineHeight = data.lineHeight,
                            maxHeight = data.maxHeight,
                            minHeight = data.minHeight,
                            $twin = data.$twin;
                        var textareaContent = $textarea.val().replace(/&/g, '&amp;').replace(/ {2}/g, '&nbsp;').replace(/<|>/g, '&gt;').replace(/\n/g, '<br />');
                        var twinContent = $twin.html().replace(/<br>/ig, '<br />');
                        if (forced || textareaContent + '&nbsp;' !== twinContent)
                        {
                            $twin.html(textareaContent + '&nbsp;');
                            if (Math.abs($twin.height() + lineHeight - $textarea.height()) > 3)
                            {
                                var goalHeight = $twin.height() + lineHeight;
                                if (goalHeight >= maxHeight)
                                {
                                    methods.private.setHeightAndOverflow.call(this, maxHeight, 'auto');
                                }
                                else if (goalHeight <= minHeight)
                                {
                                    methods.private.setHeightAndOverflow.call(this, minHeight, 'hidden');
                                }
                                else
                                {
                                    methods.private.setHeightAndOverflow.call(this, goalHeight, 'hidden');
                                }
                            }
                        }
                        methods.private.resize.call(this);
                    },
                    setHeightAndOverflow: function(height, overflow)
                    {
                        var $textarea = $(this);
                        var curratedHeight = Math.floor(parseInt(height, 10));
                        if ($textarea.height() !== curratedHeight)
                        {
                            $textarea.css({
                                'height': curratedHeight + 'px',
                                'overflow': overflow
                            });
                        }
                    }
                },
                public: {
                    destroy: function()
                    {
                        var $textarea = $(this),
                            data = methods.private.getData.call(this);
                        data.$twin.empty();
                        methods.private.removeData.call(this);
                    },
                    clear: function()
                    {
                        var $this = $(this);
                        $this.val('');
                        $this.removeAttr('style');
                        $this.removeClass('j-lock');
                    }
                }
            };
            var args = $.makeArray(arguments);
            if (methods.public[method])
            {
                var returns = [];
                var jQReturn = this.each(function()
                {
                    var returnValue = methods.public[method].apply($(this), args.slice(1));
                    if (!!returnValue)
                    {
                        returns.push(returnValue);
                    }
                });
                return returns.length < 1 ? jQReturn : returns.length > 1 ? returns : returns[0];
            }
            else
            {
                return this.each(function()
                {
                    if (this.type !== 'textarea')
                    {
                        return false;
                    }
                    methods.private.init.apply($(this));
                });
            }
        }
    });
    $.fn.isElastic = function()
    {
        return $(this).hasClass('elastic');
    };
})(jQuery);
;
$.fn.ImageCropper = function(method)
{
    var default_config = {
        crop: [0, 0, 40, 40],
        config: {
            width: 40,
            height: 40,
            maxFileSize: '50k'
        },
        ajax_upload: {
            maxWidth: 650,
            maxHeight: 475,
            fileType: 'image'
        }
    };
    var events = {
        show_cropper: function()
        {
            var $this = $(this);
            $this.bind('click', function()
            {
                methods.private.show_cropper.call($this);
            });
        },
        close_cropper: function()
        {
            var $this = $(this),
                $popup;
            $popup = methods.private.get_data.call($this, 'popup');
            $popup.find('.j-close-popup, .j-cancel').bind('click', function()
            {
                methods.private.close_cropper.call($this);
            });
        },
        save_cropper: function()
        {
            var $this = $(this),
                $popup;
            $popup = methods.private.get_data.call($this, 'popup');
            $popup.find('.j-save').bind('click', function()
            {
                methods.private.save_cropper.call($this);
            });
        },
        upload_img: function()
        {
            var $this = $(this),
                $popup;
            $popup = methods.private.get_data.call($this, 'popup');
            $popup.find('.j-upload-new-img').bind('change', function(e, img_src)
            {
                var update_img = function()
                {
                    methods.private.update_img.call($this, img_src);
                };
                methods.private.delete_image_uploaded.call($this, update_img);
            });
        }
    };
    var methods = {
        private: {
            init: function()
            {
                var $this = $(this);
                var call_func = function()
                {
                    var $this = $(this);
                    $.jarvis.call_func(events, $this);
                };
                var image_crop_info = $this.data('image-cropper');
                default_config.config = $.extend({}, default_config.config, image_crop_info.config);
                methods.private.load_html.call($this, call_func);
            },
            show_cropper: function()
            {
                var $this = $(this),
                    $popup,
                    cropper_data,
                    info;
                cropper_data = methods.private.get_data.call($this);
                $popup = methods.private.get_data.call($this, 'popup');
                $popup.CenterPopup();
                if (cropper_data.img_src)
                {
                    $.jarvis.loading();
                    var succCreateTmpImage = function(data)
                    {
                        $.jarvis.loading('stop');
                        var action = {
                            img_src: data.img_src,
                            crop: cropper_data.crop
                        };
                        methods.private.update_img.call($this, action.img_src, action.crop);
                    };
                    info = {
                        img_src: cropper_data.img_src
                    };
                    $.jarvis.ajax('jarvis/activity/CreateTmpImage?$res=data-only', succCreateTmpImage, info);
                }
            },
            update_img: function(img_src, crop)
            {
                var $this = $(this),
                    $popup,
                    $wrap_img_root,
                    img_area_select,
                    $wrap_img_preview,
                    img_root,
                    $img_root,
                    config,
                    $img_preview,
                    data;
                data = methods.private.get_data.call($this);
                if (!crop)
                {
                    crop = default_config.crop;
                }
                data.action = {
                    img_src: img_src,
                    crop: crop
                };
                methods.private.set_data.call($this, data);
                config = default_config.config;
                $popup = methods.private.get_data.call($this, 'popup');
                $wrap_img_root = $popup.find('.wrap-img-root');
                $wrap_img_preview = $popup.find('.wrap-img-preview');
                img_root = new Image();
                $img_root = $(img_root);
                $img_root.attr('src', img_src);
                $wrap_img_root.find('.img-root').html($img_root).removeClass('hide');
                $wrap_img_root.find('.no-img').addClass('hide');
                $img_preview = $img_root.clone();
                $wrap_img_preview.find('.img-preview').html($img_preview).removeClass('hide');
                $wrap_img_preview.find('.no-img').addClass('hide');
                var preview = function(img, selection)
                {
                    methods.private.preview.call($this, selection);
                };
                var save_selection = function(img, selection)
                {
                    methods.private.save_selection.call($this, selection);
                };
                var img_area_select_option = {
                    instance: true,
                    persistent: true,
                    handles: true,
                    aspectRatio: '1:1',
                    zIndex: $popup.attr('z-index') - -1,
                    minWidth: config.width,
                    minHeight: config.height,
                    x1: crop[0],
                    y1: crop[1],
                    x2: crop[2],
                    y2: crop[3],
                    onSelectChange: preview,
                    onSelectEnd: save_selection,
                    onInit: preview
                };
                $img_root.load(function()
                {
                    methods.private.remove_selection.call($this);
                    img_area_select = $img_root.imgAreaSelect(img_area_select_option);
                    methods.private.set_data.call($this, 'img-area-select', img_area_select);
                    $.jarvis.loading('stop');
                });
            },
            preview: function(selection)
            {
                var $this = $(this),
                    $popup,
                    scaleX,
                    scaleY,
                    width,
                    height,
                    top,
                    left,
                    config,
                    $img_root;
                config = default_config.config;
                $popup = methods.private.get_data.call($this, 'popup');
                $img_root = $popup.find('.wrap-img-root .img-root img');
                scaleX = selection.width > 0 ? config.width / selection.width : 1;
                scaleY = selection.height > 0 ? config.height / selection.height : 1;
                width = scaleX * $img_root.width();
                height = scaleY * $img_root.height();
                top = -1 * scaleY * selection.y1;
                left = -1 * scaleX * selection.x1;
                $popup.find('.wrap-img-preview .img-preview img').css({
                    width: width + 'px',
                    height: height + 'px',
                    marginLeft: left + 'px',
                    marginTop: top + 'px'
                });
            },
            save_selection: function(selection)
            {
                var $this = $(this),
                    data;
                data = methods.private.get_data.call($this);
                data.action.crop = [selection.x1, selection.y1, selection.x2, selection.y2];
                methods.private.set_data.call($this, data);
            },
            succ_save_cropper: function(data)
            {
                var $this = $(this);
                if (data.succ)
                {
                    $this.trigger('change', [data.info]);
                }
                else
                {
                    ialert('Cắt ảnh không thành công. Vui lòng thử lại.', 'reload', location);
                }
            },
            save_cropper: function()
            {
                var $this = $(this),
                    info;
                info = methods.private.get_data.call($this, 'action');
                info.config = default_config.config;
                var succSaveCropper = function(data)
                {
                    methods.private.succ_save_cropper.call($this, data);
                };
                $.jarvis.ajax('jarvis/activity/SaveImageCropper?$res=data-only', succSaveCropper, info, 'post');
            },
            close_cropper: function(action_type)
            {
                var $this = $(this),
                    $popup;
                $popup = methods.private.get_data.call($this, 'popup');
                $popup.CenterPopup('close');
                methods.private.remove_selection.call($this);
                var clear_data = function()
                {
                    methods.private.clear_data.call($this);
                };
                if (action_type === 'save')
                {
                    clear_data();
                }
                else
                {
                    methods.private.delete_image_uploaded.call($this, clear_data);
                }
            },
            clear_data: function()
            {
                var $this = $(this),
                    $popup;
                $popup = methods.private.get_data.call($this, 'popup');
                methods.private.set_data.call($this, 'action', false);
                methods.private.set_data.call($this, 'img-area-select', false);
            },
            delete_image_uploaded: function(callback)
            {
                var $this = $(this),
                    data;
                data = methods.private.get_data.call($this);
                var succDeleteImageUploaded = function()
                {
                    if (typeof callback === 'function')
                    {
                        callback();
                    }
                };
                $.jarvis.ajax('jarvis/activity/DeleteTmpFile?$res=data-only', succDeleteImageUploaded, {
                    url: data.action.img_src
                }, 'post');
            },
            remove_selection: function()
            {
                var $this = $(this),
                    img_area_select;
                img_area_select = methods.private.get_data.call($this, 'img-area-select');
                if (img_area_select)
                {
                    img_area_select.remove();
                }
            },
            get_data: function(key)
            {
                var data = $(this).data('image-cropper') || {};
                if (key)
                {
                    return data[key];
                }
                return data;
            },
            set_data: function(key, value)
            {
                var $this = $(this),
                    data;
                data = methods.private.get_data.call($this);
                data[key] = value;
                $this.data('image-cropper', data);
            },
            load_html: function(callback)
            {
                var $this = $(this),
                    $html;
                var succLoadHtml = function(data)
                {
                    $html = $(data.html);
                    $('body').append($html);
                    methods.private.set_data.call($this, 'popup', $html);
                    var $button_upload = $html.find('.j-upload-new-img');
                    $button_upload.data('ajax-upload', default_config.ajax_upload);
                    $button_upload.ajaxUpload();
                    callback.call($this);
                };
                $.jarvis.ajax('jarvis/activity/LoadPopupImageCropper?$res=for-view', succLoadHtml);
            }
        },
        public: {
            update: function(img_crop_info)
            {
                var $this = $(this),
                    data,
                    $popup,
                    $img_root;
                if (!img_crop_info)
                {
                    img_crop_info = default_config.crop;
                }
                data = methods.private.get_data.call($this);
                data = $.extend(data, img_crop_info);
                methods.private.set_data.call($this, data);
                $popup = methods.private.get_data.call($this, 'popup');
                $img_root = $popup.find('.wrap-img-root .img-root img');
                $img_root.imgAreaSelect({
                    remove: true
                });
            }
        }
    };
    if (methods.public[method])
    {
        var args = $.makeArray(arguments);
        this.each(function()
        {
            methods.public[method].apply($(this), args.slice(1));
        });
    }
    else
    {
        return this.each(function()
        {
            methods.private.init.apply($(this));
        });
    }
};
$.fn.ajaxUpload = function(method)
{
    var default_config = {};
    var events = {
        browse: function()
        {
            var $this = $(this);
            $this.bind('click', function()
            {
                methods.private.browse.call($this);
            });
        },
        submit: function()
        {
            var $this = $(this),
                $wrap,
                data;
            data = methods.private.get_data.call($this);
            $wrap = data.$wrap;
            $wrap.find('.input-file').bind('change', function()
            {
                methods.private.submit.call($this);
            });
        }
    };
    var methods = {
        private: {
            init: function()
            {
                var $this = $(this);
                var call_func = function()
                {
                    var $this = $(this);
                    $.jarvis.call_func(events, $this);
                };
                methods.private.load_html.call($this, call_func);
            },
            browse: function()
            {
                var $this = $(this),
                    data,
                    $wrap;
                data = methods.private.get_data.call($this);
                $wrap = data.$wrap;
                $wrap.find('.input-file').trigger('click');
            },
            submit: function()
            {
                var $this = $(this),
                    upload_data,
                    $wrap;
                upload_data = methods.private.get_data.call($this);
                $wrap = upload_data.$wrap;
                var succUpload = function(data)
                {
                    $.jarvis.loading('stop');
                    methods.private.succ_upload.call($this, data);
                };
                $wrap.find('.input-max-width').val(upload_data.maxWidth);
                $wrap.find('.input-max-height').val(upload_data.maxHeight);
                $wrap.find('.input-max-file-size').val(upload_data.maxFileSize);
                $wrap.find('.input-file-type').val(upload_data.fileType);
                $.jarvis.loading('black');
                $wrap.find('form').ajax_upload(succUpload);
            },
            succ_upload: function(data)
            {
                var $this = $(this),
                    upload_data,
                    $wrap;
                upload_data = methods.private.get_data.call($this);
                $wrap = upload_data.$wrap;
                $wrap.find('form').reset();
                $this.trigger('change', [data.src, data.filename]);
            },
            get_data: function(key)
            {
                var data = $(this).data('ajax-upload') || {};
                if (key)
                {
                    return data[key];
                }
                return data;
            },
            set_data: function(key, value)
            {
                var $this = $(this),
                    data;
                data = methods.private.get_data.call($this);
                data[key] = value;
                $this.data('ajax-upload', data);
            },
            load_html: function(callback)
            {
                var $this = $(this),
                    $html;
                var succLoadHtml = function(data)
                {
                    $html = $(data.html);
                    $('body').append($html);
                    methods.private.set_data.call($this, '$wrap', $html);
                    callback.call($this);
                };
                $.jarvis.ajax('jarvis/activity/LoadHtml?$res=for-view', succLoadHtml, {
                    block: 'FormAjaxUpload'
                }, 'post');
            }
        },
        public: {}
    };
    if (methods.public[method])
    {
        var args = $.makeArray(arguments);
        this.each(function()
        {
            methods.public[method].apply($(this), args.slice(1));
        });
    }
    else
    {
        return this.each(function()
        {
            methods.private.init.apply($(this));
        });
    }
};
$.fn.move_center = function()
{
    var
        $p = $(this),
        screenWidth = $(window).width(),
        screenHeight = $(window).height(),
        top = (screenHeight - $p.outerHeight()) * 0.5,
        left = (screenWidth - $p.outerWidth()) * 0.5;
    $p.css({
        position: 'fixed',
        top: top,
        right: left,
        left: left
    });
    var $lock = $p.data('lock');
    if ($lock)
    {
        $p.css('zIndex', $lock.css('zIndex') - -1);
    }
};
$.fn.form_val = function()
{
    var $formData = {},
        error = [],
        succ = true,
        $form = $(this),
        $editor = $form.parent().find('.j-ckeditor');
    if ($editor.length)
    {
        var str_name = $editor.prop('name');
        $formData[str_name] = CKEDITOR.instances[$editor.prop('id')].getData();
        succ = $formData[str_name] !== '';
        if (!succ)
        {
            error.push(str_name);
        }
    }
    $(':input:not(.j-ckeditor)', $form).each(function()
    {
        var $this = $(this),
            value,
            str_name;
        str_name = $this.prop('name');
        if ($this.hasClass('j-check'))
        {
            value = $this[0].checked ? $this.val() : undefined;
        }
        else
        {
            value = trim($this.val());
        }
        if ($this.hasClass('j-multiple'))
        {
            var glue = $this.data('glue');
            if (glue)
            {
                value = value.split(glue);
            }
            else
            {
                value = value.split(/[\s\n;]+/);
            }
        }
        if (value === '' && ($this.data('null') === undefined || $this.data('null') === 'not-null'))
        {
            succ = false;
            error.push(str_name);
        }
        else
        {
            if ($this.hasClass('j-email'))
            {
                if ($this.hasClass('j-multiple'))
                {
                    $.each(value, function(i, email)
                    {
                        if (!is_email(email))
                        {
                            succ = false;
                            error.push(str_name);
                        }
                    });
                }
                else
                {
                    if (!is_email(value))
                    {
                        succ = false;
                        error.push(str_name);
                    }
                }
            }
            if ($this.hasClass('j-retype'))
            {
                if (value !== $('.' + $this.data('match')).val())
                {
                    succ = false;
                    error.push($this.data('match') + '-retype');
                }
            }
            if ($this.hasClass('j-integer'))
            {
                var reg = /^\d+$/;
                if ((!reg.test(value)) || (value > 255))
                {
                    succ = false;
                    error.push(str_name);
                }
            }
        }
        var name = str_name.substr(0, str_name.indexOf('[]'));
        if (name)
        {
            var n = $formData[name] ? $formData[name].length : 0;
            if (n === 0)
            {
                $formData[name] = new Array();
            }
            $formData[name][n] = value;
        }
        else
        {
            $formData[str_name] = value;
        }
    });
    return {
        succ: succ,
        formData: $formData,
        error: error
    };
};
$.fn.plus = function(number)
{
    if (typeof parseInt(this.text()) !== 'number')
    {
        return false;
    }
    if (typeof number !== 'number')
    {
        number = 1;
    }
    var text = parseInt(str_replace(',', '', this.text()));
    text = text - -number;
    this.text(number_format(text));
    return text;
};
$.fn.ajax_upload = function(succFunc, param, beforeFunc)
{
    var $this = $(this);
    var config = {
        type: 'post',
        dataType: 'json',
        iframe: false,
        success: function(data)
        {
            $.jarvis.set_token(data.token);
            delete (data.token);
            if (typeof succFunc === 'function')
            {
                succFunc(data);
            }
        },
        error: function(e)
        {
            console.log(e);
        },
        beforeSubmit: function()
        {
            if (typeof beforeFunc === 'function')
            {
                beforeFunc(param);
            }
        }
    };
    $this.find('j-token').val($.jarvis.get_token());
    $this.ajaxSubmit(config);
};
jQuery.fn.reset = function()
{
    var $this = $(this),
        $textarea,
        id;
    $this.find('.jarvis-plugin-UploadsImage').each(function()
    {
        var $wrap = $(this);
        $wrap.UploadsImage('clear');
    });
    $this.each(function()
    {
        this.reset();
    });
    if (isset('CKEDITOR'))
    {
        $this.find('textarea').each(function()
        {
            $textarea = $(this);
            id = $textarea.prop('id');
            if (CKEDITOR.instances[id])
            {
                CKEDITOR.instances[id].setData('');
            }
        });
    }
    $this.find('.input').html('');
};
$.fn.ihide = function()
{
    var $this = $(this);
    if ($this.data('body-less'))
    {
        $this.fadeOut('slow').show().addClass('body-less');
    }
    else
    {
        $this.fadeOut('slow').show().addClass('hide');
    }
};
$.fn.ishow = function()
{
    var $this = $(this);
    if ($this.hasClass('hide'))
    {
        $this.removeClass('hide').hide().fadeIn('slow');
    }
    else if ($this.hasClass('body-less'))
    {
        $this.removeClass('body-less').hide().fadeIn('slow');
        $this.data('body-less', true);
    }
}
$.fn.iappend = function($html, quick, callback)
{
    if (typeof quick === 'function')
    {
        callback = quick;
        quick = false;
    }
    $html = $($html);
    $html.hide();
    this.append($html);
    if (quick)
    {
        $html.show('slow', callback);
    }
    else
    {
        $html.fadeIn('slow', callback);
    }
    return this;
};
$.fn.iprepend = function($html, quick, callback)
{
    if (typeof quick === 'function')
    {
        callback = quick;
        quick = false;
    }
    $html = $($html);
    $html.hide();
    this.prepend($html);
    if (quick)
    {
        $html.show('slow', callback);
    }
    else
    {
        $html.fadeIn('slow', callback);
    }
    return this;
};
$.fn.iremove = function()
{
    this.fadeOut('slow', function() {
        this.remove();
    });
};
$.fn.ihtml = function($html, quick, callback)
{
    if (typeof quick === 'function')
    {
        callback = quick;
        quick = false;
    }
    $html = $($html);
    $html.hide();
    this.html($html);
    if (quick)
    {
        $html.show('slow', callback);
    }
    else
    {
        $html.fadeIn('slow', callback);
    }
    return this;
};
$.fn.scroll_focus = function()
{
    var $this = $(this),
        scroll_value,
        top,
        wHeight;
    top = $this.offset().top;
    wHeight = $(window).height();
    scroll_value = top - 1 / 3 * wHeight;
    $('body').animate({
        scrollTop: scroll_value
    }, '250');
    return $this;
};
$.fn.scroll_top = function()
{
    var $this = $(this),
        top;
    top = $this.offset().top;
    $('body').animate({
        scrollTop: top
    }, '250');
};
$.fn.ckeditor = function()
{
    $(this).each(function() {
        $(this).editor();
    });
};
$.fn.editor = function()
{
    if (!$.editor_index)
    {
        $.editor_index = 0;
        var EditorConfig;
        if (editor_style === 'simple')
        {
            EditorConfig = {
                width: 775,
                toolbar: [{
                    name: 'basicstyles',
                    items: ['Bold', 'Italic', 'Underline']
                }, {
                    name: 'paragraph',
                    items: ['Outdent', 'Indent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
                }, {
                    name: 'styles',
                    items: ['FontSize', 'TextColor', 'BGColor']
                }, {
                    name: 'insert',
                    items: ['Table', '-', 'Image']
                }, {
                    name: 'document',
                    items: ['Maximize']
                }]
            };
        }
        else
        {
            EditorConfig = {
                width: 775,
                toolbar: [{
                    name: 'basicstyles',
                    items: ['Bold', 'Italic', 'Underline', '-', 'Subscript', 'Superscript']
                }, {
                    name: 'paragraph',
                    items: ['NumberedList', 'BulletedList', 'Outdent', 'Indent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
                }, {
                    name: 'styles',
                    items: ['Styles', 'Format', 'Font', 'FontSize']
                }, {
                    name: 'color',
                    items: ['TextColor', 'BGColor']
                }, {
                    name: 'insert',
                    items: ['Blockquote', '-', 'Link', 'Unlink', '-', 'Table', 'HorizontalRule', 'SpecialChar', '-', 'Image']
                }, {
                    name: 'paste',
                    items: ['PasteFromWord']
                }, {
                    name: 'document',
                    items: ['Source', '-', 'Preview', '-', 'Maximize']
                }, ]
            };
        }
        CKEDITOR.editorConfig = function(config)
        {
            config.CKEDITOR_BASEPATH = url_root + 'ckeditor/';
            config.language = 'en';
            config.width = EditorConfig.width + 'px';
            if (!EditorConfig.height)
            {
                EditorConfig.height = 500;
            }
            config.height = EditorConfig.height + 'px';
            config.uiColor = '#CDCDCD';
            config.extraAllowedContent = 'p{*}[*];div{*}[*];';
            config.toolbar = EditorConfig.toolbar;
            config.filebrowserBrowseUrl = url_root + 'kofinderup/browse.php?type=files';
            config.filebrowserImageBrowseUrl = url_root + 'kofinderup/browse.php?type=images';
            config.filebrowserFlashBrowseUrl = url_root + 'kofinderup/browse.php?type=flash';
            config.filebrowserUploadUrl = url_root + 'kofinderup/upload.php?type=files';
            config.filebrowserImageUploadUrl = url_root + 'kofinderup/upload.php?type=images';
            config.filebrowserFlashUploadUrl = url_root + 'kofinderup/upload.php?type=flash';
        };
    }
    try
    {
        $.editor_index++;
        this.each(function()
        {
            var $this = $(this),
                id,
                height,
                width,
                config = {};
            height = $this.prop('height') || $this.height();
            width = $this.prop('width') || $this.width();
            if (height)
            {
                config.height = height;
            }
            if (width)
            {
                config.width = width;
            }
            id = 'ckeditor-' + $.editor_index;
            $this.prop('id', id);
            $this.addClass('j-ckeditor');
            CKEDITOR.replace(id, config);
        });
    }
    catch (e) {
        console.log(e);
    }
};
$.fn.disable = function(stop)
{
    var $this = $(this);
    if (stop)
    {
        $this.removeClass('j-disable');
        $this.unbind('click.disable');
    }
    else
    {
        $this.addClass('j-disable');
        $this.bind('click.disable', function(e)
        {
            e.preventDefault();
        });
    }
};
$.fn.get_editor = function()
{
    return CKEDITOR.instances[$(this).find('.j-ckeditor').prop('id')];
};
$.fn.flash = function()
{
    var $this = $(this),
        removeFlash;
    $this.addClass('j-flash');
    removeFlash = function()
    {
        $this.removeClass('j-flash', 'slow');
    };
    $this.effect('fadeIn', removeFlash);
};
$.fn.update_session_cache = function()
{
    var $this = $(this),
        $wrap;
    $wrap = $this.closest('.j-wrap-session-cache');
    $.jarvis.scache('html-' + $wrap.data('session-cache-key'), $wrap.html());
};
$.fn.loading = function(action)
{
    var $this = $(this),
        $wrap_loading,
        top,
        left,
        css,
        offset;
    if (action === 'stop')
    {
        $this.removeClass('j-loading');
        $('.j-loading-bar').remove();
    }
    else
    {
        $wrap_loading = $('<div class="j-loading-bar"><img src="' + url_root + '/l-img/loading-bar.gif" alt="loading-bar"/></div>');
        $this.addClass('j-loading');
        $('body').append($wrap_loading);
        offset = $this.offset();
        top = offset.top + ($this.height() - $wrap_loading.height()) * 0.5, left = offset.left + ($this.width() - $wrap_loading.width()) * 0.5;
        css = {
            top: top,
            left: left
        };
        $wrap_loading.css(css);
    }
};
$.fn.loading_bar = function(time_load, callback, repeat)
{
    if (typeof callback === 'boolean')
    {
        repeat = callback;
        callback = undefined;
    }
    if (typeof time_load === 'function')
    {
        callback = time_load;
        time_load = undefined;
    }
    if (typeof time_load === 'boolean')
    {
        repeat = time_load;
        time_load = undefined;
    }
    time_load = time_load > 0 ? time_load * 1000 : 1000;
    var $bar,
        $this = $(this),
        width,
        width_unit,
        num = 10,
        new_width;
    width = $this.width();
    width_unit = width / num;
    $bar = $('<div class="j-loading-bar"></div>');
    $bar.css({
        width: width_unit + 'px',
        height: $this.height() + 'px',
        top: $this.offset().top,
        left: $this.offset().left
    });
    $('body').append($bar);
    var progress = setInterval(function() {
        new_width = $bar.width() - -width_unit;
        if (new_width > width)
        {
            if (repeat === true)
            {
                $bar.width(width_unit);
            }
            else
            {
                clearInterval(progress);
                if (typeof callback === 'function')
                {
                    callback();
                }
            }
        }
        else
        {
            $bar.width(new_width);
        }
    }, time_load / num);
};
$.fn.count_line = function()
{
    var $this = $(this),
        count,
        num_line = 0;
    count = $this.val().match(/\n/g);
    if (count)
    {
        num_line = count.length;
    }
    return num_line;
};
$.fn.get_line_index = function(chr_index)
{
    var $this = $(this),
        line_index = 1,
        value,
        str1,
        count;
    value = $this.val();
    str1 = value.substring(0, chr_index);
    count = str1.match(/\n/g);
    if (count)
    {
        line_index = count.length + 1;
    }
    return line_index;
};
$.fn.animate_change = function()
{
    this.each(function()
    {
        var $this = $(this),
            $mask;
        $mask = $('<div></div>');
        $mask.css({
            position: 'absolute',
            backgroundColor: 'white',
            width: $this.width(),
            height: $this.height()
        });
        $this.prepend($mask);
        $mask.fadeOut('slow', function() {
            $mask.remove();
        });
    });
};
$.fn.select_anchor = function()
{
    var $this = $(this);
    $this.bind('change', function() {
        location.href = $this.val();
    });
};
;
$.jarvis = {};
$.jarvis.version = '0.1.0';
$.jarvis.token = token;
$.jarvis.set_token = function(token)
{
    $.jarvis.token = token;
};
$.jarvis.get_token = function()
{
    return $.jarvis.token;
};
$.jarvis.ajax = function(url, func_succ, info, method, func_before, auth)
{
    if (typeof func_before === 'function')
    {
        auth = func_before;
        func_before = undefined;
    }
    if (typeof info === 'string')
    {
        method = info;
        info = {};
    }
    method = method || 'get';
    info = info || {};
    info.auth = auth || {};
    info.token = $.jarvis.get_token();
    info.isJarvis = 1;
    $.ajax({
        url: url,
        type: method,
        dataType: 'json',
        data: info,
        beforeSend: function()
        {
            if (typeof func_before === 'function')
            {
                func_before();
            }
        },
        success: function(data)
        {
            $.jarvis.set_token(data.token);
            delete (data.token);
            if (typeof func_succ === 'function')
            {
                func_succ(data);
            }
        },
        error: function(e)
        {
            console.log('***************************** Jarvis AJAX ERROR - Start *****************************');
            console.log(e.responseText);
            console.log(e.status);
            console.log(url);
            console.log(info);
            console.log('***************************** Jarvis AJAX ERROR - End *****************************');
        }
    });
};
$.jarvis.lock = function(bgColor, key, no_scroll)
{
    var css,
        $locker,
        selector,
        lock_class;
    selector = key ? '.j-jarvis-lock.' + key : '.j-jarvis-lock';
    lock_class = key ? 'j-jarvis-lock ' + key : 'j-jarvis-lock';
    no_scroll = no_scroll === undefined ? true : no_scroll;
    if (bgColor === 'close')
    {
        $(selector).remove();
        $.jarvis.scrollable();
    }
    else
    {
        $locker = $('<div class="' + lock_class + '"></div>');
        css = {
            width: $(window).width(),
            height: $(window).height(),
            top: 0,
            left: 0,
            position: 'fixed',
            zIndex: 98
        };
        if (bgColor)
        {
            css.backgroundColor = bgColor;
            css.opacity = 0.75;
        }
        $locker.css(css);
        $('body').append($locker);
        if (no_scroll)
        {
            $.jarvis.scrollable('no');
        }
        return $locker;
    }
};
$.jarvis.scrollable = function(action)
{
    if (action === 'no')
    {
        $('body').addClass('no-scroll');
    }
    else
    {
        $('body').removeClass('no-scroll');
    }
};
$.jarvis.loading = function(action)
{
    var color = 'white';
    if (action !== 'start' && action !== 'stop')
    {
        color = action;
        action = 'start';
    }
    var $wrapLoading = $('.wrap-js .wrap-loading');
    if (action === 'start')
    {
        $.jarvis.lock(color, 'loading', false);
        $wrapLoading.removeClass('hide');
        $wrapLoading.move_center();
    }
    else if (action === 'stop')
    {
        $.jarvis.lock('close', 'loading', false);
        $wrapLoading.addClass('hide');
    }
};
$.jarvis.methods = function(plugin_name, $this, methods)
{
    $this.data('jarvis-methods.' + plugin_name, methods);
};
$.fn.methods = function(plugin_name)
{
    return this.data('jarvis-methods.' + plugin_name);
};
$.jarvis.options = function(plugin_name, $this, options)
{
    $this.data('jarvis-options.' + plugin_name, options);
};
$.fn.options = function(plugin_name)
{
    return this.data('jarvis-options.' + plugin_name);
};
$.jarvis.store_events = function(plugin_name, $this, events)
{
    $this.data('jarvis-events.' + plugin_name, events);
};
$.fn.events = function(plugin_name)
{
    var obj = this,
        store_events = obj.data('jarvis-events.' + plugin_name),
        bind = {
            bind: function(events, data)
            {
                if (typeof events === 'undefined')
                {
                    $.jarvis.call_func(store_events, obj);
                }
                else if (typeof events === 'string')
                {
                    $.jarvis.call_func(store_events[events], obj, data);
                }
                else if (typeof events === 'object')
                {
                    $.each(events, function(i, e)
                    {
                        $.jarvis.call_func(store_events[e], obj, data);
                    });
                }
            }
        };
    return bind;
};
$.jarvis.get_plugin_key = function(plugin_name)
{
    return 'jarvis-plugin-' + plugin_name;
};
$.fn.jarvis = function()
{
    var $this = $(this),
        Jarvis;
    if (typeof $this.jarvis === 'object')
    {
        Jarvis = $this.jarvis;
    }
    else
    {
        Jarvis = {
            show: function()
            {
                $this.removeClass('hide');
            },
            hide: function()
            {
                $this.addClass('hide');
            },
            plugin_exists: function(plugin_name)
            {
                var plugin_key = $.jarvis.get_plugin_key(plugin_name);
                return $this.hasClass(plugin_key);
            }
        };
        $this.jarvis = Jarvis;
    }
    return Jarvis;
};
$.jarvis.plugin = function(options)
{
    var plugin_name,
        plugin_methods,
        plugin_events,
        method_default,
        user_options;
    user_options = options.default_options || {};
    plugin_name = options.name;
    method_default = options.method_default;
    if (!plugin_name)
    {
        console.log({
            err: 'Not set plugin name!'
        });
        return false;
    }
    plugin_methods = options.methods || {};
    plugin_events = options.events || {};
    var basic_methods = {
        private: {
            onload: function()
            {},
            init: function()
            {
                var $this = $(this);
                $this.trigger('init-' + plugin_name);
            },
            bind_events: function(events)
            {
                $.jarvis.call_func(events, this);
            },
            get_data: function(key)
            {
                var $this = $(this),
                    key_data,
                    data;
                key_data = $.jarvis.get_plugin_key(plugin_name);
                data = $this.data(key_data) || {};
                if (key)
                {
                    return data[key];
                }
                return data;
            },
            set_data: function(key, value)
            {
                var $this = $(this),
                    key_data,
                    data;
                key_data = $.jarvis.get_plugin_key(plugin_name);
                data = data = $this.data(key_data) || {};
                if (typeof key === 'string')
                {
                    data[key] = value;
                }
                else
                {
                    data = key;
                }
                $this.data(key_data, data);
            },
            find: function(selector)
            {
                var $this = $(this),
                    $obj,
                    $selector = $();
                $(selector, $this).each(function()
                {
                    $obj = $(this);
                    if ($obj.closest('.j-wrap').is($this))
                    {
                        $selector = $obj;
                        return true;
                    }
                });
                return $selector;
            },
            get_row: function()
            {
                var $this = $(this);
                return $this.closest('.j-row');
            },
            get_wrap: function(key)
            {
                var $wrap = this.data(key);
                if ($wrap === undefined && $('.j-' + key).length)
                {
                    $wrap = $('.j-' + key);
                }
                return $wrap;
            }
        },
        public: {}
    };
    var str_eval_plugin,
        methods;
    methods = $.extend(true, basic_methods, plugin_methods);
    var plugin_func = function(method)
    {
        var args = $.makeArray(arguments);
        if (method !== undefined && typeof method !== 'object')
        {
            if (typeof methods.public[method] === 'function')
            {
                this.each(function()
                {
                    return methods.public[method].apply($(this), args.slice(1));
                });
            }
            else
            {
                return {
                    err: 'Method is not valid'
                };
            }
        }
        else
        {
            if (typeof method === 'object')
            {
                user_options = $.extend(true, user_options, method);
            }
            return this.each(function()
            {
                var $this = $(this),
                    plugin_key = $.jarvis.get_plugin_key(plugin_name);
                if ($this.jarvis().plugin_exists(plugin_name))
                {
                    if (typeof methods.public[method_default] === 'function')
                    {
                        return methods.public[method_default].apply($(this), args.slice(1));
                    }
                }
                else
                {
                    $this.data('key-data', plugin_key);
                    $this.addClass(plugin_key);
                    var private = {},
                        public = {};
                    $.each(methods.private, function(name, func)
                    {
                        private[name] = function()
                        {
                            var args = $.makeArray(arguments);
                            return methods.private[name].apply($this, args);
                        };
                    });
                    $.each(methods.public, function(name, func)
                    {
                        public[name] = function()
                        {
                            var args = $.makeArray(arguments);
                            return methods.public[name].apply($this, args);
                        };
                    });
                    $.jarvis.methods(plugin_name, $this, {
                        private: private,
                        public: public
                    });
                    $.jarvis.options(plugin_name, $this, user_options);
                    var events = {};
                    $.each(plugin_events, function(name, func)
                    {
                        events[name] = function()
                        {
                            var args = $.makeArray(arguments);
                            return plugin_events[name].apply($this, args);
                        };
                    });
                    $.jarvis.store_events(plugin_name, $this, events);
                    $this.bind('init-' + plugin_name, function()
                    {
                        methods.private.bind_events.call($this, plugin_events);
                        methods.private.onload.apply($this);
                    });
                    methods.private.init.apply($this);
                }
            });
        }
    };
    str_eval_plugin = '$.fn.' + plugin_name + '=plugin_func';
    eval(str_eval_plugin);
    return this;
};
$.jarvis.count = function(plugin_name)
{
    var key = $.jarvis.get_plugin_key(plugin_name);
    return $('.' + key).length;
};
$.jarvis.execute = function(plugin_name, func_name, params)
{
    var key = $.jarvis.get_plugin_key(plugin_name);
    $('.' + key).each(function()
    {
        var $this = $(this);
        $this.methods(plugin_name).public[func_name](params);
    });
    return;
};
$.jarvis.click_me = function(selector, e)
{
    var $this = $(selector);
    return $(e.target).is($this) || $(e.target).is($this.find('*'));
};
$.jarvis.call_func = function(arrFunc, obj, data)
{
    if (typeof obj === 'object')
    {
        if (typeof arrFunc === 'function')
        {
            (arrFunc).call(obj, data);
        }
        else
        {
            $.each(arrFunc, function(i, func)
            {
                func.call(obj, data);
            });
        }
    }
    else
    {
        if (typeof arrFunc === 'function')
        {
            (arrFunc)();
        }
        else
        {
            $.each(arrFunc, function(i, func)
            {
                (func)();
            });
        }
    }
};
$.jarvis.validate_form = function($form, arrMsg)
{
    var info,
        msg = [];
    info = $form.form_val();
    arrMsg = arrMsg ? arrMsg : {};
    if (!info.succ)
    {
        $.each(info.error, function(i, name)
        {
            msg.push(arrMsg[name]);
        });
        info.msg = msg;
    }
    return info;
};
$.jarvis.notify = function(arrMsg, arrNotify, callback)
{
    var str_msg = '',
        str_line = '';
    $.each(arrMsg, function(i, line)
    {
        if (arrNotify)
        {
            str_line = arrNotify[line];
        }
        else
        {
            str_line = line;
        }
        str_msg += '<p>' + str_line + '</p>';
    });
    ialert(str_msg, callback);
};
$.jarvis.html = function(key)
{
    var msg;
    switch (key)
    {
    case 'no-contents':
        {
            msg = '<mark class="j-no-contents">Không tìm thấy kết quả nào</mark>';
            break;
        }
    }
    ;
    return msg;
};
$.jarvis.need_reload = function(check)
{
    if (check)
    {
        return $('body').hasClass('j-need-load');
    }
    else
    {
        $('body').addClass('j-need-load');
    }
};
$.jarvis.delete_tmp_img = function(url, callback)
{
    if (typeof callback !== 'function')
    {
        callback = function()
        {
            $(window).trigger('delete-tmp-img-completed');
        };
    }
    $.jarvis.ajax('jarvis/activity/DeleteTmpFile?$res=data-only', callback, {
        url: url
    }, 'post');
};
$.fn.has_jarvis_plugin = function(plugin_name)
{
    return $(this).hasClass($.jarvis.get_plugin_key(plugin_name));
};
$.jarvis.cookie = function(key, value, options)
{
    var options_defaults,
        outPut,
        pluses;
    options_defaults = {
        json: true
    };
    pluses = /\+/g;
    options = $.extend({}, options_defaults, options);
    var stringifyCookieValue = function(value)
    {
        return encodeURIComponent(options.json ? JSON.stringify(value) : String(value));
    };
    var parseCookieValue = function(s)
    {
        if (s.indexOf('"') === 0)
        {
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        try
        {
            s = decodeURIComponent(s.replace(pluses, ' '));
        }
        catch (e) {
            return;
        }
        try
        {
            return options.json ? JSON.parse(s) : s;
        }
        catch (e) {}
    };
    var read = function(s, converter)
    {
        var value = parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    };
    var read_cookie = function(key)
    {
        var cookies,
            num,
            parts,
            name,
            cookie;
        cookies = document.cookie ? document.cookie.split('; ') : [];
        num = cookies.length;
        outPut = key ? undefined : {};
        for (i = 0; i < num; i++)
        {
            parts = cookies[i].split('=');
            name = decodeURIComponent(parts.shift());
            cookie = parts.join('=');
            if (key && key === name)
            {
                outPut = read(cookie, value);
                break;
            }
            if (!key && (cookie = read(cookie)) !== undefined)
            {
                outPut[name] = cookie;
            }
        }
        return outPut;
    };
    var write_cookie = function(key, value, options)
    {
        var days,
            t,
            arr_data_cookie;
        if (typeof options.expires === 'number')
        {
            days = options.expires;
            t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }
        arr_data_cookie = [encodeURIComponent(key), '=', stringifyCookieValue(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', '; path=/', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''];
        return ( document.cookie = arr_data_cookie.join('')) ;
    };
    if (value !== undefined && !$.isFunction(value))
    {
        outPut = write_cookie(key, value, options);
    }
    else
    {
        outPut = read_cookie(key);
    }
    return outPut;
};
$.jarvis.cookie.clear = function(key)
{
    if ($.jarvis.cookie(key) !== undefined)
    {
        return $.jarvis.cookie(key, '', {
            expires: -1
        });
    }
    else
    {
        return false;
    }
};
$.jarvis.scache = function(key, value)
{
    var outPut = false;
    if (!sessionStorage)
    {
        return false;
    }
    if (sessionStorage.session_id === undefined)
    {
        sessionStorage.session_id = time();
    }
    if (value !== undefined)
    {
        sessionStorage[key] = value;
        outPut = true;
    }
    else
    {
        outPut = sessionStorage[key];
    }
    return outPut;
};
$.jarvis.cache = function(key, value)
{
    var outPut = false;
    if (!localStorage)
    {
        return false;
    }
    if (value !== undefined)
    {
        localStorage[key] = value;
        outPut = true;
    }
    else
    {
        outPut = localStorage[key];
    }
    return outPut;
};
$.jarvis.worker = {
    storage: []
};
$.jarvis.worker.new = function(worker)
{
    $.jarvis.worker.storage.push(worker);
};
$.jarvis.worker.run = function()
{
    $($.jarvis.worker.storage).each(function(i, worker)
    {
        worker.main();
        setInterval(function()
        {
            worker.main();
        }, worker.timeInterval);
    });
};
$.jarvis.api = function(action, callback, data)
{
    $.jarvis.ajax('api/action/' + action + '?$res=data-only', callback, data, 'post');
};
$.jarvis.load_app = function()
{
    $('.j-app:not(.j-app-loaded)').each(function()
    {
        var $this = $(this),
            group,
            plugin,
            arrPlugin = [];
        var load_script = function(group, plugin)
        {
            var callback = function()
            {
                if ($this.data('app-selector'))
                {
                    $this.find('.' + $this.data('app-selector'))[plugin]();
                }
                else
                {
                    $this[plugin]();
                }
                $this.addClass('j-app-loaded');
            };
            if (!$.fn[plugin])
            {
                $.getScript(url_root + 'minify/plugin/' + group + '/' + plugin + '.js?v=' + time(), callback);
            }
            else
            {
                callback();
            }
        };
        group = $this.data('script-group');
        plugin = $this.data('script-plugin');
        if (plugin === undefined)
        {
            var arr_script = explode(';', $this.data('script'));
            $(arr_script).each(function(i, str)
            {
                if (str.indexOf('-') > 0)
                {
                    var script = explode('-', str);
                    group = script[0];
                    plugin = script[1];
                }
                else
                {
                    group = null;
                    plugin = str;
                }
                arrPlugin.push({
                    group: group,
                    plugin: plugin
                });
            });
        }
        else
        {
            arrPlugin = [{
                group: group,
                plugin: plugin
            }];
        }
        $(arrPlugin).each(function(i, plugin)
        {
            load_script(plugin.group, plugin.plugin);
        });
    });
};
$.jarvis.load_css = function(url)
{
    $('<link>').appendTo($('head')).attr({
        type: 'text/css',
        rel: 'stylesheet'
    }).attr('href', url);
};
$.jarvis.tag = function(tags, callback)
{
    var info = {};
    if (typeof tags === 'array')
    {
        info.arr_tags = tags;
    }
    if (typeof tags === 'string')
    {
        if (tags.indexOf(',') > 0)
        {
            info.str_tags = tags;
        }
        else
        {
            info.tag = tags;
        }
    }
    $.jarvis.ajax('activity/tag/SaveTag?$res=data-only', callback, info, 'post');
};
$.jarvis.sync_token = function(callback)
{
    $.jarvis.ajax('jarvis/system/SyncToken?$res=data-only', callback, {}, 'post');
};
;
$.jarvis.plugin({
    name: 'Captcha',
    method_default: 'load',
    methods: {
        private: {
            load: function()
            {
                var $this = $(this),
                    $image = $this.find('.j-img'),
                    src,
                    time = new Date();
                src = url_root + 'captcha/' + $this.data('id') + '?' + time.getTime();
                $image.attr('src', src);
            }
        },
        public: {
            load: function()
            {
                var $this = $(this);
                $this.methods('Captcha').private.load();
            }
        }
    },
    events: {
        prepare: function()
        {
            var $this = $(this);
            $this.methods('Captcha').private.load();
        },
        load: function()
        {
            var $this = $(this);
            $this.find('.j-load').on('click', function()
            {
                $this.methods('Captcha').private.load();
            });
        }
    }
});
$.jarvis.plugin({
    name: 'DayMonthYear',
    methods: {
        private: {
            change: function()
            {
                var $this = $(this),
                    day,
                    month,
                    year;
                day = parseInt($this.find('.j-day').val());
                month = parseInt($this.find('.j-month').val());
                year = parseInt($this.find('.j-year').val());
                $this.find('.j-value').val(mktime(0, 0, 0, month, day, year));
            }
        },
        public: {}
    },
    events: {
        change: function()
        {
            var $this = $(this);
            $this.find('.j-day,.j-month,.j-year').bind('change', function()
            {
                $this.methods('DayMonthYear').private.change();
            });
        }
    }
});
$.jarvis.plugin({
    name: 'Loader',
    methods: {
        private: {
            prepare: function()
            {
                var $this = $(this);
                $this.methods('Loader').private.set_data('load-quick', $this.data('load-quick') !== undefined || $this.data('load-client-only'));
                $this.methods('Loader').private.set_data('num-max-row', $this.find('.j-list .j-row').length);
                var options = $this.options('Loader');
                if (typeof options.change_callback === 'function')
                {
                    options.change_callback($this);
                }
                $this.methods('Loader').private.set_data('scroll-load-more', !$this.find('.j-load-more').length);
            },
            trigger_load_more: function()
            {
                var $this = $(this),
                    $btn_load_more,
                    $list;
                $list = $this.methods('Loader').private.get_list();
                if (!$list.data('load-info').over)
                {
                    $btn_load_more = $this.find('.j-load-more');
                    if ($btn_load_more.length)
                    {
                        $btn_load_more.trigger('click');
                    }
                    else
                    {
                        $this.methods('Loader').private.load(true);
                    }
                }
            },
            typing: function(flag)
            {
                var $this = $(this),
                    outPut,
                    $input = $this.find('.j-wrap-search-keyword .j-input');
                if (flag === undefined)
                {
                    outPut = $input.hasClass('j-typing');
                }
                else
                {
                    if (flag)
                    {
                        $input.addClass('j-typing');
                    }
                    else
                    {
                        $input.removeClass('j-typing');
                    }
                }
                return outPut;
            },
            get_list: function()
            {
                var $this = $(this);
                return $this.methods('Loader').private.find('.j-list');
            },
            load_succ: function(data, load_more)
            {
                var $this = $(this),
                    $list = $this.methods('Loader').private.get_list(),
                    $html = $(data.html),
                    loadInfo;
                loadInfo = data.loadInfo;
                $list.data('load-info', loadInfo);
                $.jarvis.loading('stop');
                if (load_more === true)
                {
                    if (loadInfo.data.keyword !== undefined)
                    {
                        $html.each(function()
                        {
                            $(this).addClass('j-row-searched');
                        });
                    }
                    if ($list.data('dir') === 'reverse')
                    {
                        $list.prepend($html);
                    }
                    else
                    {
                        $list.append($html);
                    }
                    if ($html.find('img.j-lazy').length)
                    {
                        $html.find('img.j-lazy').lazy_load();
                    }
                }
                else if (load_more === 'refresh')
                {
                    if ($list.data('dir') === 'reverse')
                    {
                        $list.iappend($html);
                    }
                    else
                    {
                        $list.iprepend($html);
                    }
                }
                else if (!load_more)
                {
                    $(window).scrollTop(0);
                    if ($html)
                    {
                        $list.html($html);
                        var keyword,
                            $wrap_search = $this.methods('Loader').private.find('.j-wrap-search-keyword');
                        if ($wrap_search.length)
                        {
                            keyword = full_trim($wrap_search.find('.j-input').val());
                        }
                        if ($this.data('load-client-only') && keyword)
                        {
                            $this.methods('Loader').private.search();
                        }
                    }
                    else
                    {
                        var msg = 'Không tìm thấy kết quả nào';
                        if (!$this.methods('Loader').private.get_data('load-quick'))
                        {
                            ialert(msg);
                        }
                        else
                        {
                            $list.html($.jarvis.html('no-contents'));
                        }
                    }
                }
                $this.trigger('load-succ', [load_more, loadInfo]);
                var $button = $this.find('.j-load-more');
                $button.text($button.data('text-load-more'));
                if (data.loadInfo.over)
                {
                    $button.jarvis().hide();
                }
                else
                {
                    $button.jarvis().show();
                }
                $this.removeClass('j-searching');
                $this.methods('Loader').private.check_no_contents();
                var options = $this.options('Loader');
                if (typeof options.change_callback === 'function')
                {
                    options.change_callback($this);
                }
                $this.removeClass('j-loading-data');
                $list.find('.j-row').animate_change();
            },
            check_no_contents: function()
            {
                var $this = $(this),
                    $list;
                $list = $this.methods('Loader').private.get_list();
                if (!$list.find('.j-row:not(.j-search-hide)').length)
                {
                    $this.find('.j-no-contents').removeClass('hide');
                }
                else
                {
                    $this.find('.j-no-contents').addClass('hide');
                }
            },
            load: function(load_more)
            {
                var $this = $(this),
                    loadInfo,
                    formInfo,
                    $list,
                    action;
                if ($this.hasClass('j-loading-data'))
                {
                    return false;
                }
                $this.addClass('j-loading-data');
                $list = $this.methods('Loader').private.get_list();
                loadInfo = $list.data('load-info') || {};
                if (!load_more)
                {
                    loadInfo.load_more = 0;
                }
                else if (load_more === true)
                {
                    loadInfo.load_more = 1;
                }
                else if (load_more === 'refresh')
                {
                    loadInfo.refresh = 1;
                }
                var load_succ = function(data)
                {
                    $this.methods('Loader').private.loading('stop');
                    $this.methods('Loader').private.load_succ(data, load_more);
                };
                formInfo = $this.data('form-info') || {};
                loadInfo['data'] = $.extend({}, loadInfo['data'], formInfo);
                $this.methods('Loader').private.loading('start');
                action = $this.data('load-action');
                if (action.indexOf('$res') < 0)
                {
                    action += '?$res=for-view';
                }
                $.jarvis.ajax(action, load_succ, loadInfo, 'post');
            },
            loading: function(action)
            {
                var $this = $(this);
                if (action === 'stop')
                {
                    var $list = $this.methods('Loader').private.get_list();
                    $list.loading('stop');
                    $this.removeClass('j-loading');
                }
                else if (action === 'start')
                {
                    $this.addClass('j-loading');
                }
                else
                {
                    return $this.hasClass('j-loading');
                }
            },
            search: function()
            {
                var $this = $(this),
                    keyword,
                    num_show,
                    num_max_row,
                    $wrap_search;
                $wrap_search = $this.methods('Loader').private.find('.j-wrap-search-keyword');
                num_max_row = $this.methods('Loader').private.get_data('num-max-row');
                if ($wrap_search.length)
                {
                    keyword = full_trim($wrap_search.find('.j-input').val());
                }
                var formInfo = $this.data('form-info') || {};
                formInfo.end = 0;
                formInfo.keyword = keyword;
                $.jarvis.cache('keyword-search-' + $this.data('key-search'), keyword);
                $this.data('form-info', formInfo);
                $this.find('.j-no-contents').addClass('hide');
                if ($this.methods('Loader').private.get_data('load-quick') && !$this.data('no-search-client'))
                {
                    $this.find('.j-load-more').addClass('hide');
                    num_show = $this.methods('Loader').private.search_client(keyword);
                    $this.methods('Loader').private.focus_first();
                    if (num_show < num_max_row && !$this.data('load-client-only'))
                    {
                        setTimeout(function()
                        {
                            $this.methods('Loader').private.search_server(true);
                        }, 200);
                    }
                    else
                    {
                        $this.methods('Loader').private.check_no_contents();
                        $this.removeClass('j-searching');
                    }
                }
                else if (!$this.data('load-client-only'))
                {
                    $.jarvis.loading();
                    $this.methods('Loader').private.search_server(false);
                }
            },
            focus_first: function()
            {
                var $this = $(this),
                    $list,
                    $first;
                $list = $this.methods('Loader').private.get_list();
                $first = $list.find('.j-row:not(.j-search-hide):first');
                $first.addClass('j-focus-search');
                $first.removeClass('j-focus-search', 'slow');
            },
            search_client: function(keyword)
            {
                var $this = $(this),
                    keyword_search,
                    num_show = 0,
                    num_hide = 0,
                    $list,
                    loadInfo;
                keyword_search = full_trim(clear_vn_sign(keyword.toLowerCase()));
                $list = $this.methods('Loader').private.get_list();
                $list.find('.j-row.j-row-searched').remove();
                $list.find('.j-row:not(.j-row-searched)').each(function(i, row)
                {
                    var text,
                        $row = $(row);
                    text = full_trim(clear_vn_sign(row.textContent.toLowerCase()));
                    if (text.search(keyword_search) < 0)
                    {
                        num_hide++;
                        $row.addClass('j-search-hide');
                    }
                    else
                    {
                        num_show++;
                        $row.removeClass('j-search-hide');
                    }
                });
                var formInfo = $this.data('form-info') || {};
                formInfo.keyword = keyword;
                $this.data('form-info', formInfo);
                if (num_hide === 0)
                {
                    $this.find('.j-load-more').removeClass('hide');
                }
                loadInfo = $list.data('load-info') || {};
                loadInfo.over = false;
                loadInfo.count = num_show;
                loadInfo.end = num_show;
                $list.data('load-info', loadInfo);
                return num_show;
            },
            search_server: function(loadmore)
            {
                var $this = $(this),
                    $list;
                $list = $this.methods('Loader').private.get_list();
                $list.loading();
                $this.methods('Loader').private.load(loadmore);
            },
            focus_input: function()
            {
                var $this = $(this);
                $this.find('.j-wrap-search-keyword .j-form').addClass('j-focus-search', 'fast');
            },
            change_condition: function(condition, id)
            {
                var $this = $(this);
                var formInfo = $this.data('form-info') || {};
                formInfo[condition] = id;
                $this.data('form-info', formInfo);
                if (!$this.methods('Loader').private.get_data('load-quick'))
                {
                    $.jarvis.loading();
                }
                $this.methods('Loader').private.load(false);
            },
            set_form_data: function(data)
            {
                var $this = $(this),
                    formInfo;
                formInfo = $this.data('form-info') || {};
                formInfo = $.extend({}, formInfo, data);
                $this.data('form-info', formInfo);
            },
            change_keyword: function(keyword)
            {
                var $this = $(this),
                    formInfo;
                $this.find('.j-wrap-search-keyword .j-input').val(keyword);
                formInfo = $this.data('form-info') || {};
                formInfo.keyword = keyword;
                $this.data('form-info', formInfo);
                $this.methods('Loader').private.load(false);
            }
        },
        public: {
            get_list: function()
            {
                var $this = $(this);
                return $this.methods('Loader').private.get_list();
            },
            change_keyword: function(keyword)
            {
                var $this = $(this);
                return $this.methods('Loader').private.change_keyword(keyword);
            },
            load: function(data)
            {
                var $this = $(this);
                $this.methods('Loader').private.set_form_data(data);
                $this.methods('Loader').private.load(false);
            }
        }
    },
    events: {
        prepare: function()
        {
            var $this = $(this);
            $this.methods('Loader').private.prepare();
        },
        trigger_load_more: function()
        {
            var $this = $(this);
            $this.bind('load-more', function()
            {
                $this.methods('Loader').private.trigger_load_more();
            });
        },
        load_more: function()
        {
            var $this = $(this),
                $load_more;
            $load_more = $this.methods('Loader').private.find('.j-load-more');
            $load_more.bind('click', function()
            {
                $load_more.loading();
                $this.methods('Loader').private.load(true);
                var $button = $(this);
                $button.text($button.data('text-loading'));
            });
            var $list = $this.methods('Loader').private.get_list();
            if ($list.hasClass('j-nice-scroll'))
            {
                var scroll = $list.niceScroll();
                if ($this.data('load-more'))
                {
                    scroll.scrollend(function(pos)
                    {
                        var nice_scroll = $list.getNiceScroll()[0];
                        if (pos.current.y >= nice_scroll.scrollvaluemax)
                        {
                            $this.trigger('load-more');
                        }
                    });
                }
            }
        },
        refresh: function()
        {
            var $this = $(this),
                timeRefresh;
            timeRefresh = $this.data('time-refresh');
            if (timeRefresh > 0)
            {
                setInterval(function()
                {
                    $this.methods('Loader').private.load('refresh');
                }, timeRefresh * 1000);
            }
        },
        focus_input: function()
        {
            var $this = $(this);
            $this.find('.j-wrap-search-keyword .j-form .j-input').bind('click focus', function()
            {
                $this.methods('Loader').private.focus_input();
            });
        },
        search: function()
        {
            var $this = $(this),
                load_quick = $this.methods('Loader').private.get_data('load-quick'),
                $wrap_search;
            $wrap_search = $this.methods('Loader').private.find('.j-wrap-search-keyword');
            $wrap_search.find('.j-form').bind('submit', function(e)
            {
                e.preventDefault();
                $this.methods('Loader').private.search();
            });
            $wrap_search.find('.j-submit').bind('click', function(e)
            {
                $this.methods('Loader').private.search();
            });
            $this.find('.j-select-condition').bind('change', function(e, id)
            {
                $this.methods('Loader').private.change_condition($(this).data('condition'), id);
            });
            if (load_quick)
            {
                $wrap_search.find('.j-input').bind('keydown', function(e)
                {
                    $this.addClass('j-typing');
                });
                $wrap_search.find('.j-input').bind('keyup', function(e)
                {
                    $this.removeClass('j-typing');
                    setTimeout(function()
                    {
                        if (!$this.hasClass('j-typing') && !$this.hasClass('j-searching'))
                        {
                            $this.addClass('j-searching');
                            $this.methods('Loader').private.search();
                        }
                    }, 100);
                });
            }
        }
    }
});
$.jarvis.plugin({
    name: 'ElasticContents',
    method_default: 'show',
    methods: {
        private: {
            toggle_view: function()
            {
                var $this = $(this);
                $this.toggleClass('j-collapse', 'fast', function() {
                    $this.find('.j-view').toggleClass('hide');
                });
            }
        },
        public: {}
    },
    events: {
        toggle_view: function()
        {
            var $this = $(this);
            $this.find('.j-view').bind('click', function()
            {
                $this.methods('ElasticContents').private.toggle_view();
            });
        }
    }
});
$.jarvis.plugin({
    name: 'ScrollFixed',
    method_default: 'update',
    methods: {
        private: {
            prepare: function()
            {
                var $this = $(this),
                    gap_top;
                gap_top = $this.hasClass('j-horizontal-top-bar') ? 0 : 65;
                $this.methods('ScrollFixed').private.set_data('gap-top', gap_top);
                $this.methods('ScrollFixed').private.set_data('top', $this.offset().top);
                $this.methods('ScrollFixed').private.set_data('position', $this.css('position'));
                $this.methods('ScrollFixed').private.set_data('transparent', $this.hasClass('transparent'));
                $this.methods('ScrollFixed').private.set_data('check-scroll-end', $this.data('check-scroll-end'));
            },
            scroll_to_section: function($section, slow)
            {
                var $this = $(this),
                    scroll_pos,
                    complete_scroll;
                if ($this.css('position') === 'fixed')
                {
                    scroll_pos = $section.offset().top - $this.height();
                }
                else
                {
                    scroll_pos = $section.offset().top + $this.height() - $this.offset().top;
                }
                if (!slow)
                {
                    complete_scroll = function()
                    {
                        $this.methods('ScrollFixed').private.scroll_to_section($section, true);
                    };
                }
                $('html, body').animate({
                    scrollTop: scroll_pos
                }, slow ? 'slow' : 'fast', complete_scroll);
            },
            click_tab: function($tab)
            {
                var $this = $(this),
                    $section;
                $section = $('.' + $tab.data('section-name'));
                $this.methods('ScrollFixed').private.scroll_to_section($section);
            },
            focus_tab: function()
            {
                var $this = $(this),
                    current_pos,
                    $previous_tab = false,
                    $previous_section,
                    selected = false;
                current_pos = $(window).scrollTop() - -$this.height();
                $this.find('.j-tab:first').addClass('selected');
                $this.find('.j-tab').each(function(i, tab)
                {
                    var $tab = $(tab),
                        $section;
                    $section = $('.' + $tab.data('section-name'));
                    $tab.removeClass('selected');
                    if ($previous_tab)
                    {
                        if (current_pos < $section.offset().top && current_pos >= $previous_section.offset().top)
                        {
                            $previous_tab.addClass('selected');
                            selected = true;
                        }
                    }
                    else if (current_pos < $section.offset().top)
                    {
                        $tab.addClass('selected');
                        selected = true;
                    }
                    $previous_tab = $tab;
                    $previous_section = $section;
                });
                if (!selected)
                {
                    $this.find('.j-tab:last').addClass('selected');
                }
            },
            scroll: function()
            {
                var $this = $(this),
                    top,
                    gap_top = 0,
                    scroll_pos,
                    css,
                    position,
                    transparent;
                if ($('.j-horizontal-top-bar.j-fixing').length)
                {
                    gap_top = $this.methods('ScrollFixed').private.get_data('gap-top');
                }
                top = $this.methods('ScrollFixed').private.get_data('top');
                position = $this.methods('ScrollFixed').private.get_data('position');
                transparent = $this.methods('ScrollFixed').private.get_data('transparent');
                scroll_pos = $(window).scrollTop();
                if (scroll_pos > top)
                {
                    var $footer,
                        fix_top = gap_top,
                        d_height,
                        w_height,
                        check_scroll_end;
                    $footer = $('footer');
                    w_height = $(window).height();
                    d_height = $(document).height();
                    check_scroll_end = $this.methods('ScrollFixed').private.get_data('check-scroll-end');
                    if (check_scroll_end && d_height - scroll_pos - w_height <= $footer.height())
                    {
                        fix_top += d_height - scroll_pos - w_height - $footer.height();
                    }
                    css = {
                        position: 'fixed',
                        top: fix_top + 'px'
                    };
                    $this.removeClass('transparent');
                    if (!$this.hasClass('j-fixing'))
                    {
                        $this.addClass('j-fixing');
                        $this.trigger('fixed');
                    }
                }
                else
                {
                    css = {
                        position: position,
                        top: 'auto'
                    };
                    if (transparent)
                    {
                        $this.addClass('transparent');
                    }
                    if ($this.hasClass('j-fixing'))
                    {
                        $this.removeClass('j-fixing');
                        $this.trigger('clearfixed');
                    }
                }
                $this.css(css);
                $this.methods('ScrollFixed').private.focus_tab();
            }
        },
        public: {
            update: function()
            {
                var $this = $(this);
                $this.removeClass($.jarvis.get_plugin_key('ScrollFixed'));
                $this.ScrollFixed();
            }
        }
    },
    events: {
        prepare: function()
        {
            var $this = $(this);
            $this.methods('ScrollFixed').private.prepare();
        },
        click_tab: function()
        {
            var $this = $(this);
            $this.find('.j-tab').bind('click', function()
            {
                $this.methods('ScrollFixed').private.click_tab($(this));
            });
        },
        scroll: function()
        {
            var $this = $(this);
            $(window).scroll(function()
            {
                $this.methods('ScrollFixed').private.scroll();
            });
        }
    }
});
$.jarvis.plugin({
    name: 'CenterPopup',
    method_default: 'show',
    methods: {
        private: {
            update: function()
            {
                var $this = $(this);
                $this.move_center();
            },
            show: function()
            {
                var $this = $(this),
                    options;
                $this.addClass('hide');
                $this.methods('CenterPopup').private.hide_others();
                var $lock = $.jarvis.lock('black');
                $this.data('lock', $lock);
                $this.addClass('body-less');
                $this.removeClass('hide');
                $this.move_center();
                $this.removeClass('body-less');
                if (!$this.data('un-draggable') === true)
                {
                    $this.draggable();
                }
                options = $this.options('CenterPopup');
                if (options.top !== undefined)
                {
                    $this.css('top', options.top);
                }
                if (options.left !== undefined)
                {
                    $this.css('left', options.left);
                }
                if (options.right !== undefined)
                {
                    $this.css('right', options.right);
                }
                if (options.css !== undefined)
                {
                    $this.css(options.css);
                }
                if (!$this.find('.j-close').length)
                {
                    $this.events('CenterPopup').bind(['focus_out_close']);
                }
            },
            close: function(close_all)
            {
                var $this = $(this);
                $this.addClass('hide');
                $.jarvis.scrollable();
                var $lock = $this.data('lock');
                if ($lock)
                {
                    $lock.remove();
                }
                $this.removeData('lock');
                $this.trigger('closepopup');
                if (!close_all)
                {
                    $this.methods('CenterPopup').private.show_others();
                }
                var options = $this.options('CenterPopup');
                if (typeof options.callback === 'function')
                {
                    (options.callback)();
                }
            },
            hide_others: function()
            {
                var $this = $(this),
                    arrShowCenterPopup,
                    plugin_key = $.jarvis.get_plugin_key('CenterPopup');
                arrShowCenterPopup = $('.' + plugin_key + ':not(.hide)');
                $.each(arrShowCenterPopup, function()
                {
                    $(this).CenterPopup('close');
                });
                $this.data('arrShowCenterPopup', arrShowCenterPopup);
            },
            show_others: function()
            {
                var $this = $(this),
                    arrShowCenterPopup;
                arrShowCenterPopup = $this.data('arrShowCenterPopup');
                if (arrShowCenterPopup)
                {
                    $.each(arrShowCenterPopup, function()
                    {
                        var $obj = $(this);
                        if ($obj)
                        {
                            $obj.CenterPopup('show');
                        }
                    });
                }
                $this.removeData('arrShowCenterPopup');
            }
        },
        public: {
            show: function()
            {
                var $this = $(this);
                $this.methods('CenterPopup').private.show();
            },
            close: function(close_all)
            {
                var $this = $(this);
                if ($this.methods('CenterPopup'))
                {
                    $this.methods('CenterPopup').private.close(close_all);
                }
            }
        }
    },
    events: {
        init: function()
        {
            var $this = $(this);
            $this.methods('CenterPopup').private.show();
        },
        close: function()
        {
            var $this = $(this);
            $('.j-close', $this).bind('click', function(e)
            {
                $this.methods('CenterPopup').private.close($(this).hasClass('j-close-all') || $this.hasClass('j-close-all'));
            });
        },
        focus_out_close: function()
        {
            var $this = $(this);
            $(document).bind('keydown.closeCenterPopup', function(e)
            {
                if (e.keyCode === 27)
                {
                    $this.methods('CenterPopup').private.close($(this).hasClass('j-close-all') || $this.hasClass('j-close-all'));
                }
            });
            $('body,html').bind('click.closeCenterPopup', function(e)
            {
                if (!$.jarvis.click_me($this, e))
                {}
            });
        },
        window_resize: function()
        {
            var $this = $(this);
            $(window).bind('resize', function(e)
            {
                $this.methods('CenterPopup').private.update();
            });
        }
    }
});
$.jarvis.plugin({
    name: 'SimplePopup',
    method_default: 'update',
    methods: {
        private: {
            prepare: function()
            {
                var $this = $(this),
                    $input,
                    value = '';
                if ($this.data('value'))
                {
                    value = $this.data('value');
                }
                $input = '<input data-null class="j-value" type="hidden" name="' + $this.data('condition') + '" value="' + value + '"/>';
                $this.append($input);
            },
            show: function()
            {
                var $this = $(this);
                $this.find('.j-popup').removeClass('hide').addClass('show');
            },
            hide: function()
            {
                var $this = $(this);
                $this.find('.j-popup').removeClass('show').addClass('hide');
            },
            change: function(href)
            {
                location.href = href;
            },
            clear: function()
            {
                var $this = $(this),
                    $text_view;
                $this.find('.j-popup .j-row .j-text').removeClass('selected');
                $this.find('.j-list .j-row').removeClass('selected');
                $text_view = $this.find('.j-text:first');
                $text_view.text('');
                $text_view.removeClass('selected');
                $text_view.prop('title', '');
                $this.methods('SimplePopup').private.hide();
                $this.methods('SimplePopup').private.set_data('selected', '');
                $this.trigger('change', ['']);
                $this.find('.j-value').val('');
            },
            click: function($row)
            {
                var $this = $(this),
                    id = $row.data('id'),
                    text,
                    $text_popup,
                    $text_view;
                $text_popup = $row.find('.j-text:first');
                $this.find('.j-popup .j-row .j-text').removeClass('selected');
                $text_popup.addClass('selected');
                text = $text_popup.text();
                $this.find('.j-list .j-row').removeClass('selected');
                $row.addClass('selected');
                $text_view = $this.find('.j-text:first');
                $text_view.text(text);
                $text_view.addClass('selected');
                $text_view.prop('title', text);
                $this.methods('SimplePopup').private.hide();
                $this.methods('SimplePopup').private.set_data('selected', id);
                $this.find('.j-value').val(id);
                $this.trigger('change', [id]);
                var $form = $this.closest('form');
                if ($form.length && !$this.data('no-autosubmit'))
                {
                    $form.trigger('submit');
                }
            },
            get_status: function()
            {
                var $this = $(this);
                return $this.find('.j-popup').hasClass('hide') ? 'close' : 'open';
            },
            unbind: function()
            {
                var $this = $(this);
                $this.find('.j-text:first, .j-click').unbind('click.jarvis-simple-popup-event');
                $this.find('.j-row .j-text').unbind('click.jarvis-simple-popup-event');
                $(document).unbind('click.jarvis-simple-popup-event');
                $(document).unbind('keydown.jarvis-simple-popup-event');
            }
        },
        public: {
            update: function()
            {
                var $this = $(this);
                $this.events('SimplePopup').bind();
            },
            close: function()
            {
                var $this = $(this);
                $this.methods('SimplePopup').private.hide();
            },
            clear: function()
            {
                var $this = $(this);
                $this.methods('SimplePopup').private.clear();
            },
            destroy: function()
            {
                var $this = $(this);
                $this.methods('SimplePopup').private.hide();
                $this.methods('SimplePopup').private.unbind();
                $this.remove();
            }
        }
    },
    events: {
        prepare: function()
        {
            var $this = $(this);
            $this.methods('SimplePopup').private.prepare();
        },
        hide: function()
        {
            var $this = $(this);
            $(document).bind('click.jarvis-simple-popup-event', function(e)
            {
                if ($this.methods('SimplePopup') !== undefined)
                {
                    if (!$.jarvis.click_me($this.find('.j-text:first, .j-click'), e))
                    {
                        $this.methods('SimplePopup').private.hide();
                    }
                    else if ($this.find('.j-popup.show').length)
                    {
                        $this.methods('SimplePopup').private.hide();
                    }
                    else
                    {
                        $this.methods('SimplePopup').private.show();
                    }
                }
            });
            $(document).bind('keydown.jarvis-simple-popup-event', function(e)
            {
                if (e.keyCode === 27 && $this.methods('SimplePopup') !== undefined)
                {
                    $this.methods('SimplePopup').private.hide();
                }
            });
        },
        click: function()
        {
            var $this = $(this);
            $this.find('.j-row .j-text').bind('click.jarvis-simple-popup-event', function()
            {
                $this.methods('SimplePopup').private.click($(this).closest('.j-row'));
            });
            $this.find('select.j-list').bind('change.jarvis-simple-popup-event', function()
            {
                $this.methods('SimplePopup').private.change($(this).val());
            });
        }
    }
});
$.jarvis.plugin({
    name: 'ahref',
    methods: {
        private: {
            click: function()
            {
                var $this = $(this),
                    href;
                href = $this.data('href');
                location.href = href;
            }
        },
        public: {}
    },
    events: {
        click: function()
        {
            var $this = $(this);
            $this.bind('click', function(e)
            {
                e.preventDefault();
                $this.methods('ahref').private.click();
            });
        }
    }
});
$.jarvis.plugin({
    name: 'ajax_request',
    method_default: 'update',
    methods: {
        private: {
            click: function()
            {
                var $this = $(this),
                    confirm_msg;
                confirm_msg = $this.data('confirm');
                if (confirm_msg)
                {
                    var callback = function(confirm)
                    {
                        if (confirm)
                        {
                            $this.methods('ajax_request').private.execute();
                        }
                        else
                        {
                            $this.closest('.j-row').removeClass('j-focus');
                            $this.trigger('cancel');
                        }
                    };
                    $this.closest('.j-row').addClass('j-focus');
                    $this.trigger('confirm');
                    iconfirm(confirm_msg, callback);
                }
                else
                {
                    $this.methods('ajax_request').private.execute();
                }
            },
            execute: function()
            {
                var $this = $(this),
                    href;
                if ($this.hasClass('ahref'))
                {
                    href = $this.data('ahref');
                }
                else
                {
                    href = $this.prop('href');
                }
                var callback = function(data)
                {
                    location.reload();
                };
                $.jarvis.ajax(href + '?$res=data-only', callback, {}, 'post');
            }
        },
        public: {
            update: function()
            {
                var $this = $(this);
                $this.removeClass('jarvis-plugin-ajax_request');
                $this.ajax_request();
            }
        }
    },
    events: {
        click: function()
        {
            var $this = $(this);
            $this.bind('click.ajax_request', function(e)
            {
                e.preventDefault();
                $this.methods('ajax_request').private.click();
            });
        }
    }
});
$.jarvis.plugin({
    name: 'calendar',
    methods: {
        private: {
            prepare: function()
            {
                var $this = $(this),
                    format,
                    time_val,
                    date_format,
                    minDate,
                    value_type;
                value_type = $this.data('value-type');
                format = $this.data('date-format') ? $this.data('date-format') : "d-m-Y";
                $this.methods('calendar').private.set_data('format', format);
                $this.methods('calendar').private.set_data('value-type', value_type)
                time_val = $this.find('.j-value').val();
                if (time_val > 0)
                {
                    $this.find('.j-picker').val(date(format, time_val));
                }
                date_format = (format = 'd-m-Y' ? 'dd-mm-yy' : (format = 'd/m/Y' ? 'dd/mm/yy' : 'dd.mm.yy'));
                minDate = $this.data('min-date');
                if (!minDate)
                {
                    minDate = 0;
                }
                $this.find('.j-picker').datepicker({
                    dateFormat: date_format,
                    minDate: minDate
                });
                $this.trigger('change', [time_val]);
            },
            picker_change: function()
            {
                var $this = $(this),
                    str_date,
                    time_val,
                    value_type;
                value_type = $this.methods('calendar').private.get_data('value-type');
                str_date = $this.find('.j-picker').val();
                time_val = str_to_time(str_date);
                if (value_type === 'end-day')
                {
                    time_val += 86400 - 1;
                }
                else if (value_type === 'from-now')
                {
                    var time_start_day = timeStartOfThisDay();
                    time_val = time_val < time_start_day ? null : (time_val >= time_start_day + 86400 ? time_val : time());
                }
                $this.find('.j-value').val(time_val);
            }
        },
        public: {
            option: function(option)
            {
                var $this = $(this);
                $.each(option, function(key, value)
                {
                    switch (key)
                    {
                    case 'minTime':
                    case 'maxTime':
                        {
                            var num_days,
                                time_start_of_this_day,
                                option_name;
                            time_start_of_this_day = timeStartOfThisDay();
                            num_days = parseInt((value - time_start_of_this_day) / 86400);
                            option_name = (key === 'minTime' ? 'minDate' : 'maxDate');
                            $this.find('.j-picker').datepicker('option', option_name, num_days);
                            break;
                        };
                    }
                });
            }
        }
    },
    events: {
        prepare: function()
        {
            var $this = $(this);
            $this.methods('calendar').private.prepare();
        },
        picker_change: function()
        {
            var $this = $(this);
            $this.find('.j-picker').bind('change', function()
            {
                $this.methods('calendar').private.picker_change();
            });
        }
    }
});
$.jarvis.plugin({
    name: 'search',
    method_default: 'update',
    methods: {
        private: {
            prepare: function()
            {
                var $this = $(this);
                $this.methods('search').private.clear_form();
            },
            search: function()
            {
                var $this = $(this),
                    $WrapForm,
                    keyword;
                $WrapForm = $this.methods('search').private.get_form();
                keyword = full_trim(clear_vn_sign($WrapForm.find('.j-input').val().toLowerCase()));
                $this.find('.j-row').each(function(i, row)
                {
                    var text,
                        $row = $(row);
                    text = full_trim(clear_vn_sign(row.textContent.toLowerCase()));
                    if (text.search(keyword) < 0)
                    {
                        $row.addClass('j-search-hide');
                    }
                    else
                    {
                        $row.removeClass('j-search-hide');
                    }
                });
            },
            hide_form: function()
            {
                var $this = $(this),
                    $WrapForm;
                $WrapForm = $this.methods('search').private.get_form();
                $this.methods('search').private.clear_form();
                if ($WrapForm)
                {
                    $WrapForm.addClass('hide');
                    $this.find('.j-row').each(function(i, row)
                    {
                        var $row = $(row);
                        $row.removeClass('j-search-hide');
                    });
                }
            },
            clear_form: function()
            {
                var $this = $(this),
                    $WrapForm;
                $WrapForm = $this.methods('search').private.get_form();
                if ($WrapForm)
                {
                    $WrapForm.find('.j-input').val('');
                    $this.methods('search').private.search();
                    $WrapForm.find('.j-input').focus();
                }
            },
            get_form: function()
            {
                var $WrapForm;
                $WrapForm = $('.j-wrap.j-floating-search');
                if (!$WrapForm.length)
                {
                    $WrapForm = false;
                }
                return $WrapForm;
            },
            show_form: function()
            {
                var $this = $(this),
                    $WrapForm;
                $WrapForm = $this.methods('search').private.get_form();
                if ($WrapForm)
                {
                    if ($WrapForm.hasClass('hide'))
                    {
                        $WrapForm.removeClass('hide');
                        $WrapForm.find('.j-input').focus();
                    }
                }
                else
                {
                    $WrapForm = $('<div class="j-wrap j-floating-search"><input type="text" class="j-input"/></div>');
                    $WrapForm.prepend('<div class="j-wrap-img"><img src="' + url_root + 'api-img/floating-search.png"/></div>');
                    $('body').append($WrapForm);
                    $WrapForm.find('.j-input').focus();
                    $WrapForm.draggable();
                    $this.events('search').bind(['search']);
                    $this.methods('search').private.search();
                }
            }
        },
        public: {
            update: function()
            {
                var $this = $(this);
                $this.methods('search').private.clear_form();
                $this.events('search').bind(['hide_form', 'show_form', 'search']);
            },
            destroy: function()
            {
                var $this = $(this),
                    $WrapForm;
                if ($this.hasClass('jarvis-plugin-search'))
                {
                    $WrapForm = $this.methods('search').private.get_form();
                    if ($WrapForm)
                    {
                        $WrapForm.remove();
                    }
                    $this.removeClass('jarvis-plugin-search');
                    $(document).unbind('keyup.showfloatingsearch');
                    $(document).unbind('keyup.hidefloatingsearch');
                }
            }
        }
    },
    events: {
        prepare: function()
        {
            var $this = $(this);
            $this.methods('search').private.prepare();
        },
        search: function()
        {
            var $this = $(this),
                $WrapForm;
            $WrapForm = $this.methods('search').private.get_form();
            if ($WrapForm)
            {
                $WrapForm.find('.j-input').unbind('keyup').bind('keyup', function()
                {
                    $this.methods('search').private.search();
                });
            }
        },
        hide_form: function()
        {
            var $this = $(this);
            $(document).unbind('keydown.hidefloatingsearch').bind('keydown.hidefloatingsearch', function(e)
            {
                var keyCode = e.keyCode;
                if (keyCode === 27)
                {
                    $this.methods('search').private.hide_form();
                }
            });
        },
        show_form: function()
        {
            var $this = $(this);
            $(document).unbind('keydown.showfloatingsearch').bind('keydown.showfloatingsearch', function(e)
            {
                var keyCode = e.keyCode,
                    c;
                if (is_simple_char(keyCode) && !e.ctrlKey)
                {
                    var target = $(e.target)[0];
                    if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA' || target.type !== 'text' && target.type !== 'textarea')
                    {
                        c = String.fromCharCode(keyCode).toLowerCase();
                        $this.methods('search').private.show_form();
                    }
                }
            });
        }
    }
});
$.jarvis.plugin({
    name: 'form',
    method_default: 'update',
    default_options: {
        notify: {
            phone: 'Bạn chưa nhập số điện thoại liên lạc',
            email: 'Email không đúng',
            name: 'Bạn chưa nhập tên',
            _categoryId: 'Bạn chưa chọn chủ đề',
            contents: 'Bạn chưa nhập nội dung',
            url_tmp_image: 'Bạn chưa chọn ảnh',
            password: 'Bạn chưa nhập mật khẩu'
        }
    },
    methods: {
        private: {
            prepare: function()
            {
                var $this = $(this);
                $this.find('input[autofocus="autofocus"]').focus();
            },
            submit: function()
            {
                var $this = $(this),
                    info,
                    options;
                options = $this.options('form');
                info = $.jarvis.validate_form($this, options.notify);
                if (info.succ)
                {
                    var complete = function(data)
                    {
                        $.jarvis.loading('stop');
                        $this.find('input').prop('disabled', false);
                        $this.methods('form').private.complete(data, info.formData);
                    };
                    $this.find('input').prop('disabled', true);
                    $.jarvis.loading('white');
                    var callback = function()
                    {
                        if ($this.data('upload'))
                        {
                            $this.ajax_upload(complete);
                        }
                        else
                        {
                            $.jarvis.ajax($this.prop('action'), complete, info.formData, 'post');
                        }
                    };
                    $.jarvis.sync_token(callback);
                }
                else
                {
                    if ($this.data('notify') !== undefined)
                    {
                        $this.find('.' + $this.data('notify')).notify({
                            notify: info.msg,
                            close: 2
                        });
                    }
                    else
                    {
                        $.jarvis.notify(info.msg);
                    }
                }
            },
            complete: function(data, formData)
            {
                var $this = $(this);
                $this.trigger('submit-completed', [data, formData]);
            }
        },
        public: {
            update: function()
            {
                var $this = $(this);
                $this.events('form').bind();
            }
        }
    },
    events: {
        prepare: function()
        {
            var $this = $(this);
            $this.methods('form').private.prepare();
        },
        submit: function()
        {
            var $this = $(this);
            $this.off('submit').on('submit', function(e)
            {
                e.preventDefault();
                $this.methods('form').private.submit();
            });
            $this.find('.j-submit').off('click').on('click', function(e)
            {
                e.preventDefault();
                $this.methods('form').private.submit();
            });
        }
    }
});
$.jarvis.plugin({
    name: 'CacheHtml',
    methods: {
        private: {
            prepare: function()
            {
                var $this = $(this),
                    update_version;
                $this.find('.j-script-build-html').remove();
                update_version = $this.methods('CacheHtml').private.update_version();
                if (update_version)
                {
                    $this.methods('CacheHtml').private.cache();
                }
                $this.methods('CacheHtml').private.page_cache();
            },
            get_page_key: function(url)
            {
                return 'page-' + md5(url ? url : document.URL);
            },
            session_cache: function()
            {
                var $this = $(this),
                    str_cache_key = '';
                str_cache_key = $.jarvis.scache('session-html-cached-key') || ':';
                $('.j-wrap-session-cache').each(function()
                {
                    var $wrap = $(this),
                        cache_key,
                        html;
                    cache_key = $wrap.data('session-cache-key');
                    html = $.jarvis.scache('html-' + cache_key);
                    if (!html)
                    {
                        $.jarvis.scache('html-' + cache_key, $wrap.html());
                    }
                    if (str_cache_key.search(':' + cache_key + ':') === -1)
                    {
                        str_cache_key += cache_key + ':';
                    }
                });
                if (str_cache_key !== ':')
                {
                    $.jarvis.scache('session-html-cached-key', str_cache_key);
                    $.jarvis.cookie('session-html-cached', $.jarvis.scache('session-html-cached-key'));
                }
            },
            page_cache: function()
            {
                var $this = $(this),
                    page_key,
                    page_contents,
                    version;
                page_key = $this.methods('CacheHtml').private.get_page_key();
                if ($this.hasClass('page-cache-local'))
                {
                    page_contents = $.jarvis.cache(page_key);
                    version = $.jarvis.cookie('version-html');
                    if (page_contents === undefined || $.jarvis.cache('version-' + page_key) !== version)
                    {
                        $.jarvis.cache(page_key, $this.find('.page-main-contents').html());
                        $.jarvis.cache('version-' + page_key, version);
                    }
                    $.jarvis.cookie('version-' + page_key, $.jarvis.cache('version-' + page_key));
                }
            },
            update_version: function()
            {
                var $this = $(this),
                    version,
                    update_version,
                    client_version;
                version = $this.data('version-html');
                $this.methods('CacheHtml').private.set_data('version', version);
                client_version = $.jarvis.cookie('version-html');
                if (client_version !== version)
                {
                    $.jarvis.cookie('version-html', version);
                    update_version = true;
                }
                return update_version;
            },
            cache: function()
            {
                var $this = $(this),
                    $wrap;
                $this.find('.j-wrap-cache-html').each(function()
                {
                    $wrap = $(this);
                    $.jarvis.cache('html-' + $wrap.data('cache-html-key'), $wrap.html());
                });
            },
            page_change: function(url)
            {
                var $this = $(this),
                    page_key;
                page_key = $this.methods('CacheHtml').private.get_page_key(url);
                $.jarvis.cookie.clear(page_key);
                if ($.jarvis.cache(page_key) !== undefined)
                {
                    $.jarvis.cookie('version-' + page_key, $.jarvis.cache('version-' + page_key));
                }
            }
        },
        public: {}
    },
    events: {
        prepare: function()
        {
            var $this = $(this);
            $this.methods('CacheHtml').private.prepare();
        },
        page_change: function()
        {
            var $this = $(this);
            $(document).on('click', 'a', function(e)
            {
                $this.methods('CacheHtml').private.page_change(e.currentTarget.href);
            });
        }
    }
});
$.jarvis.plugin({
    name: 'ifocus',
    method_default: 'load',
    methods: {
        private: {
            focus: function()
            {
                var $this = $(this);
                $this.addClass('i-focus');
                if ($this.data('rotate'))
                {
                    $this.rotate();
                }
            },
            blur: function()
            {
                var $this = $(this);
                $this.removeClass('i-focus');
                if ($this.data('rotate'))
                {
                    $this.rotate('stop');
                }
            }
        },
        public: {}
    },
    events: {
        focus: function()
        {
            var $this = $(this);
            $this.bind('mouseenter', function()
            {
                $this.methods('ifocus').private.focus();
            });
        },
        blur: function()
        {
            var $this = $(this);
            $this.bind('mouseleave', function()
            {
                $this.methods('ifocus').private.blur();
            });
        }
    }
});
$.jarvis.plugin({
    name: 'rotate',
    method_default: 'resume',
    methods: {
        private: {
            prepare: function()
            {
                var $this = $(this);
                $this.methods('rotate').private.set_data('status', 'working');
                $this.methods('rotate').private.rotate();
            },
            rotate: function()
            {
                var $this = $(this),
                    deg = 0,
                    rotate,
                    rotate_status = 'working';
                rotate = $this.methods('rotate').private.get_data('rotate');
                if (rotate === undefined)
                {
                    rotate = setInterval(function()
                    {
                        rotate_status = $this.methods('rotate').private.get_data('status');
                        if (rotate_status === 'working')
                        {
                            deg += 0.1;
                            var i;
                            for (i = 0; i < 10; i++)
                            {
                                rotate = $this.methods('ifocus').private.get_data('rotate');
                                $this.css('transform', 'rotate(' + deg + 'deg)');
                                $this.css('-ms-transform', 'rotate(' + deg + 'deg)');
                                $this.css('-webkit-transform', 'rotate(' + deg + 'deg)');
                            }
                        }
                    }, 1);
                    $this.methods('rotate').private.set_data('rotate', rotate);
                }
            },
            stop: function()
            {
                var $this = $(this);
                $this.methods('rotate').private.set_data('status', 'stop');
            },
            resume: function()
            {
                var $this = $(this);
                $this.methods('rotate').private.set_data('status', 'working');
            }
        },
        public: {
            resume: function()
            {
                var $this = $(this);
                $this.methods('rotate').private.resume();
            },
            stop: function()
            {
                var $this = $(this);
                $this.methods('rotate').private.stop();
            }
        }
    },
    events: {
        prepare: function()
        {
            var $this = $(this);
            $this.methods('rotate').private.prepare();
        }
    }
});
$.jarvis.plugin({
    name: 'UploadsImage',
    method_default: 'update',
    methods: {
        private: {
            prepare: function()
            {
                var $this = $(this),
                    $image;
                $this.find('.j-wrap-image').ajaxUpload();
                $image = $this.find('.j-image');
                if (!$image.data('src'))
                {
                    $image.addClass('hide');
                }
                $this.methods('UploadsImage').private.set_data('img_src', $image.data('src'));
            },
            hover: function(leave)
            {
                var $this = $(this),
                    $wrapImage;
                $wrapImage = $this.find('.j-wrap-image');
                if (leave)
                {
                    $wrapImage.removeClass('j-focus-img');
                }
                else
                {
                    $wrapImage.addClass('j-focus-img');
                }
            },
            upload_new_img: function(img_src)
            {
                var $this = $(this),
                    $image;
                $image = $this.find('.j-image');
                $this.find('.j-wrap-action-button').ishow();
                if ($image.data('changed'))
                {
                    $.jarvis.delete_tmp_img($image.prop('src'));
                }
                else
                {
                    $image.data('changed', true);
                }
                $image.prop('src', img_src);
                $image.ishow();
                $this.find('.j-wrap-action-button').ishow();
                $this.find('.j-value').val(img_src);
                $this.trigger('change');
            },
            clear: function()
            {
                var $this = $(this),
                    img_src,
                    $image;
                $image = $this.find('.j-image');
                img_src = $this.methods('UploadsImage').private.get_data('img_src');
                $this.find('.j-wrap-action-button').ihide();
                $.jarvis.delete_tmp_img($image.prop('src'));
                if (!$image.data('src'))
                {
                    $image.ihide();
                }
                $image.prop('src', img_src);
                $this.find('.j-value').val('');
                $this.trigger('clear');
            }
        },
        public: {
            update: function()
            {
                var $this = $(this);
                $this.events('UploadsImage').bind();
            },
            clear: function()
            {
                var $this = $(this);
                $this.methods('UploadsImage').private.clear();
            }
        }
    },
    events: {
        prepare: function()
        {
            var $this = $(this);
            $this.methods('UploadsImage').private.prepare();
        },
        clear: function()
        {
            var $this = $(this);
            $this.find('.j-clear').bind('click', function(e, img_src)
            {
                $this.methods('UploadsImage').private.clear();
            });
        },
        hover: function()
        {
            var $this = $(this);
            $this.find('.j-wrap-image').hover(function()
            {
                $this.methods('UploadsImage').private.hover();
            }, function()
            {
                $this.methods('UploadsImage').private.hover('leave');
            });
        },
        upload_new_img: function()
        {
            var $this = $(this);
            $this.find('.j-wrap-image').bind('change', function(e, img_src)
            {
                $this.methods('UploadsImage').private.upload_new_img(img_src);
            });
        }
    }
});
$.jarvis.plugin({
    name: 'notify',
    method_default: 'update',
    methods: {
        private: {
            prepare: function()
            {
                var $this = $(this),
                    $wrapNotify;
                if (!$this.find('.j-wrap-jarvis-notify').length)
                {
                    $wrapNotify = $('<div class="j-wrap-jarvis-notify hide"><div class="j-wrap-icon"><span class="j-close" title="Đóng"><img src="' + url_img + 'close.png" alt="close"/></span></div><div class="j-list-notify"></div></div>');
                    $this.prepend($wrapNotify);
                }
                $this.methods('notify').private.show();
            },
            close: function()
            {
                var $this = $(this),
                    $wrapNotify;
                $wrapNotify = $this.find('.j-wrap-jarvis-notify');
                $wrapNotify.fadeOut('slow');
                setTimeout(function()
                {
                    $wrapNotify.find('.j-list-notify .j-notify').remove();
                }, 1000);
            },
            show: function()
            {
                var $this = $(this),
                    options,
                    arr_notify,
                    $wrapNotify,
                    $listNotify;
                $wrapNotify = $this.find('.j-wrap-jarvis-notify');
                $listNotify = $wrapNotify.find('.j-list-notify');
                $wrapNotify.fadeIn('slow');
                options = $this.options('notify');
                arr_notify = options.notify;
                $.each(arr_notify, function(i, notify)
                {
                    $listNotify.append('<p class="j-notify">' + notify + '</p>');
                });
                $wrapNotify.ishow();
                $this.events('notify').bind(['close']);
                if (options.flash)
                {
                    $wrapNotify.flash();
                }
                if (options.close)
                {
                    setTimeout(function()
                    {
                        $this.methods('notify').private.close();
                    }, options.close * 1000);
                }
            }
        },
        public: {
            update: function()
            {
                var $this = $(this);
                $this.methods('notify').private.show();
            }
        }
    },
    events: {
        prepare: function()
        {
            var $this = $(this);
            $this.methods('notify').private.prepare();
        },
        close: function()
        {
            var $this = $(this),
                $close;
            $close = $this.find('.j-wrap-jarvis-notify .j-close');
            if ($close.length)
            {
                $close.unbind('click.clearnotify').bind('click.clearnotify', function()
                {
                    $this.methods('notify').private.close();
                });
            }
        }
    }
});
$.jarvis.plugin({
    name: 'ajax_anchor',
    methods: {
        private: {
            prepare: function()
            {
                var $this = $(this);
                $this.methods('ajax_anchor').private.set_data('href', document.URL);
                $this.methods('ajax_anchor').private.set_data('title', document.title);
                $this.methods('ajax_anchor').private.set_data('history', []);
            },
            click: function($target)
            {
                var $this = $(this),
                    href,
                    action,
                    title,
                    $row,
                    $list;
                href = $target.data('href');
                if (!href)
                {
                    href = $target.attr('href');
                    if (href.substring(0, 7) != 'http://')
                    {
                        href = '';
                    }
                }
                action = $target.data('action');
                $list = $target.closest('.j-list');
                if ($target.hasClass('.j-row'))
                {
                    $row = $target;
                }
                else
                {
                    $row = $target.closest('.j-row');
                }
                var load_succ = function(data)
                {
                    title = data.title ? data.title : $target.prop('title');
                    if (href)
                    {
                        history.pushState({}, '', href);
                    }
                    document.title = title;
                    $.jarvis.execute('PagePopup', 'close', true);
                    if ($row.length)
                    {
                        $row.loading('stop');
                    }
                    else
                    {
                        $target.loading('stop');
                    }
                    var $page = $(data.html);
                    $page.PagePopup();
                    var history_info = {
                        $target: $target,
                        title: title,
                        href: href,
                        $page: $page
                    };
                    $this.methods('ajax_anchor').private.push_history(history_info);
                };
                if ($row.length)
                {
                    $row.loading();
                }
                else
                {
                    $target.loading();
                }
                $.jarvis.ajax(action + '?$res=for-view', load_succ, {}, 'post');
            },
            remove_history: function()
            {
                var $this = $(this),
                    page_history,
                    page_info = {},
                    count;
                page_history = $this.methods('ajax_anchor').private.get_data('history');
                var page_remove = page_history.pop();
                count = page_history.length;
                if (count > 0)
                {
                    page_info = page_history[count - 1];
                }
                page_info.target_of_remove = page_remove.$target;
                return page_info;
            },
            push_history: function(history_info)
            {
                var $this = $(this),
                    page_history;
                page_history = $this.methods('ajax_anchor').private.get_data('history');
                page_history.push(history_info);
                $this.methods('ajax_anchor').private.set_data('history', page_history);
            },
            close_page_popup: function()
            {
                var $this = $(this),
                    current_page,
                    $target,
                    $wrapPageMain;
                current_page = $this.methods('ajax_anchor').private.remove_history();
                if (current_page.$page)
                {
                    current_page.$page.PagePopup();
                    document.title = current_page.title;
                    if (current_page.href)
                    {
                        history.pushState({}, '', current_page.href);
                    }
                }
                else
                {
                    $wrapPageMain = $('.ui-page .main-content');
                    $wrapPageMain.find('.wrap-center.hide').removeClass('hide');
                    history.pushState({}, '', $this.methods('ajax_anchor').private.get_data('href'));
                    document.title = $this.methods('ajax_anchor').private.get_data('title');
                }
                $target = current_page.target_of_remove;
                $target.addClass('j-focus');
                $target.removeClass('j-focus', 'slow');
            }
        },
        public: {}
    },
    events: {
        prepare: function()
        {
            var $this = $(this);
            $this.methods('ajax_anchor').private.prepare();
        },
        click: function()
        {
            var $this = $(this);
            $this.off('click.ajax_anchor').on('click.ajax_anchor', '.j-ajax-anchor', function(e)
            {
                e.preventDefault();
                $this.methods('ajax_anchor').private.click($(this));
            });
        },
        close_page_popup: function()
        {
            var $this = $(this);
            $('body').bind('closePagePopup', function(e, store)
            {
                if (!store)
                {
                    $this.methods('ajax_anchor').private.close_page_popup();
                }
            });
        }
    }
});
$.jarvis.plugin({
    name: 'PagePopup',
    method_default: 'update',
    methods: {
        private: {
            update: function()
            {
                var $this = $(this),
                    $buttonBack,
                    $wrapPopup;
                $wrapPopup = $('.wrap-center.j-wrap-page-popup');
                $this.closest('.wrap-center.j-wrap-page-popup').removeClass('hide');
                $.jarvis.load_app();
                $buttonBack = $('<span class="j-close j-button-back-page hide" title="Quay lại"></span>');
                $buttonBack.html('<i class="sprite s50 irollback"></i>');
                $wrapPopup.prepend($buttonBack);
                $this.events('PagePopup').bind(['close', 'backspace']);
                $buttonBack.ishow();
                $('html, body').animate({
                    scrollTop: 0
                }, 'fast');
                $this.animate_change();
            },
            show: function()
            {
                var $this = $(this),
                    $wrapPageMain,
                    $wrapPopup,
                    $buttonBack;
                $this.methods('PagePopup').private.set_data('scroll-top', $(window).scrollTop());
                $wrapPageMain = $('.ui-page .main-content');
                $wrapPageMain.find('.wrap-center').addClass('hide');
                $wrapPopup = $('<div class="wrap-center j-wrap-page-popup"></div>');
                $wrapPopup.append($this);
                $wrapPageMain.append($wrapPopup);
                $.jarvis.load_app();
                $buttonBack = $('body .j-button-back-page');
                if (!$buttonBack.length)
                {
                    $buttonBack = $('<span class="j-close j-button-back-page hide" title="Quay lại"></span>');
                    $buttonBack.html('<i class="sprite s50 irollback"></i>');
                    $wrapPopup.prepend($buttonBack);
                }
                $this.events('PagePopup').bind(['close']);
                $buttonBack.ishow();
                $('html, body').animate({
                    scrollTop: 0
                }, 'fast');
                $this.animate_change();
            },
            close: function(store)
            {
                var $this = $(this),
                    $buttonBack,
                    scrollPos,
                    options;
                options = $this.options('PagePopup');
                scrollPos = $this.methods('PagePopup').private.get_data('scroll-top');
                $this.closest('.wrap-center.j-wrap-page-popup').addClass('hide');
                $(document).unbind('keydown.closePagePopup');
                $buttonBack = $('.j-button-back-page');
                $buttonBack.remove();
                if (!store)
                {
                    $this.closest('.wrap-center.j-wrap-page-popup').remove();
                    $('html, body').animate({
                        scrollTop: scrollPos
                    }, 'fast');
                    if (typeof options.callback === 'function')
                    {
                        (options.callback)();
                    }
                }
                setTimeout(function()
                {
                    $('body').trigger('closePagePopup', [store]);
                }, 100);
            }
        },
        public: {
            update: function()
            {
                var $this = $(this);
                $this.methods('PagePopup').private.update();
            },
            close: function(store)
            {
                var $this = $(this);
                $this.methods('PagePopup').private.close(store);
            }
        }
    },
    events: {
        init: function()
        {
            var $this = $(this);
            $this.methods('PagePopup').private.show();
        },
        close: function()
        {
            var $this = $(this),
                $buttonBack;
            $buttonBack = $('.j-button-back-page');
            if ($buttonBack.length)
            {
                $buttonBack.unbind('click.closePagePopup').bind('click.closePagePopup', function(e)
                {
                    $this.methods('PagePopup').private.close();
                });
            }
        },
        backspace: function()
        {
            var $this = $(this);
            $(document).bind('keydown.closePagePopup', function(e)
            {
                if (e.keyCode === 8 && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'INPUT')
                {
                    e.preventDefault();
                    $this.methods('PagePopup').private.close();
                }
            });
        }
    }
});
$.jarvis.plugin({
    name: 'jhref',
    methods: {
        private: {
            succLoadData: function($jhref, html)
            {
                var $this = $(this),
                    $page,
                    $row;
                $page = $(html);
                $row = $jhref.closest('.j-row');
                $row = $row.length ? $row : $jhref;
                var removeFocus = function()
                {
                    $row.addClass('j-focus');
                    $row.removeClass('j-focus', 'slow');
                };
                $page.PagePopup({
                    callback: removeFocus
                });
            },
            click: function($jhref)
            {
                var $this = $(this),
                    href,
                    succLoadData;
                href = $jhref.data('href');
                succLoadData = function(data)
                {
                    var html;
                    if (data.html)
                    {
                        html = data.html;
                    }
                    else
                    {
                        html = data._block_center[0];
                    }
                    $jhref.loading('stop');
                    $this.methods('jhref').private.succLoadData($jhref, html);
                };
                $jhref.loading();
                $.jarvis.ajax(href + '?$res=for-view', succLoadData, '', 'post');
            }
        },
        public: {}
    },
    events: {
        click: function()
        {
            var $this = $(this);
            $this.on('click', '.j-ahref', function(e)
            {
                e.preventDefault();
                $this.methods('jhref').private.click($(this));
            });
        }
    }
});
$.jarvis.plugin({
    name: 'auto_change',
    methods: {
        private: {
            change: function(sign)
            {
                var $this = $(this),
                    step = $this.data('step'),
                    value = $this.val(),
                    num_fixed;
                value = (value !== '' ? value : $this.data('default'));
                value -= -sign * step;
                num_fixed = parseInt(Math.round(-Math.log(step) / Math.log(10)));
                value = parseFloat(value).toFixed(num_fixed);
                $this.val(value);
                $this.trigger('update');
            }
        },
        public: {}
    },
    events: {
        keyup: function()
        {
            var $this = $(this);
            $this.bind('keydown', function(e)
            {
                var keyCode = e.keyCode;
                if (keyCode === 38 || keyCode === 40)
                {
                    e.preventDefault();
                    $this.methods('auto_change').private.change(keyCode === 38 ? 1 : -1);
                }
            });
        }
    }
});
$.jarvis.plugin({
    name: 'blue_click',
    methods: {
        private: {
            click: function(left, top)
            {
                var $this = $(this),
                    $wrapImg;
                $wrapImg = $('<img src="' + url_img + 'star.png"/>');
                $wrapImg.css({
                    position: 'fixed',
                    left: (left - 10) + 'px',
                    top: (top - 10) + 'px',
                    zIndex: 9999
                });
                $('body').append($wrapImg);
                setTimeout(function()
                {
                    $wrapImg.remove();
                }, 150);
            }
        },
        public: {}
    },
    events: {
        click: function()
        {
            var $this = $(this);
            $this.bind('click', function(e)
            {
                $this.methods('blue_click').private.click(e.clientX, e.clientY);
            });
        }
    }
});
$.jarvis.plugin({
    name: 'youtube',
    methods: {
        private: {
            prepare: function()
            {
                var $this = $(this),
                    id;
                id = 'youtube-video-' + Date.now();
                $this.prop('id', id);
                var YT,
                    tag = document.createElement('script');
                tag.src = "http://www.youtube.com/player_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                var onPlayerStateChange = function(e)
                {
                    if (e.data === 1)
                    {
                        $this.trigger('play');
                    }
                    else
                    {
                        $this.trigger('stop');
                    }
                };
                var load_api = setInterval(function()
                {
                    YT = window.YT;
                    if (YT !== undefined)
                    {
                        if (YT.Player !== undefined)
                        {
                            new YT.Player(id, {
                                events: {
                                    'onStateChange': onPlayerStateChange
                                }
                            });
                            clearInterval(load_api);
                        }
                    }
                }, 100);
            }
        },
        public: {}
    },
    events: {
        prepare: function()
        {
            var $this = $(this);
            $this.methods('youtube').private.prepare();
        }
    }
});
;
var Learner = {};
Learner.check_login = function(func_succ)
{
    var callback = function(data)
    {
        if (data.succ)
        {
            func_succ(data.user);
        }
        else
        {
            var goto_login = function()
            {
                if ($('.ui-page').hasClass('user-logged'))
                {
                    location.reload();
                }
                else
                {
                    $('html, body').animate({
                        scrollTop: 0
                    }, 'fast');
                    var $locker = $.jarvis.lock('black');
                    var $wrapLogin = $('.j-wrap.j-wrap-login');
                    $wrapLogin.addClass('focus');
                    $wrapLogin.animate_change();
                    $wrapLogin.find('.j-email').focus();
                    $locker.bind('click', function() {
                        $wrapLogin.removeClass('focus');
                        $.jarvis.lock('close');
                        $locker.remove();
                    });
                }
            };
            ialert('Vui lòng đăng nhập trước khi thực hiện tính năng này.', goto_login);
        }
    };
    $.jarvis.ajax('activity/learner/CheckLogin?$res=data-only', callback);
};
$(document).ready(function()
{
    $.jarvis.load_app();
});
;
$.jarvis.plugin({
    name: 'DSXT',
    methods: {
        private: {
            prepare: function()
            {
                var $this = $(this),
                    $form,
                    options;
                $form = $this.find('.j-form');
                options = {
                    notify: {
                        txtName: 'Bạn chưa nhập Họ tên. Xin vui lòng nhập',
                    },
                };
                $form.form(options);
            },
            submit_completed: function(data)
            {
                var $this = $(this);
                if (data.succ)
                {
                    $('.resultStudent').html(data.html);
                }
                else
                {}
            },
            submit: function()
            {
                var $this = $(this),
                    $form;
                $form = $this.find('.j-form');
                $form.form('submit');
            }
        },
        public: {}
    },
    events: {
        prepare: function()
        {
            var $this = $(this);
            $this.methods('DSXT').private.prepare();
        },
        degree_change: function()
        {
            var $this = $(this);
            $this.find('.j-select-degree').bind('change', function()
            {
                $this.methods('DSXT').private.degree_change($(this).val());
            });
        },
        submit: function()
        {
            var $this = $(this);
            $this.find('.j-btn-submit1').bind('click', function()
            {
                $this.methods('DSXT').private.submit();
            });
        },
        submit_completed: function()
        {
            var $this = $(this);
            $this.find('.j-form').bind('submit-completed', function(e, data, formData)
            {
                $this.methods('DSXT').private.submit_completed(data);
            });
        }
    }
});
;
$.jarvis.plugin({
    name: 'searchnews',
    methods: {
        private: {
            prepare: function()
            {
                var $this = $(this),
                    $form,
                    options;
                $form = $this.find('.j-form');
                options = {
                    notify: {
                        txtName: 'Bạn vui lòng nhập Từ khóa cần tìm !',
                    },
                };
                $form.form(options);
            },
            submit_completed: function(data)
            {
                var $this = $(this);
                if (data.succ)
                {
                    $('.resultStudent').html(data.html);
                }
                else
                {}
            },
            submit: function()
            {
                var $this = $(this),
                    $form;
                $form = $this.find('.j-form');
                $form.form('submit');
            }
        },
        public: {}
    },
    events: {
        prepare: function()
        {
            var $this = $(this);
            $this.methods('searchnews').private.prepare();
        },
        degree_change: function()
        {
            var $this = $(this);
            $this.find('.j-select-degree').bind('change', function()
            {
                $this.methods('searchnews').private.degree_change($(this).val());
            });
        },
        submit: function()
        {
            var $this = $(this);
            $this.find('.j-btn-submit1').bind('click', function()
            {
                $this.methods('searchnews').private.submit();
            });
        },
        submit_completed: function()
        {
            var $this = $(this);
            $this.find('.j-form').bind('submit-completed', function(e, data, formData)
            {
                $this.methods('searchnews').private.submit_completed(data);
            });
        }
    }
});
;
new WOW().init();
function scroll() {
    var offset = 300,
        scroll_top_duration = 700,
        $back_to_top = $('.cd-top');
    $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
            $back_to_top.addClass('cd-is-visible');
        } else {
            $back_to_top.removeClass('cd-is-visible cd-fade-out');
        }
        if ($(this).scrollTop() > 455) {
            $('.navbar-fixed-top').addClass('show');
        } else {
            $('.navbar-fixed-top').removeClass('show');
        }
    });
    $back_to_top.on('click', function(event) {
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0,
        }, scroll_top_duration);
    });
}
function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0)
            return null;
    } else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
    }
    return decodeURI(dc.substring(begin + prefix.length, end));
}
function setCookie(cname, cvalue, exMins) {
    var d = new Date();
    d.setTime(d.getTime() + (exMins * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
$(document).ready(function()
{
    var myCookie = getCookie("version2");
    if (myCookie == null) {
        setCookie('version2', 'version_2', 360)
        location.reload(true);
    } else {
        console.log(myCookie);
    }
    scroll();
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/site/news/resolution/screenwidth/" + $(window).width(), true);
    xmlhttp.send();
    try {
        ddaccordion.init({
            headerclass: "submenuheader",
            contentclass: "submenu",
            revealtype: "click",
            mouseoverdelay: 200,
            collapseprev: true,
            defaultexpanded: [],
            onemustopen: false,
            animatedefault: false,
            persiststate: true,
            toggleclass: ["", ""],
            togglehtml: ["suffix", "<img src='plus.gif' class='statusicon' />", "<img src='minus.gif' class='statusicon' />"],
            animatespeed: "fast",
            oninit: function(headers, expandedindices) {},
            onopenclose: function(header, index, state, isuseractivated) {}
        });
    } catch (e)
    {}
    try {
        var slider = $('.bxslider').bxSlider({
            mode: 'horizontal',
            minSlides: 2,
            maxSlides: 9,
            slideWidth: 110,
            auto: true,
            speed: 5000,
            autoControls: false,
            pager: false,
            controls: false,
            slideMargin: 0,
        });
        $(window).resize(function() {
            slider.reloadSlider({
                mode: 'horizontal',
                minSlides: 2,
                maxSlides: 9,
                slideWidth: 110,
                auto: true,
                speed: 5000,
                autoControls: false,
                pager: false,
                controls: false,
                slideMargin: 0,
            });
        });
    } catch (e)
    {}
});
$(window).scroll(function() {
    if ($(window).scrollTop() >= 99) {
        $('#nav').addClass('navbar-fixed-top');
        $('#navmobile').addClass('navbar-fixed-top');
    }
    if ($(window).scrollTop() >= 100) {
        $('#nav').addClass('show');
        $('#navmobile').addClass('show');
    } else {
        $('#nav').removeClass('show navbar-fixed-top');
        $('#navmobile').removeClass('show navbar-fixed-top');
    }
});
;
$(document).ready(function()
{
    var o = $('#myCarousel');
    if (o.length > 0) {
        $('#myCarousel').carousel({
            interval: 6000,
            cycle: true
        })
        $('#myCarousel').on('slid.bs.carousel', function() {});
    }
    menuhutechtv("#hutech-360");
});
function menuhutechtv(element) {
    var $item = $(element);
    $(".menu-hutech-tv").removeClass("menu-hutech-tv-active");
    $item.addClass("menu-hutech-tv-active");
    $(".panelhutechtv").removeClass("show");
    $("#" + $item.attr("content")).addClass("show");
}

