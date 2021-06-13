import React from 'react';

const PanelContainer = ({ children }) => {
	return (
		<div className="h-full flex px-4 py-4 gap-4">
			{ children }
		</div>
	);
};

export default PanelContainer;
