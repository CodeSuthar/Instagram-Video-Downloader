const express = require('express')
const InstagramRouter = express.Router()
const { ndown } = require("nayan-media-downloader")

InstagramRouter.get('/', async(req ,res) => {
    try {
        const { url } = req.query;

        if (!url) {
            return res.status(400).json({ message: "URL is required" })
        }

        const ndownn = await ndown(url);
        
        const api = {
            developer: "CodeSuthar AKA Aditya Suthar",
            status: ndownn.status,
            data: ndownn.data
        }

        res.status(200).json(api)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = InstagramRouter;