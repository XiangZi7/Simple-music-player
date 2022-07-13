export const musicdt = (songdt: any): any => {
    let min: any = parseInt(songdt / 1000 / 60)
    let sec: any = parseInt((songdt / 1000) % 60)
    if (min < 10) {
        min = '0' + min
    }
    if (sec < 10) {
        sec = '0' + sec
    }
    return min + ":" + sec;
}

