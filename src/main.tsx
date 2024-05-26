import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import './index.css';
import router from './routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<PrimeReactProvider>
			<RouterProvider router={router}></RouterProvider>
		</PrimeReactProvider>
	</React.StrictMode>
);
