import { useCallback, useEffect, useState } from "react";

// TODO: Make optionals
// TODO: Track dirty
export function useFile<T>(
	filePath: string,
	{serializer, deserializer}: {
		deserializer: (data: string) => T,
		serializer: (data: T) => string,
	},
	init: T,
) {
	const [value, setValue] = useState<T>(init);
	const [dirty, setDirty] = useState<boolean>(false);

	useEffect(() => {
		window.fs.readFile(filePath)
		.then((data: string) => {
			setValue(deserializer(data));
		})
		.catch((err: Error) => {
			console.error(err);
		});
	}, [filePath]);

	// TODO: Set a saving state so that value isnt changed etc
	const save = useCallback(() => {
		const data: string = serializer(value);
		window.fs.writeFile(filePath, data)
		.then(() => {
			console.log(`Saved ${filePath}`);
			setDirty(false);
		})
		.catch((err: Error) => {
			console.error(err);
		});
	}, [value]);

	const setValuePre = useCallback((newValue: T) => {
		// FIXME: slate editor will update value even when shit hasnt changed
		if (!dirty) {
			setDirty(true);
		}
		setValue(newValue);
	}, [dirty]);

	return [value, setValuePre, save, dirty];
}
