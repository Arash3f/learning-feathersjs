import { Message } from "./interface";

export class MessageService {
    messages: Message[] = []

    // Call in localhost:3030/messages
    async find() {
        return this.messages
    }

    async create(data: Pick<Message, 'text'>) {
        const message: Message = {
            id: this.messages.length,
            text: data.text
        }

        this.messages.push(message)

        return message
    }
}

export type ServiceTypes = {
    messages: MessageService
}
