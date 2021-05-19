export const audioService = {
    queryAudios
}
// const BASE_URL = (process.env.NODE_ENV === 'development') ? '/api/audio'
//     : '//localhost:3030/api/audio';
const audios = [
    { id: 1, type: 'Rhythm1', name: 'audio1', play: false, isWaiting: false },
    { id: 2, type: 'Timmer', name: 'audio2', play: false, isWaiting: false },
    { id: 3, type: 'Electric guitar', name: 'audio3', play: false, isWaiting: false },
    { id: 4, type: 'Guitar', name: 'audio4', play: false, isWaiting: false },
    { id: 5, type: 'Rhythm2', name: 'audio5', play: false, isWaiting: false },
    { id: 6, type: 'Drums', name: 'audio6', play: false, isWaiting: false },
    { id: 7, type: 'Maze Politics', name: 'audio7', play: false, isWaiting: false },
    { id: 8, type: 'Rhythm3', name: 'audio8', play: false, isWaiting: false },
    { id: 9, type: 'Silent Star', name: 'audio9', play: false, isWaiting: false }
]

function queryAudios() {
    return audios
}