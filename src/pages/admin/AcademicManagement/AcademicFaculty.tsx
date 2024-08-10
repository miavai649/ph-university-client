import { Button, Table, TableColumnsType, TableProps } from 'antd'
import { academicManagementApi } from '../../../redux/features/admin/academicManagement'
import { TAcademicFacultyTableData } from '../../../types/academicManagement.type'
import { TQueryParams } from '../../../types'
import { useState } from 'react'

const AcademicFaculty = () => {
  const [params, setParams] = useState<TQueryParams | undefined>(undefined)
  const { data: facultyData, isFetching } =
    academicManagementApi.useGetAllAcademicFacultyQuery(params)

  const tableData = facultyData?.data?.map(({ _id, name, createdAt }) => ({
    key: _id,
    name,
    date: new Date(createdAt).toLocaleDateString(),
    time: new Date(createdAt).toLocaleTimeString()
  }))

  const columns: TableColumnsType<TAcademicFacultyTableData> = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name'
    },
    {
      key: 'date',
      title: 'Date',
      dataIndex: 'date',
      sorter: true
    },
    {
      key: 'time',
      title: 'Time',
      dataIndex: 'time'
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

  const onChange: TableProps<TAcademicFacultyTableData>['onChange'] = (
    _pagination,
    _filters,
    sorter,
    _extra
  ) => {
    const sortOrder = Array.isArray(sorter) ? sorter[0]?.order : sorter?.order

    if (sortOrder === 'ascend') {
      setParams({ name: 'sort', value: 'createdAt' })
    } else if (sortOrder === 'descend') {
      setParams({ name: 'sort', value: '-createdAt' })
    }
  }

  return (
    <div>
      <h1 style={{ marginBottom: '1rem' }}>Academic Semesters</h1>
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

export default AcademicFaculty
