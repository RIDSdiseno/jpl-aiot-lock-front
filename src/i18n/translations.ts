import type { AppLanguage } from "./types";

// ─── Login ────────────────────────────────────────────────────────────────────

export interface LoginSection {
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
  footer: {
    system: string;
    secure: string;
  };
  status: {
    online: string;
  };
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavSection {
  platform: string;
  home: string;
  monitoring: string;
  control: string;
  controlNfc: string;
  controlPassword: string;
  controlCmdRecord: string;
  controlPreset: string;
  controlParameter: string;
  events: string;
  eventsAll: string;
  eventsAlarm: string;
  eventsPush: string;
  gis: string;
  alerts: string;
  reports: string;
  audit: string;
  devices: string;
  smartLocks: string;
  maintenance: string;
  history: string;
  userCenter?: string;
  organization?: string;
  permission?: string;
  users: string;
  companies: string;
}

export interface ControlSection {
  title: string;
  nfc: string;
  password: string;
  cmdRecord: string;
  preset: string;
  parameter: string;
  all: string;
  online: string;
  offline: string;
  companyDeviceInfo: string;
  selectDevice: string;
  noDeviceSelected: string;
  block: string;
  block1: string;
  read: string;
  addCardNumber: string;
  sync: string;
  clearData: string;
  currentWritingIcCard: string;
  cardNumber: string;
  enterCardNumber: string;
  delete: string;
  readBeforeSyncWarning: string;
  clearNfcConfirm: string;
  unlockDynamicPassword: string;
  update: string;
  passwordSecurityTip: string;
  offlinePasswordWarning: string;
  presetDescription: string;
  batchCardBinding: string;
  confirm: string;
  cancel: string;
  parameterReadTime: string;
  parameterUpdate: string;
  reservationCmdRecord: string;
  reservationCmd: string;
  readParametersFirstWarning: string;
}

// ─── Header ───────────────────────────────────────────────────────────────────

export interface HeaderSection {
  currentCompany: string;
  operationCenter: string;
  logout: string;
  envDevelopment: string;
  envStaging: string;
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export interface DashboardSection {
  pageTitle: string;
  pageSubtitle: string;
  loading: string;
  deviceTypes: {
    smartLock: string;
    smartSensor: string;
    gpsTracker: string;
    eSeal: string;
    smartGateway: string;
    smartBox: string;
  };
  lockUnlockTrend: {
    title: string;
    seal: string;
    unseal: string;
  };
  operationRatio: {
    title: string;
    totalDevices: string;
    online: string;
    offline: string;
    alarm: string;
  };
  alarmEvents: {
    title: string;
    deviceId: string;
    dateTime: string;
    type: string;
    description: string;
    severity: string;
    noData: string;
  };
  systemMessages: {
    title: string;
    noMessages: string;
  };
  quickAccess: {
    title: string;
  };
}

// ─── Common ───────────────────────────────────────────────────────────────────

export interface CommonSection {
  loading: string;
  noData: string;
  noEvents: string;
  noMessages: string;
  error: string;
}

export interface GisSection {
  title: string;
  breadcrumbHome: string;
  breadcrumbGis: string;
  breadcrumbGeoFence: string;
  breadcrumbFenceRecord: string;
  fenceName: string;
  sendFence: string;
  batchDelete: string;
  fenceList: string;
  deviceFencesAndRules: string;
  selectFenceType: string;
  polygon: string;
  circle: string;
  searchLocation: string;
  noData: string;
  modify: string;
  delete: string;
  confirm: string;
  cancel: string;
  saveFence: string;
  selectDevice: string;
  getFenceRuleInfo: string;
  deviceList: string;
  block: string;
  block1: string;
  fenceRecord: string;
  all: string;
  online: string;
  offline: string;
  view: string;
  rules: string;
  status: string;
  operate: string;
  deviceId: string;
  deviceName: string;
  createTime: string;
  search: string;
  reset: string;
  stopSending: string;
  resend: string;
  viewDetail: string;
  stop: string;
  sendingProgress: string;
  queryType: string;
  storageBlock: string;
  result: string;
  clearResult: string;
  confirmDeleteFence: string;
  offlineWarning: string;
  remoteWarning: string;
}

// ─── Severity & event mappers ─────────────────────────────────────────────────

export interface SeveritySection {
  WARNING: string;
  CRITICAL: string;
  INFO: string;
  ALARM: string;
}

export interface AlarmTypeSection {
  lowBattery: string;
  unknown: string;
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export interface AppTranslations {
  login: LoginSection;
  nav: NavSection;
  header: HeaderSection;
  dashboard: DashboardSection;
  control: ControlSection;
  common: CommonSection;
  gis?: GisSection;
  devices?: Record<string, string>;
  history?: Record<string, string>;
  maintain?: Record<string, string>;
  userCenter?: Record<string, string>;
  audit?: Record<string, string>;
  severity: SeveritySection;
  alarmType: AlarmTypeSection;
}

// ─── Dictionary ───────────────────────────────────────────────────────────────

export const appTranslations: Record<AppLanguage, AppTranslations> = {
  // ═══════════════════════════════════════════════════════════════════════════
  es: {
    login: {
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
      footer: { system: "AIoT Lock System", secure: "● Seguro" },
      status: { online: "EN LÍNEA" },
    },
    nav: {
      platform: "Plataforma AIoT",
      home: "Inicio",
      monitoring: "Monitoreo",
      control: "Control",
      controlNfc: "NFC",
      controlPassword: "Contraseña",
      controlCmdRecord: "Registro CMD",
      controlPreset: "Preconfiguración",
      controlParameter: "Parámetros",
      events: "Eventos",
      eventsAll: "Todos los eventos",
      eventsAlarm: "Eventos de alarma",
      eventsPush: "Eventos push",
      gis: "GIS / Mapa",
      alerts: "Alertas",
      reports: "Reportes",
      audit: "Auditoría",
      devices: "Dispositivos",
      smartLocks: "Candados inteligentes",
      maintenance: "Mantenimiento",
      history: "Historial",
      users: "Usuarios",
      companies: "Empresas",
    },
    header: {
      currentCompany: "Empresa actual",
      operationCenter: "Centro de operación AIoT",
      logout: "Cerrar sesión",
      envDevelopment: "desarrollo",
      envStaging: "staging",
    },
    dashboard: {
      pageTitle: "Inicio / Dashboard",
      pageSubtitle: "Resumen operacional de JPL-AIOT-LOCK.",
      loading: "Cargando Dashboard...",
      deviceTypes: {
        smartLock: "Candado inteligente",
        smartSensor: "Sensor inteligente",
        gpsTracker: "Rastreador GPS",
        eSeal: "Sello electrónico",
        smartGateway: "Gateway inteligente",
        smartBox: "Caja inteligente",
      },
      lockUnlockTrend: {
        title: "Tendencia de bloqueo/desbloqueo",
        seal: "Bloquear",
        unseal: "Desbloquear",
      },
      operationRatio: {
        title: "Proporción operacional de equipos",
        totalDevices: "Total de dispositivos",
        online: "En línea",
        offline: "Fuera de línea",
        alarm: "Alarma",
      },
      alarmEvents: {
        title: "Eventos de alarma",
        deviceId: "ID dispositivo",
        dateTime: "Fecha/Hora",
        type: "Tipo",
        description: "Descripción",
        severity: "Severidad",
        noData: "No hay datos disponibles",
      },
      systemMessages: {
        title: "Mensajes del sistema",
        noMessages: "Sin mensajes",
      },
      quickAccess: { title: "Otros sistemas gestionados" },
    },
    control: {
      title: "Control",
      nfc: "NFC",
      password: "Contraseña",
      cmdRecord: "Registro CMD",
      preset: "Preconfiguración",
      parameter: "Parámetros",
      all: "Todos",
      online: "En línea",
      offline: "Fuera de línea",
      companyDeviceInfo: "Empresa / información del dispositivo",
      selectDevice: "Seleccione un dispositivo",
      noDeviceSelected: "No hay dispositivo seleccionado",
      block: "Bloque",
      block1: "Bloque 1",
      read: "Leer",
      addCardNumber: "Agregar número de tarjeta",
      sync: "Sincronizar",
      clearData: "Limpiar datos",
      currentWritingIcCard: "Tarjetas NFC actuales para el Bloque {{block}}",
      cardNumber: "Número de tarjeta",
      enterCardNumber: "Ingrese el número de tarjeta",
      delete: "Eliminar",
      readBeforeSyncWarning: "Antes de sincronizar debes leer las tarjetas actuales del dispositivo. De lo contrario podrías eliminar las tarjetas existentes.",
      clearNfcConfirm: "Esta acción eliminará todas las tarjetas NFC vinculadas al dispositivo. ¿Deseas continuar?",
      unlockDynamicPassword: "Contraseña dinámica de desbloqueo",
      update: "Actualizar",
      passwordSecurityTip: "Consejo: No reveles la contraseña a operadores no autorizados.",
      offlinePasswordWarning: "El dispositivo está fuera de línea. La contraseña mostrada puede ser la última disponible.",
      presetDescription: "Si el dispositivo no está en línea, se pueden emitir instrucciones reservadas en lote. El dispositivo las aceptará y ejecutará cuando vuelva a estar en línea.",
      batchCardBinding: "Vinculación de tarjetas por lote",
      confirm: "Confirmar",
      cancel: "Cancelar",
      parameterReadTime: "Hora de lectura de parámetros",
      parameterUpdate: "Actualizar parámetros",
      reservationCmdRecord: "Registro de comandos reservados",
      reservationCmd: "Comando reservado",
      readParametersFirstWarning: "Se recomienda leer los parámetros actuales antes de actualizar.",
    },
    common: {
      loading: "Cargando...",
      noData: "No hay datos disponibles",
      noEvents: "No hay eventos",
      noMessages: "Sin mensajes",
      error: "Error al cargar información",
    },
    gis: {
      title: "GIS / Geo-Cercas",
      breadcrumbHome: "Inicio",
      breadcrumbGis: "GIS",
      breadcrumbGeoFence: "Geo-Cercas",
      breadcrumbFenceRecord: "Registro de geocercas",
      fenceName: "Nombre de geocerca",
      sendFence: "Enviar geocerca",
      batchDelete: "Eliminar por lote",
      fenceList: "Lista de geocercas",
      deviceFencesAndRules: "Geocercas y reglas del dispositivo",
      selectFenceType: "Seleccione el tipo de geocerca a dibujar:",
      polygon: "Poligono",
      circle: "Circulo",
      searchLocation: "Buscar ubicacion o ruta",
      noData: "Sin datos",
      modify: "Modificar",
      delete: "Eliminar",
      confirm: "Confirmar",
      cancel: "Cancelar",
      saveFence: "Guardar geocerca",
      selectDevice: "Seleccionar dispositivo",
      getFenceRuleInfo: "Obtener informacion de geocercas y reglas",
      deviceList: "Lista de dispositivos",
      block: "Bloque",
      block1: "Bloque 1",
      fenceRecord: "Registro de geocercas",
      all: "Todos",
      online: "En linea",
      offline: "Fuera de linea",
      view: "Ver",
      rules: "Reglas",
      status: "Estado",
      operate: "Operar",
      deviceId: "ID dispositivo",
      deviceName: "Nombre dispositivo",
      createTime: "Fecha de creacion",
      search: "Buscar",
      reset: "Restablecer",
      stopSending: "Detener envio",
      resend: "Reenviar",
      viewDetail: "Ver detalle",
      stop: "Detener",
      sendingProgress: "Progreso de envio",
      queryType: "Tipo de consulta",
      storageBlock: "Bloque de almacenamiento",
      result: "Resultado",
      clearResult: "Limpiar resultado",
      confirmDeleteFence: "Esta operacion eliminara permanentemente la geocerca. Deseas continuar?",
      offlineWarning: "El dispositivo esta offline. El comando quedara pendiente o puede fallar.",
      remoteWarning: "Si esta regla esta activa, el dispositivo no podra ser desellado remotamente fuera de la geocerca.",
    },
    severity: {
      WARNING: "Advertencia",
      CRITICAL: "Crítica",
      INFO: "Información",
      ALARM: "Alarma",
    },
    alarmType: {
      lowBattery: "Alarma por bajo nivel de batería",
      unknown: "Evento desconocido",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  en: {
    login: {
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
      footer: { system: "AIoT Lock System", secure: "● Secure" },
      status: { online: "ONLINE" },
    },
    nav: {
      platform: "AIoT Platform",
      home: "Home",
      monitoring: "Monitoring",
      control: "Control",
      controlNfc: "NFC",
      controlPassword: "Password",
      controlCmdRecord: "CMD Record",
      controlPreset: "Preset",
      controlParameter: "Parameter",
      events: "Events",
      eventsAll: "All Events",
      eventsAlarm: "Alarm Events",
      eventsPush: "Push Events",
      gis: "GIS / Map",
      alerts: "Alerts",
      reports: "Reports",
      audit: "Audit",
      devices: "Devices",
      smartLocks: "Smart Locks",
      maintenance: "Maintenance",
      history: "History",
      users: "Users",
      companies: "Companies",
    },
    header: {
      currentCompany: "Current company",
      operationCenter: "AIoT operation center",
      logout: "Sign out",
      envDevelopment: "development",
      envStaging: "staging",
    },
    dashboard: {
      pageTitle: "Home / Dashboard",
      pageSubtitle: "Operational summary of JPL-AIOT-LOCK.",
      loading: "Loading Dashboard...",
      deviceTypes: {
        smartLock: "Smart Lock",
        smartSensor: "Smart Sensor",
        gpsTracker: "GPS Tracker",
        eSeal: "E-Seal",
        smartGateway: "Smart Gateway",
        smartBox: "Smart Box",
      },
      lockUnlockTrend: {
        title: "Frequency trend of lock/unlock",
        seal: "Seal",
        unseal: "Unseal",
      },
      operationRatio: {
        title: "Equipment operation ratio",
        totalDevices: "Total devices",
        online: "Online",
        offline: "Offline",
        alarm: "Alarm",
      },
      alarmEvents: {
        title: "Alarm Events",
        deviceId: "Device ID",
        dateTime: "Date/Time",
        type: "Type",
        description: "Description",
        severity: "Severity",
        noData: "No data available",
      },
      systemMessages: {
        title: "System Messages",
        noMessages: "No messages",
      },
      quickAccess: { title: "Other systems managed" },
    },
    control: {
      title: "Control",
      nfc: "NFC",
      password: "Password",
      cmdRecord: "CMD Record",
      preset: "Preset",
      parameter: "Parameter",
      all: "All",
      online: "On-line",
      offline: "Off-line",
      companyDeviceInfo: "Company/Device Info",
      selectDevice: "Select device",
      noDeviceSelected: "No device selected",
      block: "Block",
      block1: "Block 1",
      read: "Read",
      addCardNumber: "Add card number",
      sync: "Sync",
      clearData: "Clear data",
      currentWritingIcCard: "Current writing IC card for Block {{block}}",
      cardNumber: "Card number",
      enterCardNumber: "Please enter the card number",
      delete: "Delete",
      readBeforeSyncWarning: "Before synchronizing, click Read first. Otherwise, the original card numbers may be cleared.",
      clearNfcConfirm: "This action will clear all NFC card binding data. Do you want to continue?",
      unlockDynamicPassword: "Unlock dynamic password",
      update: "Update",
      passwordSecurityTip: "Tips: Do not reveal the password to non-eLock operators.",
      offlinePasswordWarning: "The device is offline. The displayed password may be the last available one.",
      presetDescription: "If the device is not online, reservation instructions can be issued in batches. The device will accept and execute them after it comes online.",
      batchCardBinding: "Batch card binding",
      confirm: "Confirm",
      cancel: "Cancel",
      parameterReadTime: "Parameter read time",
      parameterUpdate: "Parameter update",
      reservationCmdRecord: "Reservation CMD record",
      reservationCmd: "Reservation CMD",
      readParametersFirstWarning: "It is recommended to read current parameters before updating.",
    },
    common: {
      loading: "Loading...",
      noData: "No data available",
      noEvents: "No events",
      noMessages: "No messages",
      error: "Error loading information",
    },
    gis: {
      title: "GIS / Geo-Fence",
      breadcrumbHome: "Home",
      breadcrumbGis: "GIS",
      breadcrumbGeoFence: "Geo-Fence",
      breadcrumbFenceRecord: "Fence Record",
      fenceName: "Fence name",
      sendFence: "Send fence",
      batchDelete: "Batch delete",
      fenceList: "Fence List",
      deviceFencesAndRules: "Device fences and rules",
      selectFenceType: "Please select fence type to draw:",
      polygon: "Polygon",
      circle: "Circle",
      searchLocation: "Search location, find route",
      noData: "No Data",
      modify: "Modify",
      delete: "Delete",
      confirm: "Confirm",
      cancel: "Cancel",
      saveFence: "Save fence",
      selectDevice: "Select device",
      getFenceRuleInfo: "Get fence and rule information",
      deviceList: "Device List",
      block: "Block",
      block1: "Block 1",
      fenceRecord: "Fence Record",
      all: "All",
      online: "Online",
      offline: "Offline",
      view: "View",
      rules: "Rules",
      status: "Status",
      operate: "Operate",
      deviceId: "Device ID",
      deviceName: "Device name",
      createTime: "Create time",
      search: "Search",
      reset: "Reset",
      stopSending: "Stop sending",
      resend: "Resend",
      viewDetail: "View detail",
      stop: "Stop",
      sendingProgress: "Sending progress",
      queryType: "Query type",
      storageBlock: "Storage block",
      result: "Result",
      clearResult: "Clear result",
      confirmDeleteFence: "This operation will permanently delete the geo-fence. Continue?",
      offlineWarning: "The device is offline. The command will remain pending or may fail.",
      remoteWarning: "If this rule is active, the device cannot be remotely unsealed outside the geo-fence.",
    },
    severity: {
      WARNING: "Warning",
      CRITICAL: "Critical",
      INFO: "Info",
      ALARM: "Alarm",
    },
    alarmType: {
      lowBattery: "Low battery threshold alarm",
      unknown: "Unknown event",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  zh: {
    login: {
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
        description: "基于物联网技术的智能门禁控制，实时监控，电子围栏和设备管理。",
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
      footer: { system: "AIoT Lock 系统", secure: "● 安全" },
      status: { online: "在线" },
    },
    nav: {
      platform: "AIoT 平台",
      home: "首页",
      monitoring: "监控",
      control: "控制",
      controlNfc: "NFC",
      controlPassword: "密码",
      controlCmdRecord: "CMD 记录",
      controlPreset: "预设",
      controlParameter: "参数",
      events: "事件",
      eventsAll: "所有事件",
      eventsAlarm: "告警事件",
      eventsPush: "推送事件",
      gis: "GIS / 地图",
      alerts: "告警",
      reports: "报表",
      audit: "审计",
      devices: "设备",
      smartLocks: "智能锁",
      maintenance: "维护",
      history: "历史记录",
      users: "用户",
      companies: "公司",
    },
    header: {
      currentCompany: "当前公司",
      operationCenter: "AIoT 运营中心",
      logout: "退出登录",
      envDevelopment: "开发环境",
      envStaging: "预发布",
    },
    dashboard: {
      pageTitle: "首页 / 仪表板",
      pageSubtitle: "JPL-AIOT-LOCK 运营摘要。",
      loading: "正在加载仪表板...",
      deviceTypes: {
        smartLock: "智能锁",
        smartSensor: "智能传感器",
        gpsTracker: "GPS 跟踪器",
        eSeal: "电子封条",
        smartGateway: "智能网关",
        smartBox: "智能箱",
      },
      lockUnlockTrend: {
        title: "上锁/解锁频率趋势",
        seal: "上锁",
        unseal: "解锁",
      },
      operationRatio: {
        title: "设备运行比例",
        totalDevices: "设备总数",
        online: "在线",
        offline: "离线",
        alarm: "告警",
      },
      alarmEvents: {
        title: "告警事件",
        deviceId: "设备 ID",
        dateTime: "日期/时间",
        type: "类型",
        description: "描述",
        severity: "严重性",
        noData: "无可用数据",
      },
      systemMessages: {
        title: "系统消息",
        noMessages: "无消息",
      },
      quickAccess: { title: "其他管理系统" },
    },
    control: {
      title: "控制",
      nfc: "NFC",
      password: "密码",
      cmdRecord: "CMD 记录",
      preset: "预设",
      parameter: "参数",
      all: "全部",
      online: "在线",
      offline: "离线",
      companyDeviceInfo: "公司/设备信息",
      selectDevice: "选择设备",
      noDeviceSelected: "未选择设备",
      block: "区块",
      block1: "区块 1",
      read: "读取",
      addCardNumber: "添加卡号",
      sync: "同步",
      clearData: "清除数据",
      currentWritingIcCard: "区块 {{block}} 当前写入的 IC 卡",
      cardNumber: "卡号",
      enterCardNumber: "请输入卡号",
      delete: "删除",
      readBeforeSyncWarning: "同步前请先点击读取，否则原有卡号可能会被清除。",
      clearNfcConfirm: "此操作将清除所有 NFC 卡绑定数据，是否继续？",
      unlockDynamicPassword: "动态解锁密码",
      update: "更新",
      passwordSecurityTip: "提示：请勿向非授权电子锁操作员透露密码。",
      offlinePasswordWarning: "设备离线，显示的密码可能是最后一次可用密码。",
      presetDescription: "如果设备不在线，可以批量下发预约指令。设备上线后将接收并执行这些指令。",
      batchCardBinding: "批量绑卡",
      confirm: "确认",
      cancel: "取消",
      parameterReadTime: "参数读取时间",
      parameterUpdate: "参数更新",
      reservationCmdRecord: "预约 CMD 记录",
      reservationCmd: "预约 CMD",
      readParametersFirstWarning: "建议在更新前先读取当前参数。",
    },
    common: {
      loading: "加载中...",
      noData: "无可用数据",
      noEvents: "无事件",
      noMessages: "无消息",
      error: "加载信息时出错",
    },
    severity: {
      WARNING: "警告",
      CRITICAL: "严重",
      INFO: "信息",
      ALARM: "告警",
    },
    alarmType: {
      lowBattery: "低电量阈值告警",
      unknown: "未知事件",
    },
  },
};

appTranslations.es.devices = {
  title: "Dispositivos",
  totalNumber: "Total",
  totalOnline: "Total en linea",
  totalOffline: "Total fuera de linea",
  dormantCount: "Inactivos",
  refresh: "Actualizar",
  deviceType: "Tipo de dispositivo",
  productModel: "Modelo de producto",
  deviceId: "ID dispositivo",
  affiliatedCompany: "Empresa asociada",
  deviceName: "Nombre dispositivo",
  search: "Buscar",
  reset: "Limpiar",
  add: "Agregar",
  batchAdd: "Agregar por lote",
  batchModify: "Modificar por lote",
  batchDelete: "Eliminar por lote",
  batchAlarmPolicy: "Politica de alarma por lote",
  batchAssignCompanies: "Asignar empresas por lote",
  export: "Exportar",
  detail: "Detalle",
  slaveDevices: "Dispositivos esclavos",
  addDevice: "Agregar dispositivo",
  batchAddDevices: "Agregar dispositivos por lote",
  receivePhoneNumber: "Telefono receptor",
  receiveEmail: "Correo receptor",
  mobileSms: "SMS movil",
  email: "Correo electronico",
  enableAlarmPolicy: "Habilitar politica de alarma",
  confirm: "Confirmar",
  resetSelection: "Limpiar seleccion",
};
appTranslations.es.history = {
  title: "Historial",
  deviceHistoryData: "Historial de datos del dispositivo",
  reportTime: "Fecha reporte",
  reportType: "Tipo de reporte",
  realtimeData: "Datos en tiempo real",
  supplementaryData: "Datos suplementarios",
  columnSettings: "Configurar columnas",
};
appTranslations.es.maintain = {
  title: "Mantenimiento",
  firmware: "Firmware",
  ota: "OTA",
  diagnosis: "Diagnostico",
  upload: "Subir",
  firmwareUpload: "Subir firmware",
  versionName: "Nombre de version",
  description: "Descripcion",
  upgrade: "Actualizar",
  selectUpgradeFile: "Seleccionar archivo de actualizacion",
  upgradeRecord: "Registro de actualizacion",
};

appTranslations.en.devices = {
  title: "Device",
  totalNumber: "Total number",
  totalOnline: "Total online",
  totalOffline: "Total offline",
  dormantCount: "Dormant Count",
  refresh: "Refresh",
  deviceType: "Device type",
  productModel: "Product model",
  deviceId: "Device ID",
  affiliatedCompany: "Affiliated company",
  deviceName: "Device name",
  search: "Search",
  reset: "Reset",
  add: "Add",
  batchAdd: "Batch add",
  batchModify: "Batch modify device info",
  batchDelete: "Batch delete",
  batchAlarmPolicy: "Batch alarm policy",
  batchAssignCompanies: "Batch assign companies",
  export: "Export",
  detail: "Detail",
  slaveDevices: "Slave Devices",
  addDevice: "Add device",
  batchAddDevices: "Batch add devices",
  receivePhoneNumber: "Receive phone number",
  receiveEmail: "Receive email",
  mobileSms: "Mobile SMS",
  email: "E-mail",
  enableAlarmPolicy: "Enable alarm policy",
  confirm: "Confirm",
};
appTranslations.en.history = {
  title: "History",
  deviceHistoryData: "Device history data",
  reportTime: "Report time",
  reportType: "Report type",
  realtimeData: "Real-time data",
  supplementaryData: "Supplementary data",
  columnSettings: "Column settings",
};
appTranslations.en.maintain = {
  title: "Maintain",
  firmware: "Firmware",
  ota: "OTA",
  diagnosis: "Diagnosis",
  upload: "Upload",
  firmwareUpload: "Firmware upload",
  versionName: "Version name",
  description: "Description",
  upgrade: "Upgrade",
  selectUpgradeFile: "Select upgrade file",
  upgradeRecord: "Upgrade record",
};

appTranslations.zh.devices = {
  title: "设备",
  totalNumber: "总数",
  totalOnline: "在线总数",
  totalOffline: "离线总数",
  dormantCount: "休眠数量",
  refresh: "刷新",
  deviceType: "设备类型",
  productModel: "产品型号",
  deviceId: "设备 ID",
  affiliatedCompany: "所属公司",
  deviceName: "设备名称",
  search: "搜索",
  reset: "重置",
  add: "添加",
  batchAdd: "批量添加",
  batchModify: "批量修改设备信息",
  batchDelete: "批量删除",
  batchAlarmPolicy: "批量报警策略",
  batchAssignCompanies: "批量分配公司",
  export: "导出",
  detail: "详情",
  slaveDevices: "从属设备",
  addDevice: "添加设备",
  batchAddDevices: "批量添加设备",
  receivePhoneNumber: "接收手机号",
  receiveEmail: "接收邮箱",
  mobileSms: "手机短信",
  email: "电子邮件",
  enableAlarmPolicy: "启用报警策略",
  confirm: "确认",
};
appTranslations.zh.history = {
  title: "历史记录",
  deviceHistoryData: "设备数据历史记录",
  reportTime: "上报时间",
  reportType: "上报类型",
  realtimeData: "实时数据",
  supplementaryData: "补充数据",
  columnSettings: "列设置",
};
appTranslations.zh.maintain = {
  title: "维护",
  firmware: "固件",
  ota: "OTA",
  diagnosis: "诊断",
  upload: "上传",
  firmwareUpload: "上传固件",
  versionName: "版本名称",
  description: "描述",
  upgrade: "升级",
  selectUpgradeFile: "选择升级文件",
  upgradeRecord: "升级记录",
};
