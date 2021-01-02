export interface ITodoItem {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

export interface ITodoFilter {
  onlyCompleted: boolean
  search: string,
}

export interface ITodoPagination {
  current: number
  limit: number
  allPages: number
}