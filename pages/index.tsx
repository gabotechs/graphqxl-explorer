import { ParsedUrlQuery } from 'querystring'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import CenteredColumn from '../@components/CenteredColumn'
import CenteredRow from '../@components/CenteredRow'
import CodeEditor from '../@components/CodeEditor'
import { useRouter } from 'next/router'
import GraphQXLLogo from '../@components/GraphQXLLogo'
import fromBase64 from '../@utils/base64'
import { compile } from './api/compileClient'

import '@uiw/react-textarea-code-editor/dist.css'

const TIMEOUT = 600

function getQuery (query: ParsedUrlQuery): string {
  const code = query.code
  if (code !== undefined) {
    try {
      return fromBase64(code as string)
    } catch (e) {
      console.error(e)
      return ''
    }
  } else {
    return ''
  }
}

function HomePage (): ReactElement {
  const timeout = useRef<NodeJS.Timeout|null>(null)
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const [code, setCode] = React.useState('')
  const [compiled, setCompiled] = React.useState('')

  useEffect(() => {
    setCode(getQuery(router.query))
  }, [router.query])

  useEffect(() => {
    if (timeout.current != null) {
      clearTimeout(timeout.current)
    }
    if (code === '') {
      setLoading(false)
      return
    }
    setLoading(true)
    const abortController = new AbortController()
    timeout.current = setTimeout(() => {
      void compile(code)
        .catch(err => err.toString())
        .then(setCompiled)
        .finally(() => setLoading(false))
    }, TIMEOUT)

    return () => abortController.abort()
  }, [code])

  return (
    <CenteredRow style={{ marginTop: 16 }}>
      <CenteredColumn>
        <GraphQXLLogo/>
        <CodeEditor
          value={code}
          onChange={value => setCode(value ?? '')}
        />
      </CenteredColumn>
      <CenteredColumn>
        <GraphQXLLogo hideX/>
        <CodeEditor
          loading={loading}
          value={compiled}
          options={{ readOnly: true }}
        />
      </CenteredColumn>
    </CenteredRow>
  )
}

export default HomePage
