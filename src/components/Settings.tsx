import { useEffect } from 'react'

import { useUserConfig } from '@/contexts/ConfigContext'

import Slider from './Slider'

interface SettingsProps {
  onClose: VoidFunction
}

export default function Settings({ onClose }: SettingsProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const form = new FormData(e.target as HTMLFormElement)
    const gridSize = form.get('gridSize')
      ? Number.parseInt(form.get('gridSize') as string)
      : userConfig.gridSize

    updateUserConfig({ gridSize })
    onClose()
  }

  const { userConfig, updateUserConfig } = useUserConfig()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div
      onClick={onClose}
      className='fixed inset-0 grid place-items-center bg-black/20 p-2 text-black backdrop-blur-sm'
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className='w-full rounded-lg bg-gradient-to-tr from-fuchsia-100/90 to-blue-100/90 p-4 text-center shadow-md lg:w-96'
      >
        <h2 className='mb-4 text-xl font-bold'>Settings</h2>
        <div className='mb-6 text-start'>
          <label htmlFor='grid-size'>Grid Size</label>
          <Slider id='grid-size' name='gridSize' value={userConfig.gridSize} />
        </div>
        <button
          type='button'
          onClick={onClose}
          className='mr-2 rounded-full bg-zinc-300 px-4 py-1'
        >
          Cancel
        </button>
        <button type='submit' className='rounded-full bg-fuchsia-300 px-4 py-1'>
          Save Changes
        </button>
      </form>
    </div>
  )
}
