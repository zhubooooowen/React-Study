import React, { useState, useEffect } from "react";
import "./index.less";

interface Iprops {
  type?: string,
  percentage: number,
  color?: string,
  width?: number
}

const Progress: React.FC<Iprops> = (props: Iprops) => {
  const { type, color } = props
  const width = props.width || 200
  const [lineWidth, setLineWieth] = useState<number>(0)
  const [circlePerimeter, setCirclePerimeter] = useState<number>(0)
  const [percentage, setPercentage] = useState<number>(0)
  const [oldPercentage, setOldPercentage] = useState<number>(0)

  useEffect(() => {
    if (type) {
      // 圆的周长 2πr 2r =  3 * width / 4
      setCirclePerimeter(((3 * width) / 4) * Math.PI)
    } else {
      // line 的长度是 svg 的长度 - 60
      setLineWieth(width - 60)
    }
  }, [type, width])

  useEffect(() => {
    if (props.percentage !== percentage) {
      setOldPercentage(percentage)
      setPercentage(props.percentage)
    }
  }, [props.percentage, percentage])

  // circle 中 cx cy 圆心 r 半径
  // line 中 x1 属性在 x 轴定义线条的开始
  // y1 属性在 y 轴定义线条的开始
  // x2 属性在 x 轴定义线条的结束
  // y2 属性在 y 轴定义线条的结束
  // stroke-dasharray 虚线
  // stroke-dashoffset 周长(线的长度)为 100 进度为 80 那么 stroke-dashoffset = 100 * (100 - 80) / 100 = 20 就可以绘制进度 80 的圆环(直线)
  // animate 是控制动画的
  // percentage 从 80 变为 60 svg 先渲染为 0 到 80 stroke-dashoffset 再从 80 的值往新的 60 的值变化
  // stroke-dashoffset = 周长 * (100 - 进度) / 100
  // 环形进度条时 当进度为 0 要取消动画 不然 当宽度在大概 270 ~ 500 范围内 初始化为 0 会多出一点进度

  // svg 标签添加 key 属性 每次 render 时 key 的值变化 react 先销毁该组件(元素)(有状态组件的 componentWillUnmount 会执行)，然后重新创建该组件
  return (
    <div className="progress">
      {type ? (
        <div className="circleWrap" style={{ width: width, height: width }}>
          <svg key={percentage} id="circle" width={width} height={width}>
            <circle
              cx={width / 2}
              cy={width / 2}
              r={(3 * width) / 8}
              fill="none"
              stroke="#e8e8e8"
              strokeWidth="12"
            />
            <circle
              cx={width / 2}
              cy={width / 2}
              r={(3 * width) / 8}
              fill="none"
              stroke={color}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circlePerimeter}
              strokeDashoffset={
                oldPercentage
                  ? circlePerimeter * (1 - oldPercentage / 100)
                  : circlePerimeter
              }
            >
              {percentage !== 0 ? (
                <animate
                  attributeName="stroke-dashoffset"
                  attributeType="XML"
                  from={
                    oldPercentage
                      ? circlePerimeter * (1 - oldPercentage / 100)
                      : circlePerimeter
                  }
                  to={circlePerimeter * (1 - percentage / 100)}
                  dur="1s"
                  fill="freeze"
                />
              ) : null}
            </circle>
          </svg>
          <div>{percentage}%</div>
        </div>
      ) : (
          <div className="lineWrap" style={{ width: width, height: 20 }}>
            <svg key={percentage} width={width} height="20">
              <line
                x1="10"
                y1="10"
                x2={width - 50}
                y2="10"
                fill="none"
                strokeWidth="12"
                stroke="#e8e8e8"
                strokeLinecap="round"
              />
              <line
                x1="10"
                y1="10"
                x2={width - 50}
                y2="10"
                fill="none"
                strokeWidth="12"
                stroke={color}
                strokeLinecap="round"
                strokeDasharray={lineWidth}
                strokeDashoffset={
                  oldPercentage
                    ? lineWidth * (1 - oldPercentage / 100)
                    : lineWidth
                }
              >
                <animate
                  attributeName="stroke-dashoffset"
                  attributeType="XML"
                  from={
                    oldPercentage
                      ? lineWidth * (1 - oldPercentage / 100)
                      : lineWidth
                  }
                  to={lineWidth * (1 - percentage / 100)}
                  dur="1s"
                  fill="freeze"
                />
              </line>
            </svg>
            <div>{percentage}%</div>
          </div>
        )}
    </div>
  );
}

export default Progress
