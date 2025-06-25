export const SharedSelectors = {
    NAVIGATION: {
      SIGN_IN_BUTTON: 'button[data-e2e-link="LoginSignInButton"] >>nth=0',
      PROFILE_TOGGLE: 'button[data-e2e-link="toggleProfilePane"]',
      SIGN_OUT_BUTTON: 'button[data-e2e-link="LogOut"]'
    },
    CONTROL_PANEL: {
      workflows_Button: 'a[data-e2e-link="ControlPanelWorkflow"][href="/control-panel/workflow-queue"]',
      Video_row_locator: (objectid: string) => `tr[data-e2e-tr-workflow-object-id="${objectid}"]`,
      state_locator: '[data-e2e-td="workflow-state"]',
      percentage_locator: '[data-e2e-td="percentage"]',
      refresh_button: 'a[data-e2e-link="Refresh"]',
      upload_container: 'div[data-e2e-div="uploadContainer"] >>nth=0',
    }
  } as const;
  