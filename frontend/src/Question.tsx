import { FC } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { QuestionData } from './QuestionsData';
import { gray2, gray3, StyledLink } from './Styles';
import 'bootstrap/dist/css/bootstrap.css';

interface Props {
  data: QuestionData;
  showContent?: boolean;
}

export const Question: FC<Props> = ({ data, showContent = true }) => (
  <div className="card">
    <StyledLink
      css={css`
        text-decoration: none;
        color: ${gray3};
      `}
      to={`questions/${data.questionId}`}
    >
      <div
        className="card-header"
        css={css`
          color: ${gray2};
          font-weight: bold;
          font-size: 15px;
        `}
      >
        {data.title}
      </div>
      <div
        className="card-body"
        css={css`
          margin-top: -10px;
          margin-bottom: -10px;
        `}
      >
        <p className="card-text" color={gray2}>
          {showContent && data.content}
        </p>
        <footer className="blockquote-footer">
          {data.userName}
          {data.answers.length > 0 && data.answers[0].content !== null && (
            <span className="badge badge-success ml-2">
              {data.answers.length}
              {data.answers.length === 1 ? ' answer' : ' answers'}
            </span>
          )}
        </footer>
      </div>
    </StyledLink>
  </div>
);
