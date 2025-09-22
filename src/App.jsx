import { useEffect } from 'react';
import Page from './Components/Page';
import './App.css';

function App() {
  useEffect(() => {
    // Disable right-click globally
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);

    // Disable common inspect shortcuts (F12, Ctrl+Shift+I, Ctrl+U, Ctrl+Shift+C)
    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <Page />
    </>
  );
}

export default App;
