const TodoFields = `
  fragment TodoFields on Todo {
    id: _id
    deadline
    isUrgent
    isDone
    notes
    title
    userId
  }
`;

export const fragements = {
	TodoFields: { key: 'TodoFields', value: TodoFields },
};
