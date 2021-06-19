import { useCallback, useEffect, useState } from "react";

export type Serializer<T, S> = (data: T) => S;
export type Deserializer<T, S> = Serializer<S, T>;

// TODO: Make optionals
// TODO: Track dirty
export function useFile<T>(
	filePath: string,
	{serializer, deserializer}: {
		deserializer: Deserializer<T, string>,
		serializer: Serializer<T, string>,
	},
	init: T,
): [
	T,
	(newValue: T) => void,
	() => void,
	boolean,
] {
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
		saveFile(filePath, serializer(value))
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

function saveFile(filePath: string, data: string): Promise<null> {
	return window.fs.writeFile(filePath, data);
}
