import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { NewsFeed, newsFeedNewsItemFragment } from '../src/components/news-feed';
import { NewsTitle} from '../src/components/news-title';
import { withDataAndRouter } from '../src/helpers/with-data';
import { MainLayout } from '../src/layouts/main-layout';
import { FeedType } from '../src/data/models';
import { POSTS_PER_PAGE } from '../src/config';
import { Modal } from '../src/components/Modal';
const query = gql`
  query topNewsItems($type: FeedType!, $first: Int!, $skip: Int!) {
    feed(type: $type, first: $first, skip: $skip) {
      ...NewsFeed
    }
  }
  ${newsFeedNewsItemFragment}
`;

export interface ITopNewsFeedProps {
  options: {
    currentUrl: string;
    first: number;
    skip: number;
  };
}

export function IndexPage(props): JSX.Element {
  const { router } = props;

  const pageNumber = (router.query && +router.query.p) || 0;
  const [newRecord, setNewRecord]= useState<boolean>((router.query && router.query.newRecord) ? true:false);
  const first = POSTS_PER_PAGE;
  const skip = POSTS_PER_PAGE * pageNumber;
  const { data } = useQuery(query, { variables: { first, skip, type: FeedType.TOP } });
  return (
    <div>
    <MainLayout currentUrl={router.pathname}>
      <NewsFeed data={data} currentUrl={router.pathname} first={first} skip={skip} />
    </MainLayout>
    
    { newRecord?<Modal title={"Successful : "+router.query.newRecord} onclick={setNewRecord}/>:null} 
    </div>
  );
}

export default withDataAndRouter(IndexPage);
