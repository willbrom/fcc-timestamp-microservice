require("dotenv").config()

const express = require("express")
const cors = require("cors")
const fs = require("fs")

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.static(__dirname + "/public"))
app.use((req, res, next) => {
	let log = `${req.method} ${req.path} ${req.ip}\n` 
	fs.writeFile("logs", log, (err) => {
		if (err) console.log(err)
	})
	next()
})

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html")
})

app.get("/api/:date", (req, res) => {
	let dateParam = req.params.date
	let dateInt = +dateParam

	let dateUTC = new Date(dateInt || dateParam).toUTCString() 
	let dateMilli = dateInt || Date.parse(dateParam)

	res.json({
		unix: dateMilli,
		utc: dateUTC
	})
})

app.listen(port, () => {
	console.log(`listening at port ${port}`)
})
