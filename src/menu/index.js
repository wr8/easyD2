import { uniqueId } from 'lodash'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

export const menuHeader = supplementPath([
  { path: '/index', title: '首页', icon: 'home' },
  { path: '/Department', title: '部门管理', icon: 'home'}
])

export const menuAside = supplementPath([
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '客户管理',
    icon: 'folder-o',
    children: [
      { path: '/myCustom', title: '我的客户' },
      { path: '/myCustom', title: '客户列表' },
      { path: '/myCustom', title: '再分配客户'},
      { path: '/myCustom', title: '团队客户' },
    ]
  },
  {
    title: '财务管理',
    icon: 'folder-o',
    children: [
      { path: '/myCustom', title: '在审件管理' },
    ]
  },
  {
    title: '运营管理',
    icon: 'folder-o',
    children: [
      { path: '/myCustom', title: '来源管理' },
      { path: '/myCustom', title: '充值消耗' },
    ]
  },
])
