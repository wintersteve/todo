const TodoFields = `
  fragment TodoFields on Todo {
    id: _id
    deadline
    isUrgent
    isDone
    listId
    notes
    title
  }
`;

const ListFields = `
  fragment ListFields on List {
    id: _id
    icon
    isCustom
    title
  }
`;

export const fragements = {
	TodoFields: { key: 'TodoFields', value: TodoFields },
	ListFields: { key: 'ListFields', value: ListFields },
};
