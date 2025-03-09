import { FC, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Report } from 'components';
import { PageType } from 'types';
import {
  Splitter,
  SplitterOnChangeEvent,
  SplitterPaneProps,
} from '@progress/kendo-react-layout';
import { ShoppingCopilot } from 'pages/ShoppingCopilot';
import axios from 'axios';
import { NewWebsiteShoppingCopilot } from 'pages/NewWebsiteShoppingCopilot';

const {
  BlackFridayQ42023ReportID,
  BlackFridayQ42023ReportSectionName,
  December2023ReportID,
  December2023ReportSectionName,
  OrderAPI,
} = window.config;

interface Props {
  scaling?: boolean;
}

const SUGGESTED_ACTIONS = [
  {
    type: 'reply',
    value:
      'I am going to Santorini Greece next week for a vacation and am looking for some turquoise blue dresses.',
  },
];

const SUGGESTED_ACTIONS_FOR_SCALING = [
  {
    type: 'reply',
    value: 'Show me some looks for my vacation',
  },
  {
    type: 'reply',
    value: 'Can you show me some Indian dresses for a wedding in Udaipur?',
  },
];

export const NewWebsite: FC<Props> = ({ scaling }) => {
  const [panes, setPanes] = useState<SplitterPaneProps[]>([
    { collapsible: false, scrollable: false },
    { size: '25%', collapsible: true, scrollable: false },
  ]);

  const onChange = (event: SplitterOnChangeEvent) => {
    setPanes(event.newState);
  };

  useEffect(() => {
    if (scaling) {
      axios.get(OrderAPI + '/ResetDemoData');
    }
  }, [scaling]);

  return (
    <div
      key={scaling ? PageType.NewWebsiteWithScaling : PageType.NewWebsite}
      className={styles.container}
    >
      <Splitter style={{ height: "calc(100% - 200px)" }} panes={panes} onChange={onChange}>
        <NewWebsiteShoppingCopilot
          paymentFailedDemo={!scaling}
          isCollapsed={panes[1].collapsed}
          suggestedActions={
            scaling ? SUGGESTED_ACTIONS_FOR_SCALING : SUGGESTED_ACTIONS
          }
        />
        <Report
          id={scaling ? December2023ReportID : BlackFridayQ42023ReportID}
          name={
            scaling
              ? December2023ReportSectionName
              : BlackFridayQ42023ReportSectionName
          }
          pageTitle={
            scaling
              ? 'New Reimagined Website with Auto Scaling'
              : 'New Reimagined Website'
          }
          pageType={
            scaling ? PageType.NewWebsiteWithScaling : PageType.NewWebsite
          }
        />
      </Splitter>
    </div>
  );
};
