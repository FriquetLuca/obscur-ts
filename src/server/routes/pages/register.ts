export default function Register() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
  <form id="register-form">
    <label> Username: <input type="text" name="username"> </label> <br>
    <label> Password: <input type="password" name="password"> </label> <br>
    <button type="submit">Register</button>
  </form>
  <div id="message"></div>
  <script>
  const form = document.getElementById("register-form");
  const messageDiv = document.getElementById("message");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: formData.get("username"),
          password: formData.get("password")
        })
      });
      const data = await response.json();
      messageDiv.innerText = data.message;
    } catch (error) {
      messageDiv.innerText = "Registration failed.";
    }
  });
  </script>
</body>
</html>
  `;
}