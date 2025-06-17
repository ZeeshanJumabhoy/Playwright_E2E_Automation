export const Selectors = {
    NAVIGATION: {
        SIGN_IN_BUTTON: 'button[data-e2e-link="LoginSignInButton"]',
        PROFILE_TOGGLE: 'button[data-e2e-link="toggleProfilePane"]',
        SIGN_OUT_BUTTON: 'button[data-e2e-link="LogOut"]'
    },
    LOGIN_PAGE: {
        EMAIL_INPUT: '#EmailAddress',
        PASSWORD_INPUT: '#Password', 
        SIGNIN_BUTTON: '#Signin'
    }
} as const;
