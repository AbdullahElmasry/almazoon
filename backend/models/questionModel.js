import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  response: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt) => {
      const date = new Date(createdAt);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }
  }
});

const Question = mongoose.model('Question', questionSchema);

export default Question;
