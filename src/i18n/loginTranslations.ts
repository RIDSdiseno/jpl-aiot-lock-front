export type LoginLanguage = "es" | "en" | "zh";

export interface LoginTranslations {
  languageLabel: string;
  spanish: string;
  english: string;
  chinese: string;
  brandLeft: string;
  brandCenter: string;
  brandRight: string;
  platformSubtitle: string;
  usernameLabel: string;
  usernamePlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  captchaLabel: string;
  captchaPlaceholder: string;
  loginButton: string;
  loginLoading: string;
  secureAccess: string;
  carousel: {
    subtitle: string;
    systemLabel: string;
    description: string;
    smartLock: string;
    bluetooth: string;
    gpsTracking: string;
    logistics: string;
    iotNetwork: string;
    lora: string;
    security: string;
    satellite: string;
    analytics: string;
    coverage: string;
  };
  errors: {
    requiredUser: string;
    requiredPassword: string;
    requiredCaptcha: string;
    invalidCaptcha: string;
    invalidCredentials: string;
  };
  featureCards: {
    sectionLabel: string;
    locks:    { title: string; desc: string };
    remote:   { title: string; desc: string };
    events:   { title: string; desc: string };
    audit:    { title: string; desc: string };
    tracking: { title: string; desc: string };
    nfc:      { title: string; desc: string };
  };
  footer: {
    system: string;
    secure: string;
  };
  status: {
    online: string;
  };
}

export const loginTranslations: Record<LoginLanguage, LoginTranslations> = {
  es: {
    languageLabel: "Idioma",
    spanish: "Español",
    english: "Inglés",
    chinese: "中文",
    brandLeft: "JPL AIoT Lock",
    brandCenter: "Sistema de Plataforma IoT",
    brandRight: "Acceso Inteligente",
    platformSubtitle: "JPL AIoT Lock Platform",
    usernameLabel: "Usuario",
    usernamePlaceholder: "Ingrese su nombre de usuario",
    passwordLabel: "Contraseña",
    passwordPlaceholder: "Ingrese su contraseña",
    captchaLabel: "Captcha",
    captchaPlaceholder: "Ingrese el captcha",
    loginButton: "Ingresar",
    loginLoading: "Iniciando sesión...",
    secureAccess: "Acceso seguro mediante token Bearer",
    carousel: {
      subtitle: "Plataforma de Control AIoT",
      systemLabel: "Sistema de Acceso Inteligente",
      description:
        "Control de acceso inteligente con tecnología IoT, monitoreo en tiempo real, geocercas y gestión de dispositivos.",
      smartLock: "Candado inteligente",
      bluetooth: "Bluetooth",
      gpsTracking: "Rastreo GPS",
      logistics: "Logística",
      iotNetwork: "Red IoT",
      lora: "LoRa",
      security: "Seguridad",
      satellite: "Satélite",
      analytics: "Analítica",
      coverage: "Cobertura",
    },
    errors: {
      requiredUser: "Ingresa tu usuario.",
      requiredPassword: "Ingresa tu contraseña.",
      requiredCaptcha: "Ingresa el captcha.",
      invalidCaptcha: "El captcha no coincide.",
      invalidCredentials: "Credenciales incorrectas o usuario inactivo.",
    },
    featureCards: {
      sectionLabel: "Capacidades del sistema",
      locks:    { title: "Candados IoT",       desc: "Gestión de dispositivos"   },
      remote:   { title: "Control remoto",     desc: "Comandos en tiempo real"   },
      events:   { title: "Eventos",            desc: "Monitoreo en tiempo real"  },
      audit:    { title: "Auditoría",          desc: "Seguridad y trazabilidad"  },
      tracking: { title: "Tracking GPS",       desc: "Rastreo y geocercas"       },
      nfc:      { title: "NFC / Contraseñas",  desc: "Accesos dinámicos"         },
    },
    footer: {
      system: "AIoT Lock System",
      secure: "● Seguro",
    },
    status: {
      online: "EN LÍNEA",
    },
  },
  en: {
    languageLabel: "Language",
    spanish: "Spanish",
    english: "English",
    chinese: "中文",
    brandLeft: "JPL AIoT Lock",
    brandCenter: "IoT Platform System",
    brandRight: "Smart Access",
    platformSubtitle: "JPL AIoT Lock Platform",
    usernameLabel: "Username",
    usernamePlaceholder: "Enter your username",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    captchaLabel: "Captcha",
    captchaPlaceholder: "Enter the captcha",
    loginButton: "Login",
    loginLoading: "Signing in...",
    secureAccess: "Secure access via Bearer token",
    carousel: {
      subtitle: "AIoT Control Platform",
      systemLabel: "Smart Access Control System",
      description:
        "Smart access control with IoT technology, real-time monitoring, geofences and device management.",
      smartLock: "Smart Lock",
      bluetooth: "Bluetooth",
      gpsTracking: "GPS Tracking",
      logistics: "Logistics",
      iotNetwork: "IoT Network",
      lora: "LoRa",
      security: "Security",
      satellite: "Satellite",
      analytics: "Analytics",
      coverage: "Coverage",
    },
    errors: {
      requiredUser: "Username is required.",
      requiredPassword: "Password is required.",
      requiredCaptcha: "Please enter the captcha.",
      invalidCaptcha: "The captcha code does not match.",
      invalidCredentials: "Invalid credentials or inactive user.",
    },
    featureCards: {
      sectionLabel: "System capabilities",
      locks:    { title: "IoT Locks",          desc: "Device management"         },
      remote:   { title: "Remote Control",     desc: "Real-time commands"        },
      events:   { title: "Events",             desc: "Real-time monitoring"      },
      audit:    { title: "Audit",              desc: "Security & traceability"   },
      tracking: { title: "GPS Tracking",       desc: "Tracking & geofences"      },
      nfc:      { title: "NFC / Passwords",    desc: "Dynamic access"            },
    },
    footer: {
      system: "AIoT Lock System",
      secure: "● Secure",
    },
    status: {
      online: "ONLINE",
    },
  },
  zh: {
    languageLabel: "语言",
    spanish: "西班牙语",
    english: "英语",
    chinese: "中文",
    brandLeft: "JPL AIoT Lock",
    brandCenter: "物联网平台系统",
    brandRight: "智能访问",
    platformSubtitle: "JPL AIoT Lock 平台",
    usernameLabel: "用户名",
    usernamePlaceholder: "请输入用户名",
    passwordLabel: "密码",
    passwordPlaceholder: "请输入密码",
    captchaLabel: "验证码",
    captchaPlaceholder: "请输入验证码",
    loginButton: "登录",
    loginLoading: "正在登录...",
    secureAccess: "通过 Bearer 令牌安全访问",
    carousel: {
      subtitle: "AIoT 控制平台",
      systemLabel: "智能门禁控制系统",
      description:
        "基于物联网技术的智能门禁控制，实时监控，电子围栏和设备管理。",
      smartLock: "智能锁",
      bluetooth: "蓝牙",
      gpsTracking: "GPS 跟踪",
      logistics: "物流",
      iotNetwork: "IoT 网络",
      lora: "LoRa",
      security: "安全",
      satellite: "卫星",
      analytics: "分析",
      coverage: "覆盖",
    },
    errors: {
      requiredUser: "请输入用户名。",
      requiredPassword: "请输入密码。",
      requiredCaptcha: "请输入验证码。",
      invalidCaptcha: "验证码不匹配。",
      invalidCredentials: "凭据不正确或用户未激活。",
    },
    featureCards: {
      sectionLabel: "系统功能",
      locks:    { title: "IoT 智能锁",    desc: "设备管理"       },
      remote:   { title: "远程控制",      desc: "实时命令"       },
      events:   { title: "事件",          desc: "实时监控"       },
      audit:    { title: "审计",          desc: "安全与追溯"     },
      tracking: { title: "GPS 追踪",      desc: "追踪与电子围栏" },
      nfc:      { title: "NFC / 密码",    desc: "动态访问"       },
    },
    footer: {
      system: "AIoT Lock 系统",
      secure: "● 安全",
    },
    status: {
      online: "在线",
    },
  },
};
