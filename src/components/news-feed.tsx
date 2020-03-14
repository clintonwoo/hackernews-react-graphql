import * as React from 'react';

import { NewsItem } from '../data/models';
import { LoadingSpinner } from './loading-spinner';
import { NewsDetail, newsDetailNewsItemFragment } from './news-detail';
import { NewsTitle, newsTitleFragment } from './news-title';
import { DataValue } from 'react-apollo';

export interface INewsFeedProps {
  isPostScrutinyVisible?: boolean;
  first: number;
  newsItems: NewsItem[];
  notice?: JSX.Element;
  skip: number;
  isJobListing?: boolean;
  isRankVisible?: boolean;
  isUpvoteVisible?: boolean;
  currentUrl: string;
}

export const newsFeedNewsItemFragment = `
  fragment NewsFeed on NewsItem {
    id
    hidden
    ...NewsTitle
    ...NewsDetail
  }
  ${newsTitleFragment}
  ${newsDetailNewsItemFragment}
`;

export class NewsFeedView extends React.Component<INewsFeedProps> {
  static defaultProps = {
    isPostScrutinyVisible: false,
    isJobListing: false,
    isRankVisible: true,
    isUpvoteVisible: true,
    notice: null,
  };

  render(): JSX.Element {
    const props = this.props;

    const nextPage = Math.ceil((props.skip || 1) / props.first) + 1;

    const rows: JSX.Element[] = [];
    props.newsItems.forEach((newsItem, index) => {
      if (!newsItem.hidden) {
        rows.push(
          <NewsTitle
            key={`${newsItem.id}title`}
            isRankVisible={props.isRankVisible}
            isUpvoteVisible={props.isUpvoteVisible}
            rank={props.skip + index + 1}
            {...newsItem}
          />
        );
        rows.push(
          <NewsDetail
            key={`${newsItem.id}detail`}
            isFavoriteVisible={false}
            isPostScrutinyVisible={props.isPostScrutinyVisible}
            isJobListing={props.isJobListing}
            {...newsItem}
          />
        );
        rows.push(<tr className="spacer" key={`${newsItem.id}spacer`} style={{ height: 5 }} />);
      }
    });
    rows.push(<tr key="morespace" className="morespace" style={{ height: '10px' }} />);
    rows.push(
      <tr key="morelinktr">
        <td key="morelinkcolspan" colSpan={2} />
        <td key="morelinktd" className="title">
          <a key="morelink" href={`${props.currentUrl}?p=${nextPage}`} className="morelink" rel="nofollow">
            More
          </a>
        </td>
      </tr>
    );

    return (
      <tr>
        <td style={{ padding: '0px' }}>
          <table
            style={{ border: '0px', padding: '0px', borderCollapse: 'collapse', borderSpacing: '0px' }}
            className="itemlist"
          >
            <tbody>
              {props.notice && props.notice}
              {rows}
            </tbody>
          </table>
        </td>
      </tr>
    );
  }
}

export interface INewsFeedData {
  loading;
  error;
  feed;
}
export interface INewsFeedContainerProps {
  data: DataValue<INewsFeedData, {}>;
  options;
}

export const NewsFeed: React.SFC<INewsFeedContainerProps> = ({ data: { loading, error, feed }, options }) => {
  if (error) {
    return (
      <tr>
        <td>Error loading news items.</td>
      </tr>
    );
  }

  if (feed && feed.length) {
    return <NewsFeedView newsItems={feed} {...options} />;
  }

  return <LoadingSpinner />;
};
