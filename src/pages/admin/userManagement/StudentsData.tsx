import { userManagementApi } from '../../../redux/features/admin/userManagement.api'
import { Button, Pagination, Space, Table, TableColumnsType } from 'antd'
import { CSSProperties, useState } from 'react'
import { SyncLoader } from 'react-spinners'
import { TStudent } from '../../../types'
import { Link } from 'react-router-dom'

export const spinnerContainer: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
}

export type TStudentTableData = Pick<
  TStudent,
  'fullName' | 'id' | 'email' | 'contactNo'
>

const StudentsData = () => {
  // search params state
  const [page, setPage] = useState(1)

  const {
    data: studentData,
    isLoading,
    isFetching
  } = userManagementApi.useGetAllStudentsQuery([
    { name: 'page', value: page },
    { name: 'sort', value: 'id' }
  ])

  // meta data
  const metaData = studentData?.meta

  // table data
  const tableData = studentData?.data?.map(
    ({ _id, fullName, id, email, contactNo }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo
    })
  )

  const columns: TableColumnsType<TStudentTableData> = [
    {
      key: 'fullName',
      title: 'Name',
      dataIndex: 'fullName'
    },
    {
      key: 'id',
      title: 'Roll No.',
      dataIndex: 'id'
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email'
    },
    {
      key: 'contactNo',
      title: 'Contact No.',
      dataIndex: 'contactNo'
    },
    {
      key: '*',
      title: 'Action',
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/student-details/${item?.key}`}>
              <Button>Details</Button>
            </Link>
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        )
      },
      width: '1%'
    }
  ]

  // const onChange: TableProps<TStudentTableData>['onChange'] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   console.log({ filters, extra })
  // }

  if (isLoading) {
    return (
      <div style={spinnerContainer}>
        <SyncLoader color='#001529' />
      </div>
    )
  }

  return (
    <div>
      <h1 style={{ marginBottom: '1rem' }}>Students</h1>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        // onChange={onChange}
        showSorterTooltip={{ target: 'sorter-icon' }}
        pagination={false}
      />
      <Pagination
        style={{ marginTop: '1rem' }}
        current={page}
        pageSize={metaData?.limit}
        total={metaData?.total}
        onChange={(value) => setPage(value)}
      />
    </div>
  )
}

export default StudentsData
