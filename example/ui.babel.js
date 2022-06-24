"use strict";

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
  userId: '',
  // 如果sign，hash过期，PlvAudit会从这个func重新获取最新的sign和hash, 所以getUserInfo需要是function
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
  return "\n          <tr>\n            <td><img src=\"".concat(data.coverThumbUrl, "\"></td>\n            <td>\n              <div>").concat(data.title, "</div>\n              <div>").concat(data.duration, " | ").concat(data.videoPoolId, "</div>\n            </td>\n            <td>").concat(data.uploader, "</td>\n            <td>").concat(data.cataName, "</td>\n            <td>").concat(data.status, "</td>\n            <td>").concat(data.autoScore, "</td>\n            <td>").concat(data.autoLabel, "</td>\n            <td>\n              <div>").concat(data.ptime, "</div>\n              <div>").concat(data.sourceFilesize, "</div>\n            </td>\n            <td class=\"table-operate\">\n              <button\n                class=\"btn btn-sm btn-light\"\n                ").concat(data.status === '已禁播' && 'disabled', "\n                aria-expanded=\"false\"\n                data-target=\"#previewVideo\"\n                onclick=\"previewVideo('").concat(data.videoPoolId, "')\"\n                data-toggle=\"modal\">\u67E5\u770B\u89C6\u9891\n              </button>\n              <button class=\"btn btn-light btn-sm\" ").concat(data.status === '已禁播' && 'disabled', " onclick=\"forbidden('").concat(data.videoPoolId, "', 1)\">\u7981\u64AD</button>\n              <button class=\"btn btn-light btn-sm\" ").concat(data.status !== '已禁播' && 'disabled', " onclick=\"forbidden('").concat(data.videoPoolId, "', 0)\">\u89E3\u7981</button>\n            </td>\n\n          </tr>\n        ");
}

function previewVideo(vid) {
  $('#videoPreviewPage').attr('src', "https://share.plvideo.cn/front/video/preview?vid=".concat(vid, "&v=").concat(Date.now(), "'"));
  $('#videoPreviewPage').data('vid', vid);
} // 根据接口数据渲染table


function renderTable() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
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
} // 查看视频的点击禁播或解禁


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
  search();
}

init();
