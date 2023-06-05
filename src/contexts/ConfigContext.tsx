import React, { createContext, useContext, useEffect, useState } from 'react'

interface Config {
  gridSize: number
}

const DEFAULT_CONFIG: Config = {
  gridSize: 50
}

const ConfigContext = createContext<{
  config: Config
  updateConfig: (newConfig: Config) => void
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
  const [Config, setConfig] = useState<Config>(DEFAULT_CONFIG)

  useEffect(() => {
    const storedConfig = localStorage.getItem('Config')
    if (storedConfig) {
      setConfig(JSON.parse(storedConfig))
    }
  }, [])

  const updateConfig = (newConfig: Config) => {
    const config = { ...Config, ...newConfig }
    localStorage.setItem('Config', JSON.stringify(config))
    setConfig(config)
  }

  return (
    <ConfigContext.Provider value={{ config: Config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  )
}
