import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import cors from "@fastify/cors";

const app = Fastify();
const prisma = new PrismaClient();

app.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
});

app.get("/", async (request, reply) => {
    const habits = await prisma.habits.findMany();
  return habits
});

const start = async () => {
    try {
        await app.listen({ port: 3333 }).then(() => {
            console.log(`Server listening on port ${3333}`)
        })
    } catch (err) {
        app.log.error(err)
    }
}
start()