import exp from "constants"
import request from "supertest"
const { MongoClient } = require('mongodb')

import app from "../app"

describe("Test app.ts", () => {
    it('should return 500 & valid response if auth rejects with an error', done => {
        request(app).get("/").expect(404).end((err, res) => {
            if (err) return done(err)
            expect(res.body).toMatchObject({ error: { type: 'internal_server_error', message: 'Internal Server Error' } })
            done()
        })
    })

})

describe('database initialize', () => {
    let connection: any
    let db: any

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        db = await connection.db(process.env.MONGO_URI)
    })

    afterAll(async () => {
        await connection.close()
    })

    it('should insert docs into collection', async () => {
        const products = db.collection('product')

        const newProducts = [
            { title: 'product A', description: 'description of A', picture: '', price: 100, quantity: 10 },
            { title: 'product B', description: 'description of B', picture: '', price: 200, quantity: 54 },
            { title: 'product C', description: 'description of C', picture: '', price: 100, quantity: 42 },
            { title: 'product D', description: 'description of D', picture: '', price: 300, quantity: 843 },
            { title: 'product E', description: 'description of E', picture: '', price: 100, quantity: 342 }
        ]

        newProducts.map(async newProduct => {
            await products.insertOne(newProduct)
        })

        const insertedUser = await products.findOne({ title: 'product A' })
        expect(insertedUser).toEqual(newProducts[0])
    })
})


describe("Test API", () => {
    it('should return product array - /getall', () => {
        request(app).get("/getall").expect(200).end((err, res) => {
            console.log(res)
        })
    })

    it('should return product specified with title or description - /search ', async () => {
        const res = await request(app).get("/search?title=product%20A")
        expect(res.header['content-type']).toBe('text/html; charset=utf-8')
        expect(res.statusCode).toBe(200)
        expect(res.body).toContain({})
    })
    
    it('should return true when order exist product id and quantity - /order', async () => {
        const res = await request(app).post("/order?product_id=&&quantity=1")
        expect(res.header['content-type']).toBe('text/html; charset=utf-8')
        expect(res.statusCode).toBe(200)
        expect(res.body).toBe(true)
    })
});