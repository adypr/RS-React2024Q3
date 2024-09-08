import React from 'react';
import { Component, ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundary.module.scss';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleResetError = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.message}>
          <h1>Something went wrong.</h1>
          <p>
            An unexpected error occurred. Please try reloading this component.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
