import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-dark text-white p-8">
          <h1 className="text-3xl font-Poppins font-bold mb-4">Algo salió mal</h1>
          <p className="text-desc mb-6">Ha ocurrido un error inesperado.</p>
          <button
            className="bg-accent text-white px-6 py-3 rounded-lg font-Poppins font-bold hover:bg-accent2"
            onClick={() => window.location.reload()}
          >
            Recargar página
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
