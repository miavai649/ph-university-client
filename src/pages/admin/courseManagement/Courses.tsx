import { Button, Modal, Table } from 'antd'
import { CSSProperties, useState } from 'react'
import { SyncLoader } from 'react-spinners'
import { TCourse, TResponse } from '../../../types'
import { courseManagementApi } from '../../../redux/features/admin/courseManagement.api'
import PHForm from '../../../components/form/PHForm'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { userManagementApi } from '../../../redux/features/admin/userManagement.api'
import PHSelect from '../../../components/form/PHSelect'
import { toast } from 'sonner'

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
      render: (item: any) => {
        return <AddFacultyModal facultyInfo={item} />
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

const AddFacultyModal = ({ facultyInfo }: any) => {
  const { data: facultyData } =
    userManagementApi.useGetAllFacultyQuery(undefined)

  const [addFaculties] = courseManagementApi.useAddFacultiesMutation()

  const facultyOptions = facultyData?.data?.map((item) => ({
    value: item._id,
    label: item?.fullName
  }))

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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Adding...')

    const facultyData = {
      courseId: facultyInfo.key,
      data
    }

    try {
      const res = (await addFaculties(facultyData)) as TResponse<any>

      if (res?.error) {
        toast.error(res.error.data.message, { id: toastId })
      } else {
        toast.success('Faculties added successfully', { id: toastId })
      }
    } catch (error) {
      toast.error('Something went wrong', { id: toastId })
    }

    handleOk()
  }

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title='Basic Modal'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            name='faculties'
            label='Faculties'
            options={facultyOptions}
            mode='multiple'
          />
          <Button
            style={{ background: '#001529', color: 'white' }}
            htmlType='submit'>
            Submit
          </Button>
        </PHForm>
      </Modal>
    </>
  )
}

export default Courses
