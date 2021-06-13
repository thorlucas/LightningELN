import React from 'react';

const WithToolbar = ({ toolbar, children }) => {
	return (
		<div className="h-full flex flex-col">
			<div className="flex-initial relative z-10 shadow-md">
				{ toolbar }
			</div>
			<div className="flex-1 min-h-0">
				{ children }
			</div>
		</div>
	);
};

export default WithToolbar;
