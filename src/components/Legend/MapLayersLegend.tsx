import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { interpolateColor } from '../../utils/colorUtil';
import { useActions, useStoreState } from '../../state/unistore-hooks';
import CardDescription from '../Card/CardDescription';
import { workingColor } from '../map/colors';
import { createCSSGradient } from './createCSSGradient';
import { PumpsColorLegend } from './PumpsColorLegend';
import { RainColorLegend } from './RainColorLegend';
import { TreesColorLegend } from './TreesColorLegend';
import {
  FlexColumn,
  FlexColumnLast,
  FlexRow,
  FlexRowFit,
  FlexSpace,
} from './LegendFlexBoxes';
import { LegendDot, LegendRect, StrokedLegendDot } from './LegendRectsDots';
import { ItemLabel, legendLabels } from './LegendLabels';

export interface IsActiveProps {
  isActive?: boolean;
}

const StyledItemLabel = styled(ItemLabel)`
  width: auto;
  padding: 0;
`;

const LegendDiv = styled.div<IsActiveProps>`
  position: absolute;
  bottom: 36px;
  right: 12px;
  display: flex;
  flex-direction: column;
  z-index: 1;
  margin: 0 auto;
  font-size: 12px;
  box-shadow: ${p => p.theme.boxShadow};
  height: min-content;
  ${props => (props.isActive ? 'min-height: 230px;' : '')}
  padding: 12px;
  width: ${p => (p.isActive ? '210px' : '90px')};
  background: white;
`;

const StyledCardDescription = styled(CardDescription)`
  font-weight: bold;
  font-size: 0.8rem;
  opacity: 1;
`;

const StyledCardDescriptionSecond = styled(CardDescription)`
  margin-bottom: 5px;
  line-height: 130%;
  width: 100%;
`;

const LegendToggle = styled.span`
  cursor: pointer;
  height: fit-content;
  &:hover {
    opacity: 0.66;
  }
`;
const rainColors = legendLabels.map(item => interpolateColor(item.value));
const rainGradient = createCSSGradient(rainColors);

const MapLayerLegend: FC = () => {
  const { setVisibleMapLayer } = useActions();

  const visibleMapLayer = useStoreState('visibleMapLayer');

  const [legendExpanded, setLegendExpanded] = useState<boolean>(true);

  if (legendExpanded === false) {
    return (
      <LegendDiv>
        <FlexSpace>
          <FlexColumn>
            <StyledCardDescription onClick={() => setLegendExpanded(true)}>
              Legende
            </StyledCardDescription>
          </FlexColumn>
          <LegendToggle onClick={() => setLegendExpanded(true)}>+</LegendToggle>
        </FlexSpace>
      </LegendDiv>
    );
  }

  return (
    <LegendDiv isActive>
      <FlexSpace isActive>
        <FlexColumnLast>
          <StyledCardDescription onClick={() => setLegendExpanded(false)}>
            {visibleMapLayer === 'pumps'
              ? 'Öffentliche Pumpen'
              : 'Niederschlag'}
          </StyledCardDescription>
          {visibleMapLayer !== 'pumps' && (
            <StyledCardDescriptionSecond>
              der letzten 30 Tage (Liter)
            </StyledCardDescriptionSecond>
          )}
        </FlexColumnLast>
        <LegendToggle onClick={() => setLegendExpanded(false)}>—</LegendToggle>
      </FlexSpace>
      {visibleMapLayer !== 'pumps' && (
        <FlexRow>
          {visibleMapLayer === 'trees' && <TreesColorLegend />}
          {visibleMapLayer === 'rain' && <RainColorLegend />}
        </FlexRow>
      )}
      {visibleMapLayer === 'pumps' && <PumpsColorLegend />}

      <FlexColumnLast isLast={true}>
        <StyledCardDescription>Datenpunkte</StyledCardDescription>
        <StyledCardDescriptionSecond>
          durch Klick ein- & ausblenden.
        </StyledCardDescriptionSecond>
        <FlexRowFit
          isActive={visibleMapLayer === 'trees'}
          onClick={() => {
            setVisibleMapLayer('trees');
          }}
        >
          <LegendDot
            className={'legend-dot'}
            color={'#2c303b'}
            gradient={visibleMapLayer === 'trees' ? rainGradient : undefined}
          />

          <StyledItemLabel>Straßen- & Anlagenbäume</StyledItemLabel>
        </FlexRowFit>
        <FlexRowFit
          isActive={visibleMapLayer === 'pumps'}
          onClick={() => {
            setVisibleMapLayer('pumps');
          }}
        >
          <StrokedLegendDot
            gradient={
              visibleMapLayer === 'pumps' ? workingColor.hex : undefined
            }
          />

          <StyledItemLabel>Öffentl. Pumpen</StyledItemLabel>
        </FlexRowFit>
        <FlexRowFit
          isActive={visibleMapLayer === 'rain'}
          onClick={() => {
            setVisibleMapLayer('rain');
          }}
        >
          <LegendRect
            gradient={visibleMapLayer === 'rain' ? rainGradient : undefined}
          />

          <StyledItemLabel>Niederschlagsflächen</StyledItemLabel>
        </FlexRowFit>
      </FlexColumnLast>
    </LegendDiv>
  );
};

export default MapLayerLegend;
