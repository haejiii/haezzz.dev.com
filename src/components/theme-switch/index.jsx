import { useState } from 'react'
import Lottie from 'lottie-react'

import themeToggle from './theme-toggle.json'

const LOTTIE_STATUS = {
  PLAY: 'play',
  STOP: 'stop',
}

const ThemeSwitch = () => {
  const lottieRef = useRef(null)
  const [lottieStatus, setLottieStatus] = useState(LOTTIE_STATUS.PLAY)

  const handleLottieClick = () => {
    if (lottieStatus === LOTTIE_STATUS.PLAY) {
      lottieRef.current.playSegments([0, 20])
      setLottieStatus(LOTTIE_STATUS.STOP)
      return
    }

    lottieRef.current.playSegments([20, 0])
    setLottieStatus(LOTTIE_STATUS.PLAY)
  }

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={themeToggle}
      autoplay={false}
      loop={false}
      onClick={handleLottieClick}
      initialSegment={[0, 20]}
    />
  )
}

export default ThemeSwitch
