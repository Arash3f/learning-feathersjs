import { feathers } from '@feathersjs/feathers'
import { Message } from './interface'
import { MessageService, ServiceTypes } from './service'


// register my services (jsut tell the feathurs JS that we have this services)
const app = feathers<ServiceTypes>()

// registe my services
app.use('messages', new MessageService())

// register watcher
app.service('messages').on('create', (message: Message) => {
    console.log("New message has been created", message);
})

// function for test project
const main = async () => {
    await app.service('messages').create({
        text: "Hello Arash :)"
    })

    await app.service('messages').create({
        text: "How are you ?"
    })

    const messages = await app.service('messages').find()

    console.log("All messages => ", messages);
    
}

main()