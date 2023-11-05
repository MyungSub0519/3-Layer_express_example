import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

await mongoose.connect('mongodb://root:p%3B%26CGt%3CV%7B4HLA%3FR3%40YdF%5B%5D@localhost:27017', {
  dbName: process.env.MONGODB_NAME,
})

const { Schema } = mongoose

const BoardViewSchema = new Schema({
  boardCode: Number,
  viewTime: { type: Date, default: Date.now() },
  userIp: { type: String },
})

const BoardRecommendSchema = new Schema({
  userCode: Number,
  boardCode: Number,
  recommendTime: { type: Date, default: Date.now() },
  userIp: { type: String },
})

export const BoardViewLog = await mongoose.model('BoardViewLog', BoardViewSchema)

export const BoardRecommendLog = await mongoose.model('BoardRecommendLog', BoardRecommendSchema)
