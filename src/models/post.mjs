import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  descricao: {
    type: String,
    unique: false,
  },
});


postSchema.statics.findByTitle = async function(title) {
  let post = await this.findOne({
    title: title,
  });

  if (!post) {
    post = await this.findOne({ title: title });
  }

  return post;
};

const Post = mongoose.model('Post', postSchema);

export default Post;
