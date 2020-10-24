import { http } from './http';
import { getAccessToken } from './Auth';

export interface QuestionData {
  questionId: number;
  title: string;
  content: string;
  userName: string;
  created: Date;
  answers: AnswerData[];
}

export interface QuestionDataFromServer {
  questionId: number;
  title: string;
  content: string;
  userName: string;
  created: Date;
  answers: AnswerData[];
}

export interface AnswerData {
  answerId: number;
  content: string;
  userName: string;
  created: Date;
}

export const mapQuestionFromServer = (
  question: QuestionDataFromServer,
): QuestionData => ({
  ...question,
  created: new Date(question.created),
  answers: question.answers
    ? question.answers.map(answer => ({
        ...answer,
        created: new Date(answer.created),
      }))
    : [],
});

export const getUnansweredQuestions = async (): Promise<QuestionData[]> => {
  try {
    const result = await http<undefined, QuestionDataFromServer[]>({
      path: '/questions/unanswered',
    });
    if (result.parsedBody) {
      return result.parsedBody.map(mapQuestionFromServer);
    } else {
      return [];
    }
  } catch (ex) {
    return [];
  }
};

export const getQuestions = async (): Promise<QuestionData[] | null> => {
  try {
    const result = await http<undefined, QuestionDataFromServer[]>({
      path: `/questions?includeanswers=true`,
    });
    if (result.ok && result.parsedBody) {
      let questions: QuestionData[] = [];
      for (let i = 0; i < result.parsedBody.length; i++) {
        questions.push(mapQuestionFromServer(result.parsedBody[i]));
      }
      return questions;
    } else {
      return [];
    }
  } catch (ex) {
    return [];
  }
};

export const deleteQuestion = async (question: QuestionDataFromServer) => {
  try {
    const accessToken = await getAccessToken();
    const result = await http<'DELETE', null>({
      path: `/questions/${question.questionId}`,
      method: 'DELETE',
      accessToken,
    });
    if (result.ok) {
      return result.parsedBody;
    }
  } catch (ex) {
    console.log(ex);
  }
};

export const getQuestion = async (
  questionId: number,
): Promise<QuestionData | null> => {
  try {
    const result = await http<undefined, QuestionDataFromServer>({
      path: `/questions/${questionId}`,
    });
    if (result.ok && result.parsedBody) {
      return mapQuestionFromServer(result.parsedBody);
    } else {
      return null;
    }
  } catch (ex) {
    return null;
  }
};

export const searchQuestions = async (
  criteria: string,
): Promise<QuestionData[]> => {
  try {
    const result = await http<undefined, QuestionDataFromServer[]>({
      path: `/questions?search=${criteria}`,
    });
    if (result.ok && result.parsedBody) {
      return result.parsedBody.map(mapQuestionFromServer);
    } else {
      return [];
    }
  } catch (ex) {
    return [];
  }
};

export interface PostQuestionData {
  title: string;
  content: string;
  userName: string;
  created: Date;
}

export const postQuestion = async (
  question: PostQuestionData,
): Promise<QuestionData | undefined> => {
  const accessToken = await getAccessToken();
  try {
    const result = await http<PostQuestionData, QuestionDataFromServer>({
      path: '/questions',
      method: 'post',
      body: question,
      accessToken,
    });
    if (result.ok && result.parsedBody) {
      return mapQuestionFromServer(result.parsedBody);
    } else {
      return undefined;
    }
  } catch (ex) {
    return undefined;
  }
};

export interface PostAnswerData {
  questionId: number;
  content: string;
  userName: string;
  created: Date;
}

export const postAnswer = async (
  answer: PostAnswerData,
): Promise<AnswerData | undefined> => {
  const accessToken = await getAccessToken();
  try {
    const result = await http<PostAnswerData, AnswerData>({
      path: '/questions/answer',
      method: 'post',
      body: answer,
      accessToken,
    });
    if (result.ok) {
      return result.parsedBody;
    } else {
      return undefined;
    }
  } catch (ex) {
    return undefined;
  }
};
