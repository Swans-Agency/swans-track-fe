import React, { useEffect, useState } from 'react';
import { getAxios } from '@/functions/ApiCalls';
import { Pagination, Table } from 'antd';


export default function TableANTD({ columns, url }) {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

    const fetchData = async (page = 1, pageSize = 10) => {
        try {
            const response = await getAxios(`${url}?page=${page}`, false, false, () => {});
            console.log({response});
            setData(response.results);
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
    }, []);

    const handlePaginationChange = (page, pageSize) => {
        fetchData(page, pageSize);
    };

    return (
        <div>
            <Table
                className='w-full custom-table'
                columns={columns}
                dataSource={data}
                pagination={false}
                size="middle"
                style={{
                    overflowX: 'auto',
                }}
            />
            <div className='flex justify-end'>
                <Pagination
                    className='mt-2 custom-pagination'
                    current={pagination.current}
                    pageSize={pagination.pageSize}
                    total={pagination.total}
                    onChange={handlePaginationChange}
                />
            </div>
        </div>
    );
};