async function main() {
	
  handleStats()
  
}

async function handleStats() {

  const count = (await (await fetch("https://categorize.tekst.ai:5050/count")).json())?.message * 8 || 161921 * 8

	const statsSection = document.querySelector("#statsSection")
  const animation = new IntersectionObserver((entries, statsAnimation) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return
      }
      else {
        startAnimation(entry);
        
        animation.unobserve(entry.target);
      }
    })
  })

  function startAnimation(el) {
    const TIME = 3000

    runCount(document.querySelector("#statAccuracy"), 93, '%', 3000)
    runCount(document.querySelector("#statEfficiency"), 54, '%', 3000)
    runCount(document.querySelector("#statTicketsRouted"), count, '', 5000)

  }

  function runCount(el, to, suffix, time) {
    const l = (to / (time / 50))
    let numbers = []
    for (let i = 0; i < (time / 50); i++) {
      numbers.push(i * l)
    }
    console.log(numbers)
    let number = 0
    const interval = setInterval(() => {
      el.innerText = `${Math.trunc(numbers[number])}${suffix}`
      number += 1
      if (number + 1 == numbers.length) {
        clearInterval(interval)
      }
    }, 50)
  }

  animation.observe(statsSection)
}












window.onload = main