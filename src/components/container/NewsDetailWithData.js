import { graphql } from 'react-apollo';
import Router from 'next/router';

import NewsDetail from '../presentational/NewsDetail';
import hideNewsItem from '../../data/mutations/hideNewsItem';


export default graphql(hideNewsItem, {
  props: ({ ownProps, mutate }) => ({
    hideNewsItem: id =>
      mutate({
        variables: { id },
      })
      // .then(() => Router.push(`/login?id=${id}&password=${password}`))
        .catch(() => Router.push('/login', `/hide?id=${id}&how=up&goto=news`)),
    unhideNewsItem: id =>
      mutate({
        variables: { id },
      })
        .catch(() => Router.push('/login', `/unhide?id=${id}&how=up&goto=news`)),
  }),
})(NewsDetail);
