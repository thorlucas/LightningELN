import React from 'react';

interface FullWrapperProps {
	children: JSX.Element | JSX.Element[],
	attributes?: any,
}

export const FullWrapper: React.FC<FullWrapperProps> = ({
	children,
	attributes=null,
}) => {
	return (
		<div className="h-full focus:outline-none" { ...attributes }>
			{ children }
		</div>
	);
}

