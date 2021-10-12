interface item {
  name: string
  key: string
  width?: string
  show?: boolean
  sortable?: boolean
  [prop: string]: any
}
interface itemForm {
  label: string
  type: string
  prop: string
  span?: number
  readonly?: boolean
  disabled?: boolean
  [prop: string]: any
}
/**
 * 制卡管理--动态表头
 */
export const makeApplyHeader: Array<item> = [
  // { name: '序号', key: 'index', width: '50', sortable: false, prop: 'index' },
  { name: '制卡单号', key: 'id', width: '100', sortable: false, prop: 'id' },
  { name: '申请原因', key: 'makeApplyReason', width: '120', sortable: false, prop: 'makeApplyReason' },
  { name: '制卡数量', key: 'makeNum', width: '120', sortable: true, prop: 'makeNum' },
  { name: '申请人', key: 'makeApplyName', width: '120', sortable: false, prop: 'makeApplyName' },
  { name: '申请人联系电话', key: 'makeApplyPhone', width: '175', sortable: false, prop: 'makeApplyPhone' },
  { name: '申请时间', key: 'createTime', width: '170', sortable: false, prop: 'makeApplyTime' },
  { name: '审批人', key: 'critizer', width: '120', sortable: false, prop: 'critizer' },
  { name: '审批时间', key: 'critizeTime', width: '170', sortable: false, prop: 'critizeTime' },
  { name: '审批状态', key: 'critizeState', width: '120', sortable: false, prop: 'critizeState' }
  // { name: '申请进度', key: 'applyProcess', width: '120', sortable: false, prop: 'applyProcess' },
  // { name: '是否下载', key: 'isDownload', width: '120', sortable: false, prop: 'isDownload' },
  // { name: '下载完成时间', key: 'downloadEndtime', width: '170', sortable: false, prop: 'downloadEndtime' },
  // { name: '下载次数', key: 'downloadNum', width: '120', sortable: false, prop: 'downloadNum' },
]
/**
 * 制卡管理--审批状态
 */
export const critizeStates = {
  0: '待审批',
  1: '已审批',
  2: '审批不通过',
  3: '新建'
}
export const selectCritizeStates: Array<item> = [
  // { name: '序号', key: 'index', width: '50', sortable: false, prop: 'index' },
  { name: '待审批', key: '0' },
  { name: '已审批', key: '1' },
  { name: '审批不通过', key: '2' },
  { name: '新建', key: '3' }
]
/**
 * 发卡管理--动态表头
 */
export const rcardIssueHeader: Array<item> = [
  // { name: '序号', key: 'index', width: '50', sortable: false, prop: 'index' },
  { name: '申请单号', key: 'topicCode', width: '100', sortable: false, prop: 'topicCode' },
  { name: '申请标题', key: 'issueTitle', width: '120', sortable: false, prop: 'issueTitle' },
  { name: '申请数量（张）', key: 'totalQuantity', width: '120', sortable: false, prop: 'totalQuantity' },
  { name: '实体卡申请数量（张）', key: 'purchaseNum', width: '175', sortable: false, prop: 'purchaseNum' },
  { name: '总计面额（元）', key: 'denomination', width: '170', sortable: false, prop: 'denomination' },
  { name: '总价值（元）', key: 'sellAmount', width: '120', sortable: false, prop: 'sellAmount' },
  { name: '申请状态', key: 'issueState', width: '120', sortable: false, prop: 'issueState' },
  { name: '申请人', key: 'creater', width: '120', sortable: false, prop: 'creater' },
  { name: '申请时间', key: 'creatTime', width: '170', sortable: false, prop: 'creatTime' },
  { name: '审批人', key: 'approver', width: '120', sortable: false, prop: 'approver' },
  { name: '审批时间', key: 'approveTime', width: '170', sortable: false, prop: 'approveTime' }
]
/**
 * 发卡管理--审批状态
 */
export const issueStates = {
  1: '新建',
  2: '待审批',
  3: '审批中',
  4: '审批通过',
  5: '已发布',
  6: '已下架',
  7: '审批不通过',
  8: '调拨中',
  9: '调拨成功',
  10: '调拨未完成'
}
export const selectIssueState: Array<item> = [
  { name: '新建', key: '1' },
  { name: '待审批', key: '2' },
  { name: '审批中', key: '3' },
  { name: '审批通过', key: '4' },
  { name: '已发布', key: '5' },
  { name: '已下架', key: '6' },
  { name: '审批不通过', key: '7' },
  { name: '调拨中', key: '8' },
  { name: '调拨成功', key: '9' },
  { name: '调拨未完成', key: '10' }
]
/**
 * 发卡管理--发卡明细编辑表单
 */
export const rcardIssueFormEdit: Array<itemForm> = [
  // { name: '序号', key: 'index', width: '50', sortable: false, prop: 'index' },
  // { label: '申请单号', prop: 'topicCode', span: '8', readonly: false, disabled: false },
  { label: '申请标题', type: 'input', prop: 'issueTitle', span: 8, readonly: false, disabled: false },
  { label: '制卡商', type: 'input', prop: 'factoryName', span: 8, readonly: true, disabled: false },
  { label: '申请数量（张）', type: 'input', prop: 'totalQuantity', span: 8, readonly: false, disabled: true },
  { label: '总计面额（元）', type: 'input', prop: 'denomination', span: 8, readonly: false, disabled: true },
  { label: '总价值（元）', type: 'input', prop: 'sellAmount', span: 8, readonly: false, disabled: true },
  { label: '备注', type: 'textarea', prop: 'remake', span: 16, readonly: false, disabled: false }
]
/**
 * 发卡管理--发卡明细选择有效期
 */
export const expireDay: Array<item> = [
  { name: '30天', key: '30' },
  { name: '60天', key: '60' },
  { name: '90天', key: '90' },
  { name: '180天', key: '180' },
  { name: '一年', key: '365' },
  { name: '两年', key: '730' },
  { name: '五年', key: '1095' }
]
/**
 * 发卡管理--发卡明细查看表单
 */
export const rcardIssueFormRead: Array<itemForm> = [
  // { name: '序号', key: 'index', width: '50', sortable: false, prop: 'index' },
  // { label: '申请单号', prop: 'topicCode', span: '8', readonly: false, disabled: false },
  { label: '申请标题', type: 'input', prop: 'issueTitle', span: 8, readonly: false, disabled: true },
  { label: '制卡商', type: 'input', prop: 'factoryName', span: 8, readonly: false, disabled: true },
  { label: '申请数量（张）', type: 'input', prop: 'totalQuantity', span: 8, readonly: false, disabled: true },
  { label: '总计面额（元）', type: 'input', prop: 'denomination', span: 8, readonly: false, disabled: true },
  { label: '总价值（元）', type: 'input', prop: 'sellAmount', span: 8, readonly: false, disabled: true },

  { label: '申请人', type: 'input', prop: 'creater', span: 8, readonly: false, disabled: true },
  { label: '申请时间', type: 'input', prop: 'creatTime', span: 8, readonly: false, disabled: true },
  { label: '审批人', type: 'input', prop: 'approver', span: 8, readonly: false, disabled: true },
  { label: '审批时间', type: 'input', prop: 'approveTime', span: 8, readonly: false, disabled: true },
  { label: '备注', type: 'textarea', prop: 'remake', span: 16, readonly: false, disabled: true }
]
