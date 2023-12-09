async function logout() {
  try {
    const response = await fetch("/logout", {
      method: "POST",
    });

    if (response.status === 204) {
      localStorage.clear();
      location.href = "/";
    } else {
      const data = await response.json();
      throw new Error(data.message);
    }
  } catch (error) {
    alert(error.message);
  }
}

export { logout };
