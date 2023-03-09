import app from './app'

app.listen(app.get('port'), () => {
  console.log(`HTTP Server running at http://localhost:${app.get('port')}`)
})
