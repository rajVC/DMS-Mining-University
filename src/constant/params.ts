export const FIELD_PARAMS = {
  USER_TYPE: "user_type",
  UNIVERSITY_NAME: "university_name",
  ROLE_ID: "role_id",
  ASSIGN_LICENSE: "assign_license",
  FIRST_NAME: "first_name",
  LAST_NAME: "last_name",
  TOTAL_STUDENTS: "total_students",
  CREATED_AT: "created_at",
  EMAIL_SENT: "email_sent",
  STUDENT_NAME: "student_name",
  CLIENT_ID: "client_id",
  LICENSE_NUMBER: "license_number",
  NUM_LICENSES: "num_licenses",
  DAYS_VALID: "days_valid",
  SEED_NUMBER: "seed_number",
  NUM_OF_SEEDS: "seed_number",
  TOTAL_LICENSES: "total_licenses",
  EXPIRY_DATE : "expiry_date",
  SR_NUMBER : "sr_number",
  VALID_TILL : "valid_till",
  ASSIGNED_STATUS : "assigned_status",
  IS_ASSIGNED : "is_assigned",
  LICENSE_KEY : "license_key",
  LICENSE_STATUS: "license_status",
  TOTAL_UNIVERSITIES:"total_universities", 
  ASSIGNED_LICENSES: "assigned_licenses",
  UNASSIGNED_LICENSES: "unassigned_licenses",
  TOTAL_SEEDS:"total_seeds"
} as const;

// type FieldParamsType = keyof typeof FIELD_PARAMS;