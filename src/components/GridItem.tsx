import { faCar, faFlagCheckered } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { twMerge } from 'tailwind-merge'

interface GridItemProps {
  active: boolean
  start: boolean
  end: boolean
  onAction?: () => void
}

export default function GridItem({
  active,
  start,
  end,
  onAction
}: GridItemProps) {
  return (
    <span
      draggable={false}
      className={twMerge(
        'relative grow cursor-crosshair border border-dashed border-white/10 hover:bg-white/10',
        active && 'animate-scale-in bg-white/40 hover:bg-white/30'
      )}
      onClick={onAction}
      onMouseDown={(e) => {
        e.preventDefault()
        onAction?.()
      }}
      onTouchStart={onAction}
      onMouseEnter={(e) => {
        if (e.buttons === 1) {
          onAction?.()
        }
      }}
    >
      {start && (
        <FontAwesomeIcon
          icon={faCar}
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-200'
        />
      )}
      {end && (
        <FontAwesomeIcon
          icon={faFlagCheckered}
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-300'
        />
      )}
    </span>
  )
}
