define(function() { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Scribe Placeholder Plugin.
	 * Plugin to display placeholder text inside the scribe editor.
	 *
	 * @param {string} placeholder Placeholder text.
	 * @param {HTMLElement} editorContainer DOM element wrapping the scribe editor.
	 */

	var classNameBase = 'scribe-plugin-line-tooltip';

	// Default style
	__webpack_require__(1);

	/**
	 * @class  ScribePluginLineTooltip
	 */

	var ScribePluginLineTooltip = (function () {
	  function ScribePluginLineTooltip() {
	    _classCallCheck(this, ScribePluginLineTooltip);

	    this.currentTooltipEl = null;
	    this.scribe = null;
	    return this;
	  }

	  /**
	   * Use this method to subscribe Sribe.
	   * @method
	   * @example
	   *
	   *    scribe.use(ScribePluginLine.init(parent, handlers));
	   * @param {HTMLElement} editorcontainer Outer element of scribe editor.
	   * @param {Object} handlers Tooltip event handlers.
	   * @param {Function} callback function for scribe.
	   */

	  _createClass(ScribePluginLineTooltip, [{
	    key: 'init',
	    value: function init(editorContainer, handlers) {
	      var _this = this;

	      var scrollContainer = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	      this.parentBounce = editorContainer.getBoundingClientRect();
	      this.editorContainer = editorContainer;
	      this.scrollContainer = scrollContainer;
	      this.handlers = handlers;
	      return function (scribe) {
	        _this.scribe = scribe;
	        scribe.el.addEventListener('click', _.throttle(_this.update.bind(_this), 300));
	        scribe.el.addEventListener('keyup', _.throttle(_this.updateKey.bind(_this), 300));
	      };
	    }

	    /**
	     * Craete tooltip Element.
	     * @method
	     * @overirde
	     * @return {HTMLElement} Tooltip element.
	     */

	  }, {
	    key: 'createTooltip',
	    value: function createTooltip() {

	      var tooltipOuter = document.createElement('div');
	      tooltipOuter.classList.add('' + classNameBase);
	      tooltipOuter.classList.add(classNameBase + '--tooltip');

	      var tooltipEl = document.createElement('div');
	      tooltipEl.classList.add('tooltip');
	      tooltipEl.classList.add('js-tooltip');
	      tooltipEl.innerHTML = '\n      <p class="tooltip__item"> <i class="icon icon--plus"></i> </p>\n    ';
	      tooltipOuter.appendChild(tooltipEl);

	      return tooltipOuter;
	    }

	    /**
	     * showTooltip
	     * @return {HTMLElement} Current active tooltip element.
	     */

	  }, {
	    key: 'setTooltip',
	    value: function setTooltip() {
	      var _this2 = this;

	      if (this.currentTooltipEl !== null) {
	        return false;
	      }

	      this.currentTooltipEl = this.createTooltip();

	      _.forEach(this.handlers, function (handler, key) {
	        _this2.currentTooltipEl.addEventListener(key, function (e) {
	          handler(e, _this2);
	        });
	      });

	      this.editorContainer.appendChild(this.currentTooltipEl);
	      return this.currentTooltipEl;
	    }

	    /**
	     * Remove all tooltip.
	     * @method
	     */

	  }, {
	    key: 'removeTooltip',
	    value: function removeTooltip() {
	      var tooltips = this.editorContainer.querySelectorAll('.scribe-plugin-line-tooltip');

	      _.forEach(tooltips, function (t) {
	        t.remove();
	      });

	      this.currentTooltipEl = null;
	      return true;
	    }

	    /**
	     * Update handler for Scribe editor event.
	     * @param {Event} e Update event from Scribe Editor.
	     */

	  }, {
	    key: 'update',
	    value: function update(e) {
	      var selection = new this.scribe.api.Selection();

	      var lineElement = selection.getContaining(function (node) {
	        return node.nodeName === 'P';
	      });

	      if (!lineElement) {
	        return;
	      }

	      var nodeHelpers = this.scribe.node;

	      var isEmptyLine = nodeHelpers.isEmptyInlineElement(lineElement);

	      if (isEmptyLine) {
	        lineElement.classList.add('emptyline');
	        this.removeTooltip();
	        this.setTooltip();
	        var bounce = lineElement.getBoundingClientRect();

	        var parentScrollTop = 0;

	        if (this.scrollContainer) {
	          parentScrollTop = this.scrollContainer.scrollTop;
	        }

	        this.currentTooltipEl.style.top = window.scrollY + parentScrollTop + bounce.top - this.parentBounce.top + 'px';
	      } else {
	        lineElement.classList.remove('emptyline');
	        this.removeTooltip();
	      }
	    }

	    /**
	     * Key update handler for Scribe editor event.
	     * @param {Event} e Update event from Scribe Editor.
	     */

	  }, {
	    key: 'updateKey',
	    value: function updateKey(e) {
	      this.update(e);
	    }
	  }]);

	  return ScribePluginLineTooltip;
	})();

	exports.default = ScribePluginLineTooltip;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/a12951/workspace/sandbox/scribe-plugin-lastline-tooltip/node_modules/css-loader/index.js!/Users/a12951/workspace/sandbox/scribe-plugin-lastline-tooltip/node_modules/stylus-loader/index.js!/Users/a12951/workspace/sandbox/scribe-plugin-lastline-tooltip/src/scribe-plugin-line-tooltip.styl", function() {
			var newContent = require("!!/Users/a12951/workspace/sandbox/scribe-plugin-lastline-tooltip/node_modules/css-loader/index.js!/Users/a12951/workspace/sandbox/scribe-plugin-lastline-tooltip/node_modules/stylus-loader/index.js!/Users/a12951/workspace/sandbox/scribe-plugin-lastline-tooltip/src/scribe-plugin-line-tooltip.styl");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	exports.push([module.id, ".scribe-plugin-line-tooltip {\n  position: absolute;\n  cursor: pointer;\n}\n.scribe-plugin-line-tooltip p {\n  line-height: 1;\n  margin: 5px 0;\n  font-size: 20px;\n}\n.scribe-plugin-line-tooltip .tooltip--hover {\n  transition: all 0.1s ease-in;\n}\n.scribe-plugin-line-tooltip .tooltip--hover .tooltip__item {\n  transform: rotate(45deg);\n}\n", ""]);

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:text/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ }
/******/ ])});;