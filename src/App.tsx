import { useState } from 'react'

import Canvas from '@/components/Canvas'
import Menu from '@/components/Menu'

export default function App() {
  const [activeMenu, setActiveMenu] = useState(0)

  return (
    <main className='flex h-screen flex-col gap-4 bg-gradient-to-tr from-fuchsia-800 to-indigo-800 p-4 text-white'>
      <Canvas />
      <Menu menu={activeMenu} onChange={(i) => setActiveMenu(i)} />
    </main>
  )
}
