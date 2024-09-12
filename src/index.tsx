import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// function Test() {
//   const [rating, setRating] = useState(0);
//   return (
//     <>
//       <StarRating
//         maxRating={10}
//         messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}
//         defaultRating={5}
//         onSetRating={setRating}
//       />
//       rating {rating}
//     </>
//   );
// }

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
