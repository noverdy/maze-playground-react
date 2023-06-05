import { createContext, useContext, useState } from 'react'

const CanvasContext = createContext<{
  walls: Set<string>
  startPos: string | null
  endPos: string | null
  addWall: (coord: string) => void
  removeWall: (coord: string) => void
  clearAll: () => void
  setStartPos: React.Dispatch<React.SetStateAction<string>>
  setEndPos: React.Dispatch<React.SetStateAction<string>>
}>({
  walls: new Set(),
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
  const [startPos, setStartPos] = useState<string>('')
  const [endPos, setEndPos] = useState<string>('')
  const [walls, setWalls] = useState<Set<string>>(new Set())

  function addWall(coord: string) {
    setWalls((curr) => new Set(curr.add(coord)))
  }

  function removeWall(coord: string) {
    setWalls((curr) => {
      curr.delete(coord)
      return new Set(curr)
    })
  }

  function clearAll() {
    setWalls(new Set())
    setStartPos('')
    setEndPos('')
  }

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
