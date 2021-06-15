import React, { Context, createContext, FocusEvent, useCallback, useState, useContext, useMemo } from 'react';

export const FocusContext: Context<boolean> = createContext<boolean>(false);

type FocusProviderWrapperRenderer = ({ attributes, children, focused }: {
	attributes: any,
	children: JSX.Element[] | JSX.Element,
	focused: boolean,
}) => JSX.Element | JSX.Element[];

interface FocusProviderProps {
	wrapperAttributes?: any, // TODO: Type
	renderWrapper?: FocusProviderWrapperRenderer,
	children: JSX.Element[] | JSX.Element,
}

const defaultWrapperRenderer: FocusProviderWrapperRenderer = ({ attributes, children }) => (
	<div { ...attributes }>
		{ children }
	</div>
);

export const FocusProvider: React.FC<FocusProviderProps> = ({
	wrapperAttributes = {},
	renderWrapper = defaultWrapperRenderer,
	children,
}) => {
	const [focused, setFocused] = useState<boolean>(false);

	const onFocus = useCallback(() => {
		setFocused(true);
	}, []);

	const onBlur = useCallback((event: FocusEvent) => {
		const currentTarget = event.currentTarget;
		setTimeout(() => {
			if (!currentTarget.contains(document.activeElement)) {
				setFocused(false);
			}
		}, 0);
	}, []);

	const _wrapperAttributes = useMemo(() => ({
		...wrapperAttributes,
		tabIndex: -1,
		onBlur: onBlur,
		onFocus: onFocus,
	}), []);

	return (
		<FocusContext.Provider value={ focused }>
			{
				renderWrapper({
					attributes: _wrapperAttributes,
					children: children,
					focused: focused,
				})
			}
		</FocusContext.Provider>
	);
};

export function useFocused(): boolean {
	const focused = useContext(FocusContext);
	return focused;
}
