import React from 'react';

const DocumentPanel = ({ title, dirty, focused, onClose, onFocus, children }) => {
	const shadow = focused ? 'shadow-lg' : 'shadow-md';
	const translate = focused ? '-translate-y-1' : '';
	return (
		<div
			className={ `relative h-full flex-1 bg-white overflow-hidden rounded-md transform ${shadow} ${translate} transition-transform transition-shadow outline-none` }
			onClick={ onFocus }
		>
			<div className="absolute top-0 inset-x-0 z-10 py-3 bg-white">
				<div className="absolute left-0 top-0 py-3.5 pl-3 flex space-x-1.5">
					<button
						className="w-3.5 h-3.5 bg-red-400 rounded-full"
						onClick={ onClose }
					></button>
				</div>
				<div className={ `text-center text-sm font-light ${dirty ? 'italic' : ''} select-none` }>
					{ title + (dirty ? '*' : '') }
				</div>
			</div>
			<div className="pt-12 px-8 h-full min-h-0 overflow-y-scroll">
				{ children }
			</div>
		</div>
	);
};

export default DocumentPanel;
