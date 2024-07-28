import { Component, ErrorInfo } from 'react';
import {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from '../../models/data.interface';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });
    console.error('Emulate error by ErrorBoundary: ', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-message">
          Something went wrong. Please reload app.
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
