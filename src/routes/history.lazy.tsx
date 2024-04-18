import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/history')({
  component: History,
})

function History() {
  return <div className="p-2">
    <h4 className='p-4'>History</h4>
  </div>
}