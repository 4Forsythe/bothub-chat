import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import styled from 'styled-components';

const StyledMarkdown = styled.div`
  max-width: inherit;

  & > *:not(:last-child),
  * > *:not(:last-child) {
    margin-bottom: 10px;
  }

  h1,
  h2,
  h3 {
    margin: 1em 0 0.5em;
  }

  code {
    padding: 2px 4px;
    border-radius: 4px;
    background-color: rgba(var(--muted-color), 0.1);
  }

  pre {
    padding: 10px;
    border-radius: 6px;
    background-color: rgba(var(--muted-color), 0.1);
    overflow-x: auto;
  }

  ul,
  ol {
    padding-left: 1.5em;
  }

  blockquote {
    padding-left: 1em;
    font-style: italic;
    border-left: 4px solid rgba(var(--muted-color), 0.2);
    color: rgba(var(--muted-color), 0.8);
  }
`;

interface Props {
  children: string;
}

export const MessageMarkdown: React.FC<Props> = ({ children }) => {
  return (
    <StyledMarkdown>
      <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{children}</ReactMarkdown>
    </StyledMarkdown>
  );
};
