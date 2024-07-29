import { Table, TableColumnsType, TableProps } from 'antd'
import { academicManagementApi } from '../../../redux/features/admin/academicManagement'

interface DataType {
  key: React.Key
  name: string
  age: number
  address: string
}

const AcademicSemester = () => {
  const { data: semesterData } =
    academicManagementApi.useGetAllAcademicSemesterQuery(undefined)

  const tableData = semesterData?.data?.map(
    ({ _id, name, year, startMonth, endMonth }) => ({
      _id,
      name,
      year,
      startMonth,
      endMonth
    })
  )
  console.log(tableData)

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: [
        {
          text: 'Joe',
          value: 'Joe'
        },
        {
          text: 'Jim',
          value: 'Jim'
        },
        {
          text: 'Submenu',
          value: 'Submenu',
          children: [
            {
              text: 'Green',
              value: 'Green'
            },
            {
              text: 'Black',
              value: 'Black'
            }
          ]
        }
      ]
    },
    {
      title: 'Year',
      dataIndex: 'year'
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

  const onChange: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log('params', pagination, filters, sorter, extra)
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
