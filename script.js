const RANFOM_QUOTE_API_URL = "http://api.quotable.io/random"
const quoteElement = document.getElementById('quoteDisplay')
const quoteInputValue = document.getElementById('inputQuote')
const timerElement = document.getElementById('timer')

quoteInputValue.addEventListener('input',()=>{
    const arrayQuote = quoteElement.querySelectorAll('span')
    const arrayValue = quoteInputValue.value.split('')

    let correct = true
    arrayQuote.forEach((charachterSpan,index)=>{
        const charr = arrayValue[index]
        if(charr == null){
            charachterSpan.classList.remove('incorrect')
            charachterSpan.classList.remove('correct')
            correct = false
        }
        else if(charr === charachterSpan.innerText){
            charachterSpan.classList.add('correct')
            charachterSpan.classList.remove('incorrect')
        }
        else{
            charachterSpan.classList.add('incorrect')
            charachterSpan.classList.remove('correct')
            correct =false
        }  
    })
    if(correct){
        nextQuote()
    }
})


function getAPIdata(){
   return fetch(RANFOM_QUOTE_API_URL)
    .then(res=>res.json())
    .then(data=>data.content)
}

async function nextQuote(){
    const quoteData = await getAPIdata()
    quoteElement.innerHTML=""
    quoteData.split('').forEach(charachter=>{
        const charachterSpan = document.createElement('span')
        charachterSpan.innerText = charachter
        quoteElement.appendChild(charachterSpan)

    })
    quoteInputValue.value=null
    startTimer()
}
let startTime 
function startTimer(){
    timerElement.innerText = 0 
    startTime = new Date()
    setInterval(()=>{
        timerElement.innerText = getTimer()
    },1000)
}
function getTimer(){
    return Math.floor((new Date() - startTime)/1000)
}

nextQuote()