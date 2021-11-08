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
  // const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=11')
  const res = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
  // const res = await fetch('json.js');
  const data = await res.json()

  const container = document.querySelector('#posts')
  // console.log(data.Valute);

  const countries = [];
  const countriesItem = [];

  for (let valute in data.Valute) {
    if (data.Valute.hasOwnProperty(valute)) {
        countries.push(valute)
    }
  }

  // console.log(countries);
  // console.log(data.Valute[countries[0]]);


  for (let i = 0; i < countries.length; i++) {
    countriesItem.push(data.Valute[countries[i]]);
  }

  // console.log(countriesItem);

  // container.innerHTML = data.map(toCard).join('\n')
  container.innerHTML = countriesItem.map(toCard).join('\n')
  // container.innerHTML = countries.map(toCard).join('\n')

  // document.querySelector("header h2").innerHTML += data.Date;
  // document.querySelector("nav h1").innerHTML = data.Date;
}

function toCard(post) {
  return `
    <div class="card">
      <div class="card-title">
        ${post.CharCode}
      </div>
      <div class="card-body">
        ${post.Value}
      </div>
    </div>
  `
}
