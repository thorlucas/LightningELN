import React from 'react';

const WithSidebar = ({ sidebar, children }) => {
	return (
		<div className="h-full flex">
			<div className="h-full flex-initial">
				{ sidebar }
			</div>
			<div className="h-full flex-1">
				{ children }
			</div>
		</div>
	);
};

export default WithSidebar;
