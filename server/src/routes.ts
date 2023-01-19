import { FastifyInstance } from 'fastify'
import {prisma} from './lib/prisma'

export async function appRoutes( app: FastifyInstance ) {
    app.post('/habits', async () => {
        //title and weekdays
    })
}

