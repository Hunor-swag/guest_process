export function checkPasswordStrength(password: string) {
  let strength = 0;

  // Check if password meets minimum length requirement
  if (password.length >= 8) {
    strength++;
  }

  // Check if password contains at least one uppercase letter
  if (/[A-Z]/.test(password)) {
    strength++;
  }

  // Check if password contains at least one lowercase letter
  if (/[a-z]/.test(password)) {
    strength++;
  }

  // Check if password contains at least one number
  if (/\d/.test(password)) {
    strength++;
  }

  // Check if password contains special characters
  if (/[$-/:-?{-~!"^_`\[\]]/.test(password)) {
    strength++;
  }

  strength--;
  return strength;
}
