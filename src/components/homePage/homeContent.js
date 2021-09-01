// Scroll behaviour
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useAnimation } from 'framer-motion'

import { Container } from '../../styles/globalStyles'
import { HomeContentSection, Content } from '../../styles/homeStyles'

const HomeContent = () => {
  const animation = useAnimation()
  const [contentRef, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-300px"
  })

  useEffect(() => {
    if (inView) {
      animation.start('visible')
    }
  }, [animation, inView])

  return (
    <HomeContentSection
      ref={contentRef}
      animate={animation}
      initial='hidden'
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: .6, ease: [.6, .05, -.01, .9] }
        },
        hidden: {
          opacity: 0,
          y: 72
        }
      }}
    >
      <Container>
        <Content>
          Great stories don’t just happen — <br />
          they need to be uncovered. And we dig <br />
          deep to discover the great stories that<br />
          lie just below the surface. Dirt under<br />
          our fingernails and all
        </Content>
      </Container>
    </HomeContentSection>
  )
}

export default HomeContent
