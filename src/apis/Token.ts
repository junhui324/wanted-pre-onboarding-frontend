// 토큰을 로컬 스토리지에 저장합니다.
function setToken(tokenValue: string) {
  localStorage.setItem('accessToken', tokenValue);
}

// 로컬 스토리지에 저장한 토큰 값을 반환합니다.
function getToken(): string | null {
  return localStorage.getItem('accessToken');
}

// 로컬 스토리지에 저장된 토큰을 삭제합니다.
function removeToken(): void {
  localStorage.removeItem('accessToken');
}

export { setToken, getToken, removeToken };
