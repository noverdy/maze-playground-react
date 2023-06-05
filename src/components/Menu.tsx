import {
  faCar,
  faEraser,
  faFlagCheckered,
  faGear,
  faPen,
  faRocket,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { twMerge } from 'tailwind-merge'

import { useCanvas } from '@/contexts/CanvasContext'

interface MenuProps {
  menu: number
  onToggle: (i: number) => void
  onOpenSettings: VoidFunction
}

export default function Menu({ menu, onToggle, onOpenSettings }: MenuProps) {
  const { clearAll } = useCanvas()

  return (
    <section className='overflow-hidden rounded-lg bg-white/25 text-lg shadow-md lg:flex lg:justify-between'>
      <ul className='grid grid-cols-4 divide-x divide-white/10 border-b border-white/10 text-center lg:border-b-0'>
        <li
          className={twMerge(
            'cursor-pointer p-2 transition-colors hover:bg-white/25 lg:p-4',
            menu === 0 && 'bg-white/25'
          )}
          onClick={() => onToggle(0)}
        >
          <FontAwesomeIcon icon={faPen} />
          <span className='ml-3 hidden lg:inline'>Draw Wall</span>
        </li>
        <li
          className={twMerge(
            'cursor-pointer p-2 transition-colors hover:bg-white/25 lg:p-4',
            menu === 1 && 'bg-white/25'
          )}
          onClick={() => onToggle(1)}
        >
          <FontAwesomeIcon icon={faEraser} />
          <span className='ml-3 hidden lg:inline'>Remove Wall</span>
        </li>
        <li
          className={twMerge(
            'cursor-pointer p-2 transition-colors hover:bg-white/25 lg:p-4',
            menu === 2 && 'bg-white/25'
          )}
          onClick={() => onToggle(2)}
        >
          <FontAwesomeIcon icon={faCar} />
          <span className='ml-3 hidden lg:inline'>Place Start</span>
        </li>
        <li
          className={twMerge(
            'cursor-pointer p-2 transition-colors hover:bg-white/25 lg:p-4',
            menu === 3 && 'bg-white/25'
          )}
          onClick={() => onToggle(3)}
        >
          <FontAwesomeIcon icon={faFlagCheckered} />
          <span className='ml-3 hidden lg:inline'>Place Finish</span>
        </li>
      </ul>
      <ul className='flex justify-between'>
        <li className='cursor-pointer border-white/10 p-4 transition-colors hover:bg-white/25 lg:border-r'>
          <FontAwesomeIcon icon={faRocket} />
          <span className='ml-3'>Find Path!</span>
        </li>
        <div className='flex divide-x divide-white/10 lg:contents'>
          <li
            onClick={clearAll}
            className='cursor-pointer p-4 transition-colors hover:bg-white/25'
          >
            <FontAwesomeIcon icon={faTrash} />
            <span className='ml-3 hidden lg:inline'>Clear All</span>
          </li>
          <li
            className='cursor-pointer p-4 transition-colors hover:bg-white/25'
            onClick={onOpenSettings}
          >
            <FontAwesomeIcon icon={faGear} />
          </li>
        </div>
      </ul>
    </section>
  )
}
