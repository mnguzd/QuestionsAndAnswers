import { FC } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { QuestionData } from './QuestionsData';
import { Question } from './Question';
import 'bootstrap/dist/css/bootstrap.css';

interface Props {
  data: QuestionData[];
  renderItem?: (item: QuestionData) => JSX.Element;
}

export const QuestionList: FC<Props> = ({ data }) => {
  return (
    <ul
      css={css`
        list-style: none;
        margin-top: 10px;
      `}
    >
      {data.map(question => (
        <li
          key={question.questionId}
          css={css`
            margin-bottom: 10px;
          `}
        >
          <Question data={question} />
        </li>
      ))}
    </ul>
  );
};
