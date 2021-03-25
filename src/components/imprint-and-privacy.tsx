import React, { FC } from 'react';
import styled from 'styled-components';

import Paragraph from './Paragraph';
import content from '../assets/content';

const StyledDiv = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  font-family: 'IBM Plex Sans';
  font-size: 0.8rem;
  opacity: 1;
  a {
    color: ${p => p.theme.colorTextDark};
    &:hover {
      opacity: 0.66;
    }
  }
`;
const StyledSpan = styled.span`
  opacity: 1;
  a {
    color: ${p => p.theme.colorTextDark};
    &:hover {
      opacity: 0.66;
    }
  }
`;

export const ImprintAndPrivacyCard: FC = () => (
  <Paragraph>
    <StyledSpan
      dangerouslySetInnerHTML={{
        __html: content.imprintAndPrivacy.description,
      }}
    />
  </Paragraph>
);

export const ImprintAndPrivacyContainer: FC = () => (
  <StyledDiv
    dangerouslySetInnerHTML={{
      __html: content.imprintAndPrivacy.description,
    }}
  ></StyledDiv>
);
