function forgotPassword(origin: string, token: string) {
  return `<a href="${origin}/forgot-password/${token}">Confirm your new password</a>`;
}

function changedPassword() {
  return `<p>Your password was successfully changed!</a>`;
}

export default {
  forgotPassword,
  changedPassword,
};
