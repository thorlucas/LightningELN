import React, { KeyboardEvent, useCallback } from "react";

type KeybindingGroupWrapperRenderer = ({ attributes, children }: {
	attributes: any,
	children: JSX.Element | JSX.Element[],
}) => JSX.Element;

interface KeybindingGroupProps {
	wrapperAttributes?: any,
	renderWrapper?: KeybindingGroupWrapperRenderer,
	children: JSX.Element[] | JSX.Element,
}

const defaultWrapperRenderer: KeybindingGroupWrapperRenderer = ({ attributes, children }) => (
	<div { ...attributes }>
		{ children }
	</div>
);

export const KeybindingGroup: React.FC<KeybindingGroupProps> = ({
	wrapperAttributes = {},
	renderWrapper = defaultWrapperRenderer,
	children,
}) => {
	const onKeyDown = useCallback((event: KeyboardEvent) => {
		console.log("Keyed!");
	}, []);

	return renderWrapper({
		children: children,
		attributes: {
			...wrapperAttributes,
			tabIndex: -1,
			onKeyDown: onKeyDown,
		},
	});
};
