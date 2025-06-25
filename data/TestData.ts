export class TestData {
    static readonly USER = {
        email: '20250618-44-gcajqykf@mailinator.com',
        password: 'Admin@123',
        expectedTitle: 'Home - 20250618-44-gcajqykf'
    };

    static readonly Video = {
        VideoPartialtext: 'Video_640x360_68mb',
        Video_Path: `C:\\Users\\Zeeshan.mustafa\\Downloads\\Video_640x360_68mb.mp4`,
        Video_Comment: `My First Comment on Video ${Math.floor(Math.random() * 1000000)}`,
        Video_Comment_Edit: `My First Comment on Video ${Math.floor(Math.random() * 1000000)}`,
        Video_Comment_To_Delete: `My First Comment on Video ${Math.floor(Math.random() * 1000000)}`,
        New_Comment: "Hello World",
        Add_To_Favorite: "Remove from Favorites",
        Video_Page_Title: (text: string) => `${text} - 20250618-44-gcajqykf`,
    };

    static readonly Media = {
        expectedTitleForAddMedia: 'Add New Media - 20250618-44-gcajqykf',
        expectedTitleForUploadMedia: 'Upload Media - 20250618-44-gcajqykf',
    };

    static readonly ControlPanel = {
        expectedTitleForSecurityPolicy: 'Security Policy - 20250618-44-gcajqykf',
        expectedTitleForWorkflows: 'Workflow - 20250618-44-gcajqykf'
    }
}
