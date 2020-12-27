import React, { useState, useEffect, useCallback } from "react";
import { Select } from "antd";
import "./index.less";

const Option = Select.Option;

interface Iprops {
  total: number,
  pageSize: number,
  defaultCurrent: number,
  pageChange: Function,
  sizeChange?: number[],
}

const Pagination: React.FC<Iprops> = (props: Iprops) => {
  const { defaultCurrent, pageChange, sizeChange } = props

  const [pageSize, setPageSize] = useState<number>(props.pageSize || 10)
  const length = Math.ceil(props.total / pageSize);
  const [current, setCurrent] = useState(defaultCurrent <= length ? defaultCurrent : length || 1)
  const [pageArr, setPageArr] = useState<any>([])

  const initPage = (length: number) => {
    let arr = [];
    if (length <= 6) {
      for (let i = 1; i <= length; i++) {
        arr.push(i);
      }
    } else {
      arr = [1, 2, 3, 4, 5, "•••", length];
    }
    return arr;
  }

  const handlePage = useCallback((item: number) => {
    pageChange(item);
    let arr = [];
    if (length >= 7 && item >= 3) {
      if (item <= length - 4) {
        // 点击页数小于 length - 4 的时候 展示•••
        arr = [item - 2, item - 1, item, item + 1, item + 2, "•••", length];
      } else {
        // 点击页数大于 length - 4 的时候 而且页数大于等于 7 页数从 length - 6 开始
        const start = length - 6;
        for (let i = start; i <= length; i++) {
          arr.push(i);
        }
      }
    } else {
      // 点击 1和2 或 length < 7
      arr = initPage(length);
    }
    setPageArr(arr)
    setCurrent(item)
  }, [pageChange, length])

  useEffect(() => {
    const arr = initPage(length)
    setPageArr(arr)
    current !== 1 && handlePage(current)
  }, [length, current, handlePage])

  const handlePrev = () => {
    const num = current > 1 ? current - 1 : current;
    setCurrent(num)
    handlePage(num)
  }

  const handleNext = () => {
    const num = current < length ? current + 1 : current;
    setCurrent(num)
    handlePage(num)
  }

  const select = (e: number) => {
    setPageSize(e)
    setCurrent(1)
    handlePage(1)
  }

  return (
    <ul className="pagination">
      {current >= 4 ? (
        <li className="first" onClick={() => handlePage(1)}>
          首页
        </li>
      ) : null}
      {current > 1 ? (
        <li className="prev" onClick={handlePrev}>
          上一页
        </li>
      ) : null}
      {pageArr.map((item: any, i: number) => (
        <li
          key={i}
          className={
            item === "•••" ? "omit" : item === current ? "active" : ""
          }
          onClick={item === "•••" ? () => { return } : () => handlePage(item)}
        >
          {item}
        </li>
      ))}
      {current < length ? (
        <li className="next" onClick={handleNext}>
          下一页
        </li>
      ) : null}
      {sizeChange ? (
        <Select
          placeholder="更改条数"
          style={{ width: 120, marginLeft: "8px" }}
          onChange={select}
        >
          {sizeChange.map((item, i) => (
            <Option value={item} key={i}>
              {item}条/页
            </Option>
          ))}
        </Select>
      ) : null}
    </ul>
  );
}

export default Pagination;
