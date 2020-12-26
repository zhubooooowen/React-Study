import * as React from 'react'
import { ColumnProps } from 'antd/es/table';

export interface IconfigArr {
  label: string // 因无法保证 name 和 columns 的 key 一一对应，因此要保证 label 和 columns 的 title 一一对应
  name: string | string[] // 用于表单提交，type 是 RangePicker 时，name 为一个长度为2的字符串数组
  type?: string // 组件类型：Input Select DatePicker RangePicker MonthPicker
  placeholder?: string // 表单提示
  selectOption?: any[] // 只用于 Select 的 option
  initialValue?: string | string[] | number // 表单默认值 RangePicker => ['2020-10-10', '2020-10-20'] DatePicker => '2020-10-10' MonthPicker => '2020-10'
  multiple?: boolean // 只用于 Select 的 多选
  format?: string // 用于 DatePicker RangePicker MonthPicker 的时间格式化
  showTime: boolean // 是否可选时分
  disabledDate?: (params: object) => void // 日期选择框禁用日期方法，参考 antd 组件使用
  render?: React.ReactNode // 自定义表单组件，使用此属性，不需要传 type，比如传入 CourierSug 组件
  disabled?: boolean // 自定义筛选项，是否禁用
  isHide?: boolean // 是否默认隐藏此选项
  filterName?: string // 日期范围筛选
}

// 基于 antd table ColumnProps 属性
export interface Icolumns extends ColumnProps<any>{
  disabled?: boolean // 自定义筛选项，是否禁用
  isHide?: boolean // 是否默认隐藏此选项
}

export interface Iprops {
  filterArr: IconfigArr[] // 筛选项配置对象
  columns: Icolumns[] // 表格 columns
  loading: boolean // 表格加载 loading
  dataSource: any[] // 表格数据
  getFilter: (params: object) => void // 获取筛选数据
  isShowExport?: boolean // 是否支持导出
  handleExport?: (params:any) => void // 导出方法
  myRef: any // 获取筛选表单ref
  rowKey: string // 表格的key
  initialValue: any // 筛选表格默认值，同 antd 用法
}
