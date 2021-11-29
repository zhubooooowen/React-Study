import * as React from 'react'
import { ColumnProps } from 'antd/es/table';

export interface IconfigArr {
  label: string // 筛选文案
  name: string // 用于表单提交
  filterName?: string[] // 特殊的筛选 name 定义，比如日期范围筛选
  type?: string // 组件类型：Input Select DatePicker RangePicker MonthPicker
  placeholder?: string // 表单提示
  selectOption?: any[] // 只用于 Select 的 option
  multiple?: boolean // 只用于 Select 的 多选
  format?: string // 用于 DatePicker RangePicker MonthPicker 的时间格式化
  showTime?: boolean // 是否可选时分
  disabledDate?: (params: object) => void // 日期选择框禁用日期方法，参考 antd 组件使用
  render?: React.ReactNode // 自定义表单组件，使用此属性，不需要传 type，比如传入 CourierSug 组件
  disabled?: boolean // 自定义筛选项，是否禁用
  isHide?: boolean // 是否默认隐藏此选项
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
  getPagination: (params: object) => void // 获取筛选数据
  isShowExport?: boolean // 是否支持导出
  handleExport?: (params: any) => void // 导出方法
  myRef?: any // 获取筛选表单ref
  rowKey: string // 表格的key
  searchParams: any // 筛选表格数据
  pagination: any // 分页数据
}
