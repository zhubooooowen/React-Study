import * as React from 'react'
import { Fragment } from 'react'
import { Table, Modal, Checkbox, message, Row, Col } from 'antd'
import Filter from './Filter'
import { Iprops } from './interface'
import styled from 'styled-components';
import { cloneDeep } from 'lodash';

const CheckboxGroup = Checkbox.Group;
const { useState, useEffect } = React;

const StyledContainer = styled.div`
  .title {
    position: relative;
    height: 40px;
    line-height: 40px;
    background: #fff;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      cursor: pointer;
      font-weight: bold;
      font-size: 12px;
      color: #5671b3;
    }
  }
`;

const ListTemplate: React.FC<Iprops> = (props: Iprops) => {
  const {
    filterArr,
    columns,
    isShowExport,
    handleExport,
    loading,
    dataSource,
    getFilter,
    rowKey,
    initialValue
  } = props

  const hideColumnsArr: Array<any> = columns.filter((item: any) => item.isHide)
  const [renderColumns, setRenderColumns] = useState<Array<any>>(columns)
  const [visible, setVisible] = useState<boolean>(false)
  const [checkedList, setCheckedList] = useState<Array<string>>([])
  const [checkAll, setCheckAll] = useState<boolean>(false)
  const [indeterminate, setIndeterminate] = useState<boolean>(false)
  const [params, setParams] = useState<any>({})

  useEffect(() => {
    setRenderColumns(cloneDeep(columns).filter((item: any) => !item.isHide))
  }, [columns])

  const handleOpenFilterModal = () => {
    setVisible(true)
    setCheckedList(renderColumns.map((item: any) => item.title))
    setIndeterminate(!!renderColumns.length && renderColumns.length < columns.length)
    setCheckAll(renderColumns.length === columns.length)
  }

  const handleOk = () => {
    if (!checkedList.length) {
      message.warning('请至少选择一个')
      return
    }
    const arr: any = []
    columns.forEach((column: any) => {
      checkedList.forEach((item: string) => {
        if (item === column.title) {
          arr.push(column)
        }
      })
    })
    setRenderColumns(arr)
    setVisible(false)
    setCheckedList([])
  }

  const onCheckChange = (value: any) => {
    setCheckedList(value)
    setCheckAll(value.length === columns.length)
    setIndeterminate(!!value.length && value.length < columns.length)
  }

  const onCheckAllChange = (e: any) => {
    setCheckAll(e.target.checked)
    setCheckedList(e.target.checked ? columns.map((item: any) => item.title) : columns.filter((item: any) => item.disabled).map((item: any) => item.title))
    setIndeterminate(false)
  }

  const tableChange = (pagination: any) => {
    getFilter({ ...params, page: pagination.current, perpage: pagination.pageSize })
  }

  const onSearch = (params: any) => {
    setParams(params)
    getFilter(params)
  }

  // 获取Filter是否变化
  const getFilterRender = (renderFilterArr: any) => {
    // 筛选项有的，表格必须有
    const copyRenderColumns = cloneDeep(renderColumns)
    const columnsKey = copyRenderColumns.filter((column: any) => column.key).map((column: any) => column.key)
    console.log(renderFilterArr, columnsKey)
    renderFilterArr.forEach((item: any) => {
      if (!columnsKey.includes(item.name)) {
        const column = columns.filter((column: any) => column.key === item.name)[0]
        column && copyRenderColumns.push(column)
      }
    })
    console.log(copyRenderColumns)
    const arr: any = []
    columns.forEach((column: any) => {
      copyRenderColumns.forEach((item: any) => {
        if (item.key === column.key) {
          arr.push(column)
        }
      })
    })
    setRenderColumns(arr)
  }

  return (
    <Fragment>
      <Filter
        filterArr={filterArr} // 表单配置
        onSearch={onSearch}
        filterRender={getFilterRender}
        myRef={props.myRef}
        initialValue={initialValue}
      />
      <StyledContainer>
        <div className="title">
          {hideColumnsArr.length ? <span onClick={handleOpenFilterModal}>自定义展示项</span> : null}
          {isShowExport && <span className="export" onClick={handleExport}>
            导出
          </span>}
        </div>
        <Table
          bordered
          columns={renderColumns}
          pagination={{ pageSize: 3, total: dataSource.length, current: 1 }}
          dataSource={dataSource}
          onChange={tableChange}
          loading={loading}
          rowKey={rowKey}
        />
      </StyledContainer>
      <Modal
        title="筛选"
        visible={visible}
        onOk={handleOk}
        onCancel={() => {
          setVisible(false)
        }}
      >
        <div>
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            全选
            </Checkbox>
        </div>
        <br />
        <CheckboxGroup
          value={checkedList}
          onChange={onCheckChange}
          style={{ width: '100%' }}
        >
          <Row gutter={24}>
            {columns.map((item: any) => <Col style={{ marginBottom: 10 }} span={6}><Checkbox disabled={item.disabled} value={item.title}>{item.title}</Checkbox></Col>)}
          </Row>
        </CheckboxGroup>
      </Modal>
    </Fragment>
  )
}

export default ListTemplate
