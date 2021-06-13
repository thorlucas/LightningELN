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
	const [value, setValue] = useState<(T)>(init);

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
		})
		.catch((err: Error) => {
			console.error(err);
		});
	}, [value]);

	return [value, setValue, save];
}
