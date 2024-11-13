export interface UserProfile {
  id?: string;               // The user's ID
  username?: string;         // The username
  email?: string;            // The user's email
  firstName?: string;        // First name
  lastName?: string;         // Last name
  roles?: string[];          // User roles
  token?: string;            // JWT token, if needed
}
