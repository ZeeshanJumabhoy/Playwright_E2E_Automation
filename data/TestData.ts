export class TestData {
    static readonly USER = {
        email: '20250618-44-gcajqykf@mailinator.com',
        password: 'Admin@123',
        expectedTitle: 'Home - 20250618-44-gcajqykf'
    };

    static readonly Video = {
        VideoTitle: 'Video_640x360_2mb',
        VideoPartialtext:'Video_640x360_2',
        VideoPartialtext2: 'Video_640x360_2',
        Video_Path: `C:\\Users\\Zeeshan.mustafa\\Downloads\\Video_640x360_2mb.mp4`,
        Video_Comment: "My First Comment on Video",
        Video_Comment_Search: "bob",
        New_Comment:"Hello World",
        Video_Comment_Delete:"Hello World",
        Add_To_Favorite:"Remove from Favorites"
    };

    static readonly Media = {
        expectedTitleForAddMedia: 'Add New Media - 20250618-44-gcajqykf',
        expectedTitleForUploadMedia: 'Upload Media - 20250618-44-gcajqykf',
    };

    static readonly ControlPanel = {
        expectedTitleForSecurityPolicy: 'Security Policy - 20250618-44-gcajqykf',
        expectedTitleForWorkflows: 'Workflow - 20250618-44-gcajqykf',
        VideoTitle2:'Video_640x360_2mb'
    }
}
