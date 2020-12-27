import React, { useState, useEffect } from "react";
import { Button } from "antd";
import Progress from "@components/Progress";
import "./index.less";

declare var window: Window & { timer: any }

const ProgressPage: React.FC = () => {

  const [percentage, setPercentage] = useState(80)
  const [autoPercentage, setAutoPercentage] = useState(66)
  const [addPercentage, setAddPercentage] = useState(10)

  useEffect(() => {
    let num = 10

    window.timer = setInterval(() => {
      num += 10;
      setAutoPercentage(Math.floor(Math.random() * 100 + 1))
      setAddPercentage(num)
      num === 100 && (num = 0)
    }, 1500);

    return () => {
      clearInterval(window.timer); // 必须清除定时器
    }
  }, [])


  const changePercentage = () => {
    setPercentage(Math.floor(Math.random() * (1 - 100) + 100))
  }

  return (
    <div id="ProgressPage">
      <div className="title">环形进度条</div>
      <div className="wrap">
        <Progress type="circle" percentage={autoPercentage} color="red" />
        <Progress type="circle" percentage={addPercentage} color="orange" />
        <Progress type="circle" percentage={percentage} color="yellow" />
        <Progress type="circle" percentage={percentage} color="green" />
        <Progress type="circle" percentage={percentage} color="skyblue" />
        <Progress type="circle" percentage={percentage} color="blue" />
        <Progress type="circle" percentage={percentage} color="purple" />
      </div>
      <div className="title" style={{ marginTop: "40px" }}>直线型进度条</div>
      <div className="wrap">
        <div>
          <Progress percentage={48} color="#ff520e" />
          <Progress percentage={addPercentage} color="gold" width={250} />
          <Progress percentage={percentage} color="skyblue" width={300} />
          <Button type="primary" onClick={changePercentage}>更改进度</Button>
        </div>
      </div>
    </div>
  );
}

export default ProgressPage;
