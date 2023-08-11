import { Space, Table, Button, Skeleton, Popconfirm, message } from 'antd';
import React from 'react'
import { useGetUsersQuery, useRemoveUserMutation } from '../../api/authApi';
import { IUser } from '../../interfaces/auth';

type Props = {}

const UserManagement = (props: Props) => {

  const confirm = (id: Number) => {
    message.success('Click on Yes');
  };

  const { data: userData, error, isLoading } = useGetUsersQuery();

  const dataSource = userData?.map(({ id, username, email, password }: IUser) => ({
    key: id,
    username,
    email,
    password,
  }))

  const columns = [
    {
      title: 'username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'password',
      dataIndex: 'password',
      key: 'password',
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
          <Button type="primary">Edit</Button>
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

export default UserManagement