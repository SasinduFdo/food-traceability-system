export default function authentication() {
    const token = localStorage.getItem("token");
    if (token) {
      return { Authorization: token };
    } else {
      return {};
    }
  }