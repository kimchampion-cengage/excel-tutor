import ReactDOM from 'react-dom/client';
import App from './app/App.jsx';

// Hide loading message
const loading = document.getElementById('loading');
if (loading) {
  loading.style.display = 'none';
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  document.body.innerHTML = '<h1 style="color: red; text-align: center; margin-top: 50px;">ERROR: Root element not found</h1>';
} else {
  try {
    ReactDOM.createRoot(rootElement).render(<App />);
  } catch (error) {
    document.body.innerHTML = '<h1 style="color: red; text-align: center; margin-top: 50px;">ERROR: ' + error.message + '</h1>';
  }
}
