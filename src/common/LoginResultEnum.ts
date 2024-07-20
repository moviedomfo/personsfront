
/**
 * Enumeración de resultados de inicio de sesión con descripciones detalladas.
 */
export enum LoginResultEnum {

  /**
    * Inicio de sesión exitoso.
    */
  LOGIN_OK = 200,

  /**
   * Usuario no existe en el sistema.
   */
  LOGIN_USER_DOESNT_EXIST = 1900,

  /**
   * La cuenta del usuario está inactiva.
   */
  LOGIN_USER_ACCOUNT_INACTIVE = 1901,

  /**
   * Clave (contraseña) incorrecta.
   */
  LOGIN_USER_OR_PASSWORD_INCORRECT = 1902,

  /**
   * La cuenta de usuario está bloqueada.
   */
  LOGIN_USER_ACCOUNT_LOCKOUT = 1909,

  /**
   * La contraseña debe ser cambiada.
   */
  ERROR_PASSWORD_MUST_CHANGE = 1907,

  /**
   * Este mensaje de error puede deberse a cualquiera de las siguientes situaciones:
   * - La configuración de red del cliente es incorrecta. Esto incluye la ausencia de direcciones incorrectas para los servidores DNS para localizar y resolver los controladores de dominio.
   * - La configuración del cliente Winsock Proxy es incorrecta, impidiendo la resolución correcta de controladores de dominio disponibles y sus direcciones.
   * - La conectividad de red entre el cliente y los controladores de dominio descubiertos consultando DNS no está disponible.
   * - La comunicación a través de la red para el controlador de dominio funciona correctamente, pero devolvió una respuesta no válida al cliente.
   * - El controlador de dominio utilizado como origen de datos mientras está abierto el complemento se ha convertido en no disponible.
   */
  ERROR_SERVER_IS_NOT_OPERATIONAL = 1908,

  /**
   * La cuenta ha expirado.
   */
  ERROR_ACCOUNT_EXPIRED = 1793,

  /**
   * La contraseña ha expirado.
   */
  ERROR_PASSWORD_EXPIRED = 1330,

  /**
   * When you change the domain account password by using a 32-bit application on a 64-bit operating system that calls 
   * the NetUserChangePassword API, the password change returns an error message that resembles the following:
   */
  ERROR_LOGON_FAILURE = 1326,
  /**
    * Restricción en la cuenta.
    */
  ERROR_ACCOUNT_RESTRICTION = 1327,

  /**
   * La cuenta está deshabilitada.
   */
  ERROR_ACCOUNT_DISABLED = 1331,

  /**
   * Horas de inicio de sesión no válidas.
   */
  ERROR_INVALID_LOGON_HOURS = 1328,

  /**
   * No hay servidores de inicio de sesión disponibles.
   */
  ERROR_NO_LOGON_SERVERS = 1311,

  /**
   * Estación de trabajo no válida.
   */
  ERROR_INVALID_WORKSTATION = 1329,
}
