function isBrowser (): boolean {
  return typeof window !== 'undefined'
}

export default function fromBase64 (value: string): string {
  if (isBrowser()) {
    return atob(value)
  }

  const buff = Buffer.from(value, 'base64')
  return buff.toString()
}
