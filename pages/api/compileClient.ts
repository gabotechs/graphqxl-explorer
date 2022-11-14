export interface CompileOptions {
  abortSignal?: AbortSignal
}

export async function compile (code: string, options: CompileOptions = {}): Promise<string> {
  return fetch('/api/compile', {
    method: 'POST',
    signal: options.abortSignal,
    body: JSON.stringify({ graphqxl: code }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(async (res) => res.text())
}
