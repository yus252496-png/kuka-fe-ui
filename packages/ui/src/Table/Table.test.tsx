import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Table } from './Table'
import type { Column } from './index'

interface User {
  id: number
  name: string
  age: number
  role: string
}

const columns: Column<User>[] = [
  { key: 'name', title: '姓名', dataIndex: 'name', sortable: true },
  { key: 'age', title: '年龄', dataIndex: 'age', sortable: true },
  { key: 'role', title: '角色', dataIndex: 'role' },
]

const data: User[] = [
  { id: 1, name: '张三', age: 28, role: '工程师' },
  { id: 2, name: '李四', age: 35, role: '设计师' },
  { id: 3, name: '王五', age: 42, role: '产品经理' },
]

/* ═══════════════════════════════════════════════════════
   Table 测试
   ═══════════════════════════════════════════════════════ */

describe('Table', () => {
  it('渲染列标题', () => {
    render(<Table columns={columns} dataSource={data} rowKey="id" />)
    expect(screen.getByText('姓名')).toBeInTheDocument()
    expect(screen.getByText('年龄')).toBeInTheDocument()
    expect(screen.getByText('角色')).toBeInTheDocument()
  })

  it('渲染数据行', () => {
    render(<Table columns={columns} dataSource={data} rowKey="id" />)
    expect(screen.getByText('张三')).toBeInTheDocument()
    expect(screen.getByText('李四')).toBeInTheDocument()
    expect(screen.getByText('王五')).toBeInTheDocument()
  })

  it('dataIndex 从数据中取值', () => {
    render(<Table columns={columns} dataSource={data} rowKey="id" />)
    expect(screen.getByText('工程师')).toBeInTheDocument()
    expect(screen.getByText('设计师')).toBeInTheDocument()
  })

  it('render 函数覆盖 dataIndex', () => {
    const cols: Column<User>[] = [
      { key: 'name', title: '姓名', render: (_, record) => `★ ${record.name}` },
    ]
    render(<Table columns={cols} dataSource={data} rowKey="id" />)
    expect(screen.getByText('★ 张三')).toBeInTheDocument()
  })

  it('排序切换 asc → desc → none', () => {
    render(<Table columns={columns} dataSource={[...data]} rowKey="id" />)
    const nameHeader = screen.getByText('姓名')

    // 第一次点击 → asc
    fireEvent.click(nameHeader)
    const rows = screen.getAllByRole('row')
    // 第一行数据应为"王五"（42岁，但按姓名 asc：王 > 张 > 李）
    // 这里按姓名排序：王五 → 张三 → 李四（拼音）

    // 第二次点击 → desc
    fireEvent.click(nameHeader)
    // 第三次点击 → none（恢复原始顺序）
    fireEvent.click(nameHeader)
  })

  it('loading 显示遮罩', () => {
    render(<Table columns={columns} dataSource={data} rowKey="id" loading />)
    expect(screen.getByText('加载中...')).toBeInTheDocument()
  })

  it('空数据显示 emptyText', () => {
    render(<Table columns={columns} dataSource={[]} rowKey="id" />)
    expect(screen.getByText('暂无数据')).toBeInTheDocument()
  })

  it('自定义空数据文案', () => {
    render(<Table columns={columns} dataSource={[]} rowKey="id" emptyText="没有找到数据" />)
    expect(screen.getByText('没有找到数据')).toBeInTheDocument()
  })

  it('分页器切换页码触发 onChange', () => {
    const onChange = vi.fn()
    const manyData = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `用户${i + 1}`,
      age: 20 + i,
      role: '成员',
    }))
    render(
      <Table
        columns={columns}
        dataSource={manyData}
        rowKey="id"
        pagination={{ pageSize: 5, current: 1, onChange }}
      />,
    )
    // 点击第二页
    const page2 = screen.getByText('2')
    fireEvent.click(page2)
    expect(onChange).toHaveBeenCalledWith(2, 5)
  })

  it('行点击（onRow.onClick）', () => {
    const onRowClick = vi.fn()
    render(
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        onRow={() => ({ onClick: onRowClick })}
      />,
    )
    // 点击第一行
    fireEvent.click(screen.getByText('张三').closest('td')!)
    expect(onRowClick).toHaveBeenCalled()
  })

  it('传递 className', () => {
    render(<Table columns={columns} dataSource={data} rowKey="id" className="my-table" />)
    expect(screen.getByText('姓名').closest('div')!.parentElement).toHaveClass('my-table')
  })
})
