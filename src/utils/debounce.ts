export default function debounce(func: () => void): (event: Event) => void {
  let timer: number

  return function (event): void {
    if (timer) clearTimeout(timer)
    timer = setTimeout(func, 100, event)
  }
}
