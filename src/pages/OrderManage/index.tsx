import * as React from 'react';
import ListTemplate from '@components/ListTemplate';


const { useState, useEffect, useMemo, useRef } = React;

interface IProps { }

const OrderManage = (props: IProps) => {
  const [filterArr, setFilterArr] = useState<any>([])
  const myRef = useRef<any>(null)

  useEffect(() => {
    const arr = [
      {
        label: "订单号",
        name: "order_no",
        type: "Input",
        placeholder: "请输入订单号",
        disabled: true,
        initialValue: ''
      },
      {
        label: "创建日期",
        name: "create_time",
        type: "DatePicker",
        placeholder: "请选择创建日期",
        disabled: true,
        initialValue: '',
      },
      {
        label: "日期范围",
        name: 'order_date',
        filterName: ['order_start_date', 'order_end_date'],
        type: "RangePicker",
        placeholder: "",
        disabled: true,
        initialValue: '',
      },
      {
        label: "地址",
        name: "address",
        type: "Input",
        placeholder: "请输入地址",
        isHide: true,
        initialValue: ''
      },
    ];
    setFilterArr(arr)
  }, [])

  const columns = useMemo(() => [
    {
      title: '订单号',
      dataIndex: 'order_no',
      key: 'order_no',
      width: 250,
      disabled: true
    },
    {
      title: '创建日期',
      dataIndex: 'create_time',
      key: 'create_time',
      width: 150,
      disabled: true
    },
    {
      title: '日期范围',
      dataIndex: 'order_date',
      key: 'order_date',
      width: 200,
      disabled: true
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      width: 150,
      isHide: true,
    }
  ], [])

  const dataSource = [
    {
      order_no: 123,
      create_time: '2020-12-12',
      order_date: '2020-12-12 ~ 2020-12-20',
      address: '华龙苑南里'
    },
    {
      order_no: 234,
      create_time: '2020-12-12',
      order_date: '2020-12-12 ~ 2020-12-20',
      address: '华龙苑南里'
    },
    {
      order_no: 345,
      create_time: '2020-12-12',
      order_date: '2020-12-12 ~ 2020-12-20',
      address: '华龙苑南里'
    },
    {
      order_no: 456,
      create_time: '2020-12-12',
      order_date: '2020-12-12 ~ 2020-12-20',
      address: '华龙苑南里'
    },
    {
      order_no: 567,
      create_time: '2020-12-12',
      order_date: '2020-12-12 ~ 2020-12-20',
      address: '华龙苑南里'
    }
  ]

  const getFilter = (params: any) => {
    console.log(params)
    console.log(myRef)
  }

  return (
    <div id="orderManage">
      <ListTemplate
        filterArr={filterArr} // 筛选表单配置
        columns={columns} // 表格 columns
        loading={false} // 表格加载数据 loading
        dataSource={dataSource}
        getFilter={getFilter} // 获取筛选数据
        myRef={myRef}
        rowKey="order_no"
      />
    </div>
  );
}

export default OrderManage