import ReactDOM from 'react-dom/client';
import App from './app/App';

console.log('🔵 main.tsx is executing');

// Hide loading message
const loading = document.getElementById('loading');
if (loading) {
  loading.style.display = 'none';
  console.log('✓ Hidden loading message');
}

const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

if (!rootElement) {
  document.body.innerHTML = '<h1 style="color: red; text-align: center; margin-top: 50px;">ERROR: Root element not found</h1>';
} else {
  try {
    console.log('✓ Creating React root');
    ReactDOM.createRoot(rootElement).render(<App />);
    console.log('✓ React app rendered');
  } catch (error) {
    console.error('React error:', error);
    document.body.innerHTML = '<h1 style="color: red; text-align: center; margin-top: 50px;">ERROR: ' + (error as Error).message + '</h1>';
  }
}
