// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import childProcess from 'child_process'
import fs from 'fs/promises'
import path from 'path'
import { v4 as uuid } from 'uuid'

interface Data {
  name: string
}

const GRAPHQXL_BIN = path.join(process.cwd(), 'public', 'graphqxl')

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  const id = uuid()
  const input = path.join('/tmp', `${id}.graphqxl`)
  const output = path.join('/tmp', `${id}.graphql`)

  if (!('graphqxl' in req.body) || typeof req.body.graphqxl !== 'string') {
    res.status(400).end()
    return
  }

  await fs.writeFile(input, req.body.graphqxl)

  const spawned = await childProcess.spawn(
    GRAPHQXL_BIN,
    [input]
  )

  let stderr = ''
  spawned.stderr.on('data', data => {
    stderr += data.toString() as string
  })

  const response = await new Promise<string>((resolve, reject) => {
    spawned.on('error', reject)
    spawned.on('exit', () => resolve(stderr))
  })

  const result = await fs.readFile(output)
    .catch(() => response.replace(input, '').replace('/private', ''))

  res.status(200).write(result.toString())
  res.end()
}
