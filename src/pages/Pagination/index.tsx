import React from 'react';
import Pagination from '@components/Pagination';
import './index.less';

const PaginationPage: React.FC = () => {

  const pageChange = (e: number) => {
    console.log(e);
  }

  return (
    <div id="PaginationPage">
      <div className="wrap">
        <Pagination
          defaultCurrent={1}
          total={60}
          pageSize={20}
          pageChange={pageChange} />
      </div>

      <div className="wrap">
        <Pagination
          defaultCurrent={1}
          total={90}
          pageSize={20}
          pageChange={pageChange} />
      </div>

      <div className="wrap">
        <Pagination
          defaultCurrent={3}
          total={120}
          pageSize={20}
          pageChange={pageChange} />
      </div>

      <div className="wrap">
        <Pagination
          defaultCurrent={1}
          total={140}
          pageSize={20}
          pageChange={pageChange} />
      </div>

      <div className="wrap">
        <Pagination
          defaultCurrent={7}
          total={200}
          pageSize={20}
          pageChange={pageChange} />
      </div>

      <div className="wrap">
        <Pagination
          sizeChange={[20, 10, 50]}
          defaultCurrent={1}
          total={990}
          pageSize={20}
          pageChange={pageChange} />
      </div>
    </div>
  )
}

export default PaginationPage;