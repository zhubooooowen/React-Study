import React from 'react';
import './index.less';
import Grid from '@components/Grid';

const Row = Grid.Row;
const Col = Grid.Col;

const GridPage : React.FC = () => {

  return (
    <div id="gridPage">
      <div className="title">基础用法</div>
      <Row>
        <Col span={12}>col-12</Col>
        <Col span={12}>col-12</Col>
      </Row>
      <Row>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
      </Row>
      <Row>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
      </Row>
      <Row>
        <Col span={18}>col-18</Col>
        <Col span={6}>col-6</Col>
      </Row>
      <div className="title">超出换行</div>
      <Row>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
      </Row>
      <div className="title">flex布局(默认flex-start)</div>
      <Row>
        <Col span={4}>col-4 默认flex-start</Col>
        <Col span={4}>col-4 默认flex-start</Col>
        <Col span={4}>col-4 默认flex-start</Col>
        <Col span={4}>col-4 默认flex-start</Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span={4}>col-4 center</Col>
        <Col span={4}>col-4 center</Col>
        <Col span={4}>col-4 center</Col>
        <Col span={4}>col-4 center</Col>
      </Row>
      <Row type="flex" justify="end">
        <Col span={4}>col-4 flex-end</Col>
        <Col span={4}>col-4 flex-end</Col>
        <Col span={4}>col-4 flex-end</Col>
        <Col span={4}>col-4 flex-end</Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span={4}>col-4 space-between</Col>
        <Col span={4}>col-4 space-between</Col>
        <Col span={4}>col-4 space-between</Col>
        <Col span={4}>col-4 space-between</Col>
      </Row>
      <Row type="flex" justify="space-around">
        <Col span={4}>col-4 space-around</Col>
        <Col span={4}>col-4 space-around</Col>
        <Col span={4}>col-4 space-around</Col>
        <Col span={4}>col-4 space-around</Col>
      </Row>
      <div className="title">偏移</div>
      <Row>
        <Col span={8}>col-8</Col>
        <Col span={8} offset={8}>col-8 col-offset-8</Col>
      </Row>
      <Row>
        <Col span={6} offset={6}>col-6 col-offset-6</Col>
        <Col span={6} offset={6}>col-6 col-offset-6</Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>col-12 col-offset-6</Col>
      </Row>
      <Row>
        <Col span={6}>col-6</Col>
        <Col span={12} offset={6}>col-12 col-offset-6</Col>
      </Row>
      <div className="title">区块间隔</div>
      <div className="wrap">
        <Row gutter={16}>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
        </Row>
      </div>
    </div>
  )
}

export default GridPage;