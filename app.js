const express = require('express')
const port = 3000
const app = express()
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
// 告訴 Express 說要設定的 view engine 是 handlebars
app.set('view engine', 'handlebars')
//告訴express靜態檔案在哪裡
app.use(express.static('public'))



app.get('/', (req, res) => {
  const restaurants = restaurantList.results
  res.render('index', { restaurant: restaurants })
})

app.get('/restaurant/:restaurant_id', (req, res) => {
  const restaurants = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurants })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurant: restaurants })
})

app.listen(port, () => {

})