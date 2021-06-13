import React, { useEffect, useState } from 'react';

const Browser = ({ onSelectDocument }) => {
	const [files, setFiles] = useState<string[]>([]);

	useEffect(() => {
		window.fs.readDir('procedures')
		.then((data: string[]) => {
			setFiles(data);
		})
		.catch((err: any) => {
			console.error(err);
		});
	}, []);

	const fileList = files.map((fileName) => {
		return (
			<li
				onClick={() => {
					onSelectDocument({
						type: 'file',
						path: 'procedures/' + fileName,
					});
				}}
				key={fileName}
				className="-mx-1.5 px-1.5 py-1 rounded-md transition-colors hover:bg-gray-600"
			>
				<span className="text-gray-200 select-none">{ fileName }</span>
			</li>
		);
	});

	return (
		<div className="h-full w-80 px-4 py-4 bg-gray-700 text-gray-200">
			<ul>
				<li className="mb-1 text-gray-500 tracking-wide font-bold uppercase select-none">Procedures</li>
				{ fileList }
			</ul>
		</div>
	);
};

export default Browser;
