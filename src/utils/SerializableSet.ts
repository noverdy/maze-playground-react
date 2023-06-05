export class SerializableSet<T> extends Set<T> {
  toJSON(): T[] {
    return Array.from(this)
  }

  static fromJSON<T>(values: T[]): SerializableSet<T> {
    const set = new SerializableSet<T>()
    for (const value of values) {
      set.add(value)
    }
    return set
  }
}
