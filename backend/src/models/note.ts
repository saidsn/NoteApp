import mongoose, { Schema } from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    text: { type: String },
  },
  { timestamps: true }
);

type Note = mongoose.InferSchemaType<typeof noteSchema>;

export default mongoose.model<Note>("Note", noteSchema);
