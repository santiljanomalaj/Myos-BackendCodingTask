const Product = require('../models/Product')
const Order = require('../models/Order')

module.exports = {
    search: async (req: any, res: any, next: any) => {
        const { title, description } = req.query
        if (title)
            return res.send(await Product.find({ title: title }))
        else
            return res.send(await Product.find({ description }))
    },
    sort: async (req: any, res: any, next: any) => {
        const products = await Product.find({}, {
            sort: { price: 1 }
        })
        return res.send(products)
    },
    getAll: async (req: any, res: any, next: any) => {
        const products = await Product.find()
        return res.send(products)
    },
    add: async (req: any, res: any, next: any) => {
        const ret = await Product.collection.insert(req.query, (err: any, docs: any) => {
            err ? console.error(err) : console.log(docs)
        })
        return res.send(ret)
    },
    order: async (req: any, res: any, next: any) => {
        const ret = await Order.collection.insert(req.query, (err: any, docs: any) => {
            err ? console.error(err) : console.log(docs)
        })
        return res.send(ret)
    }
}