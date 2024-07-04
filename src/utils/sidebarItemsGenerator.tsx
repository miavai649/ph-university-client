import { NavLink } from 'react-router-dom'
import { TPaths, TSidebarItem } from '../types'

export const sidebarItemsGenerator = (items: TPaths[], role: string) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>
      })
    }
    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name,
          label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
        }))
      })
    }
    console.log(acc)
    return acc
  }, [])
  return sidebarItems
}
