import { userManagementApi } from '../../../redux/features/admin/userManagement.api'
import { Button, Space, Table, TableColumnsType, TableProps } from 'antd'
import { CSSProperties, useState } from 'react'
import { SyncLoader } from 'react-spinners'
import {
  TAcademicSemesterTableData,
  TQueryParams,
  TStudent
} from '../../../types'

export const spinnerContainer: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
}

export type TStudentTableData = Pick<TStudent, 'fullName' | 'id'>

const StudentsData = () => {
  // search params state
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined)

  const {
    data: studentData,
    isLoading,
    isFetching
  } = userManagementApi.useGetAllStudentsQuery(params)

  const tableData = studentData?.data?.map(({ _id, fullName, id }) => ({
    key: _id,
    fullName,
    id
  }))

  const columns: TableColumnsType<TStudentTableData> = [
    {
      key: 'fullName',
      title: 'Name',
      dataIndex: 'fullName'
    },
    {
      key: 'Roll No.',
      title: 'id',
      dataIndex: 'id'
    },
    {
      key: '*',
      title: 'Action',
      render: () => {
        return (
          <Space>
            <Button>Details</Button>
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        )
      },
      width: '1%'
    }
  ]

  const onChange: TableProps<TStudentTableData>['onChange'] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    console.log({ filters, extra })
  }

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
        onChange={onChange}
        showSorterTooltip={{ target: 'sorter-icon' }}
      />
    </div>
  )
}

export default StudentsData
