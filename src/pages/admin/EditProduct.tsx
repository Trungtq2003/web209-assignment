import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input, Skeleton } from 'antd';
import { useAddProductMutation, useGetProductByIdQuery, useUpdateProductMutation } from '../../api/productApi';
import { IProduct } from '../../interfaces/product';
import { useNavigate, useParams } from 'react-router-dom';

type FieldType = {
  name?: string;
  price?: string;
  image?: string;
  desc?: string;
};

const EditProduct = () => {
  const { idProduct } = useParams<{ idProduct: string }>();
  const { data: productData, isLoading } = useGetProductByIdQuery(idProduct || "")
  const [updateProduct] = useUpdateProductMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: productData?.name,
      price: productData?.price,
      image: productData?.image,
      desc: productData?.desc
    })
  }, [productData])
  const onFinish = (values: IProduct) => {
    updateProduct({...values, id: idProduct}).unwrap().then(() => navigate('/admin/product'))
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      {isLoading? <Skeleton /> : 
        <Form
        form={form}
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
            Update
          </Button>
        </Form.Item>
      </Form>
      }
    </div>
  )
}

export default EditProduct