import { URL } from "../models/url.js";
import ShortUniqueId from "short-unique-id";
// Create a short id and save it in DB
async function handleCreateShortUrl(req, res) {
    const body = req.body;
    const shortID = new ShortUniqueId({ length: 8 });
    const uniqueShortId = shortID.rnd();
    if (!body.url)
        return res.status(400).json({ mesg: "URL required" });
    await URL.create({
        redirectUrl: body.url,
        shortId: uniqueShortId,
        visitHistory: [],
    });
    return res.status(201).json({ ShortUrl: uniqueShortId });
}
//Redirect to original url through short url
async function handleRedirectUrl(req, res) {
    const shortID = req.params.id;
    if (!shortID)
        return res.status(400).json({ Error: "Id is required" });
    const entry = await URL.findOneAndUpdate({ shortId: shortID }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            },
        },
    });
    if (!entry)
        return res.status(404).json({ mesg: "Entry Not FOund" });
    return res.status(200).redirect(entry.redirectUrl);
}
//Get number of clicks on url
async function handleGetAnalytics(req, res) {
    const shortID = req.params.id;
    if (!shortID)
        return res.status(400).json({ Error: "Id is required" });
    const entry = await URL.findOne({ shortId: shortID });
    if (!entry)
        return res.status(404).json({ mesg: "Entry Not FOund" });
    return res.status(200).json({ LinkClicks: entry.visitHistory.length });
}
export { handleCreateShortUrl, handleRedirectUrl, handleGetAnalytics };
