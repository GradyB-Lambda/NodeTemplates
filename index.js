const express = require('express')
const shortId = require('shortid')

const server = express()
const PORT = 1234;

let channels = []
let lessons = []

server.use(express.json())

server.get('/', ( req, res ) => {
    res.status(200).json({ message:'Server up Amigo' })
})

server.get('/api/greeting', ( req, res ) => {
    res.status(200).json( { message: 'bon jour Dude'})
})

server.post('/api/channels', ( req, res ) => {
    const channelInfo = req.body
    channelInfo.id = shortId.generate()
    channels.push(channelInfo)
    res.status(201).json(channelInfo)
})

server.get('/api/channels', ( req, res ) => {
    res.status(200).json(channels)
})

server.get('/api/lessons', ( req, res ) => {
    res.status(200).json(lessons)
})

server.post('/api/lessons', ( req, res ) => {
    const lessonInfo = req.body
    lessonInfo.id = shortId.generate()
    lessons.push(lessonInfo)
    res.status(201).json(lessonInfo)
})

//using a url param
server.delete('/api/channels/:id', (req, res)=> {
    const {id} = req.params

    const deleted = channels.find(channel => channel.id === id)
    if (deleted) {
        channels = channels.filter(channel => channel.id != id)
        res.status(200).json(deleted)
    }else {
        res.status(404).json({message: 'id not found'})
    }
})

server.listen(PORT, () => {
    console.log(`\n*** Server running on http://localhost:${PORT}`)
})