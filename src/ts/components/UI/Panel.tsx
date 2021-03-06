import { FocusContext, FocusProvider } from '@components/Contexts/Focus';
import React, { useCallback } from 'react';

type PanelCloseCallback = () => void;
type PanelInnerWrapperRenderer = ({ children }: {
	children: JSX.Element | JSX.Element[],
}) => JSX.Element | JSX.Element[];

interface PanelProps {
	title?: JSX.Element | JSX.Element[],
	renderInnerWrapper?: PanelInnerWrapperRenderer,
	onClose?: PanelCloseCallback,
	children?: JSX.Element | JSX.Element[],
}

const defaultInnerWrapperRenderer: PanelInnerWrapperRenderer = ({ children }) => children;

/**
 * A flexible panel which resides in a [[PanelContainer]].
 * The panel also provides a [[FocusContext]] which is intended to provide whether or
 * not the panel is the currently focused panel in the container.
 */
export const Panel: React.FC<PanelProps> = ({
	title,
	onClose,
	children,
	renderInnerWrapper = defaultInnerWrapperRenderer,
}) => {
	const renderWrapper = useCallback(({ attributes, children, focused }) => {
		const shadow = focused ? 'shadow-lg' : 'shadow-md';
		const translate = focused ? '-translate-y-1' : '';

		return (
			<div
				{ ...attributes }
				className={ `relative h-full flex-1 bg-white overflow-hidden rounded-md transform ${shadow} ${translate} transition-transform transition-shadow outline-none` }
			>
				{ children }
			</div>
		);
	}, []);

	return (
		<FocusProvider renderWrapper={ renderWrapper }>
			{ renderInnerWrapper({
				children: (
					<>
						<div className="absolute top-0 inset-x-0 z-10 py-3 bg-white">
							<div className="absolute left-0 top-0 py-3.5 pl-3 flex space-x-1.5">
								<button
									className="w-3.5 h-3.5 bg-red-400 rounded-full focus:outline-none"
									onClick={ onClose }
								></button>
							</div>
							{ title && (
								<div className="text-center text-sm font-light select-none">
									{ title }
								</div>
							)}
						</div>
						<div className="pt-12 px-8 h-full min-h-0 overflow-y-scroll">
							{ children }
						</div>
					</>
				)
			}) }
		</FocusProvider>
	);
};
