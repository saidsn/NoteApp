export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (!val) {
    throw Error(`Excepted 'val' to be defined, but recieved ${val}`);
  }
}
