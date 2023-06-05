import { createContext, useContext, useEffect, useState } from 'react'

import { SerializableSet } from '@/utils/SerializableSet'

import { useConfig } from './ConfigContext'

const CanvasContext = createContext<{
  walls: SerializableSet<string>
  startPos: string | null
  endPos: string | null
  addWall: (coord: string) => void
  removeWall: (coord: string) => void
  clearAll: () => void
  setStartPos: React.Dispatch<React.SetStateAction<string>>
  setEndPos: React.Dispatch<React.SetStateAction<string>>
}>({
  walls: new SerializableSet(),
  startPos: null,
  endPos: null,
  addWall: () => {
    console.warn('addWall function not yet implemented in CanvasContext')
  },
  removeWall: () => {
    console.warn('removeWall function not yet implemented in CanvasContext')
  },
  clearAll: () => {
    console.warn('clearAll function not yet implemented in CanvasContext')
  },
  setStartPos: () => {
    console.warn('setStartPos function not yet implemented in CanvasContext')
  },
  setEndPos: () => {
    console.warn('setEndPos function not yet implemented in CanvasContext')
  }
})

export function useCanvas() {
  return useContext(CanvasContext)
}

export default function CanvasProvider({
  children
}: {
  children: React.ReactNode
}): React.ReactElement {
  const { config, updateConfig } = useConfig()

  const [startPos, setStartPos] = useState<string>('')
  const [endPos, setEndPos] = useState<string>('')
  const [walls, setWalls] = useState<SerializableSet<string>>(
    new SerializableSet()
  )

  function addWall(coord: string) {
    if (walls.has(coord)) return
    setWalls((curr) => new SerializableSet(curr.add(coord)))
  }

  function removeWall(coord: string) {
    if (!walls.has(coord)) return
    setWalls((curr) => {
      curr.delete(coord)
      return new SerializableSet(curr)
    })
  }

  function clearAll() {
    setWalls(new SerializableSet())
    setStartPos('')
    setEndPos('')
  }

  useEffect(() => {
    setWalls(config.walls)
    setStartPos(config.startPos)
    setEndPos(config.endPos)
  }, [config.walls, config.startPos, config.endPos])

  useEffect(() => {
    function autoSave() {
      updateConfig({ walls, startPos, endPos })
    }
    window.addEventListener('beforeunload', autoSave)
    return () => {
      window.removeEventListener('beforeunload', autoSave)
    }
  }, [updateConfig, walls, startPos, endPos])

  return (
    <CanvasContext.Provider
      value={{
        walls,
        startPos,
        endPos,
        addWall,
        removeWall,
        clearAll,
        setStartPos,
        setEndPos
      }}
    >
      {children}
    </CanvasContext.Provider>
  )
}
