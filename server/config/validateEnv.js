const requiredEnvVars = [
  "DATABASE_URL",
  "JWT_SECRET",
  "CLIENT_URL",
];


export const validateEnv = () => {
  const missingEnvVars = requiredEnvVars.filter(
    (variable) => !process.env[variable]?.trim()
  );

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(", ")}`
    );
  }

  if (process.env.JWT_SECRET.length < 32) {
    throw new Error(
      "JWT_SECRET must be at least 32 characters long"
    );
  }

  let clientUrl;

  try {
    clientUrl = new URL(process.env.CLIENT_URL);
  } catch {
    throw new Error("CLIENT_URL must be a valid URL");
  }


  if (!["http:", "https:"].includes(clientUrl.protocol)) {
    throw new Error(
      "CLIENT_URL must use HTTP or HTTPS"
    );
  }


  if (clientUrl.origin !== process.env.CLIENT_URL) {
    throw new Error(
      "CLIENT_URL must contain only the origin, without a path or trailing slash"
    );
  }
};