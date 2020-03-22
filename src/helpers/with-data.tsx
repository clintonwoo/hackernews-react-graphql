/* eslint-disable react/jsx-props-no-spreading */
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory/lib/types';
import * as cookie from 'cookie';
import { debug } from 'debug';
import * as React from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';

import { initApollo } from './init-apollo';

const logger = debug('app:withData');
logger.log = console.log.bind(console);

function parseCookies(
  ctx: any = {},
  options = {}
): {
  [key: string]: string;
} {
  const mycookie = cookie.parse(
    ctx.req && ctx.req.headers.cookie ? ctx.req.headers.cookie : '', // document.cookie,
    options
  );

  logger('Parsing cookie: ', mycookie);
  return mycookie;
}

export interface IWithDataProps<Q = any> {
  serverState: IWithDataServerState;
  dataContext: IWithDataContext<Q>;
}

export interface IWithDataServerState {
  apollo: { data };
}

export interface IWithDataContext<Q = any> {
  query: Q;
  pathname: string;
}

export type TComposedComponent<Props> = React.ComponentType<Props> & {
  getInitialProps?: (context, apollo) => any;
};

export function withData<TProps extends IWithDataProps>(
  ComposedComponent: TComposedComponent<TProps & any>
): React.ComponentType<IWithDataProps> {
  return class WithData extends React.Component<IWithDataProps> {
    // Note: Apollo should never be used on the server side beyond the initial
    // render within `getInitialProps()` (since the entire prop tree
    // will be initialized there), meaning the below will only ever be
    // executed on the client.
    private apollo: ApolloClient<NormalizedCacheObject> = initApollo(
      this.props.serverState.apollo.data,
      { getToken: () => parseCookies() }
    );

    static displayName = `WithData(${ComposedComponent.displayName})`;

    static async getInitialProps(context): Promise<{ serverState } | void> {
      let serverState: IWithDataServerState = { apollo: { data: {} } };

      // Setup a server-side one-time-use apollo client for initial props and
      // rendering (on server)
      logger('getInitialProps with context: ', context);
      const apollo = initApollo({}, { getToken: () => parseCookies(context) });

      // Evaluate the composed component's getInitialProps()
      const childInitialProps = ComposedComponent.getInitialProps
        ? await ComposedComponent.getInitialProps(context, apollo)
        : {};

      // Run all GraphQL queries from component tree and extract the resulting data
      if (!(process as any).browser) {
        if (context.res && context.res.finished) {
          // When redirecting, the response is finished. No point in continuing to render
          return undefined;
        }

        // Provide the dataContext prop in case a GraphQL query uses it
        const dataContext: IWithDataContext = { query: context.query, pathname: context.pathname };

        // Run all GraphQL queries
        const app = (
          <ApolloProvider client={apollo}>
            <ComposedComponent dataContext={dataContext} {...childInitialProps} />
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
        ...childInitialProps,
      };
    }

    render(): JSX.Element {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  };
}
