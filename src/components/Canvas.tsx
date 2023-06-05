import { useCallback, useEffect, useRef, useState } from 'react'

import { useCanvas } from '@/contexts/CanvasContext'
import { useConfig } from '@/contexts/ConfigContext'
import debounce from '@/utils/debounce'
import coordsToString from '@/utils/gridKey'

import GridItem from './GridItem'

interface CanvasProps {
  menu: number
}

export default function Canvas({ menu }: CanvasProps) {
  const ref = useRef<HTMLElement | null>(null)

  const { config } = useConfig()
  const {
    walls,
    startPos,
    endPos,
    addWall,
    removeWall,
    setStartPos,
    setEndPos
  } = useCanvas()

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const columnCount = Math.ceil(width / config.gridSize)
  const rowCount = Math.ceil(height / config.gridSize)

  const handleAction = useCallback(
    (i: number, j: number) => {
      const coord = coordsToString(i, j)
      if (menu === 0) {
        addWall(coord)
      }
      if (menu === 1) {
        removeWall(coord)
      }
      if (menu === 2) {
        setStartPos(coord)
      }
      if (menu === 3) {
        setEndPos(coord)
      }
    },
    [menu, addWall, removeWall, setStartPos, setEndPos]
  )

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

  useEffect(() => {
    const canvas = ref.current

    function handleTouch(e: TouchEvent) {
      if (!canvas) {
        return
      }
      if (e.cancelable) {
        e.preventDefault()
      }

      const i = Math.round(
        (e.touches[0].clientY - canvas.offsetTop) / config.gridSize
      )
      const j = Math.round(
        (e.touches[0].clientX - canvas.offsetLeft) / config.gridSize
      )

      handleAction(i, j)
    }

    canvas?.addEventListener('touchmove', handleTouch)

    return () => {
      canvas?.removeEventListener('touchmove', handleTouch)
    }
  }, [ref, config.gridSize, handleAction])

  return (
    <section
      ref={ref}
      className='grow overflow-hidden rounded-lg bg-white/25 text-lg shadow-md'
    >
      {[...Array(rowCount).keys()].map((i) => (
        <div key={i} className='flex' style={{ height: config.gridSize }}>
          {[...Array(columnCount).keys()].map((j) => {
            return (
              <GridItem
                key={coordsToString(i, j)}
                active={walls.has(coordsToString(i, j))}
                start={coordsToString(i, j) === startPos}
                end={coordsToString(i, j) === endPos}
                onAction={() => handleAction(i, j)}
              />
            )
          })}
        </div>
      ))}
    </section>
  )
}
