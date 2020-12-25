export interface ITodoItem {
  userId: Number,
  id: Number,
  title: String,
  completed: Boolean
}

export interface ITodoFilter {
  onlyCompleted: Boolean
  search: String,
}

export interface ITodoPagination {
  current: Number
  limit: Number
  allPages: Number
}