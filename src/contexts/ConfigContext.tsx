import React, { createContext, useContext, useEffect, useState } from 'react'

import { SerializableSet } from '@/utils/SerializableSet'

interface Config {
  gridSize: number
  walls: SerializableSet<string>
  startPos: string
  endPos: string
}

interface ConfigInput {
  gridSize?: number
  walls?: SerializableSet<string>
  startPos?: string
  endPos?: string
}

const DEFAULT_CONFIG: Config = {
  gridSize: 50,
  walls: new SerializableSet<string>(),
  startPos: '',
  endPos: ''
}

const ConfigContext = createContext<{
  config: Config
  updateConfig: (newConfig: ConfigInput) => void
}>({
  config: DEFAULT_CONFIG,
  updateConfig: () => {
    console.warn('updateConfig function not yet implemented in ConfigContext')
  }
})

export function useConfig() {
  return useContext(ConfigContext)
}

export default function ConfigProvider({
  children
}: {
  children: React.ReactNode
}): React.ReactElement {
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG)

  useEffect(() => {
    const storedConfig = localStorage.getItem('config')
    if (storedConfig) {
      const config: Config = JSON.parse(storedConfig)
      config.walls = new SerializableSet(config.walls)
      setConfig(config)
    }
  }, [])

  const updateConfig = (newConfig: ConfigInput) => {
    const mergedConfig = { ...config, ...newConfig }
    localStorage.setItem('config', JSON.stringify(mergedConfig))
    setConfig(config)
  }

  return (
    <ConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  )
}
