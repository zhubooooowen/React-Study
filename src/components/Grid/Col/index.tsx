import React from 'react';
import './index.less';

interface Iprops {
  text?: any,
  span: number,
  offset?: number,
  gutter?: number,
}

const Col : React.FC<Iprops> = (props) => {
  const { text, span, offset, gutter } = props;

  return (
    <div
      className="col"
      style={{
        width: `${span / 24 * 100}%`,
        marginLeft: offset ? `${offset / 24 * 100}%` : '0%',
        padding: gutter ? `0 ${gutter / 2}px` : 0
      }}>
      <div>
        {text}
      </div>
    </div>
  )
}

export default Col;