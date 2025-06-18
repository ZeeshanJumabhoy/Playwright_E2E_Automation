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
    },

    Main_PAGE: {
        Search_INPUT: 'input[data-e2e-input="SearchForMedia"]',
        Search_Button: 'button[data-e2e-btn="SearchForMediaBtn"]',
        Video_Link: (text: string) => `a:has-text("${text}")`
    },

    Video_Page:{
        Video_Heading: (text: string) => `h3:has-text("${text}")`
    }
} as const;