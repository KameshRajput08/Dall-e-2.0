import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
export default Post;
