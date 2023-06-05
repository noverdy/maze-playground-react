import { useState } from 'react'

import Canvas from '@/components/Canvas'
import Menu from '@/components/Menu'
import Settings from '@/components/Settings'

export default function App() {
  const [activeMenu, setActiveMenu] = useState(0)
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <main className='fixed inset-0 flex flex-col gap-4 bg-gradient-to-tr from-fuchsia-800 to-indigo-800 p-4 text-white'>
      <Canvas menu={activeMenu} />

      <Menu
        menu={activeMenu}
        onToggle={(i) => setActiveMenu(i)}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      {settingsOpen && <Settings onClose={() => setSettingsOpen(false)} />}
    </main>
  )
}
