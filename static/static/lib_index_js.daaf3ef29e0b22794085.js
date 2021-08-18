(self["webpackChunkjupyterlab_prodigy"] = self["webpackChunkjupyterlab_prodigy"] || []).push([["lib_index_js"],{

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainAreaProdigyWidget": () => (/* binding */ MainAreaProdigyWidget),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/launcher */ "webpack/sharing/consume/default/@jupyterlab/launcher");
/* harmony import */ var _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_index_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../style/index.css */ "./style/index.css");






const defaultProdigyUrl = 'http://localhost:8080';
const prodigyDocsUrl = 'https://prodi.gy/docs';
const prodigyIconClass = 'jp-prodigyIcon';
const prodigyDocsIconClass = 'jp-docsIcon';
class ProdigyIFrameWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.Widget {
    /**
     * Construct a new ProdigyIFrameWidget.
     */
    constructor(url = defaultProdigyUrl) {
        super();
        this.url = url;
        this.title.label = 'Prodigy';
        this.title.iconClass = prodigyIconClass;
        this.title.closable = true;
        this.addClass('jp-prodigyWidget');
        // Add jp-IFrame class to keep drag events from being lost to the iframe
        // See https://github.com/phosphorjs/phosphor/issues/305
        // See https://github.com/jupyterlab/jupyterlab/blob/master/packages/apputils/style/iframe.css#L17-L35
        this.addClass('jp-IFrame');
        this.iframe = document.createElement('iframe');
        this.iframe.id = 'iframe-' + this.id;
        this.iframe.src = this.url;
        this.iframe.setAttribute('baseURI', this.url);
        this.node.appendChild(this.iframe);
    }
}
class ProdigyDocsIFrameWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.Widget {
    constructor(url = prodigyDocsUrl) {
        super();
        this.url = url;
        this.title.label = 'Prodigy Docs';
        this.title.iconClass = prodigyDocsIconClass;
        this.title.closable = true;
        this.addClass('jp-prodigyWidget');
        // Add jp-IFrame class to keep drag events from being lost to the iframe
        // See https://github.com/phosphorjs/phosphor/issues/305
        // See https://github.com/jupyterlab/jupyterlab/blob/master/packages/apputils/style/iframe.css#L17-L35
        this.addClass('jp-IFrame');
        this.iframe = document.createElement('iframe');
        this.iframe.id = 'iframe-' + this.id;
        this.iframe.src = this.url;
        this.iframe.setAttribute('baseURI', this.url);
        this.node.appendChild(this.iframe);
    }
}
class MainAreaProdigyWidget extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.MainAreaWidget {
    onCloseRequest(msg) {
        void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
            title: 'Possible unsaved changes',
            body: 'By closing the tab, you may lose unsaved annotations. Don\'t forget to hit the "save" button in the sidebar to submit your work.',
            buttons: [
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.cancelButton({ label: 'No' }),
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.okButton({ label: 'Yes' })
            ]
        }).then(result => {
            if (result.button.accept) {
                this.dispose();
                return true;
            }
            else {
                return false;
            }
        });
    }
}
/**
 * Activate the extension.
 */
async function activate(app, palette, restorer, settings, launcher) {
    var _a;
    const prodigyConfig = await settings.get('jupyterlab-prodigy:plugin', 'prodigyConfig');
    const url = ((_a = prodigyConfig.composite) === null || _a === void 0 ? void 0 : _a.url) || defaultProdigyUrl;
    const tracker = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.WidgetTracker({
        namespace: 'prodigy-widget'
    });
    const docsTracker = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.WidgetTracker({
        namespace: 'prodigy-docs-widget'
    });
    let widget;
    let docsWidget;
    const command = 'prodigy:open';
    app.commands.addCommand(command, {
        label: 'Open Prodigy',
        iconClass: prodigyIconClass,
        execute: () => {
            if (!widget || widget.isDisposed) {
                const content = new ProdigyIFrameWidget(url);
                widget = new MainAreaProdigyWidget({ content });
                widget.id = 'jupyterlab-prodigy-widget';
                widget.title.label = 'Prodigy';
                widget.title.closable = true;
            }
            if (!tracker.has(widget)) {
                tracker.add(widget);
            }
            if (!widget.isAttached) {
                app.shell.add(widget, 'main', {
                    mode: 'split-right'
                });
            }
            widget.content.update();
            app.shell.activateById(widget.id);
        }
    });
    const docsCommand = 'prodigy:open-docs';
    app.commands.addCommand(docsCommand, {
        label: 'Open Prodigy Docs',
        iconClass: prodigyDocsIconClass,
        execute: () => {
            if (!docsWidget || docsWidget.isDisposed) {
                const content = new ProdigyDocsIFrameWidget();
                docsWidget = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.MainAreaWidget({ content });
                docsWidget.id = 'jupyterlab-prodigy-docs-widget';
                docsWidget.title.label = 'Prodigy Docs';
                docsWidget.title.closable = true;
            }
            if (!docsTracker.has(docsWidget)) {
                docsTracker.add(docsWidget);
            }
            if (!docsWidget.isAttached) {
                app.shell.add(docsWidget, 'main', {
                    mode: 'split-top'
                });
            }
            docsWidget.content.update();
            app.shell.activateById(docsWidget.id);
        }
    });
    palette.addItem({ command, category: 'Prodigy' });
    palette.addItem({ command: docsCommand, category: 'Prodigy' });
    restorer.restore(tracker, {
        command,
        name: () => 'prodigy-widget'
    });
    restorer.restore(docsTracker, {
        command: docsCommand,
        name: () => 'prodigy-docs-widget'
    });
    // Launcher
    launcher.add({
        command,
        category: 'Prodigy',
        rank: -10
    });
    launcher.add({
        command: docsCommand,
        category: 'Prodigy',
        rank: -5
    });
}
/**
 * Create jupyterlab-prodigy extension.
 */
const extension = {
    id: 'jupyterlab-prodigy',
    autoStart: true,
    requires: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer, _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3__.ISettingRegistry, _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_2__.ILauncher],
    activate: activate
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extension);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./style/index.css":
/*!***************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./style/index.css ***!
  \***************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _icon_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icon.png */ "./style/icon.png");
/* harmony import */ var _docs_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./docs.svg */ "./style/docs.svg");
/* harmony import */ var _docs_svg__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_docs_svg__WEBPACK_IMPORTED_MODULE_4__);
// Imports





var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_icon_png__WEBPACK_IMPORTED_MODULE_3__.default);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()((_docs_svg__WEBPACK_IMPORTED_MODULE_4___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --jp-icon-explosionai: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  --jp-icon-docs: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n}\n\n.jp-prodigyWidget iframe {\n  height: 100%;\n  width: 100%;\n  /* padding: 20px; */\n  box-sizing: border-box;\n}\n\n.jp-prodigyIcon {\n  background-image: var(--jp-icon-explosionai);\n  background-size: contain;\n}\n\n.jp-docsIcon {\n  background-image: var(--jp-icon-docs);\n  background-size: contain;\n}\n", "",{"version":3,"sources":["webpack://./style/index.css"],"names":[],"mappings":"AAAA;EACE,8DAAwC;EACxC,uDAAiC;AACnC;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,mBAAmB;EACnB,sBAAsB;AACxB;;AAEA;EACE,4CAA4C;EAC5C,wBAAwB;AAC1B;;AAEA;EACE,qCAAqC;EACrC,wBAAwB;AAC1B","sourcesContent":[":root {\n  --jp-icon-explosionai: url('./icon.png');\n  --jp-icon-docs: url('./docs.svg');\n}\n\n.jp-prodigyWidget iframe {\n  height: 100%;\n  width: 100%;\n  /* padding: 20px; */\n  box-sizing: border-box;\n}\n\n.jp-prodigyIcon {\n  background-image: var(--jp-icon-explosionai);\n  background-size: contain;\n}\n\n.jp-docsIcon {\n  background-image: var(--jp-icon-docs);\n  background-size: contain;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./style/icon.png":
/*!************************!*\
  !*** ./style/icon.png ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "34d5a3bcec4218e556c14efdbc6d68a1.png");

/***/ }),

/***/ "./style/index.css":
/*!*************************!*\
  !*** ./style/index.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./style/index.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./style/docs.svg":
/*!************************!*\
  !*** ./style/docs.svg ***!
  \************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 46 37'%3E %3Cpath fill='%23583fcf' d='M43 3.1H0V36.9H46.1V3.1H43z'/%3E %3Cpath fill='%23fff' d='M27.6 0H43v30.7H27.6zM3.1 0h15.3v30.7H3.1z'/%3E %3Cpath fill='%23dfdfdf' d='M18.4 30.7H3.1v3.1h18.4v-3.1h-3.1zM39.9 30.7H24.5v3.1h-3v3.1h3.1v-3.1H43v-3.1h-3.1z'/%3E %3Cpath fill='%23eee' d='M3.1 3.1H43v30.7H3.1z'/%3E %3Cpath fill='%23f6f6f6' d='M18.4 3.1v27.6h3.1V0h-3.1v3.1zM24.5 0V30.7h3.1V0h-3.1z'/%3E %3Cpath fill='%23583fcf' d='M15.4 9.2h3v3.1h-3zM30.8 21.5h3v3h-3z'/%3E %3Cpath fill='%23aaa' d='M15.3 21.5h3.1v3.1h-3.1zM9.2 27.6H6.1v3.1h9.3v-3.1H9.2zM15.3 15.3H6.1v3.1H18.4v-3.1h-3.1zM12.3 24.6v-3.1H6.1v3.1h6.2zM27.6 9.2h3.1v3.1h-3.1zM36.9 3.1h-9.3v3.1H39.9V3.1h-3zM36.8 9.2h-3v3.1h6.1V9.2h-3.1zM36.8 15.3h-9.2v3.1H39.9v-3.1h-3.1zM36.8 21.5h3.1v3.1h-3.1zM15.3 3.1H6.1v3.1H18.4V3.1h-3.1zM30.7 27.6h-3.1v3.1h9.3v-3.1h-6.2z'/%3E %3Cpath fill='%23f7b658' d='M9.2 9.2H6.1v3.1h9.3V9.2H9.2zM27.6 21.5h3.1v3.1h-3.1z'/%3E %3C/svg%3E"

/***/ })

}]);
//# sourceMappingURL=lib_index_js.daaf3ef29e0b22794085.js.map