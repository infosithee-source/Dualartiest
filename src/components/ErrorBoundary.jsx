import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-red-900 text-white p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Something went wrong.</h2>
          <p className="mb-4">The component failed to render.</p>
          <details className="text-left bg-black/50 p-4 rounded overflow-auto max-w-2xl">
            <summary className="cursor-pointer mb-2 font-mono text-yellow-400">Error Details</summary>
            <pre className="text-xs font-mono whitespace-pre-wrap">
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
