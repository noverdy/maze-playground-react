import { useEffect, useRef, useState } from 'react'

import { useUserConfig } from '@/contexts/ConfigContext'
import debounce from '@/utils/debounce'

import GridItem from './GridItem'

export default function Canvas() {
  const { userConfig } = useUserConfig()
  const ref = useRef<HTMLElement | null>(null)

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const columnCount = Math.ceil(width / userConfig.gridSize)
  const rowCount = Math.ceil(height / userConfig.gridSize)

  useEffect(() => {
    const handleResize = () => {
      setWidth(ref.current?.offsetWidth || 0)
      setHeight(ref.current?.offsetHeight || 0)
    }

    const handleResizeDebounced = debounce(handleResize)

    handleResize()

    window.addEventListener('resize', handleResizeDebounced)
    return () => {
      window.removeEventListener('resize', handleResizeDebounced)
    }
  }, [])

  return (
    <section
      ref={ref}
      className='grow overflow-hidden rounded-lg bg-white/25 text-lg shadow-md'
    >
      {[...Array(rowCount).keys()].map((i) => (
        <div key={i} className='flex' style={{ height: userConfig.gridSize }}>
          {[...Array(columnCount).keys()].map((j) => (
            <GridItem key={generateKey(i, j)} />
          ))}
        </div>
      ))}
    </section>
  )
}

function generateKey(width: number, height: number): string {
  return `${width}-${height}`
}
