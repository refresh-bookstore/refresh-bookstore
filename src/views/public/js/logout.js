async function logout() {
  try {
    const response = await fetch("/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Cookie"
      }
    });

    const data = await response.json();

    if (response.ok) {
      // 스토리지 초기화
      sessionStorage.clear();
      localStorage.clear();

      location.href = '/';
    } else { 
      throw new Error(data.message);
    }
  } catch (error) {
    alert(error.message);
  }
}

export { logout };