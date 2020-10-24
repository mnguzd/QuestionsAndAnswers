import { useEffect, useState, FC } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { QuestionList } from './QuestionList';
import { getQuestions, QuestionData } from './QuestionsData';
import { Page } from './Page';
import { RouteComponentProps } from 'react-router-dom';
import { useAuth } from './Auth';

export const HomePage: FC<RouteComponentProps> = ({ history }) => {
  const [questions, setQuestions] = useState<QuestionData[] | null>(null);
  const [questionsLoading, setQuestionsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const doGetQuestions = async () => {
      const allQuestions = await getQuestions();
      if (!cancelled) {
        setQuestions(allQuestions);
        setQuestionsLoading(false);
      }
    };
    doGetQuestions();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleAskQuestionClick = () => {
    history.push('/ask');
  };

  const { isAuthenticated } = useAuth();

  return (
    <Page>
      <div className="row">
        {isAuthenticated ? (
          <div className="d-flex col-12 justify-content-center">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleAskQuestionClick}
            >
              Ask a question
            </button>
          </div>
        ) : (
          <div className="d-flex col-12 justify-content-center">
            <button type="button" className="btn btn-secondary" disabled>
              Log in to ask a question
            </button>
          </div>
        )}
      </div>
      {questionsLoading ? (
        <div
          className="d-flex justify-content-center"
          css={css`
            margin-top: 30px;
          `}
        >
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <QuestionList data={questions || []} />
      )}
    </Page>
  );
};
