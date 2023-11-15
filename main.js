const res = document.querySelector('.resoult')
const over = document.querySelector('.over')
const under = document.querySelector('.under')
const btn = document.querySelectorAll('.price button')
const brige = document.querySelector('.brige')
const overTotal = document.querySelector('.over p')
const underTotal = document.querySelector('.under p')
const log = document.querySelector('.log')
const log2 = document.querySelector('.log2')
const moneyShow = document.querySelector('.money')


btn.forEach(e => {
    e.onclick = () => {
        localStorage.setItem('priceBet', e.value)
    }
})


const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

let money = +moneyShow.textContent
moneyShow.innerHTML = VND.format(money)


let brArr = []
function play() {
    overTotal.innerHTML = 0
    underTotal.innerHTML = 0
    let time = 15
    if (brArr.length > 25) {
        brArr = []
    }

    // let money = +moneyShow.textContent
    let bet = 0
    localStorage.setItem("bet", bet)
    localStorage.setItem("totalBetOver", 0)
    localStorage.setItem("totalBetUnder", 0)
    let totalBet = 0
    function overBet() {
        const priceBet = +localStorage.getItem('priceBet')
        bet = 1
        localStorage.setItem("bet", bet)
        if (money - priceBet >= 0) {
            const totalBetOver = totalBet += priceBet
            overTotal.innerHTML = totalBetOver/1000
            localStorage.setItem("totalBetOver", totalBetOver)
            money -= priceBet
            moneyShow.innerHTML = VND.format(money)
        } else {
            log2.classList.add('active')
            setTimeout(() => {
                log2.classList.remove('active')
            }, 1500)
        }
    }

    function underBet() {
        const priceBet = +localStorage.getItem('priceBet')
        bet = 2
        if(money - priceBet >= 0){
            const totalBetUnder = totalBet += priceBet
        underTotal.innerHTML = totalBetUnder/1000
        localStorage.setItem("totalBetUnder", totalBetUnder)
        localStorage.setItem("bet", bet)
        money -= priceBet
        moneyShow.innerHTML = VND.format(money)
        }else{
            log2.classList.add('active')
            setTimeout(() => {
                log2.classList.remove('active')
            }, 1500)
        }
    }
    over.addEventListener("click", overBet)
    under.addEventListener("click", underBet)

    const runTime = setInterval(() => {
        --time
        res.innerHTML = time
        if (time == 0) {
            clearInterval(runTime)
            res.classList.add('active')
            const ranDice = setInterval(() => {
                const ranNum = Math.floor(Math.random() * 5)
                res.innerHTML = `<img src="./dice${ranNum + 1}.png">`
            }, 100)
            setTimeout(() => {
                res.classList.remove('active')
                const ranNum = Math.floor(Math.random() * 5)
                clearInterval(ranDice)
                res.innerHTML = `<img src="./dice${ranNum + 1}.png">`
                if (ranNum > 2) {
                    over.classList.add('active')
                    brArr.push("<i class='bx bx-circle'></i>")
                    const total = localStorage.getItem("totalBetOver")
                    money += +total * 1.99
                    moneyShow.innerHTML = VND.format(money)
                } else {
                    under.classList.add('active')
                    brArr.push("<i class='bx bxs-circle'></i>")
                    const total = localStorage.getItem("totalBetUnder")
                    money += +total * 1.99
                    moneyShow.innerHTML = VND.format(money)
                }
                brige.innerHTML = brArr.join('')
                setTimeout(() => {
                    over.classList.remove('active')
                    under.classList.remove('active')
                    play()
                }, 5000)
            }, 3000)
        }

        if (time < 1) {
            over.removeEventListener("click", overBet)
            under.removeEventListener("click", underBet)
        }
        const betSto = localStorage.getItem("bet")
        if (betSto == 1) {
            under.removeEventListener("click", underBet)
            over.onclick = () => {
                log.classList.remove('active')
            }
            under.onclick = () => {
                log.classList.add('active')
                setTimeout(() => {
                    log.classList.remove('active')
                }, 1500)
            }
        }
        if (betSto == 2) {
            over.removeEventListener("click", overBet)
            under.onclick = () => {
                log.classList.remove('active')
            }
            over.onclick = () => {
                log.classList.add('active')
                setTimeout(() => {
                    log.classList.remove('active')
                }, 1500)
            }
        }

        if (betSto == 0) {
            over.onclick = () => {
                log.classList.remove('active')
            }
            under.onclick = () => {
                log.classList.remove('active')
            }
        }
    }, 1000)
}


play()