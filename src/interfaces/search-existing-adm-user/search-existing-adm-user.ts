export interface IsearchExistingAdmUser {
  error: boolean;
  existingUser?: boolean;
  existingEmail?: boolean;
  statusCode?: number;
  errorMessage?: string;
}
