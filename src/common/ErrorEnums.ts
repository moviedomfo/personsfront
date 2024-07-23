
/**
 * Ex types
 */
export enum ErrorTypeEnum {
  FunctionalException = "FunctionalException",
  TecnicalException = "TecnicalException",
  SecurityException = "SecurityException",
}

export enum ErrorCodeEnum {
  /** Generoing error id when some parameter does not come in the  requets.body. And no other
   * erroerror code was spesified by bussiness rules
   */
  PARAMETER_REQUIRED = "100",
  AUTH_REFRESH_TOKEN_REQUIRED = "200",
  AUTH_REFRESH_TOKEN_EXPIRED = "201",
  AUTH_JWT_TOKEN_REQUIRED = "202",
  AUTH_JWT_TOKEN_EXPIRED = "203",
  LOGIN_USER_2FA_FAIL = "1910",
  LOGIN_USER_2FA_CodeRequested = "1911",

  /**
   * Connection timeout . Server es busy or not exist
   */
  SEQUALIZE_TIMEOUT = "5000",
  /**
   * User or password is not correct to connect
   */
  SEQUALIZE_ELOGIN = "5001",
  /**
   * SequelizeDatabaseError
   */
  SEQUALIZE_DATA = "5002",
  KAFKA_TIMEOUT = "5100",
  KAFKA_TOPIC_NOT_EXIST = "5101",
  MONGO_TIMEOUT = "5200",
  REDIS = "5300",
  REDIS_NOAUTH = "5301",

}
