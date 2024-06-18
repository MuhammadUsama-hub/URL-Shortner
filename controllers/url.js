import { URL } from "../models/url.js";
import ShortUniqueId from "short-unique-id";
// Create a short id and save it in DB
async function handleCreateShortUrl(req, res) {
    console.log(req.body.user);
    const userInfo = req.body.user;
    const { body } = req.body;
    const shortID = new ShortUniqueId({ length: 8 });
    const uniqueShortId = shortID.rnd();
    if (!body)
        return res.status(400).json({ mesg: "URL required" });
    await URL.create({
        redirectUrl: body,
        shortId: uniqueShortId,
        visitHistory: [],
        createdBy: userInfo._id,
    });
    console.log(body);
    const getAllUrls = await URL.find({ createdBy: userInfo._id });
    console.log(`body: ${body}`);
    return res
        .status(201)
        .render("home", { personName: userInfo.name, allUrls: getAllUrls });
}
//Redirect to original url through short url
async function handleRedirectUrl(req, res) {
    const userInfo = req.body.user;
    if (!userInfo)
        return res.redirect("login");
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
    return res.status(200).redirect(`https://${entry.redirectUrl}`);
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
//ReRender home page on refresh
async function handleRenderAllUrls(req, res) {
    const userInfo = req.body.user;
    const getAllUrls = await URL.find({ createdBy: userInfo._id });
    return res
        .status(200)
        .render("home", { personName: userInfo.name, allUrls: getAllUrls });
}
// Delelete a single Row
async function handleDeleteLink(req, res) {
    const userInfo = req.body.user;
    if (!userInfo)
        return res.redirect("login");
    await URL.findOneAndDelete({
        createdBy: userInfo._id,
        shortId: req.params.id,
    });
    const getAllUrls = await URL.find({ createdBy: userInfo._id });
    return res
        .status(200)
        .render("home", { personName: userInfo.name, allUrls: getAllUrls });
}
export { handleCreateShortUrl, handleRedirectUrl, handleGetAnalytics, handleRenderAllUrls, handleDeleteLink, };
