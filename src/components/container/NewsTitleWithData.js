import { graphql } from 'react-apollo';
import Router from 'next/router';

import NewsTitle from '../presentational/NewsTitle';
import upvoteNewsItem from '../../data/mutations/upvoteNewsItem';


export default graphql(upvoteNewsItem, {
  props: ({ ownProps, mutate }) => ({
    upvoteNewsItem: id =>
      mutate({
        variables: { id },
      })
      // .then(() => Router.push(`/login?id=${id}&password=${password}`))
        .catch(() => Router.push('/login', `/vote?id=${id}&how=up&goto=news`)),
  }),
})(NewsTitle);
