import React, { createContext, useContext, useEffect, useState } from 'react'

interface UserConfig {
  gridSize: number
}

const DEFAULT_CONFIG: UserConfig = {
  gridSize: 30
}

const UserConfigContext = createContext<{
  userConfig: UserConfig
  updateUserConfig: (newConfig: UserConfig) => void
}>({
  userConfig: DEFAULT_CONFIG,
  updateUserConfig: () => {
    console.warn(
      'updateUserConfig function not yet implemented in UserConfigContext'
    )
  }
})

export function useUserConfig() {
  return useContext(UserConfigContext)
}

export default function UserConfigProvider({
  children
}: {
  children: React.ReactNode
}): React.ReactElement {
  const [userConfig, setUserConfig] = useState<UserConfig>(DEFAULT_CONFIG)

  useEffect(() => {
    const storedConfig = localStorage.getItem('userConfig')
    if (storedConfig) {
      setUserConfig(JSON.parse(storedConfig))
    }
  }, [])

  const updateUserConfig = (newConfig: UserConfig) => {
    const config = { ...userConfig, ...newConfig }
    localStorage.setItem('userConfig', JSON.stringify(config))
    setUserConfig(config)
  }

  return (
    <UserConfigContext.Provider value={{ userConfig, updateUserConfig }}>
      {children}
    </UserConfigContext.Provider>
  )
}
