package server;

import org.subethamail.smtp.AuthenticationHandler;

final class SMTPAuthHandler implements AuthenticationHandler {
    private static final String USER_IDENTITY = "User";
    private static final String PROMPT_USERNAME = "334 VXNlcm5hbWU6"; // VXNlcm5hbWU6 is base64 for "Username:"
    private static final String PROMPT_PASSWORD = "334 UGFzc3dvcmQ6"; // UGFzc3dvcmQ6 is base64 for "Password:"

    private int pass = 0;

    @Override
    public String auth(String clientInput) {
        String prompt;

        if (++pass == 1) {
            prompt = SMTPAuthHandler.PROMPT_USERNAME;
        } else if (pass == 2) {
            prompt = SMTPAuthHandler.PROMPT_PASSWORD;
        } else {
            pass = 0;
            prompt = null;
        }
        return prompt;
    }

    @Override
    public Object getIdentity() {
        return SMTPAuthHandler.USER_IDENTITY;
    }
}
