import { useUserConfig } from '@/contexts/ConfigContext'

interface GridItemProps {
  active?: boolean
  key?: string
}

export default function GridItem({ key }: GridItemProps) {
  const { userConfig } = useUserConfig()
  return (
    <div
      key={key}
      className='cursor-crosshair border border-dashed border-white/10 hover:bg-white/10'
      style={{
        width: userConfig.gridSize,
        height: userConfig.gridSize
      }}
    />
  )
}
