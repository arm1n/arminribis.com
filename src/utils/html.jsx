import { isValidElement } from 'react';
import html2JSX from 'html-react-parser';

export const parseHTML = (html) => 
	html2JSX(html).filter((element) => 
		isValidElement(element));