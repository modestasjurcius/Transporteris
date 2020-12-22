export const types = [
    {
        value: 1,
        label: 'About application'
    },
    {
        value: 2,
        label: 'Renting information'
    },
    {
        value: 3,
        label: 'Transport information'
    },
    {
        value: 4,
        label: 'Other'
    }
];

let lastQuestionId = 4;
let questions = [
    {
        id: 0,
        userId: 1,
        type: 1,
        question: 'How can I verify my account?',
        answer: 'Your account is verified by the administrator',
    },
    {
        id: 1,
        userId: 2,
        type: 2,
        question: 'How can I rent a specific car?',
        answer: null,
    },
    {
        id: 2,
        userId: 1,
        type: 2,
        question: 'How can I register?',
        answer: null,
    },
    {
        id: 3,
        userId: 1,
        type: 3,
        question: 'How can I search for vehicles?',
        answer: null,
    },
    {
        id: 4,
        userId: 2,
        type: 2,
        question: 'Can I rent a motorbike?',
        answer: null,
    }
];

export function addQuestion(question) {
    lastQuestionId += 1;
    question.id = lastQuestionId;
    question.answer = null;
    questions.push(question);

    return true;
}

export function getUnansweredQuestions() {
    return questions.filter(q => !q.answer);
}

export function getQuestionById(id) {
    return questions.find(q => q.id === id);
}

export function answerQuestionById(id, answer) {
    const qId = questions.findIndex(q => q.id === id);
    questions[qId].answer = answer;
    return true;
}

export function getTypeByValue(value) {
    return types.find(t => t.value === value);
}

export function getQuestionsByUserId(userId) {
    return questions.filter(q => q.userId === userId);
}