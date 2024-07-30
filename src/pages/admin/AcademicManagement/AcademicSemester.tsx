import { Table, TableColumnsType, TableProps } from 'antd'
import { academicManagementApi } from '../../../redux/features/admin/academicManagement'
import { TAcademicSemester } from '../../../types/academicManagement.type'
import { useState } from 'react'

export type TTableData = Pick<
  TAcademicSemester,
  'name' | '_id' | 'year' | 'startMonth' | 'endMonth'
>

const AcademicSemester = () => {
  // search params state
  const [params, setParams] = useState([])

  const { data: semesterData } =
    academicManagementApi.useGetAllAcademicSemesterQuery(params)

  const tableData = semesterData?.data?.map(
    ({ _id, name, year, startMonth, endMonth }) => ({
      key: _id,
      name,
      year,
      startMonth,
      endMonth
    })
  )

  const columns: TableColumnsType<TTableData> = [
    {
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
      title: 'Start Month',
      dataIndex: 'startMonth'
    },
    {
      title: 'End Month',
      dataIndex: 'endMonth'
    }
  ]

  const onChange: TableProps<TTableData>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    if (extra?.action === 'filter') {
      const queryParams = []

      filters?.name?.forEach((item) =>
        queryParams.push({ name: 'name', item: item })
      )

      filters?.year?.forEach((item) =>
        queryParams.push({ name: 'year', item: item })
      )

      setParams(queryParams)
    }
  }

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: 'sorter-icon' }}
    />
  )
}

export default AcademicSemester
