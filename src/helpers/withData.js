import React from 'react';
import cookie from 'cookie';
import PropTypes from 'prop-types';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import debug from 'debug';

import initApollo from './initApollo';

const logger = debug('app:withData');
logger.log = console.log.bind(console);

function parseCookies(ctx = {}, options = {}) {
  const mycookie = cookie.parse(
    ctx.req && ctx.req.headers.cookie
      ? ctx.req.headers.cookie
      : '', // document.cookie,
    options,
  );
  logger('Parsing cookie: ', mycookie);
  return mycookie;
}

export default (ComposedComponent) => {
  return class WithData extends React.Component {
    static displayName = `WithData(${ComposedComponent.displayName})`
    static propTypes = {
      serverState: PropTypes.object.isRequired,
    }

    static async getInitialProps(context) {
      let serverState = {};

      // Setup a server-side one-time-use apollo client for initial props and
      // rendering (on server)
      logger('getInitialProps with context: ', context);
      const apollo = initApollo({}, {
        getToken: () => parseCookies(context), // ['connect.sid'], // .token,
      });

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(context, apollo);
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (!process.browser) {
        if (context.res && context.res.finished) {
          // When redirecting, the response is finished.
          // No point in continuing to render
          return;
        }

        // Provide the `url` prop data in case a GraphQL query uses it
        const url = { query: context.query, pathname: context.pathname };

        // Run all GraphQL queries
        const app = (
          <ApolloProvider client={apollo}>
            <ComposedComponent url={url} {...composedInitialProps} />
          </ApolloProvider>
        );

        await getDataFromTree(app);

        // Extract query data from the Apollo's store
        const state = apollo.getInitialState();

        serverState = {
          apollo: { // Make sure to only include Apollo's data state
            data: state.data,
          },
        };
      }

      return {
        serverState,
        ...composedInitialProps,
      }
    }

    constructor(props) {
      super(props);
      // Note: Apollo should never be used on the server side beyond the initial
      // render within `getInitialProps()` above (since the entire prop tree
      // will be initialized there), meaning the below will only ever be
      // executed on the client.
      this.apollo = initApollo(this.props.serverState, {
        getToken: () => parseCookies(), // ['connect.sid'],
      });
    }

    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      )
    }
  }
}