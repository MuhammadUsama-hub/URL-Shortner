//creating URL schema
import mongoose from "mongoose";
const urlSchema = new mongoose.Schema({
    redirectUrl: {
        type: String,
        required: true,
    },
    shortId: {
        type: String,
        unique: true,
        required: true,
    },
    visitHistory: [
        {
            timestamp: { type: Number },
        },
    ],
});
const URL = mongoose.model("url", urlSchema);
export { URL };
