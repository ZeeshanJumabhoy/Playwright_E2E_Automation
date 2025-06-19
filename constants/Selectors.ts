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
        Video_Link: (text: string) => `a:has-text("${text}")`,
        // To click on the media button to add media and uploading as well
        Add_Media: 'a[data-e2e-link="addMediaRoute"]',
        UploadVideo: 'a[data-e2e-link="uploadMedia"]',
        AddVideo: 'a[data-e2e-link="uploadCtrl"]',
        SaveAndCloseButton: 'button[data-e2e-btn="SaveAndClose"]',
        uploadInput: 'input[type="file"][data-e2e-input="uploadCtrl"][title="File Upload"]',
        // To verify the video is uploaded
        toggle_Button: 'button[data-e2e-link="selectMenuBar"][aria-label="Click here to open Menu pane"]',
        controlPanel_Button: 'a[data-e2e-link="ControlPanel"][aria-label="click here to view control panel"]'
    },

    Video_Page: {
        Video_Heading: (text: string) => `h3:has-text("${text}")`,
        ThumbsUpButton: 'button[data-e2e-link="MashupDetailLikeMedia"]',
        HeartUpButton: 'a[data-e2e-link="MashupDetailAddToFavourite"]',
        comment: 'textarea[data-e2e-textarea="commentContent"]',
        Comment_Button: 'button[data-e2e-btn="Post"]',
        Comment_Section: 'div[data-e2e-div="allComments"]',
        Comment_Text: (text: string) => `div[data-e2e-div="${text}"]`,
        Edit_Button:'button[data-e2e-link="editComment"]',
        Update_Button: 'button[data-e2e-btn="Update"]',
        Delete_Button: 'button[data-e2e-link="deleteComment"]',

    },

    Control_Panel:{
        workflows_Button: 'a[data-e2e-link="ControlPanelWorkflow"][href="/control-panel/workflow-queue"]',

    }
} as const;