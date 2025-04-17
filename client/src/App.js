import { Toaster } from 'react-hot-toast'

function App({children}) {
  return (
    <>
    {children}
    <Toaster position='bottom-right' reverseOrder={false} />
    </>
  );
}

export default App;
