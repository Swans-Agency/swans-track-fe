import React, { useEffect, useState } from 'react';
import { getAxios } from '@/functions/ApiCalls';
import { Empty, Pagination, Table } from 'antd';
import NoTableData from './NoTableData';


export default function TableANTD({ columns, url, reloadData }) {
    const [data, setData] = useState({});
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

    const fetchData = async (page = 1, pageSize = 10) => {
        try {
            const response = await getAxios(`${url}?page=${page}`, false, false, () => { });
            console.log({ response });
            setData(response);
            setPagination({
                current: page,
                pageSize,
                total: response.count,
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [reloadData]);

    const handlePaginationChange = (page, pageSize) => {
        fetchData(page, pageSize);
    };

    return (
        <>
            {data?.count ? <div>
                <Table
                    className='w-full '
                    columns={columns}
                    dataSource={data?.results}
                    pagination={false}
                    size='middle'
                    style={{
                        overflowX: 'auto',
                    }}
                />
                <div className='flex justify-end'>
                    <Pagination
                        className='mt-2 '
                        current={pagination.current}
                        pageSize={pagination.pageSize}
                        total={pagination.total}
                        onChange={handlePaginationChange}
                    />
                </div>
            </div> :
                <Empty />
            }
        </>
    );
};