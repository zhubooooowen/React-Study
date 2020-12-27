## React-Study

```javascript
// 启动
yarn
yarn start
```

#### Grid 栅格

```javascript
import Grid from '@components/Grid';

const Row = Grid.Row;
const Col = Grid.Col;

// 基础用法
<Row>
  <Col span={12}>col-12</Col>
  <Col span={12}>col-12</Col>
</Row>

// flex 布局 offset 偏移
<Row type="flex" justify="space-around">
  <Col span={6} offset={6}>col-6</Col>
  <Col span={6}>col-6</Col>
</Row>

// 区块间隔
<Row gutter={16}>
  <Col span={6}>col-6</Col>
  <Col span={6}>col-6</Col>
  <Col span={6}>col-6</Col>
  <Col span={6}>col-6</Col>
</Row>
```

#### Pagination 分页

```javascript
<Pagination
  sizeChange={[20, 10, 50]} // 更改每页条数
  defaultCurrent={1} // 默认第几页
  total={990} // 总条数
  pageSize={20} // 每页多少条
  onChange={pageChange} />
```

#### Progress 进度条

```javascript
// 基于 svg 的进度条组件 percentage 进度 color 颜色

// 环形进度条 type
<Progress type="circle" percentage={80} color="#1890ff" />

// 自定义宽度 width
<Progress type="circle" percentage={60} color="orange" width={300} />

// 直线形进度条
<Progress percentage={100} color="#ff520e" />

// 自定义宽度 width
<Progress percentage={40} color="skyblue" width={500} />
```

#### 后台管理模板

```javascript
interface IconfigArr {
  label: string // 筛选文案
  name: string | string[] // 用于表单提交
  filterName?: any // 特殊的筛选 name 定义，比如日期范围筛选
  type?: string // 组件类型：Input Select DatePicker RangePicker MonthPicker
  placeholder?: string // 表单提示
  selectOption?: any[] // 只用于 Select 的 option
  multiple?: boolean // 只用于 Select 的 多选
  format?: string // 用于 DatePicker RangePicker MonthPicker 的时间格式化
  showTime？: boolean // 是否可选时分
  disabledDate?: (params: object) => void // 日期选择框禁用日期方法，参考 antd 组件使用
  render?: React.ReactNode // 自定义表单组件，使用此属性，不需要传 type，比如自定义组件
  disabled?: boolean // 自定义筛选项，是否禁用
  isHide?: boolean // 是否默认隐藏此选项
}

// 基于 antd table ColumnProps 属性
interface Icolumns extends ColumnProps<any>{
  disabled?: boolean // 自定义筛选项，是否禁用
  isHide?: boolean // 是否默认隐藏此选项
}

interface Iprops {
  filterArr: IconfigArr[] // 筛选项配置对象
  columns: Icolumns[] // 表格 columns
  loading: boolean // 表格加载 loading
  dataSource: any[] // 表格数据
  getFilter: (params: object) => void // 获取筛选数据
  getPagination: (params: object) => void // 获取筛选数据
  isShowExport?: boolean // 是否支持导出
  handleExport?: (params: any) => void // 导出方法
  myRef: any // 获取筛选表单ref
  rowKey: string // 表格的key
  searchParams: any // 筛选表格数据
  pagination: any // 分页数据
}

<ListTemplate
  filterArr={filterArr}
  columns={columns}
  loading={false}
  myRef={myRef}
  rowKey="order_no"
  dataSource={tableData}
  searchParams={searchParams}
  pagination={pagination}
  getFilter={getFilter}
  getPagination={getPagination}
/>

```

### 拖拽表格

```javascript
/**
 * 用法同 antd table 用法，除了不支持 onRow 属性
 * dragStart(record,index) 获取被拖拽行的数据和索引
 * drop(index) 获取交换行的索引
 */

<DragTable
  columns={columns}
  dataSource={dataSource}
  bordered
  pagination={false}
  dragStart={onDragStart} // 获取被拖拽行的数据和索引
  drop={onDrop} // 获取交换行的索引
/>
```

#### 持续更新中...

