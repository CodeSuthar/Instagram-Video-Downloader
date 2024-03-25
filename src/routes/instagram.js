const express = require('express')
const InstagramRouter = express.Router()
const { ndown } = require("nayan-media-downloader")

InstagramRouter.get('/', async(req ,res) => {
    try {
        const { url } = req.query;

        if (!url) {
            return res.status(400).json({ message: "URL is required" })
        }

        const data = await ndown(url);

        res.status(200).json(data) 
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = InstagramRouter;