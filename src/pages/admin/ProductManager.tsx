import { Space, Table, Button, Skeleton, Popconfirm, message } from 'antd';
import React from 'react'
import { useGetProductsQuery, useRemoveProductMutation } from '../../api/productApi';
import { IProduct } from '../../interfaces/product';
import { Link, useNavigate } from 'react-router-dom';

type Props = {}

const ProductManager = (props: Props) => {

  const [removeProduct, { isLoading: isRemoveLoading}] = useRemoveProductMutation();

  const confirm = (id: number) => {
    removeProduct(id);
    message.success('Delete complete');
  };

  const { data: productData, error, isLoading } = useGetProductsQuery();

  const dataSource = productData?.map(({ id, name, price, image, desc }: IProduct) => ({
    key: id,
    name,
    price,
    image,
    desc,
  }))

  const columns = [
    {
      title: 'Product name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (imageUrl: string) => (
        <img src={imageUrl} alt="Product" style={{ maxWidth: '100px' }} />
      ),
    },
    {
      title: 'Descreption',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: 'Action',
      key: 'action',
      render: ({key: id}: any) => (
        <Space size="middle">
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => confirm(id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
          <Button type="primary"><Link to={`/admin/product/${id}/edit`}>Edit</Link></Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />}
    </div>
  )
}

export default ProductManager