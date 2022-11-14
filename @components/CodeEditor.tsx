import { css } from '@emotion/css'
import { TextareaCodeEditorProps } from '@uiw/react-textarea-code-editor'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

const TextAreaCodeEditor = dynamic(
  async () => import('@uiw/react-textarea-code-editor').then((mod) => mod.default),
  { ssr: false }
)

export interface CodeEditorProps extends Omit<TextareaCodeEditorProps, 'onChange'> {
  onChange?: (code: string) => any
}

const style = css`
  width: 450px;
  margin: 16px;
  min-height: 700px;
  font-size: 20px;
  line-height: 1.5;
  font-family: ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace;
`

export default function CodeEditor ({
  onChange,
  padding = 16,
  language = 'graphql',
  children,
  ...props
}: CodeEditorProps): ReactElement {
  return (
    <TextAreaCodeEditor
      className={style}
      onChange={(evt) => (onChange != null) && onChange(evt.target.value)}
      padding={padding}
      language={language}
      {...props}
    />
  )
}
