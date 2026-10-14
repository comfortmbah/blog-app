const requiredEnvVars = ["DATABASE_URL", "JWT_SECRET"];

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
    throw new Error("JWT_SECRET must be at least 32 characters long");
  }
};