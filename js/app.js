window.addEventListener('load', async () => {
  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.register('sw.js')
      console.log('Service worker register success')
    } catch (e) {
      console.log('Service worker register fail')
    }
  }
  await loadPosts()
})

async function loadPosts(e) {
  // const res = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
  const res = await fetch('json.js');
  const data = await res.json()

  const container = document.querySelector('#posts')

  const countries = [];
  const countriesItem = [];

  for (let valute in data.Valute) {
    if (data.Valute.hasOwnProperty(valute)) {
        countries.push(valute)
    }
  }

  for (let i = 0; i < countries.length; i++) {
    countriesItem.push(data.Valute[countries[i]]);
  }

  container.innerHTML = countriesItem.map(toCard).join('\n')
  document.querySelector("header h2").innerHTML += data.Date;
}

function toCard(post) {
  return `
    <div class="card">
      <img src="countryImg/${post.CharCode}.gif" alt="фото страны">
      <div class="container-title-body">
        <div class="card-title">
          ${post.CharCode}
        </div>
        <div class="card-body">
          ${post.Value}
        </div>
      </div>
    </div>
  `
}
