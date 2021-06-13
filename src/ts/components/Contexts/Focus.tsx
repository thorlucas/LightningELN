import React, { Context, createContext, FocusEvent, useCallback, useRef, useState, useContext } from 'react';

export const FocusContext: Context<boolean> = createContext<boolean>(false);

export const FocusProvider = ({ render, children }) => {
	const ref = useRef<HTMLDivElement>(null);
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

	return (
		<FocusContext.Provider value={ focused }>
			{
				render({
					attributes: {
						tabIndex: -1,
						ref: ref,
						onBlur: onBlur,
						onFocus: onFocus,
					},
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
