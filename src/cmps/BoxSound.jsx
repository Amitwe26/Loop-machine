import React, { useEffect, useState } from 'react'
import useSound from 'use-sound'
import image from '../assets/image/btn_Repeat_One-2-512.png'

export function BoxSound({ info, isOn, updateAudio, src, endOfLoop }) {
    // const [looping, setLooping] = useState(true)
    const [volume, setVolume] = useState(0.5);
    const [Play, audioInfo] = useSound(src, {
        loop: [true, info.id],
        volume,
        duration: 8,
        onend: () => {
            console.log('Sound ended!');
            endOfLoop()
        },
    })

    useEffect(() => {
        if (info.play) {
            Play()
        }
    }, [info])

    useEffect(() => {
        if (!isOn) {
            audioInfo.stop()
        }
    }, [isOn])

    function playSquare(ev) {
        ev.stopPropagation();

        if ((info.isWaiting || info.play)) {
            audioInfo.stop()
            updateAudio('stop', info, audioInfo)
            return
        }
        updateAudio('waiting', info, audioInfo)
    }

    // function toggleLooping(ev) {
    //     ev.stopPropagation();
    //     setLooping(!looping)
    // }

    function handleChangeVolume(ev) {
        ev.stopPropagation()
        const volume = +(ev.target.value / 10)
        setVolume(volume)
    }

    return (
        <div className={`square ${(info.play) ? 'squareOn' : ''}${info.isWaiting ? 'wait' : ''}`} onClick={(ev) => playSquare(ev)}>
            <h2>{info.type}</h2>
            {/* <span className={`infinity ${!looping ? 'loopOff' : ''}`} onClick={(ev) => toggleLooping(ev)} title="Loop">
                <img className="image-loop" title='One-time' src={image} alt="loop-1" />
            </span> */}
            <input type="range" min="0" max="10" className="round" onChange={(ev) => handleChangeVolume(ev)} />
        </div>
    )
}
