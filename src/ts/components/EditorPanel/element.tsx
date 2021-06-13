import React from 'react';
import { Element as SlateElement } from 'slate';

const Element = (props: {
		attributes: any,
		children: any,
		element: SlateElement,
	}) => {
	const { attributes, children, element } = props;
	
	switch (element.type) {
		case 'title':
			return <h1 className="mb-4 mt-5 text-gray-900 text-4xl" { ...attributes }>{ children }</h1>
		case 'heading':
			return <h2 className="mb-2 mt-5 text-gray-900 text-3xl" { ...attributes }>{ children }</h2>
		case 'subheading':
			return <h3 className="mb-2 mt-3 text-gray-900 text-2xl" { ...attributes }>{ children }</h3>
		case 'subsubheading':
			return <h4 className="mb-2 mt-3 text-gray-700 text-xl" { ...attributes }>{ children }</h4>
		case 'paragraph':
			return <p className="mb-2 text-gray-900" { ...attributes }>{ children }</p>
	}
};

export default Element;
