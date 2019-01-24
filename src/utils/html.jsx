import { createElement } from 'react';
import html2JSX from 'html-react-parser';

export const parseHTML = (html) => 
	html2JSX(html, {
		replace: ({ data = ''}) => {
			if (data.match(/^(\r\n|\n|\r)$/)) {
				return createElement('br', {});
			}
		}
	});