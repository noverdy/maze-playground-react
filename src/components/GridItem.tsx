import { useUserConfig } from '@/contexts/ConfigContext'

export default function GridItem() {
  const { userConfig } = useUserConfig()
  return (
    <div
      className='cursor-crosshair border border-dashed border-white/10 hover:bg-white/10'
      style={{
        width: userConfig.gridSize,
        height: userConfig.gridSize
      }}
    />
  )
}
