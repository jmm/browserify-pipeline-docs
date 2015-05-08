require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

document.addEventListener('DOMContentLoaded', function () {
  React.render(React.createElement(require('app/components/pipeline'), { phases: require('app/data/phases') }), document.getElementById('pipeline-phases'));
});

},{"app/components/pipeline":"app/components/pipeline","app/data/phases":"app/data/phases"}],"app/components/phase":[function(require,module,exports){
"use strict";

var jsx_transformer = require("app/lib/jsx-transformer");
module.exports = React.createClass({
  displayName: "exports",

  render: function render() {
    var self = this,
        props = {
      input: self.props.data.props.input,
      output: self.props.data.props.output },
        maxRows = Math.max(props.input._order.length, props.output._order.length),
        rowSpan = maxRows + 1,
        rows = [];

    while (rows.length < maxRows) rows.push(rows.length);

    return jsx_transformer(
      "tbody",
      { className: "phase" },
      jsx_transformer(
        "tr",
        { className: "phase" },
        jsx_transformer(
          "th",
          {
            scope: "row",
            className: "id",
            rowSpan: rowSpan
          },
          this.props.data.label.replace("-", "‑")
        ),
        jsx_transformer("td", { className: "desc", html: this.props.data.desc, rowSpan: rowSpan }),
        jsx_transformer("td", { colSpan: "4" })
      ),
      rows.map(function (i) {
        return jsx_transformer(
          "tr",
          { className: "props" },
          ["input", "output"].map(function (dir) {
            var prop = props[dir][props[dir]._order[i]] || {};
            return [jsx_transformer(
              "th",
              { className: "id", scope: "col" },
              prop.id
            ), jsx_transformer("td", { className: "desc", html: prop.desc })];
          })
        );
      })
    );
  } });

// Non-breaking hyphen

},{"app/lib/jsx-transformer":"app/lib/jsx-transformer"}],"app/components/pipeline":[function(require,module,exports){
"use strict";

var jsx_transformer = require("app/lib/jsx-transformer");
var Phase = require("app/components/phase"),
    Pipeline;

module.exports = Pipeline = React.createClass({
  displayName: "Pipeline",

  render: function render() {
    var self = this;
    return jsx_transformer(
      "table",
      { id: "pipeline", className: "table table-striped" },
      jsx_transformer(
        "thead",
        null,
        jsx_transformer(
          "tr",
          null,
          jsx_transformer(
            "th",
            { scope: "col", className: "phase", rowSpan: "2" },
            "Pipeline phase"
          ),
          jsx_transformer(
            "th",
            { scope: "col", className: "desc", rowSpan: "2" },
            "Description"
          ),
          jsx_transformer(
            "th",
            { scope: "col", className: "row-props", colSpan: "4" },
            "Relevant ",
            jsx_transformer(
              "code",
              null,
              "row"
            ),
            " props"
          )
        ),
        jsx_transformer(
          "tr",
          null,
          jsx_transformer(
            "th",
            { colSpan: "2", scope: "col" },
            "Input"
          ),
          jsx_transformer(
            "th",
            { colSpan: "2", scope: "col" },
            "Output"
          )
        )
      ),
      self.props.phases._order.map(function (phase) {
        return self.props.phases[phase] ? jsx_transformer(Phase, { key: phase, id: phase, data: self.props.phases[phase] }) : null;
      })
    );
  } });

},{"app/components/phase":"app/components/phase","app/lib/jsx-transformer":"app/lib/jsx-transformer"}],"app/data/phases":[function(require,module,exports){
module.exports={"_order":["b.add","b.require","record","deps","deps-expose-all","json","unbom","unshebang","syntax","sort","dedupe","label","emit-deps","debug","pack","wrap"],"b.add":{"label":"b.add","desc":"<p>\n<code><a href=\"https://github.com/substack/node-browserify/blob/10.0.0/readme.markdown#baddfile-opts\">browserify()</a>|<a href=\"https://github.com/substack/node-browserify/blob/10.0.0/readme.markdown#baddfile-opts\">b.add()</a></code>. Technically before the pipeline. Creates <code>row</code> objects and writes them to the pipeline. Documentation is scant on what the <code>file</code> argument may consist of. In some cases, such as when <code>file</code> is an array, it may be possible to pass <code>row</code> objects. Proxies to <code>b.require()</code> with certain options (see input row props).\n</p>\n","props":{"input":{"_order":["entry","expose","file"],"entry":{"id":"entry","desc":"If the property exists, then <code>args.opts.entry</code>. Otherwise, <code>true</code>.\n"},"expose":{"id":"expose","desc":"If the property exists, then <code>args.opts.expose</code>. Otherwise, <code>false</code>.\n"},"file":{"id":"file","desc":"A <code>filePath</code> becomes the <code>file</code> property of the corresponding row pushed to the pipeline. <code>filePath</code> values added via <code>browserify()|b.add()</code> are pseudo-resolved by being appended to <code>basedir</code>.\n"}},"output":{"_order":["entry","expose"],"entry":{"id":"entry","desc":"If <code>inRow.entry === undefined</code>, then <code>false</code>. Otherwise, <code>inRow.entry</code>.\n"},"expose":{"id":"expose","desc":"TODO\n"}}}},"b.require":{"label":"b.require","desc":"<p>\n<a href=\"https://github.com/substack/node-browserify/blob/10.0.0/readme.markdown#brequirefile-opts\">b.require()</a>. Technically before the pipeline. Creates / modifies <code>row</code> objects and writes them to the pipeline.\n</p>\n","props":{"input":{"_order":["expose","file","id"],"expose":{"id":"expose","desc":"<p>\nIf a string, the module will be exposed via this value in a <code>require()</code> function exported by the bundle.\n</p>\n\n<p>\nIf <code>args.file.expose</code> or <code>args.opts.expose</code> is truthy (in that order), that value.\n</p>\n"},"file":{"id":"file","desc":"<code>filePath</code> and <code>fileObj.file</code> become the <code>file</code> property of the corresponding row pushed to the pipeline.\n"},"id":{"id":"id","desc":"An <code>id</code> property will be set on the <code>row</code> pushed to the pipeline (undocumented).\n"}},"output":{"_order":["entry","expose","id"],"entry":{"id":"entry","desc":"Defaults to <code>false</code>.\n"},"expose":{"id":"expose","desc":"The rules are complex, but if <code>inRow.expose</code> is truthy or <code>inRow.entry</code> is falsy, <code>expose</code> will <em>generally</em> be set to <code>outRow.id</code>.\n"},"id":{"id":"id","desc":"If <code>inRow.id</code> is falsy and <code>inRow.expose</code> is truthy, a complex set of rules apply that determine what <code>id</code> will be set to. If <code>!(inRow.id || inRow.expose || opts.exposeAll)</code>, <code>id</code> will be set to <code>outRow.file</code>.\n"}}}},"record":{"label":"record","desc":"<p>\nFirst actual pipeline phase. Records rows written to the pipeline by <code>prePipeline</code> and holds them until <code>b.emit('bundle')</code>.\n</p>\n","props":{"input":{"_order":[]},"output":{"_order":[]}}},"deps":{"label":"deps : module-deps","desc":"<p>\n<a href=\"https://github.com/substack/module-deps\">substack/module-deps</a> processes the input rows and recursively finds their dependencies.\n</p>\n","props":{"input":{"_order":["file","id"],"file":{"id":"file","desc":"A truthy <code>file</code> value will be resolved via browser-resolve to attempt to locate the module, even if <code>id</code> is also truthy.\n"},"id":{"id":"id","desc":"If there isn't a truthy <code>file</code> prop, then <code>id</code> will be resolved via browser-resolve to locate the module.\n"}},"output":{"_order":["file","id"],"file":{"id":"file","desc":"If <code>inRow.file</code> was truthy it's passed through. Otherwise it will be populated with the absolute pathname.\n"},"id":{"id":"id","desc":"If <code>inRow.id</code> was truthy it's passed through. Otherwise, the value of <code>outRow.file</code>.\n"}}}},"deps-expose-all":{"label":"deps : exposeAll","desc":"Sub-phase added to the pipeline if <code>opts.exposeAll === true</code>\n","props":{"input":{"_order":["deps","file","id"],"deps":{"id":"deps","desc":"TODO\n"},"file":{"id":"file","desc":"TODO\n"},"id":{"id":"id","desc":"TODO\n"}},"output":{"_order":["deps","id"],"deps":{"id":"deps","desc":"TODO\n"},"id":{"id":"id","desc":"TODO\n"}}}},"json":{"label":"json","desc":"Exports content of JSON files (turns them into modules).\n","props":{"input":{"_order":["file"],"file":{"id":"file","desc":"Tested against <code>/\\.json$/</code>.\n"}},"output":{"_order":["source"],"source":{"id":"source","desc":"<code>inRow.source</code> with <code>module.exports=</code> prepended.\n"}}}},"unbom":{"label":"unbom","desc":"Strips BOMs.\n","props":{"input":{"_order":["source"],"source":{"id":"source","desc":"Tested for presence of BOM.\n"}},"output":{"_order":["source"],"source":{"id":"source","desc":"<code>inRow.source</code> with BOM stripped.\n"}}}},"unshebang":{"label":"unshebang","desc":"Strips shebang lines.\n","props":{"input":{"_order":["source"],"source":{"id":"source","desc":"Tested against <code>/^#![^\\n]*\\n/</code>.\n"}},"output":{"_order":["source"],"source":{"id":"source","desc":"<code>inRow.source</code> with shebang line stripped.\n"}}}},"syntax":{"label":"syntax","desc":"<a href=\"https://github.com/substack/node-syntax-error\">substack/node-syntax-error</a> tests for syntax erorrs.\n","props":{"input":{"_order":["file","id","source"],"file":{"id":"file","desc":"If truthy, passed to syntax-error as <code>file</code> arg.\n"},"id":{"id":"id","desc":"If <code>file</code> isn't truthy, passed to syntax-error as <code>file</code> arg.\n"},"source":{"id":"source","desc":"Passed to syntax-error as <code>src</code> arg.\n"}},"output":{"_order":[]}}},"sort":{"label":"sort","desc":"<a href=\"https://github.com/substack/deps-sort\">substack/deps-sort</a>.\n","props":{"input":{"_order":[]},"output":{"_order":[]}}},"dedupe":{"label":"dedupe","desc":"Performs deduplication.\n","props":{"input":{"_order":["dedupe","dedupeIndex","indexDeps","source"],"dedupe":{"id":"dedupe","desc":""},"dedupeIndex":{"id":"dedupeIndex","desc":""},"indexDeps":{"id":"indexDeps","desc":""},"source":{"id":"source","desc":""}},"output":{"_order":["indexDeps","nomap"],"indexDeps":{"id":"indexDeps","desc":""},"nomap":{"id":"nomap","desc":""}}}},"label":{"label":"label","desc":"","props":{"input":{"_order":["deps","entry","expose","file","id","index"],"deps":{"id":"deps","desc":""},"entry":{"id":"entry","desc":""},"expose":{"id":"expose","desc":""},"file":{"id":"file","desc":""},"id":{"id":"id","desc":""},"index":{"id":"index","desc":""}},"output":{"_order":["deps","id"],"deps":{"id":"deps","desc":""},"id":{"id":"id","desc":""}}}},"emit-deps":{"label":"emit-deps","desc":"<code>b.emit('dep', row)</code>.\n","props":{"input":{"_order":[]},"output":{"_order":[]}}},"debug":{"label":"debug","desc":"","props":{"input":{"_order":[]},"output":{"_order":["sourceFile","sourceRoot"],"sourceFile":{"id":"sourceFile","desc":""},"sourceRoot":{"id":"sourceRoot","desc":""}}}},"pack":{"label":"pack","desc":"<a href=\"https://github.com/substack/browser-pack\">substack/browser-pack</a>.\n","props":{"input":{"_order":[]},"output":{"_order":[]}}},"wrap":{"label":"wrap","desc":"","props":{"input":{"_order":[]},"output":{"_order":[]}}}}

},{}],"app/lib/jsx-transformer":[function(require,module,exports){
"use strict";

module.exports = jsx_transformer;

function jsx_transformer(el, props) {
  var _React;

  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  if (props && props.html !== undefined) {
    props.dangerouslySetInnerHTML = { __html: props.html };
    children = undefined;
    delete props.html;
  }
  return (_React = React).createElement.apply(_React, [el, props].concat(children));
}

},{}]},{},[1]);
