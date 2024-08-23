import { Button, Table, TableColumnsType } from 'antd'
import { CSSProperties } from 'react'
import { SyncLoader } from 'react-spinners'
import { TSemester } from '../../../types'
import { courseManagementApi } from '../../../redux/features/admin/courseManagement.api'

export const spinnerContainer: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
}

export type TSemesterTableData = Pick<
  TSemester,
  'status' | 'startDate' | 'endDate'
>

const RegisteredSemesters = () => {
  const {
    data: semesterData,
    isLoading,
    isFetching
  } = courseManagementApi.useGetAllRegisteredSemestersQuery(undefined)

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, status, startDate, endDate }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      status,
      startDate,
      endDate
    })
  )

  const columns: TableColumnsType<TSemesterTableData> = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name'
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status'
    },
    {
      key: 'startDate',
      title: 'Start Date',
      dataIndex: 'startDate'
    },
    {
      key: 'endDate',
      title: 'End Date',
      dataIndex: 'endDate'
    },
    {
      key: '*',
      title: 'Action',
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        )
      }
    }
  ]

  if (isLoading) {
    return (
      <div style={spinnerContainer}>
        <SyncLoader color='#001529' />
      </div>
    )
  }

  return (
    <div>
      <h1 style={{ marginBottom: '1rem' }}>Academic Semesters</h1>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        // onChange={onChange}
        showSorterTooltip={{ target: 'sorter-icon' }}
      />
    </div>
  )
}

export default RegisteredSemesters
