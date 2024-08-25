export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export const days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']

export const gender = ['Male', 'Female', 'Other']

export const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export const monthOptions = monthNames.map((item) => ({
  value: item,
  label: item
}))

export const genderOptions = gender.map((item) => ({
  value: item,
  label: item
}))

export const daysOptions = days.map((item) => ({
  value: item,
  label: item
}))

export const bloodGroupOptions = bloodGroups.map((item) => ({
  value: item,
  label: item
}))
