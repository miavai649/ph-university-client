import { Button, Table, TableColumnsType, TableProps } from 'antd'
import { academicManagementApi } from '../../../redux/features/admin/academicManagement.api'
import { CSSProperties, useState } from 'react'
import { SyncLoader } from 'react-spinners'
import { TAcademicSemesterTableData, TQueryParams } from '../../../types'

export const spinnerContainer: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
}

const AcademicSemester = () => {
  // search params state
  const [params, setParams] = useState<TQueryParams[]>([])

  const {
    data: semesterData,
    isLoading,
    isFetching
  } = academicManagementApi.useGetAllAcademicSemesterQuery(params)

  const tableData = semesterData?.data?.map(
    ({ _id, name, year, startMonth, endMonth }) => ({
      key: _id,
      name,
      year,
      startMonth,
      endMonth
    })
  )

  const columns: TableColumnsType<TAcademicSemesterTableData> = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      filters: [
        {
          text: 'Autumn',
          value: 'Autumn'
        },
        {
          text: 'Summer',
          value: 'Summer'
        },
        {
          text: 'Fall',
          value: 'Fall'
        }
      ]
    },
    {
      key: 'year',

      title: 'Year',
      dataIndex: 'year',
      filters: [
        {
          text: '2023',
          value: '2023'
        },
        {
          text: '2024',
          value: '2024'
        },
        {
          text: '2025',
          value: '2025'
        }
      ]
    },
    {
      key: 'startMonth',
      title: 'Start Month',
      dataIndex: 'startMonth'
    },
    {
      key: 'endMonth',
      title: 'End Month',
      dataIndex: 'endMonth'
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

  const onChange: TableProps<TAcademicSemesterTableData>['onChange'] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra?.action === 'filter') {
      const queryParams: TQueryParams[] = []

      filters?.name?.forEach((item) =>
        queryParams.push({ name: 'name', value: item })
      )

      filters?.year?.forEach((item) =>
        queryParams.push({ name: 'year', value: item })
      )

      setParams(queryParams)
    }
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

export default AcademicSemester
