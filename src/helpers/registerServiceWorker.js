import React from 'react';

export default (ComposedComponent) => {
  return class RegisterServiceWorker extends React.Component {
    static displayName = `RegisterServiceWorker(${ComposedComponent.displayName})`


    async componentDidMount() {
      if (process.env.NODE_ENV === 'production') {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker
            .register('/service-worker.js')
            .catch(err => {
              console.warn('service worker registration failed');
            });
        }
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }
}
