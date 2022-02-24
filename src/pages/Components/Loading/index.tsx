import fanyLoading from 'assets/Image/Lotties/fany-loading.json'
import React from 'react'
import Lottie from 'react-lottie'

// eslint-disable-next-line react/prop-types
const Loading = ({ width = 70, height = 70 }) => {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: fanyLoading,
      }}
      width={width}
      height={height}
    />
  )
}

export default Loading
