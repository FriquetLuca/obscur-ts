import type { FastifyRequest } from "../../types/global";

export default function Home(request: FastifyRequest) {
  const isLoggedIn = request.session.get("isLoggedIn");
  const buttonText = isLoggedIn ? "Logout" : "";
  return `<h1>Welcome!</h1><h2>Language selected: ${request.locale}</h2><button id="logout">${buttonText}</button>

  <script>
  const logoutBtn = document.getElementById("logout");
  ${!isLoggedIn ? `logoutBtn.style.visibility = "hidden";` : ""}
  logoutBtn.addEventListener("click", async (event) => {
    const response = await fetch("/auth/logout", {
      method: "POST",
      body: {}
    });
    const data = await response.json();
    if(data && data.message) {
      location.reload();
    }
  });
  </script>
  `;
}