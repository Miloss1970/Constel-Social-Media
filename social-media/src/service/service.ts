export default async function logIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await fetch("https://api.hr.constel.co/api/v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  try {
    if (!response.ok) {
      const { status, error } = await response.json();

      return { status, error };
    }
    const { token } = await response.json();
    return token;
  } catch (error) {
    console.log("error", error);
    return { status: "error", error: { message: "Something went wrong" } };
  }
}

export async function callApi({ method, url, body }: any) {
  const token = localStorage.getItem("token");
  if (!token) return;

  const fullUrl = `https://api.hr.constel.co/api/v1/${url}`;

  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
  };

  let requestBody;

  if (body) {
    if (body instanceof FormData) {
      requestBody = body;
    } else {
      requestBody = JSON.stringify(body);
    }
  }

  const config: RequestInit = {
    method,
    headers,
    body: requestBody,
  };
  const response = await fetch(fullUrl, config);
  try {
    if (!response.ok) {
      const { status, error } = await response.json();
      return { status, error };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { status: "error", error: { message: "Something went wrong" } };
  }
}
