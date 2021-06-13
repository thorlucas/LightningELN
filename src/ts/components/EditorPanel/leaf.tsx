import React from 'react';
import { StyledText } from './types';

// FIXME: Only accepts styled text at the moment. We need a way to handle empty text.
const Leaf = (props: {
		attributes: any,
		children: any,
		leaf: StyledText,
	}) => {
	const { attributes, leaf } = props;
	var { children } = props;

	if (leaf.bold) {
		children = <strong>{children}</strong>
	}

	if (leaf.italic) {
		children = <em>{children}</em>
	}

	if (leaf.underline) {
		children = <u>{children}</u>
	}

	if (leaf.code) {
		children = <code className="px-1 py-0.5 bg-gray-200 rounded-md">{children}</code>
	}

	return <span {...attributes}>{children}</span>
};

export default Leaf;
