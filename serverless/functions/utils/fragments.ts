const ListFields = `
  fragment ListFields on List {
    id: _id
    icon
    isCustom
    title
  }
`;

const TodoFields = `
  fragment TodoFields on Todo {
    id: _id
    deadline
    isUrgent
    isDone
    list {
      id: _id
      icon
      isCustom
      title
    }
    notes
    title
    userId
  }
`;

export const fragments = {
	TodoFields: { key: 'TodoFields', value: TodoFields },
	ListFields: { key: 'ListFields', value: ListFields },
};
