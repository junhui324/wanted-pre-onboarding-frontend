import * as Api from './Api';

const API_URL = 'https://www.pre-onboarding-selection-task.shop';

export async function signUp(data: {
  email: string;
  password: string;
}): Promise<any> {
  const params = `auth/signup`;
  return await Api.post(API_URL, params, false, data);
}

export async function signIn(data: {
  email: string;
  password: string;
}): Promise<any> {
  const params = `auth/signin`;
  return await Api.post(API_URL, params, false, data);
}

export async function createTodo(data: { todo: string }): Promise<any> {
  const params = `todos`;
  return await Api.post(API_URL, params, true, data);
}

export async function getTodos(): Promise<any> {
  const params = `todos`;
  return await Api.get(API_URL, params, true);
}

export async function updateTodo(
  todoId: number,
  data: { todo: string; isCompleted: boolean }
): Promise<any> {
  const params = `todos/${todoId}`;
  return await Api.put(API_URL, params, true, data);
}

export async function deleteTodo(todoId: number): Promise<any> {
  const params = `todos/${todoId}`;
  return await Api.delete(API_URL, params, true);
}
