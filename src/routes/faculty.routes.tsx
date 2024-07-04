import FacultyDashboard from '../pages/faculty/FacultyDashboard'
import OfferedCourse from '../pages/faculty/OfferedCourse'

export const facultyPaths = [
  {
    name: 'Offered Course',
    path: 'offered-course',
    element: <OfferedCourse />
  },
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <FacultyDashboard />
  }
]
