// Define schemas for Questions and Attempts (for quiz data)
const attemptSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    questionId: { type: String, required: true },
    answer: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
    attemptedAt: { type: Date, default: Date.now }
});

const Attempt = mongoose.model('Attempt', attemptSchema);

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true }
});

const Question = mongoose.model('Question', questionSchema);

// Define schema for quiz results
const resultSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    submittedQuestions: { type: Number, default: 0 },
    errorCount: {
        Relevance: { type: Number, default: 0 },
        NameAccuracy: { type: Number, default: 0 },
        AddressAccuracy: { type: Number, default: 0 },
        PinAccuracy: { type: Number, default: 0 }
    },
    wrongAnswers: [{ type: String }],
    updatedAt: { type: Date, default: Date.now }
});

const Result = mongoose.model('Result', resultSchema);
