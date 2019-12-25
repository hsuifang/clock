// 內容好的時候就執行init
document.addEventListener("DOMContentLoaded", () => { init() })

// onload 時執行它
function init () {
  // Set CustomFullTime
  Date.prototype.getCustomFullTime = function () {
    let hour = this.getHours() < 10 ? `0${this.getHours()}` : this.getHours()
    let minute = this.getMinutes() < 10 ? `0${this.getMinutes()}` : this.getMinutes()
    let second = this.getSeconds() < 10 ? `0${this.getSeconds()}` : this.getSeconds()
    return `${hour}:${minute}:${second}`
  }
  // Set init Variable
  let startBtn = document.querySelector('#startMoving')
  let stopBtn = document.querySelector('#stopMoving')
  let startClock = ''
  let clockFace = document.querySelector('.clock__face')
  let html = ''
  // Setting clockface
  for (let i = 1; i <= 72; i++) {
    if (i % 6 == 0) {
      html+= `<div class="clock__line clock__line--point-${i / 6}"></div>`
    } else {
      html+= `<div class="clock__dot clock__dot--point-${i}"></div>`
    }
  }
  clockFace.innerHTML = html
  // 觸發暫停按鈕
  stopBtn.addEventListener('click', function clearMoving () {
    startBtn.removeAttribute('disabled')
    stopBtn.setAttribute('disabled', true)
    clearInterval(startClock)
  })
  // 觸發開始按鈕
  startBtn.addEventListener('click', function fireClock() {
    startBtn.setAttribute('disabled', true)
    stopBtn.removeAttribute('disabled')
    startClock = setInterval(clockMoving, 1000)
  })
}

// 時鐘指針運行邏輯
function clockMoving () {
  let time = document.querySelector('h2')
  let hourHandRotate = new Date().getHours() * 30 + new Date().getMinutes() / 60 * 30
  let minuteHandRotate = new Date().getMinutes() * 6
  let secondHandRotate = new Date().getSeconds() * 6

  // Get time and setting into clock and body
  time.innerHTML = new Date().getCustomFullTime()
  // clock hand
  document.querySelector('.clock__hour-hand').style.transform = `rotate(${hourHandRotate}deg) translateX(-50%)`
  document.querySelector('.clock__minute-hand').style.transform = `rotate(${minuteHandRotate}deg) translateX(-50%)`
  document.querySelector('.clock__second-hand').style.transform = `rotate(${secondHandRotate + 180}deg) translateX(-50%)`
}
