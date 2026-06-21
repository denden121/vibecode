import { next } from "@vercel/edge";

/**
 * Закрываем весь сайт HTTP Basic-авторизацией.
 * Логин и пароль задаются переменными окружения в настройках проекта Vercel:
 *   BASIC_AUTH_USER, BASIC_AUTH_PASSWORD
 */
export const config = {
  // Защищаем все маршруты, кроме служебных файлов Vercel.
  matcher: ["/((?!_vercel|.well-known).*)"],
};

const UNAUTHORIZED = new Response("Требуется авторизация", {
  status: 401,
  headers: {
    "WWW-Authenticate": 'Basic realm="Семейный бюджет", charset="UTF-8"',
  },
});

export default function middleware(request: Request) {
  const expectedUser = process.env.BASIC_AUTH_USER;
  const expectedPass = process.env.BASIC_AUTH_PASSWORD;

  // Авторизация не настроена — явно сообщаем об этом вместо «неверный пароль».
  if (!expectedUser || !expectedPass) {
    return new Response(
      "Авторизация не настроена. Задайте переменные окружения " +
        "BASIC_AUTH_USER и BASIC_AUTH_PASSWORD в настройках проекта на Vercel.",
      { status: 503 },
    );
  }

  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) {
    return UNAUTHORIZED;
  }

  let decoded = "";
  try {
    decoded = atob(header.slice(6));
  } catch {
    return UNAUTHORIZED;
  }

  const separator = decoded.indexOf(":");
  const user = decoded.slice(0, separator);
  const pass = decoded.slice(separator + 1);

  if (user === expectedUser && pass === expectedPass) {
    return next();
  }

  return UNAUTHORIZED;
}
