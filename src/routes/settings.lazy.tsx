import { createLazyFileRoute } from '@tanstack/react-router'
import Icon from '@mdi/react';
import { mdiThemeLightDark } from '@mdi/js';
import { useEffect, useState } from 'react';


const Settings = () => {
  const [mode, setMode] = useState<'light' | 'dark'>(document.body.classList.contains('dark') ? 'dark' : 'light')
  useEffect(() => {
    if (mode === 'dark') {
      document.body.classList.add('dark')
      document.getElementsByName('theme-color')[0].setAttribute('content', '#141316')
    } else {
      document.body.classList.remove('dark')
      document.getElementsByName('theme-color')[0].setAttribute('content', '#ffffff')
    }
  }, [mode])
  return (
    <div className='p-2'>
      <h4 className='p-4'>
        Settings
      </h4>
      <div className="row">
        <Icon className='pr-3' path={mdiThemeLightDark} size={2} />
        <div className="max">Dark Theme</div>
        <a>
          <label className="switch icon">
            <input onChange={() => {
              if (mode === 'dark') {
                document.body.classList.remove('dark')
                setMode('light')
              } else {
                document.body.classList.add('dark')
                setMode('dark')
              }
            }} checked={mode === 'dark'} type="checkbox" />
            <span>
              <i>dark_mode</i>
            </span>
          </label>
        </a>
      </div>
    </div>
  )
}

export const Route = createLazyFileRoute('/settings')({
  component: Settings,
})