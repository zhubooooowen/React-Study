import React from 'react';
import './index.less';
import Col from '../Col';

interface Iprops {
  children: any,
  type?: string,
  justify?: string,
  gutter?: number
}

const Row : React.FC<Iprops> = (props) => {
  const { children, type, justify, gutter } = props;

  return (
    <div
      className="row"
      style={{
        justifyContent: type === 'flex' && justify === 'end' ? 'flex-end' : type === 'flex' && justify === 'center' ? 'center' : type === 'flex' && justify === 'space-between' ? 'space-between' : type === 'flex' && justify === 'space-around' ? 'space-around' : 'flex-start'
      }}>
      {
        Object.prototype.toString.call(children) === '[object Array]' ? children.map((item: any, i: number) => (
          <Col
            span={item.props.span}
            offset={item.props.offset ? item.props.offset : 0}
            gutter={gutter ? gutter : 0}
            key={i}
            text={item.props.children}>
          </Col>
        )) :
          <Col
            span={children.props.span}
            offset={children.props.offset ? children.props.offset : 0}
            gutter={gutter ? gutter : 0}
            text={children.props.children}>
          </Col>
      }
    </div>
  )
}

export default Row;