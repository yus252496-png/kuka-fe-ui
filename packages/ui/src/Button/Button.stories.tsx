import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import type { ButtonProps } from './Button'

/* ═══════════════════════════════════════════════════════
   Button Stories
   ═══════════════════════════════════════════════════════ */

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    block: { control: 'boolean' },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

/* ── Default ── */

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
}

/* ── All Variants ── */

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
}

/* ── All Sizes ── */

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

/* ── Disabled ── */

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
}

/* ── Loading ── */

export const Loading: Story = {
  args: {
    children: 'Loading...',
    loading: true,
  },
}

/* ── With Icon ── */

const SampleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export const WithIcon: Story = {
  render: (args: ButtonProps) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button {...args} icon={<SampleIcon />}>With Icon</Button>
      <Button {...args} variant="secondary" icon={<SampleIcon />}>Secondary</Button>
      <Button {...args} variant="outline" icon={<SampleIcon />}>Outline</Button>
    </div>
  ),
  args: {
    children: 'With Icon',
  },
}
