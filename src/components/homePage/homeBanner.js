import { useEffect, useRef } from 'react'

import { Banner, Video, Canvas, BannerTitle, Headline } from '../../styles/homeStyles'
import useWindowSize from '../../hooks/useWindowSize'
import { useGlobalStateContext } from '../../context/globalContext'

const HomeBanner = ({ onCursor }) => {
  let canvas = useRef(null)
  const size = useWindowSize()
  const { currentTheme } = useGlobalStateContext()
  console.log(`currentTheme`, currentTheme)

  useEffect(() => {
    let renderingElement = canvas.current;
    let drawingElement = renderingElement.cloneNode()

    let drawingCtx = drawingElement.getContext('2d')
    let renderingCtx = renderingElement.getContext('2d')

    let lastX
    let lastY

    let moving = false

    renderingCtx.globalCompositeOperation = 'source-over'
    renderingCtx.fillStyle = currentTheme === 'dark' ? '#000000' : '#ffffff'
    renderingCtx.fillRect(0, 0, size.width, size.height)

    function _mouseover(e) {
      moving = true
      lastX = e.pageX - renderingElement.offsetLeft
      lastY = e.pageY - renderingElement.offsetTop
    }

    function _mouseup(e) {
      moving = false
      lastX = e.pageX - renderingElement.offsetLeft
      lastY = e.pageY - renderingElement.offsetTop
    }

    function _mousemove(e) {
      if (moving) {
        drawingCtx.globalCompositeOperation = 'source-over'
        renderingCtx.globalCompositeOperation = 'destination-out'

        let currentX = e.pageX - renderingElement.offsetLeft
        let currentY = e.pageY - renderingElement.offsetTop

        drawingCtx.lineJoin = 'round'
        drawingCtx.moveTo(lastX, lastY)
        drawingCtx.lineTo(currentX, currentY)
        drawingCtx.closePath()
        drawingCtx.lineWidth = 100
        drawingCtx.stroke()
        lastX = currentX
        lastY = currentY
        renderingCtx.drawImage(drawingElement, 0, 0)
      }
    }

    renderingElement.addEventListener('mouseover', _mouseover)
    renderingElement.addEventListener('mouseup', _mouseup)
    renderingElement.addEventListener('mousemove', _mousemove)

    return () => {
      renderingElement.removeEventListener('mouseover', _mouseover)
      renderingElement.removeEventListener('mouseup', _mouseup)
      renderingElement.removeEventListener('mousemove', _mousemove)
    }

  }, [currentTheme])

  const parent = {
    initial: {
      y: 800
    },
    animate: {
      y: 0,
      transition: {
        staggerChildren: 0.3
      }
    }
  }
  const child = {
    initial: {
      y: 800
    },
    animate: {
      y: 0,
      transition: {
        duration: 1,
        ease: [.6, 0.05, -0.1, 0.9],
      }
    }
  }

  return (
    <Banner>
      <Video>
        <video
          height='100%'
          width='100%'
          loop
          autoPlay
          muted
          src='video/video.mp4'
        />
      </Video>
      <Canvas ref={canvas} height={size.height} width={size.width} onMouseEnter={() => onCursor('hovered')} onMouseLeave={() => onCursor()} />
      <BannerTitle variants={parent} initial='initial' animate='animate'>
        <Headline variants={child}>Dig</Headline>
        <Headline variants={child}>Deep</Headline>
      </BannerTitle>
    </Banner >
  )
}

export default HomeBanner
