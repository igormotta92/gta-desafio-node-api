const express = require('express')
const PORT = 3000

const app = express()
app.use(express.json())

const times = []
const players = []

/**
 * TIME
 */

app.route('/times').post((req, res) => {
  const { body, params } = req

  const nextId = times[times.length - 1]?.id + 1 || 1;

  times.push({
    id: nextId,
    ...body
  })

  res.status(201).setHeader('Location', `http://localhost:3000/times/${nextId}`).send()
}).get((_, res) => {
  res.json(times)

})

// SEARCH / DELETE / PUT
app.route('/times/:id').get((req, res) => {
  const { params } = req

  //teste time
  const timeIdx = times.findIndex(time => time.id === +params.id_time)
  if (timeIdx < 0) {
    res.sendStatus(404)
    return;
  }

  res.json(time)

}).delete((req, res) => {
  const { params } = req

  const timeIndex = times.findIndex(time => time.id === +params.id)
  if (timeIndex < 0) {
    res.sendStatus(404)
    return;
  }

  times.splice(timeIndex, 1)
  res.send()

}).put((req, res) => {
  const { params, body } = req

  const timeIndex = times.findIndex(time => time.id === +params.id)
  if (timeIndex < 0) {
    res.sendStatus(404)
    return;
  }

  times[timeIndex] = {
    id: +params.id,
    ...body
  }

  res.send()
})

/**
 * JOGADOR
 */

// POST / GET
app.route('/times/:id_time/players').post((req, res) => {
  const { body, params } = req

  //teste time
  const timeIdx = times.findIndex(time => time.id === +params.id_time)
  if (timeIdx < 0) {
    res.sendStatus(404)
    return;
  }

  const nextId = players[players.length - 1]?.id + 1 || 1;
  const { id_time } = body;

  players.push({
    id: nextId,
    ...body
  })

  res.status(201).setHeader('Location', `http://localhost:3000/times/${id_time}/players/${nextId}`).send()

}).get((req, res) => {
  const { params } = req

  //testa time
  const time = times.findIndex(time => time.id === +params.id_time)
  if (time < 0) {
    res.sendStatus(404)
    return
  }

  res.json(players)
})

// SEARCH / DELETE / PUT
app.route('/times/:id_time/players/:id').get((req, res) => {
  const { params } = req

  //teste time
  const timeIdx = times.findIndex(time => time.id === +params.id_time)
  if (timeIdx < 0) {
    res.sendStatus(404)
    return;
  }

  //teste player
  const playerIndex = players.findIndex(player => player.id === +params.id)
  if (playerIndex < 0) {
    res.sendStatus(404)
    return;
  }

  const { name, nickname, lastname } = players[params.id]
  let fullname = [name, nickname, lastname].join(' ');

  res.json({ fullname })

}).delete((req, res) => {
  const { params } = req

  //teste time
  const timeIdx = times.findIndex(time => time.id === +params.id_time)
  if (timeIdx < 0) {
    res.sendStatus(404)
    return;
  }

  //teste player
  const playerIndex = players.findIndex(player => player.id === +params.id)
  if (playerIndex < 0) {
    res.sendStatus(404)
    return;
  }

  players.splice(playerIndex, 1)
  res.send()

}).put((req, res) => {
  const { params, body } = req

  //teste time
  const timeIdx = times.findIndex(time => time.id === +params.id_time)
  if (timeIdx < 0) {
    res.sendStatus(404)
    return;
  }

  //teste player
  const playerIndex = players.findIndex(player => player.id === +params.id)
  if (playerIndex < 0) {
    res.sendStatus(404)
    return;
  }

  players[playerIndex] = {
    id: +params.id,
    ...body
  }

  res.send()
})

/**
 * FINAL ROTAS
 */

app.listen(PORT, () => {
  console.log(`Servidor iniciou na porta ${PORT}`)
})
