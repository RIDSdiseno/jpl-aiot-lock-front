import type { AppLanguage } from "./types";

const messages: Record<string, Record<AppLanguage, string>> = {
  DEVICE_NOT_FOUND: {
    es: "Dispositivo no encontrado.",
    en: "Device not found.",
    zh: "设备未找到。",
  },
  INVALID_PARAMETER_VALUE: {
    es: "Valor de parametro invalido.",
    en: "Invalid parameter value.",
    zh: "参数值无效。",
  },
  USER_NOT_FOUND: {
    es: "Usuario no encontrado.",
    en: "User not found.",
    zh: "用户未找到。",
  },
};

export function translateErrorMessage(codeOrMessage: string | undefined, language: AppLanguage): string {
  if (!codeOrMessage) return "";
  return messages[codeOrMessage]?.[language] ?? messages[codeOrMessage]?.en ?? codeOrMessage;
}

