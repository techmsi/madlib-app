import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';

const ErrorDisplay = () => {
  return (
    <div className="error" data-testid="errorboundary">
      <button
        onClick={() => {
          window.location.reload();
        }}
      >
        Reload this page
      </button>
      <p>There was an error in loading this page.</p>
    </div>
  );
};

export const useAsyncError = () => {
  const [_, setError] = React.useState();
  return React.useCallback(
    (e) => {
      setError(() => {
        throw e;
      });
    },
    [setError]
  );
};
class ErrorBoundary extends Component {
  state = {
    error: '',
    eventId: '',
    errorInfo: '',
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }
  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo });
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ hasError: true, eventId, errorInfo });
    });
  }
  render() {
    const { hasError } = this.state;

    return hasError ? <ErrorDisplay /> : this.props.children;
  }
}
export default ErrorBoundary;
