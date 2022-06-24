const PlvAudit = window.PlvAudit;
const md5 = window.md5;
const $ = window.$;
const bootbox = window.bootbox;
const moment = window.moment;

const pageSetting = {
  // 页面大小
  pageSize: 10,
  // 当前页面index
  page: 1,

  totalPages: 0
};

const auditInstance = new PlvAudit({
  userId: '',
  // 如果sign，hash过期，PlvAudit会从这个func重新获取最新的sign和hash, 所以getUserInfo需要是function
  getUserInfo: (callback) => {
    const ts = Date.now();

    // 1.前端生成sign、token方式，不推荐
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
  },
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
    vid: '',
  };
}
let searchParams = getDefaultSearch();
// 初始化日期选择组件
function initDatePicker() {
  $('input[name="daterange"]').daterangepicker(
    {
      opens: 'right',
      locale: {
        format: 'YYYY/MM/DD',
        applyLabel: '选择',
        cancelLabel: '取消',
        startLabel: '开始时间',
        endLabel: '结束时间',
        daysOfWeek: ['周日', '周一', '周二', '周三', '周四', '周五','周六'],
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      },
      maxDate: new Date(),
      maxSpan: {
        days: 60
      },
    },
  );

  function setSearchTime() {
    const value = $('#uploadTime').val();

    if (!value) return;

    const start = new Date(value.split(' - ')[0].trim()).getTime();
    const end = new Date(value.split(' - ')[1].trim()).getTime() + (24 * 60 * 60 * 1000 - 1000);

    if (end - start > 60 * 60 * 24 * 30 * 2 * 1000) {
      if (searchParams.ptimeStart && searchParams.ptimeEnd) {
        $('#uploadTime').val(`${new Date(searchParams.ptimeStart).toLocaleDateString()} - ${new Date(searchParams.ptimeEnd).toLocaleDateString()}`);
      }
      return warning('查询时间间隔不可超过60天');
    }

    searchParams.ptimeStart = start;
    searchParams.ptimeEnd = end;

  }

  // 未设置时间时，保持input为空
  $('input[name="daterange"]').val('');
  $('input[name="daterange"]').on('blur', () => {
    if (!searchParams.ptimeEnd || !searchParams.ptimeStart) {
      $('input[name="daterange"]').val('');
      return;
    }
    setSearchTime();
  });

  $('input[name="daterange"]').on('hide.daterangepicker', () => {
    setTimeout(() => {
      if (!searchParams.ptimeEnd || !searchParams.ptimeStart) {
        $('input[name="daterange"]').val('');
        return;
      }
      $('#uploadTime').val(`${new Date(searchParams.ptimeStart).toLocaleDateString()} - ${new Date(searchParams.ptimeEnd).toLocaleDateString()}`);
    }, 0);
  });

  $('input[name="daterange"]').on('apply.daterangepicker', () => {
    setSearchTime();
  });
}
// 初始化视频分类组件
function initVideoClassify() {
  auditInstance.getVideoClassify().then((res) => {
    if (res.code !== 200) {
      return warning(res.message);
    }

    $('#cata-tree').treeview({
      data: res.data,
      onNodeSelected: (event, node) => {
        $('#classifyModal').modal('hide');
        $('#videoClassifyBtn span').text(node.cataname);
        searchParams.cataId = node.cataid;
      },
    });
  });
}

function initVideoStatus() {
  $('#uploadStatusDropdown').click(function(e) {
    if ($(e.target).hasClass('dropdown-item')) {
      $('#uploadStatusBtn span').text($(e.target).text());
      searchParams.status = $(e.target).text();
    }
  });
}

function initVideoScene() {
  $('#sceneDropdown').click((e) => {
    if ($(e.target).hasClass('dropdown-item')) {
      $('#sceneBtn span').text($(e.target).text());
      searchParams.autoLabel = $(e.target).text();
    }
  });
}

// 初始化机审得分组件
function initScore() {
  function limitScore(num, max, min) {
    return Math.min(Math.max(num, min), max);
  }

  // 机审得分
  $('#autoScoreMax').change(function() {
    const min = $('#autoScoreMin').val() || 0;
    $(this).val(limitScore($(this).val(), 100, min));
  });

  $('#autoScoreMin').change(function() {
    const max = $('#autoScoreMax').val() || 100;
    $(this).val(limitScore($(this).val(), max, 0));
  });
}

function getSearchParam() {
  searchParams.vid = $('#uploadVid').val();
  searchParams.title = $('#uploadTitle').val();
  searchParams.autoScoreMax = $('#autoScoreMax').val();
  searchParams.autoScoreMin = $('#autoScoreMin').val();

  return searchParams;
}

// 获取单行table的模版
function getTableItemTemplate(data) {
  return `
          <tr>
            <td><img src="${data.coverThumbUrl}"></td>
            <td>
              <div>${data.title}</div>
              <div>${data.duration} | ${data.videoPoolId}</div>
            </td>
            <td>${data.uploader}</td>
            <td>${data.cataName}</td>
            <td>${data.status}</td>
            <td>${data.autoScore}</td>
            <td>${data.autoLabel}</td>
            <td>
              <div>${data.ptime}</div>
              <div>${data.sourceFilesize}</div>
            </td>
            <td class="table-operate">
              <button
                class="btn btn-sm btn-light"
                ${data.status === '已禁播' && 'disabled'}
                aria-expanded="false"
                data-target="#previewVideo"
                onclick="previewVideo('${data.videoPoolId}')"
                data-toggle="modal">查看视频
              </button>
              <button class="btn btn-light btn-sm" ${data.status === '已禁播' && 'disabled'} onclick="forbidden('${data.videoPoolId}', 1)">禁播</button>
              <button class="btn btn-light btn-sm" ${data.status !== '已禁播' && 'disabled'} onclick="forbidden('${data.videoPoolId}', 0)">解禁</button>
            </td>

          </tr>
        `;
}

function previewVideo(vid) {
  $('#videoPreviewPage').attr('src', `https://share.plvideo.cn/front/video/preview?vid=${vid}&v=${Date.now()}'`);
  $('#videoPreviewPage').data('vid', vid);
}

// 根据接口数据渲染table
function renderTable(arr = []) {

  let template = '';

  arr.forEach((item) => {
    template = template + getTableItemTemplate(item);
  });

  if (arr.length === 0) {
    $('.table-no-data').show();
  }

  $('.table > tbody').html(template);
}

// 重置
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
}
// 搜索
function search(page = 1) {
  const params = getSearchParam();
  $('.table-loading').show();
  $('.table > tbody').empty();
  $('.table-no-data').hide();
  $('.table-pagination').show();

  pageSetting.page = Math.max(1, Math.min(page, pageSetting.totalPages)) || pageSetting.page || 1;

  auditInstance.getListAudit({
    ...params,
    pageSize: pageSetting.pageSize,
    page: pageSetting.page
  }).then((res) => {
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
        label: '确认',
      },
      cancel: {
        label: '取消',
      }
    },
    callback
  });
}

// 视频禁播
function forbidden(vid, isForbindenVideo) {
  const forbidFunc = () => {
    auditInstance.forbidden({
      vids: vid,
      forbidden: isForbindenVideo // 0:解禁 1:禁播
    }).then((res) => {
      if (res.code !== 200) {
        return warning(res.message);
      }

      search(pageSetting.page);
    });

    $('#previewVideo').modal('hide');
  };

  if (isForbindenVideo === 1) {
    plvConfirm('确认要禁播视频吗？', (result) => {
      if (result) {
        forbidFunc();
      }
    });
  } else {
    forbidFunc();
  }
}

// 查看视频的点击禁播或解禁
function modalForbidden(isForbindenVideo) {
  const vid = $('#videoPreviewPage').data('vid');

  forbidden(vid, isForbindenVideo);

  previewVideo(vid);
}

// 分页切换至上一个
function paginationPrev() {
  if (pageSetting.page - 1 >= 1) { search(pageSetting.page - 1); }
}

// 分页切换至下一个
function paginationBack() {
  if (pageSetting.page + 1 <= pageSetting.totalPages) { search(pageSetting.page + 1); }
}

// 渲染分页
function renderPagination(pageData) {

  const getItemTemplate = (index, isActive) => {
    return `
      <li class="page-item ${isActive && 'active'}" onclick="search('${index}')"><a href="javascript:void(0);”" class="page-link">${index}</a></li>
    `;
  };

  const baseIndex = Math.max(Math.min(pageData.prePageNumber, pageData.totalPages - 3), 1);
  const maxIndex = Math.min(baseIndex + 4, pageData.totalPages + 1);

  const front = `
   <li class="page-item ${pageData.activePageNum === 1 && 'disabled'}" onclick="paginationPrev()">
      <a href="javascript:void(0);" class="page-link" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
  `;

  const back = `
    <li class="page-item ${pageData.activePageNum === pageData.totalPages && 'disabled'}"" onclick="paginationBack()">
      <a href="javascript:void(0);" class="page-link" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  `;

  let template = front;

  for (let i = baseIndex; i < maxIndex; i++) {
    template += getItemTemplate(i, i === pageData.activePageNum);
  }

  template += back;

  $('.pagination').empty();
  $('.pagination').html(template);
}

function warning(text = '') {
  $('#warningText').text(text);
  $('.plv-toast').toast('show');
}

function init() {
  initDatePicker();
  initScore();
  initVideoClassify();
  initVideoStatus();
  initVideoScene();

  resetSearch();

  // 关闭视频预览时，关闭iframe页
  $('#previewVideo').on('hidden.bs.modal', () => {
    $('#videoPreviewPage').attr('src', '');
    $('#videoPreviewPage').data('vid', '');
  });

  $('#customPage').on('blur', function() {
    search($(this).val());
  });

  $('.plv-toast').toast({
    delay: 2000
  });

  search();
}

init();
