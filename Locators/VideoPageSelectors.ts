export const VideoPageSelectors = {
    Video_Heading: (text: string) => `[data-e2e-div="${text}"]`,
    ThumbsUpButton: 'button[data-e2e-link="MashupDetailLikeMedia"]',
    Like_Count_After: 'span[data-e2e-span*="MashupDetailUnlikeMedia"] >>nth=0',
    HeartUpButton: 'a[data-e2e-link="MashupDetailAddToFavourite"]',
    comment: 'textarea[data-e2e-textarea="commentContent"]',
    Comment_Button: 'button[data-e2e-btn="Post"]',
    Comment_Section: 'div[data-e2e-div="allComments"]',
    Comment_Text: (text: string) => `div[data-e2e-div="${text}"] >>nth=0`,
    Edit_Button:'button[data-e2e-link="editComment"]',
    Update_Button: 'button[data-e2e-btn="Update"]',
    Delete_Button: 'button[data-e2e-link="deleteComment"]',
    Play_Video: 'vjs-big-play-button',
    Click_Video: (text: string) => `div[date-e2e-mashupid="${text}"]`,
    Video_Hyper: 'a[href*="/play/video/"]>>nth=0',

  } as const;

  