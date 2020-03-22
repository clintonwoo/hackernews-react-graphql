import * as React from 'react';
import { DataValue } from 'react-apollo';

import { NewsItemModel } from '../data/models';
import { LoadingSpinner } from './loading-spinner';
import { NewsDetail, newsDetailNewsItemFragment } from './news-detail';
import { NewsTitle, newsTitleFragment } from './news-title';

export interface INewsFeedProps {
  isPostScrutinyVisible?: boolean;
  first: number;
  newsItems: NewsItemModel[];
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

export function NewsFeedView(props: INewsFeedProps): JSX.Element {
  const {
    isPostScrutinyVisible,
    first,
    newsItems,
    notice,
    skip,
    isJobListing,
    isRankVisible,
    isUpvoteVisible,
    currentUrl,
  } = props;

  const nextPage = Math.ceil((skip || 1) / first) + 1;

  const rows: JSX.Element[] = [];
  newsItems.forEach((newsItem, index) => {
    if (!newsItem.hidden) {
      rows.push(
        <NewsTitle
          key={`${newsItem.id}title`}
          isRankVisible={isRankVisible}
          isUpvoteVisible={isUpvoteVisible}
          rank={skip + index + 1}
          {...newsItem}
        />
      );
      rows.push(
        <NewsDetail
          key={`${newsItem.id}detail`}
          isFavoriteVisible={false}
          isPostScrutinyVisible={isPostScrutinyVisible}
          isJobListing={isJobListing}
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
        <a key="morelink" href={`${currentUrl}?p=${nextPage}`} className="morelink" rel="nofollow">
          More
        </a>
      </td>
    </tr>
  );

  return (
    <tr>
      <td style={{ padding: '0px' }}>
        <table
          style={{
            border: '0px',
            padding: '0px',
            borderCollapse: 'collapse',
            borderSpacing: '0px',
          }}
          className="itemlist"
        >
          <tbody>
            {notice && notice}
            {rows}
          </tbody>
        </table>
      </td>
    </tr>
  );
}

NewsFeedView.defaultProps = {
  isPostScrutinyVisible: false,
  isJobListing: false,
  isRankVisible: true,
  isUpvoteVisible: true,
  notice: null,
};

export interface INewsFeedData {
  loading;
  error;
  feed;
}
export interface INewsFeedContainerProps {
  data: DataValue<INewsFeedData, {}>;
  options;
}

export const NewsFeed: React.SFC<INewsFeedContainerProps> = ({
  data: { error, feed },
  options,
}) => {
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
