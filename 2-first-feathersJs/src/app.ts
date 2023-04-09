import { feathers } from '@feathersjs/feathers'
import { MessageService, ServiceTypes } from './service'
import { koa, rest, bodyParser, errorHandler, serveStatic } from '@feathersjs/koa/lib'
import socketio from '@feathersjs/socketio'

/**
 * ! Use KoaJs for Rest 
 * ! Use socketio for WebSocket
 */

// register my services (jsut tell the feathurs JS that we have this services)
// const app = feathers<ServiceTypes>()
const app = koa<ServiceTypes>(feathers())

app.use(serveStatic('.'))
app.use(errorHandler())
app.use(bodyParser())
app.configure(rest())
app.configure(socketio())

// registe my services
app.use('messages', new MessageService())

// ! Websocket
app.on('connection', (connection) => app.channel('everybody').join(connection))
app.publish((_data) => app.channel('everybody')) 

app.listen(3030).then(() => console.log('Feathers server listening --> localhost:3030'))

// app.service('messages').create({
//     text: "Hello Arash :)"
// })