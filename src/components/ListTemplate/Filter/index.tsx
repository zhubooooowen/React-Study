import * as React from 'react'
import { Form, Input, Button, Select, DatePicker, Row, Col, Modal, Checkbox, message } from 'antd'
import { IconfigArr } from '../interface'
import styled from 'styled-components';
import { cloneDeep } from 'lodash';
import { FormWrapper, FormItemWrapper } from "@components/FormWrapperStyles";

const { RangePicker, MonthPicker } = DatePicker
const Option = Select.Option
const CheckboxGroup = Checkbox.Group;
const { useState, useEffect } = React;

const FormContainer = styled.div`
  background: #fff;
  .filterBtn {
    float: right;
    cursor: pointer;
    color: #00a0e9;
    font-weight: bold;
  }
  .ant-advanced-search-form {
    .ant-form-item {
      display: flex;
      margin-bottom: 15px;
    }
    .btnWrap {
      display: flex;
      justify-content: flex-end;
    }
  }
`;

interface Iprops {
  filterArr: IconfigArr[],
  onSearch: any
  filterRender: any
  myRef: any
  searchParams: any
}

const Filter: React.FC<Iprops> = (props: Iprops) => {

  const { filterArr, onSearch, filterRender, searchParams } = props
  const [renderFilterArr, setRenderFilterArr] = useState<Array<any>>([])
  const [visible, setVisible] = useState<boolean>(false)
  const [checkedList, setCheckedList] = useState<Array<string>>([])
  const [checkAll, setCheckAll] = useState<boolean>(false)
  const [indeterminate, setIndeterminate] = useState<boolean>(false)
  const [form] = Form.useForm();

  useEffect(() => {
    setRenderFilterArr(cloneDeep(filterArr).filter((item: any) => !item.isHide))
  }, [filterArr])

  const getField = (item: any) => {
    switch (item.type) {
      case 'Input':
        return (
          <Input
            placeholder={item.placeholder}
            autoComplete="off"
            style={{ width: 200 }}
          />
        )
      case 'Select':
        return (
          item.selectOption && (
            <Select
              showSearch
              allowClear
              optionFilterProp="children"
              filterOption={(input, option: any) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              style={{ width: 200 }}
              mode={item.multiple && 'multiple'} // 是否多选
              placeholder={item.placeholder}
            >
              {item.selectOption.map((item: any, i: number) => (
                <Option value={item.value} key={i}>
                  {item.label}
                </Option>
              ))}
            </Select>
          )
        )
      case 'DatePicker':
        return (
          <DatePicker
            style={{ width: 200 }}
            placeholder={item.placeholder}
            showTime={item.showTime ? { format: 'HH:mm' } : false}
            format={item.format || 'YYYY-MM-DD'}
            disabledDate={item.disabledDate || null}
          />
        )
      case 'RangePicker':
        return (
          <RangePicker
            style={{ width: item.showTime ? 300 : 240 }}
            showTime={item.showTime ? { format: 'HH:mm' } : false}
            format={item.format || 'YYYY-MM-DD'}
            disabledDate={item.disabledDate || null}
          />
        )
      case 'MonthPicker':
        return (
          <MonthPicker
            style={{ width: 200 }}
            placeholder={item.placeholder}
            format={item.format || 'YYYY-MM'}
            disabledDate={item.disabledDate || null}
          />
        )
      default:
        return null
    }
  }

  const getFields = (renderFilterArr: any[]) => {
    const children: any = []
    renderFilterArr.forEach((item: any, i: number) => {
      children.push(
        <FormItemWrapper key={i} labelWidth="80px">
          <Form.Item label={item.label} name={item.name}>
            {item.render ? item.render : getField(item)}
          </Form.Item>
        </FormItemWrapper>
      )
    })
    return children
  }

  const handleSearch = (fieldsValue: any) => {
    const params: any = {}
    renderFilterArr.forEach(item => {
      const { name, type, format, filterName } = item
      if (type && type.includes('Picker')) {
        if (type === 'DatePicker') {
          params[name] = fieldsValue[name] ? fieldsValue[name].format(format || 'YYYYMMDD') : undefined
        }
        if (type === 'RangePicker' && filterName && fieldsValue[name]) {
          params[filterName[0]] = fieldsValue[name][0].format(format || 'YYYYMMDD')
          params[filterName[1]] = fieldsValue[name][1].format(format || 'YYYYMMDD')
        }
        if (type === 'MonthPicker') {
          params[name] = fieldsValue[name] ? fieldsValue[name].format('YYYYMM') : undefined
        }
      } else {
        params[name] = fieldsValue[name]
      }
    })
    const deleteEmptyKey = (params: any) => {
      Object.keys(params).forEach((e) => {
        if (params[e] === '' || params[e] === null || params[e] === undefined || JSON.stringify(params[e]) === '{}' ||
          JSON.stringify(params[e]) === '[]') {
          delete params[e];
        }
      });
    }
    deleteEmptyKey(params)
    onSearch(params)
  }

  const handleReset = () => {
    form.resetFields()
  }

  const handleOpenFilterModal = () => {
    setVisible(true)
    setCheckedList(renderFilterArr.map((item: any) => item.label))
    setIndeterminate(!!renderFilterArr.length && renderFilterArr.length < filterArr.length)
    setCheckAll(renderFilterArr.length === filterArr.length)
  }

  const handleOk = () => {
    if (!checkedList.length) {
      message.warning('请至少展示一个筛选项')
      return
    }
    const arr: any = []
    filterArr.forEach((filter: any) => {
      checkedList.forEach((item: string) => {
        if (item === filter.label) {
          arr.push(filter)
        }
      })
    })
    setRenderFilterArr(arr)
    setVisible(false)
    setCheckedList([])
    filterRender(arr)
  }

  const onCheckChange = (value: any) => {
    setCheckedList(value)
    setCheckAll(value.length === filterArr.length)
    setIndeterminate(!!value.length && value.length < filterArr.length)
  }

  const onCheckAllChange = (e: any) => {
    setCheckAll(e.target.checked)
    setCheckedList(e.target.checked ? filterArr.map((item: any) => item.label) : filterArr.filter((item: any) => item.disabled).map((item: any) => item.label))
    setIndeterminate(false)
  }

  const hideFilterArr: Array<any> = filterArr.filter((item: any) => item.isHide)

  return (
    <FormContainer>
      <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'flex-end' }}>
        {hideFilterArr.length ? <span className="filterBtn" onClick={handleOpenFilterModal}>自定义筛选项</span> : null}
      </div>
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
            {filterArr.map((item: any) => <Col style={{ marginBottom: 10 }} span={6}><Checkbox disabled={item.disabled} value={item.label}>{item.label}</Checkbox></Col>)}
          </Row>
        </CheckboxGroup>
      </Modal>
      <Form className="ant-advanced-search-form" form={form} ref={props.myRef} onFinish={handleSearch} initialValues={searchParams}>
        <FormWrapper>
          {getFields(renderFilterArr)}
          <FormItemWrapper floatDirection="right" margin="0">
            <div style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={handleReset}>
                重置
              </Button>
            </div>
          </FormItemWrapper>
        </FormWrapper>
      </Form>
    </FormContainer>
  )
}

export default Filter
