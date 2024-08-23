import { Button, Dropdown, Table, TableColumnsType, Tag } from 'antd'
import { CSSProperties, useState } from 'react'
import { SyncLoader } from 'react-spinners'
import { TSemester } from '../../../types'
import { courseManagementApi } from '../../../redux/features/admin/courseManagement.api'
import moment from 'moment'

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

const items = [
  {
    key: 'UPCOMING',
    label: 'Upcoming'
  },
  {
    key: 'ONGOING',
    label: 'Ongoing'
  },
  {
    key: 'ENDED',
    label: 'Ended'
  }
]

const RegisteredSemesters = () => {
  const [semesterId, setSemesterId] = useState('')

  const {
    data: semesterData,
    isLoading,
    isFetching
  } = courseManagementApi.useGetAllRegisteredSemestersQuery(undefined)

  const [updateSemesterStatus] =
    courseManagementApi.useUpdateRegisteredSemesterMutation()

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, status, startDate, endDate }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      status,
      startDate: moment(new Date(startDate)).format('MMMM'),
      endDate: moment(new Date(endDate)).format('MMMM')
    })
  )

  const handleMenuClick = (data: any) => {
    const updateData = {
      id: semesterId,
      data: {
        status: data.key
      }
    }
    updateSemesterStatus(updateData)
  }

  const menuProps = {
    items,
    onClick: handleMenuClick
  }

  const columns: TableColumnsType<TSemesterTableData> = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name'
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      render: (item) => {
        let color

        if (item === 'UPCOMING') {
          color = 'blue'
        }
        if (item === 'ONGOING') {
          color = 'green'
        }
        if (item === 'ENDED') {
          color = 'red'
        }

        return <Tag color={color}>{item}</Tag>
      }
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
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={['click']}>
            <Button onClick={() => setSemesterId(item?.key)}>Update</Button>
          </Dropdown>
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
        showSorterTooltip={{ target: 'sorter-icon' }}
      />
    </div>
  )
}

export default RegisteredSemesters
