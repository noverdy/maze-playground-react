import * as Slider_ from '@radix-ui/react-slider'

interface SliderProps {
  id?: string
  name?: string
  value?: number
}

export default function Slider({ id, name, value }: SliderProps) {
  return (
    <Slider_.Root
      id={id}
      name={name}
      className='relative flex h-5 w-full touch-none select-none items-center'
      defaultValue={value ? [value] : [0]}
      min={20}
      max={100}
      step={1}
    >
      <Slider_.Track className='relative h-0.5 grow rounded-full bg-black/20'>
        <Slider_.Range className='absolute h-full rounded-full bg-fuchsia-500' />
      </Slider_.Track>
      <Slider_.Thumb
        className='block h-5 w-5 rounded-full border bg-white shadow-lg transition-colors hover:bg-fuchsia-200'
        aria-label='Volume'
      />
    </Slider_.Root>
  )
}
