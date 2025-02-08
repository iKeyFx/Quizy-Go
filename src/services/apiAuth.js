export async function login({ email, password }) {
  try {
    const res = await fetch(
      `https://quiz-api-23gk.onrender.com/auth/login`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`Request failed with status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw new Error("Failed to login");
  }
}

export async function signUp({
  email,
  password,
  fname,
  lname,
  confirmPassword,
}) {
  try {
    const res = await fetch(`https://quiz-api-23gk.onrender.com/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        firstName: fname,
        lastName: lname,
        password: password,
        passwordRepeat: confirmPassword,
        role: "user",
      }),
    });

    if (!res.ok) {
      throw new Error(`Request failed with status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error during SignUp:", error.message);
    throw new Error("Failed to SignUp");
  }
}
