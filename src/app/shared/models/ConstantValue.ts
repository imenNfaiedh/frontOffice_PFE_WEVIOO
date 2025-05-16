export class ConstantValue {

  public static IDENTIFICATION_CIN_INPUT_SIZE: number = 8;
  public static IDENTIFICATION_FISCAL_NUMBER_INPUT_SIZE: number = 8;
  public static IDENTIFICATION_DEFAULT_INPUT_SIZE: number = 15;
  public static SIMPLE_USER_REGEX: RegExp = /^(?=.*[A-Z])(?=.*[\[\]éè"'{}()|?<>%!@#$&*_çàù£=/+-])(?=.*[0-9])(?=.*[a-z]).{8,50}$/;
  public static USER_NAME_REGEX: RegExp = /^[a-zA-Z0-9\u0621-\u064A]{3,50}/;
  public static IDENTIFICATION_NUMBER: RegExp = /^[a-zA-Z0-9]{2,50}/;
  public static ADMIN_REGEX: RegExp = /^(?=.*[A-Z])(?=.*[\[\]éè"'{}()|?<>%!@#$&*_çàù£=/+-])(?=.*[0-9])(?=.*[a-z]).{12,50}$/;
  public static MAIL_REGEX: RegExp =  /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/;
  public static SERVICE_PAYEMENT_LABEL: string = 'payement';
  public static PHONE_REGEX: RegExp = /^((\+|00)216)?([2579][0-9]{7}|(3[012]|4[01]|8[0128])[0-9]{6}|42[16][0-9]{5})$/;
  public static ONLYTEXT_REGEX: RegExp = /^[a-zA-Z\u0621-\u064A ]*$/;
  public static ZIPCODE_REGEX: RegExp = /^[0-9]{4}$/;
  public static CODE_PROGRAM_REGEX: RegExp = /^[a-zA-Z0-9\u0621-\u064A]{1,20}/;

  public static UPDATE_FORM_TITLE = 'Modifier';
  public static CREATE_FORM_TITLE = 'Ajouter';
  public static CREATE_FORM_BUTTON_TITLE = 'Ajouter';
  public static UPDATE_FORM_BUTTON_TITLE = 'Modifier';
  public static EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/;
  public static SAVE_FORM_BUTTON_TITLE = 'Enregistrer';
  public static DATE_REGEX_SLASH = /^(((0[1-9]|[12][0-9]|30)[/]?(0[13-9]|1[012])|31[/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[/]?02)[/]?[0-9]{4}|29[-/]?02?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$/;
}
