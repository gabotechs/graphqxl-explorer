import styled from '@emotion/styled'
import { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react'

export interface GraphQXLLogoProps extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  hideX?: boolean
}

const StyledSpan = styled.span`
  font-size: 30px;
  color: #e535ab;
`

export default function GraphQXLLogo ({
  hideX = false,
  ...props
}: GraphQXLLogoProps): ReactElement {
  return (
    <span {...props}>
      <StyledSpan>GraphQ</StyledSpan>
      {!hideX && <StyledSpan style={{ color: '#d2d2d2' }}>X</StyledSpan>}
      <StyledSpan>L</StyledSpan>
    </span>
  )
}
