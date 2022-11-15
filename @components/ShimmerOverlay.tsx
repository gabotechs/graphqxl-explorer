import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react'

export interface ShimmerOverlayProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  loading: boolean
}

const Root = styled.div`
  position: relative;
`

const shimmering = keyframes`
  from {
    background-position: top right;
  }

  to {
    background-position: top left;
  }
`

const Shimmer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.2;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${shimmering};
  animation-timing-function: linear;
  background: #ddd;
  background: linear-gradient(to right, #F6F6F6 8%, #CCC 18%, #F6F6F6 33%);
  background-size: 3000px 100%;
`

export default function ShimmerOverlay ({
  loading,
  children,
  ...props
}: ShimmerOverlayProps): ReactElement {
  return (
    <Root {...props}>
      {children}
      {loading && <Shimmer/>}
    </Root>
  )
}
