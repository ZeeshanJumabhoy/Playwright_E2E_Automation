export const HomePageSelectors = {
    Search_INPUT: 'input[data-e2e-input="SearchForMedia"] >> nth=0',
    Search_Button: 'button[data-e2e-btn="SearchForMediaBtn"]',
    Video_Link: (text: string) => `a:has-text("${text}") >> nth=0`,
    // To click on the media button to add media and uploading as well
    Add_Media: 'a[data-e2e-link="addMediaRoute"]',
    UploadVideo: 'a[data-e2e-link="uploadMedia"]',
    AddVideo: 'a[data-e2e-link="uploadCtrl"]',
    uploadInput: 'input[type="file"][data-e2e-input="uploadCtrl"][title="File Upload"]',
    // To verify the video is uploaded
    toggle_Button: 'button[data-e2e-link="selectMenuBar"][aria-label="Click here to open Menu pane"]',
    controlPanel_Button: 'a[data-e2e-link="ControlPanel"][aria-label="click here to view control panel"]'
  } as const;
  