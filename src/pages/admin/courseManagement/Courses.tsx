import { Button, Modal, Table } from 'antd'
import { CSSProperties, useState } from 'react'
import { SyncLoader } from 'react-spinners'
import { TCourse } from '../../../types'
import { courseManagementApi } from '../../../redux/features/admin/courseManagement.api'

export const spinnerContainer: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
}

export type TTableData = Pick<TCourse, 'title' | 'prefix' | 'code'>

const Courses = () => {
  const {
    data: coursesData,
    isLoading,
    isFetching
  } = courseManagementApi.useGetAllCoursesQuery(undefined)

  const tableData = coursesData?.data?.map(({ _id, title, prefix, code }) => ({
    key: _id,
    title,
    code: `${prefix}${code}`
  }))

  const columns = [
    {
      key: 'title',
      title: 'Title',
      dataIndex: 'title'
    },
    {
      key: 'code',
      title: 'Code',
      dataIndex: 'code'
    },
    {
      key: '*',
      title: 'Action',
      render: () => {
        return (
          <div>
            <Button>Assign Faculty</Button>
          </div>
        )
      },
      width: '1%'
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
      <h1 style={{ marginBottom: '1rem' }}>Courses</h1>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        showSorterTooltip={{ target: 'sorter-icon' }}
      />
    </div>
  )
}

const AddFacultyModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Button type='primary' onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title='Basic Modal'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
}

export default Courses
