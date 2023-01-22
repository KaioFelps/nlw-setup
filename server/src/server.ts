import Fastify from "fastify"
import cors from "@fastify/cors"
import { prisma } from "./lib/prisma"
import { appRoutes } from "./routes"

const app = Fastify()

app.register(cors)
app.register(appRoutes)

app.listen({
    port: 3333,
    host: "0.0.0.0",
}).then(() => {
    console.log("HTTP Server is current running on \x1b[36mhttp://localhost:3333\x1b[0m ")
})