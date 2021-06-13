export type FileDocument = {
	type: 'file';
	path: string;
};

export type Document = FileDocument;

export const Document = {
	key: (doc: Document): string => {
		switch (doc.type) {
			case 'file':
				return doc.path;
		}
	},
	isEqual: (lhs: Document, rhs: Document): boolean => {
		if (lhs.type !== rhs.type) return false;
		switch (lhs.type) {
			case 'file':
				return lhs.path === rhs.path;
		}
	},
};
