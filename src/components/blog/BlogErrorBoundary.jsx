import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

class BlogErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console for debugging
    console.error('Blog Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stevens-white flex items-center justify-center p-stevens-md">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-stevens-light-gray rounded-stevens-lg p-stevens-xl">
              <AlertTriangle className="w-16 h-16 text-stevens-red mx-auto mb-stevens-lg" />
              <h2 className="font-stevens-display text-stevens-2xl text-stevens-red mb-stevens-md">
                Something went wrong
              </h2>
              <p className="text-stevens-dark-gray mb-stevens-lg">
                We encountered an error while loading the blog content. This might be due to a data formatting issue.
              </p>
              <div className="space-y-stevens-md">
                <Button 
                  onClick={this.handleRetry}
                  className="w-full btn-stevens-red"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button 
                  variant="outline-dark"
                  onClick={() => window.location.reload()}
                  className="w-full"
                >
                  Reload Page
                </Button>
              </div>
              {import.meta.env.DEV && this.state.error && (
                <details className="mt-stevens-lg text-left">
                  <summary className="cursor-pointer text-stevens-sm text-stevens-light-gray0">
                    Error Details (Development)
                  </summary>
                  <pre className="mt-stevens-sm text-stevens-xs text-stevens-dark-gray bg-stevens-light-gray p-stevens-sm rounded-stevens-sm overflow-auto">
                    {this.state.error && this.state.error.toString()}
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default BlogErrorBoundary;
