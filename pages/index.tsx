import { ParsedUrlQuery } from 'querystring'
import React, { ReactElement, useEffect, useRef } from 'react'
import CenteredColumn from './@components/CenteredColumn'
import CenteredRow from './@components/CenteredRow'
import CodeEditor from './@components/CodeEditor'
import GraphQXLLogo from './@assets/graphqxl-name.svg'
import GraphQLLogo from './@assets/graphql-name.svg'
import CoveredImage from './@components/CoveredImage'
import { useRouter } from 'next/router'
import fromBase64 from './@utils/base64'
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

  const [code, setCode] = React.useState('')
  const [compiled, setCompiled] = React.useState('')

  useEffect(() => {
    setCode(getQuery(router.query))
  }, [router.query])

  useEffect(() => {
    if (timeout.current != null) {
      clearTimeout(timeout.current)
    }

    const abortController = new AbortController()
    timeout.current = setTimeout(() => {
      void compile(code)
        .catch(err => err.toString())
        .then(setCompiled)
    }, TIMEOUT)

    return () => abortController.abort()
  }, [code])

  return (
    <CenteredRow style={{ marginTop: 16 }}>
      <CenteredColumn>
        <CoveredImage
          src={GraphQXLLogo}
          size={[250, 100]}
        />
        <CodeEditor
          value={code}
          placeholder="Please enter GraphQXL code."
          onChange={setCode}
        />
      </CenteredColumn>
      <CenteredColumn>
        <CoveredImage
          src={GraphQLLogo}
          size={[250, 100]}
        />
        <CodeEditor
          value={compiled}
          placeholder="This is the compiled GraphQL"
          disabled={true}
        />
      </CenteredColumn>
    </CenteredRow>
  )
}

export default HomePage
