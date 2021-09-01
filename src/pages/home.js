import HomeAbout from "../components/homePage/homeAbout"
import HomeBanner from "../components/homePage/homeBanner"
import HomeContent from "../components/homePage/homeContent"
import HomeFeatured from "../components/homePage/homeFeatured"

const Home = ({ onCursor }) => {
  return (
    <>
      <HomeBanner onCursor={onCursor} />
      <HomeContent />
      <HomeFeatured onCursor={onCursor} />
      <HomeAbout onCursor={onCursor} />
    </>
  )
}

export default Home
