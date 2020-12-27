import React, { useState } from 'react';
import { Tag } from 'antd';
import DragTable from '@components/DragTable'
import './index.less';
import { cloneDeep } from 'lodash'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: []) => (
      <span>
        {tags.map((tag: string) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '4',
    name: 'Bowen Zhu',
    age: 24,
    address: 'Changping District, Beijing',
    tags: ['cool', 'handsome', 'developer'],
  },
];

const DragTablePage: React.FC = () => {

  const [dataSource, setDataSource] = useState(data)
  const [dragItem, setDragItem] = useState({})
  const [dragIndex, setDragIndex] = useState(0)


  const onDragStart = (record: any, index: number) => {
    console.log(record, index)
    setDragItem(record)
    setDragIndex(index)
  }

  const onDrop = (index: number) => {
    console.log(index)
    const newData = cloneDeep(dataSource) as any
    newData.splice(dragIndex, 1)
    newData.splice(index, 0, dragItem)
    console.log(newData)
    setDataSource(newData)
  }

  return (
    <div id="dragTablePage">
      <div className="title">
        基于 antd 的表格拖拽（简易封装，无需集成 react-dnd ，节省代码）
      </div>
      <DragTable
        columns={columns}
        dataSource={dataSource}
        bordered
        pagination={false}
        dragStart={onDragStart} // 获取被拖拽行的数据和索引
        drop={onDrop} // 获取交换行的索引
      />
    </div>
  )
}

export default DragTablePage;