import AcademicDepartment from '../pages/admin/AcademicManagement/AcademicDepartment'
import AcademicFaculty from '../pages/admin/AcademicManagement/AcademicFaculty'
import AcademicSemester from '../pages/admin/AcademicManagement/AcademicSemester'
import CreateAcademicDepartment from '../pages/admin/AcademicManagement/CreateAcademicDepartment'
import CreateAcademicFaculty from '../pages/admin/AcademicManagement/CreateAcademicFaculty'
import CreateAcademicSemester from '../pages/admin/AcademicManagement/CreateAcademicSemester'
import AdminDashboard from '../pages/admin/AdminDashboard'
import Courses from '../pages/admin/courseManagement/Courses'
import CreateCourse from '../pages/admin/courseManagement/CreateCourse'
import OfferCourse from '../pages/admin/courseManagement/OfferCourse'
import OfferedCourses from '../pages/admin/courseManagement/OfferedCourses'
import RegisteredSemesters from '../pages/admin/courseManagement/RegisteredSemesters'
import SemesterRegistration from '../pages/admin/courseManagement/SemesterRegistration'
import CreateAdmin from '../pages/admin/userManagement/CreateAdmin'
import CreateFaculty from '../pages/admin/userManagement/CreateFaculty'
import CreateStudent from '../pages/admin/userManagement/CreateStudent'
import StudentDetails from '../pages/admin/userManagement/StudentDetails'
import StudentsData from '../pages/admin/userManagement/StudentsData'

export const adminPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <AdminDashboard />
  },
  {
    name: 'Academic Management',
    children: [
      {
        name: 'Create A. Semester',
        path: 'create-academic-semester',
        element: <CreateAcademicSemester />
      },
      {
        name: 'Academic Semester',
        path: 'academic-semester',
        element: <AcademicSemester />
      },
      {
        name: 'Create A. Faculty',
        path: 'create-academic-faculty',
        element: <CreateAcademicFaculty />
      },
      {
        name: 'Academic Faculty',
        path: 'academic-faculty',
        element: <AcademicFaculty />
      },
      {
        name: 'Create A. Department',
        path: 'create-academic-department',
        element: <CreateAcademicDepartment />
      },
      {
        name: 'Academic Department',
        path: 'academic-department',
        element: <AcademicDepartment />
      }
    ]
  },
  {
    name: 'User Management',
    children: [
      {
        name: 'Create Student',
        path: 'create-student',
        element: <CreateStudent />
      },
      {
        name: 'Students',
        path: 'students-data',
        element: <StudentsData />
      },
      {
        path: 'student-details/:studentId',
        element: <StudentDetails />
      },
      {
        name: 'Create Faculty',
        path: 'create-faculty',
        element: <CreateFaculty />
      },
      {
        name: 'Create Admin',
        path: 'create-admin',
        element: <CreateAdmin />
      }
    ]
  },
  {
    name: 'Course Management',
    children: [
      {
        name: 'Semester Registration',
        path: 'semester-registration',
        element: <SemesterRegistration />
      },
      {
        name: 'Registered Semesters',
        path: 'registered-semesters',
        element: <RegisteredSemesters />
      },
      {
        name: 'Create Course',
        path: 'create-course',
        element: <CreateCourse />
      },
      {
        name: 'Courses',
        path: 'courses',
        element: <Courses />
      },
      {
        name: 'Offer Course',
        path: 'offer-course',
        element: <OfferCourse />
      },
      {
        name: 'Offered Courses',
        path: 'offered-courses',
        element: <OfferedCourses />
      }
    ]
  }
]
