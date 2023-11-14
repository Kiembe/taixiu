const res = document.querySelector('.resoult')
const over = document.querySelector('.over')
const under = document.querySelector('.under')




function play() {
    let time = 10
    const runTime = setInterval(() => {
        --time
        res.innerHTML = time
        if(time == 0){
            clearInterval(runTime)
            res.classList.add('active')
            const ranDice = setInterval(() => {
                const ranNum = Math.floor(Math.random() * 5)
                res.innerHTML = `<img src="./dice${ranNum+1}.png">`
            },100)
            setTimeout(() => {
                res.classList.remove('active')
                const ranNum = Math.floor(Math.random() * 5)
                clearInterval(ranDice)
                res.innerHTML = `<img src="./dice${ranNum+1}.png">`
                if(ranNum >= 2){
                    over.classList.add('active')
                }else{
                    under.classList.add('active')
                }
                setTimeout(() => {
                    over.classList.remove('active')
                    under.classList.remove('active')
                    play()
                },5000)
            },3000)
        }
    },1000)
}


play()