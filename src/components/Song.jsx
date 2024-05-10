import React from 'react'

const Song = ({song}) => {
    const totalSeg = Math.floor(song.duration_ms/1000)
    const mins = Math.floor(totalSeg/60)
    const seg = totalSeg - (mins * 60)
  return (
    <div>{song.track_number}.- {song.name} {`${mins}:${seg}`}</div>
  )
}

export default Song