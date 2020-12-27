import React from 'react';
import { Table } from 'antd';

interface Iprops {
  columns: any[]
  dataSource: any
  dragStart: (record: any, index: number) => any
  drop: (index: number) => any
  [propName: string]: any;
}

const DragTable: React.FC<Iprops> = (props) => {
  const { dragStart, drop } = props

  if (props.onRow) {
    throw Error('不支持 onRow')
  }

  return (
    <Table {...props} onRow={(record: any, index: any) => {
      return {
        style: { cursor: 'move' },
        draggable: true,
        onDragStart: () => dragStart(record, index),
        onDragOver: (e: any) => {
          // 禁用 onDragOver 的默认事件才能出发 onDrop
          e.preventDefault()
        },
        onDrop: () => drop(index)
      };
    }} />
  )
}

export default DragTable;