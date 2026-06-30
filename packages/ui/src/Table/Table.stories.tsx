import type { Meta, StoryObj } from '@storybook/react'
import { Table } from './Table'
import type { Column } from './index'

interface User {
  id: number
  name: string
  age: number
  role: string
  status: string
}

const columns: Column<User>[] = [
  { key: 'name', title: '姓名', dataIndex: 'name', sortable: true, width: 120 },
  { key: 'age', title: '年龄', dataIndex: 'age', sortable: true, width: 80, align: 'right' },
  { key: 'role', title: '角色', dataIndex: 'role', width: 120 },
  { key: 'status', title: '状态', dataIndex: 'status', width: 100 },
]

const data: User[] = [
  { id: 1, name: '张伟', age: 28, role: '电气工程师', status: '在线' },
  { id: 2, name: '李娜', age: 35, role: '机械设计师', status: '离线' },
  { id: 3, name: '王强', age: 42, role: '产品经理', status: '在线' },
  { id: 4, name: '赵敏', age: 31, role: '前端工程师', status: '在线' },
  { id: 5, name: '陈龙', age: 26, role: '嵌入式工程师', status: '维护中' },
  { id: 6, name: '孙丽', age: 38, role: '测试工程师', status: '在线' },
]

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    emptyText: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Table<User>>

export const Basic: Story = {
  args: {
    columns,
    dataSource: data.slice(0, 3),
    rowKey: 'id',
  },
}

export const WithData: Story = {
  args: {
    columns,
    dataSource: data,
    rowKey: 'id',
  },
}

export const WithSorting: Story = {
  args: {
    columns,
    dataSource: data,
    rowKey: 'id',
  },
  play: async ({ canvasElement }) => {
    const ageHeader = canvasElement.querySelector('th:nth-child(2)') as HTMLElement
    ageHeader?.click()
  },
}

export const Loading: Story = {
  args: {
    columns,
    dataSource: [],
    rowKey: 'id',
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    columns,
    dataSource: [],
    rowKey: 'id',
    emptyText: '暂无数据',
  },
}

export const WithPagination: Story = {
  args: {
    columns,
    dataSource: Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `用户${i + 1}`,
      age: 20 + (i % 30),
      role: ['电气工程师', '机械设计师', '产品经理', '前端工程师', '测试工程师'][i % 5],
      status: ['在线', '离线', '维护中'][i % 3],
    })),
    rowKey: 'id',
    pagination: { pageSize: 5 },
  },
}

export const SortableAge: Story = {
  args: {
    columns: [
      { key: 'name', title: '姓名', dataIndex: 'name' },
      { key: 'age', title: '年龄', dataIndex: 'age', sortable: true },
      { key: 'role', title: '角色', dataIndex: 'role' },
    ],
    dataSource: data,
    rowKey: 'id',
  },
}
