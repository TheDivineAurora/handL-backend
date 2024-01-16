const HANDLE_STATE = require("../enums/handleState.enums");
const mongoose = require("mongoose");

const HandleSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    originalVideo: {
        title: {
            type: String
        },
        description: {
            type: String
        },
        thumbnail: {
            type: String
        },
        videoUrl: {
            type: String,
            required: [true, "video-url is required"],
        },
    },
    editedVideo: {
        title: {
            type: String,
            required: [true, "title is required"],
        },
        description: {
            type: String,
            required: [true, "description is required"],
        },
        thumbnail: {
            type: String,
            required: [true, "thumbnail is required"],
        },
        videoUrl: {
            type: String,
            required: [true, "video-url is required"],
        },

        status: {
            type: String,
            enums: HANDLE_STATE
        },
        uploader: {
            type: mongoose.Schema.ObjectId,
            ref: 'user'
        },
        editor: {
            type: mongoose.Schema.ObjectId,
            ref: 'user'
        }
    }
})