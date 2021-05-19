import { useEffect, useState } from 'react';
import { BoxSound } from '../cmps/BoxSound';
import { audioService } from '../services/audioService';
import audio1 from '../sound/1.mp3'
import audio2 from '../sound/2.mp3'
import audio3 from '../sound/bass.mp3'
import audio4 from '../sound/electricguitar.mp3'
import audio5 from '../sound/5.mp3'
import audio6 from '../sound/GrooveB_120bpm_Tanggu.mp3'
import audio7 from '../sound/MazePolitics_120_Perc.mp3'
import audio8 from '../sound/PAS3GROOVE1.03B.mp3'
import audio9 from '../sound/SilentStar_120_Em_OrganSynth.mp3'

export function Home() {
    const [isOn, setIsOn] = useState(false)
    const [audios, setAudios] = useState([])
    const [toggleLoop, setToggleLoop] = useState(false)
    let soundPaths = [audio1, audio2, audio3, audio4, audio5, audio6, audio7, audio8, audio9]

    useEffect(() => {
        setAudios(audioService.queryAudios())
    }, [])

    useEffect(() => {
        if (isOn) {
            const newAudios = audios?.map(audio =>
                audio.isWaiting && !audio.play
                    ? { ...audio, isWaiting: false, play: true }
                    : audio
            );
            setAudios(newAudios)
        }
    }, [toggleLoop, isOn])




    function onPlay() {
        if (!isOn) {
            const readyToPlay = audios.some(audio => audio.isWaiting)
            if (!readyToPlay) return
        }
        setIsOn(!isOn)
        if (isOn) {
            setIsOn(false)
            const newAudios = audios.map(audio => ({ ...audio, isWaiting: false, play: false }))
            setAudios(newAudios)
        }
    }
    useEffect(() => {
        if (isOn) {
            const noPlaying = audios.every(audio => audio.play === false)
            if (noPlaying) setIsOn(false)

        }
    }, [audios])

    function newToggle() {
        setToggleLoop(!toggleLoop)
    }

    function updateAudio(key, info) {
        if (key === 'waiting') {
            const newAudios = audios.map(audio =>
                audio.id === info.id
                    ? { ...audio, isWaiting: true }
                    : audio
            );
            setAudios(newAudios)
        } else if (key === 'stop') {
            let newAudios = audios.map(audio =>
                audio.id === info.id
                    ? { ...audio, isWaiting: false, play: false }
                    : audio
            );
            newAudios = newAudios.map(audio =>
                audio.isWaiting
                    ? { ...audio, isWaiting: false, play: true }
                    : audio
            );
            setAudios(newAudios)

        }

    }


    return (
        <div className="page">
            <h1>Loop Machine </h1>
            <div className="btn-box">
                <button onClick={() => onPlay()} className={`button ${isOn ? 'stop' : ''} `}></button>
            </div>
            <div className="container">
                {audios.map((audio, idx) => {
                    return (
                        <BoxSound
                            key={audio.id}
                            info={audio}
                            src={soundPaths[idx]}
                            isOn={isOn}
                            updateAudio={updateAudio}
                            endOfLoop={newToggle}
                        />
                    )
                })}

            </div>
        </div>

    )
}