import * as cookie from 'cookie';
import { debug } from 'debug';
import * as React from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';

import { initApollo } from './init-apollo';

const logger = debug('app:withData');
logger.log = console.log.bind(console);

function parseCookies(ctx: any = {}, options = {}) {
  const mycookie = cookie.parse(
    ctx.req && ctx.req.headers.cookie ? ctx.req.headers.cookie : '', // document.cookie,
    options
  );

  logger('Parsing cookie: ', mycookie);
  return mycookie;
}

export interface IWithDataProps {
  serverState: {
    apollo: {
      data;
    };
  };
  url: { query: any; pathname: string };
}

export type TComposedComponent<Props> = React.ComponentType<Props> & {
  getInitialProps?: (context, apollo) => any;
};

export const withData = <Props extends IWithDataProps>(ComposedComponent: TComposedComponent<Props & any>) => {
  return class WithData extends React.Component<IWithDataProps> {
    private apollo;

    static displayName = `WithData(${ComposedComponent.displayName})`;

    static async getInitialProps(context) {
      let serverState = { apollo: {} };

      // Setup a server-side one-time-use apollo client for initial props and
      // rendering (on server)
      logger('getInitialProps with context: ', context);
      const apollo = initApollo(
        {},
        {
          getToken: () => parseCookies(context),
        }
      );

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(context, apollo);
      }

      // Run all GraphQL queries in the component tree and extract the resulting data
      if (!(process as any).browser) {
        if (context.res && context.res.finished) {
          // When redirecting, the response is finished. No point in continuing to render
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

        serverState = {
          apollo: {
            // Make sure to only include Apollo's data state
            data: apollo.cache.extract(), // Extract query data from the Apollo's store
          },
        };
      }

      return {
        serverState,
        ...composedInitialProps,
      };
    }

    constructor(props) {
      super(props);
      // Note: Apollo should never be used on the server side beyond the initial
      // render within `getInitialProps()` above (since the entire prop tree
      // will be initialized there), meaning the below will only ever be
      // executed on the client.
      this.apollo = initApollo(this.props.serverState.apollo.data, {
        getToken: () => parseCookies(),
      });
    }

    render(): JSX.Element {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  };
};
