export function getApiErrorMessage(
  error,
  fallback = "Ocorreu um erro inesperado."
) {
  if (error?.debug) {
    console.error("Debug do backend:", error.debug);
  }

  if (!error) {
    return fallback;
  }

  if (error.type === "validation") {
    return error.message || "Verifique os dados informados.";
  }

  if (error.type === "auth") {
    return error.message || "Você precisa estar logado.";
  }

  if (error.type === "permission") {
    return error.message || "Você não tem permissão para realizar esta ação.";
  }

  if (error.type === "not_found") {
    return error.message || "Registro não encontrado.";
  }

  if (error.type === "conflict") {
    return error.message || "Esta ação gerou um conflito.";
  }

  if (error.type === "database") {
    return "O sistema encontrou um problema ao acessar os dados. Tente novamente mais tarde.";
  }

  if (error.type === "server" || error.status === 500) {
    return "O sistema encontrou um problema interno. Tente novamente mais tarde.";
  }

  if (error.type === "network") {
    return "Não foi possível se comunicar com o servidor.";
  }

  return error.message || fallback;
}

export function getApiErrorType(error) {
  return error?.type || "unknown";
}

export function isAuthError(error) {
  return error?.type === "auth" || error?.status === 401;
}

export function isServerError(error) {
  return (
    error?.type === "database" ||
    error?.type === "server" ||
    error?.status === 500
  );
}

export function isValidationError(error) {
  return error?.type === "validation" || error?.status === 400;
}

export function isNotFoundError(error) {
  return error?.type === "not_found" || error?.status === 404;
}

export function isConflictError(error) {
  return error?.type === "conflict" || error?.status === 409;
}