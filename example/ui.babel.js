"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PlvAudit = window.PlvAudit;
var md5 = window.md5;
var $ = window.$;
var bootbox = window.bootbox;
var moment = window.moment;
var pageSetting = {
  // 页面大小
  pageSize: 10,
  // 当前页面index
  page: 1,
  totalPages: 0
};
var auditInstance = new PlvAudit({
  userId: 'xxx',
  getUserInfo: function getUserInfo(callback) {
    var ts = Date.now(); // 1.前端生成sign、token方式，不推荐
    // hash = md5('xxx')
    // sign = md5('xxx')
    // callback({
    //   ptime: ts,
    //   hash: ,
    //   sign:,
    // });
    // 2.从后端接口获取

    /**
     * ajax({
     *   url:'后端接口',
     *   success: (res) => {
     *
     *     callback({
     *       ptime: res.ptime
     *       hash: res.hash,
     *       sign: res.sign
     *     })
     *   }
     * })
     *
     */
  }
});

function getDefaultSearch() {
  return {
    // 创建时间-开始，时间戳13位
    ptimeStart: '',
    // 创建时间-结束，时间戳13位
    ptimeEnd: '',
    // 分类id
    cataId: '',
    // 标题
    title: '',
    // 审核场景
    autoLabel: '',
    // 得分-最大值
    autoScoreMax: 0,
    // 得分-最小值
    autoScoreMin: 0,
    // 视频状态
    status: '',
    // 视频vid
    vid: ''
  };
}

var searchParams = getDefaultSearch(); // 初始化日期选择组件

function initDatePicker() {
  $('input[name="daterange"]').daterangepicker({
    opens: 'right',
    locale: {
      format: 'YYYY/MM/DD',
      applyLabel: '选择',
      cancelLabel: '取消',
      startLabel: '开始时间',
      endLabel: '结束时间',
      daysOfWeek: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    },
    maxDate: new Date(),
    maxSpan: {
      days: 60
    }
  });

  function setSearchTime() {
    var value = $('#uploadTime').val();
    if (!value) return;
    var start = new Date(value.split(' - ')[0].trim()).getTime();
    var end = new Date(value.split(' - ')[1].trim()).getTime() + (24 * 60 * 60 * 1000 - 1000);

    if (end - start > 60 * 60 * 24 * 30 * 2 * 1000) {
      if (searchParams.ptimeStart && searchParams.ptimeEnd) {
        $('#uploadTime').val("".concat(new Date(searchParams.ptimeStart).toLocaleDateString(), " - ").concat(new Date(searchParams.ptimeEnd).toLocaleDateString()));
      }

      return warning('查询时间间隔不可超过60天');
    }

    searchParams.ptimeStart = start;
    searchParams.ptimeEnd = end;
  } // 未设置时间时，保持input为空


  $('input[name="daterange"]').val('');
  $('input[name="daterange"]').on('blur', function () {
    if (!searchParams.ptimeEnd || !searchParams.ptimeStart) {
      $('input[name="daterange"]').val('');
      return;
    }

    setSearchTime();
  });
  $('input[name="daterange"]').on('hide.daterangepicker', function () {
    setTimeout(function () {
      if (!searchParams.ptimeEnd || !searchParams.ptimeStart) {
        $('input[name="daterange"]').val('');
        return;
      }

      $('#uploadTime').val("".concat(new Date(searchParams.ptimeStart).toLocaleDateString(), " - ").concat(new Date(searchParams.ptimeEnd).toLocaleDateString()));
    }, 0);
  });
  $('input[name="daterange"]').on('apply.daterangepicker', function () {
    setSearchTime();
  });
} // 初始化视频分类组件


function initVideoClassify() {
  auditInstance.getVideoClassify().then(function (res) {
    if (res.code !== 200) {
      return warning(res.message);
    }

    $('#cata-tree').treeview({
      data: res.data,
      onNodeSelected: function onNodeSelected(event, node) {
        $('#classifyModal').modal('hide');
        $('#videoClassifyBtn span').text(node.cataname);
        searchParams.cataId = node.cataid;
      }
    });
  });
}

function initVideoStatus() {
  $('#uploadStatusDropdown').click(function (e) {
    if ($(e.target).hasClass('dropdown-item')) {
      $('#uploadStatusBtn span').text($(e.target).text());
      searchParams.status = $(e.target).text();
    }
  });
}

function initVideoScene() {
  $('#sceneDropdown').click(function (e) {
    if ($(e.target).hasClass('dropdown-item')) {
      $('#sceneBtn span').text($(e.target).text());
      searchParams.autoLabel = $(e.target).text();
    }
  });
} // 初始化机审得分组件


function initScore() {
  function limitScore(num, max, min) {
    return Math.min(Math.max(num, min), max);
  } // 机审得分


  $('#autoScoreMax').change(function () {
    var min = $('#autoScoreMin').val() || 0;
    $(this).val(limitScore($(this).val(), 100, min));
  });
  $('#autoScoreMin').change(function () {
    var max = $('#autoScoreMax').val() || 100;
    $(this).val(limitScore($(this).val(), max, 0));
  });
}

function getSearchParam() {
  searchParams.vid = $('#uploadVid').val();
  searchParams.title = $('#uploadTitle').val();
  searchParams.autoScoreMax = $('#autoScoreMax').val();
  searchParams.autoScoreMin = $('#autoScoreMin').val();
  return searchParams;
} // 获取单行table的模版


function getTableItemTemplate(data) {
  return "\n          <tr>\n            <td><img src=\"".concat(data.coverThumbUrl, "\"></td>\n            <td>\n              <div>").concat(data.title, "</div>\n              <div>").concat(data.duration, " | ").concat(data.videoPoolId, "</div>\n            </td>\n            <td>").concat(data.uploader, "</td>\n            <td>").concat(data.cataName, "</td>\n            <td>\n              <div>").concat(data.status, "</div>\n            </td>\n            <td>").concat(data.autoScore, "</td>\n            <td>").concat(data.autoLabel, "\n              ").concat(data.violatedImages && data.violatedImages.length > 0 ? "<button class=\"btn btn-warning btn-sm mt-1\" onclick=\"showViolatedImages('".concat(data.videoPoolId, "')\">\u67E5\u770B</button>") : '', "</td>\n            <td>\n              <div>").concat(data.ptime, "</div>\n              <div>").concat(data.sourceFilesize, "</div>\n            </td>\n            <td class=\"table-operate\">\n              <button\n                class=\"btn btn-sm btn-light\"\n                ").concat(data.status === '已禁播' && 'disabled', "\n                aria-expanded=\"false\"\n                data-target=\"#previewVideo\"\n                onclick=\"previewVideo('").concat(data.videoPoolId, "')\"\n                data-toggle=\"modal\">\u67E5\u770B\u89C6\u9891\n              </button>\n              <button class=\"btn btn-light btn-sm\" ").concat(data.status === '已禁播' && 'disabled', " onclick=\"forbidden('").concat(data.videoPoolId, "', 1)\">\u7981\u64AD</button>\n              <button class=\"btn btn-light btn-sm\" onclick=\"forbidden('").concat(data.videoPoolId, "', 0)\">\u89E3\u7981</button>\n              <button class=\"btn btn-light btn-sm\" onclick=\"setPublish('").concat(data.videoPoolId, "', ").concat(data.statusCode, ")\">\u5BA1\u6838\u901A\u8FC7</button>\n            </td>\n\n          </tr>\n        ");
}

function previewVideo(vid) {
  $('#videoPreviewPage').attr('src', "https://share.plvideo.cn/front/video/preview?vid=".concat(vid, "&v=").concat(Date.now(), "'"));
  $('#videoPreviewPage').data('vid', vid);
} // 显示违规图片


function showViolatedImages(videoPoolId) {
  // 从当前页面数据中查找对应的违规图片数据
  var currentTableData = window.currentTableData || [];
  var videoData = currentTableData.find(function (item) {
    return item.videoPoolId === videoPoolId;
  });

  if (!videoData || !videoData.violatedImages || videoData.violatedImages.length === 0) {
    warning('未找到违规图片数据');
    return;
  }

  var violatedImages = videoData.violatedImages;
  var imagesHtml = '';
  violatedImages.forEach(function (image, index) {
    imagesHtml += "\n      <div class=\"violated-image-item mb-3\">\n        <div class=\"row\">\n          <div class=\"col-md-6\">\n            <img src=\"".concat(image.imageUrl, "\" class=\"img-fluid\" alt=\"\u8FDD\u89C4\u56FE\u7247").concat(index + 1, "\" style=\"max-height: 300px; border: 1px solid #ddd; border-radius: 4px;\">\n          </div>\n          <div class=\"col-md-6\">\n            <h6>\u5BA1\u6838\u4FE1\u606F\uFF1A</h6>\n            <p><strong>\u6807\u7B7E\uFF1A</strong> ").concat(image.auditLabel, "</p>\n            <p><strong>\u5F97\u5206\uFF1A</strong> ").concat(image.auditScore, "</p>\n            <p><strong>\u7ED3\u679C\uFF1A</strong> ").concat(image.auditResult, "</p>\n          </div>\n        </div>\n      </div>\n      ").concat(index < violatedImages.length - 1 ? '<hr>' : '', "\n    ");
  });
  $('#violatedImagesContainer').html(imagesHtml);
  $('#violatedImagesModal').modal('show');
} // 根据接口数据渲染table


function renderTable() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 保存当前表格数据供其他函数使用
  window.currentTableData = arr;
  var template = '';
  arr.forEach(function (item) {
    template = template + getTableItemTemplate(item);
  });

  if (arr.length === 0) {
    $('.table-no-data').show();
  }

  $('.table > tbody').html(template);
} // 重置


function resetSearch() {
  $('#uploadTime').val('');
  $('#videoClassifyBtn span').text('请选择视频分类');
  $('#uploadTitle').val('');
  $('#sceneBtn span').text('请选择审核场景');
  $('#autoScoreMin').val('');
  $('#autoScoreMax').val('');
  $('#uploadStatusBtn span').text('请选择视频状态');
  $('#uploadVid').val('');
  searchParams = getDefaultSearch();
} // 搜索


function search() {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var params = getSearchParam();
  $('.table-loading').show();
  $('.table > tbody').empty();
  $('.table-no-data').hide();
  $('.table-pagination').show();
  pageSetting.page = Math.max(1, Math.min(page, pageSetting.totalPages)) || pageSetting.page || 1;
  auditInstance.getListAudit(_objectSpread(_objectSpread({}, params), {}, {
    pageSize: pageSetting.pageSize,
    page: pageSetting.page
  })).then(function (res) {
    $('.table-loading').hide();

    if (res.code !== 200) {
      $('.table-no-data').show();
      $('.table-pagination').hide();
      return warning(res.message);
    }

    if (res) {
      renderTable(res.data.contents);
      pageSetting.totalPages = res.data.totalPages;
      $('#customPage').val(res.data.activePageNum);
    }

    if (res && res.data && res.data.contents.length === 0) {
      $('.table-no-data').show();
      $('.table-pagination').hide();
    }

    renderPagination(res.data);
  });
}

function plvConfirm(msg, callback) {
  bootbox.confirm({
    message: msg,
    buttons: {
      confirm: {
        label: '确认'
      },
      cancel: {
        label: '取消'
      }
    },
    callback: callback
  });
} // 视频禁播


function forbidden(vid, isForbindenVideo) {
  var forbidFunc = function forbidFunc() {
    auditInstance.forbidden({
      vids: vid,
      forbidden: isForbindenVideo // 0:解禁 1:禁播

    }).then(function (res) {
      if (res.code !== 200) {
        return warning(res.message);
      }

      search(pageSetting.page);
    });
    $('#previewVideo').modal('hide');
  };

  if (isForbindenVideo === 1) {
    plvConfirm('确认要禁播视频吗？', function (result) {
      if (result) {
        forbidFunc();
      }
    });
  } else {
    forbidFunc();
  }
} // 视频发布


function setPublish(_x, _x2) {
  return _setPublish.apply(this, arguments);
} // 查看视频的点击禁播或解禁


function _setPublish() {
  _setPublish = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(vid, status) {
    var res;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return auditInstance.setPublish({
              vids: vid,
              status: Number(status)
            });

          case 3:
            res = _context.sent;

            if (!(res.code !== 200)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", warning(res.message));

          case 6:
            success('审核发布成功');
            search(pageSetting.page);
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            warning(_context.t0.message);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));
  return _setPublish.apply(this, arguments);
}

function modalForbidden(isForbindenVideo) {
  var vid = $('#videoPreviewPage').data('vid');
  forbidden(vid, isForbindenVideo);
  previewVideo(vid);
} // 分页切换至上一个


function paginationPrev() {
  if (pageSetting.page - 1 >= 1) {
    search(pageSetting.page - 1);
  }
} // 分页切换至下一个


function paginationBack() {
  if (pageSetting.page + 1 <= pageSetting.totalPages) {
    search(pageSetting.page + 1);
  }
} // 渲染分页


function renderPagination(pageData) {
  var getItemTemplate = function getItemTemplate(index, isActive) {
    return "\n      <li class=\"page-item ".concat(isActive && 'active', "\" onclick=\"search('").concat(index, "')\"><a href=\"javascript:void(0);\u201D\" class=\"page-link\">").concat(index, "</a></li>\n    ");
  };

  var baseIndex = Math.max(Math.min(pageData.prePageNumber, pageData.totalPages - 3), 1);
  var maxIndex = Math.min(baseIndex + 4, pageData.totalPages + 1);
  var front = "\n   <li class=\"page-item ".concat(pageData.activePageNum === 1 && 'disabled', "\" onclick=\"paginationPrev()\">\n      <a href=\"javascript:void(0);\" class=\"page-link\" aria-label=\"Previous\">\n        <span aria-hidden=\"true\">&laquo;</span>\n      </a>\n    </li>\n  ");
  var back = "\n    <li class=\"page-item ".concat(pageData.activePageNum === pageData.totalPages && 'disabled', "\"\" onclick=\"paginationBack()\">\n      <a href=\"javascript:void(0);\" class=\"page-link\" aria-label=\"Next\">\n        <span aria-hidden=\"true\">&raquo;</span>\n      </a>\n    </li>\n  ");
  var template = front;

  for (var i = baseIndex; i < maxIndex; i++) {
    template += getItemTemplate(i, i === pageData.activePageNum);
  }

  template += back;
  $('.pagination').empty();
  $('.pagination').html(template);
}

function warning() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  $('#warningText').text(text);
  $('.plv-toast').toast('show');
}

function success() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  $('#successText').text(text);
  $('.plv-toast-success').toast('show');
}

function init() {
  initDatePicker();
  initScore();
  initVideoClassify();
  initVideoStatus();
  initVideoScene();
  resetSearch(); // 关闭视频预览时，关闭iframe页

  $('#previewVideo').on('hidden.bs.modal', function () {
    $('#videoPreviewPage').attr('src', '');
    $('#videoPreviewPage').data('vid', '');
  });
  $('#customPage').on('blur', function () {
    search($(this).val());
  });
  $('.plv-toast').toast({
    delay: 2000
  });
  $('.plv-toast-success').toast({
    delay: 2000
  });
  search();
}

init();
