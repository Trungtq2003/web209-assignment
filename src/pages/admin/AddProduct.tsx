import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useAddProductMutation } from '../../api/productApi';
import { IProduct } from '../../interfaces/product';
import { useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';


type FieldType = {
  name?: string;
  price?: string;
  image?: string;
  desc?: string;
};

const AddProduct = () => {
  const [addProduct] = useAddProductMutation();

  const navigate = useNavigate()

  const onFinish = (values: IProduct) => {
    addProduct(values).unwrap().then(() => navigate('/admin/product'))
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >

      <Form.Item<FieldType>
        label="Product name"
        name="name"
        rules={[
          { required: true, message: 'Please input name!' },
          { min: 6, message: 'It nhat la 6 ky tu' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Produce price"
        name="price"
        rules={[{ required: true, message: 'Please input price!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Produce image"
        name="image"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Description"
        name="desc"
        rules={[{ required: true, message: 'Please input description!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          them
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddProduct