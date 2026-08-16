/**
 * =========================================================================================
 * VENOVATION 26 — AUTOMATIC GOOGLE SHEETS REGISTRATION SYNC SCRIPT
 * =========================================================================================
 * 
 * Follow these 4 quick steps to connect your website directly to your Google Spreadsheet:
 * 
 * 1. Open Google Sheets (https://sheets.new) and name it: "VENOVATION 26 Registrations"
 * 2. In the top menu, click Extensions > Apps Script.
 * 3. Delete any code in the editor and paste THIS ENTIRE FILE.
 * 4. Click "Deploy" (top-right blue button) > "New deployment"
 *    - Select type: "Web app"
 *    - Description: "Venovation 26 Webhook"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (important so your website can send registrations)
 *    - Click "Deploy" and Copy the Web App URL!
 * 5. Paste the URL into your project's .env file:
 *    VITE_GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
 * 
 * That's it! Every new registration will now instantly appear in your Google Sheet!
 * =========================================================================================
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create Header row if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Registration ID",
        "Full Name",
        "Gender",
        "Email",
        "Phone",
        "College Name",
        "Student Dept",
        "Course",
        "Semester",
        "Fest Department",
        "Program Name",
        "Category",
        "Participation Mode",
        "Team Name",
        "Team Leader",
        "Team Members",
        "Address",
        "District",
        "State",
        "Pincode",
        "Status"
      ]);
      
      // Style Header Row (Electric Blue & Bold)
      var headerRange = sheet.getRange(1, 1, 1, 22);
      headerRange.setBackground("#0052FF");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    
    // Parse incoming registration payload
    var data = JSON.parse(e.postData.contents);
    
    var timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var regId = data.registration_id || "N/A";
    var fullName = data.full_name || "N/A";
    var gender = data.gender || "N/A";
    var email = data.email || "N/A";
    var phone = data.phone || "N/A";
    var college = data.college_name || "N/A";
    var dept = data.department || "N/A";
    var course = data.course || "N/A";
    var semester = data.semester || "N/A";
    var festDept = (data.selected_department_id || "N/A").toUpperCase();
    var progName = data.program_name || "N/A";
    var category = data.category || "N/A";
    var mode = data.participation_type || "N/A";
    var teamName = data.team_name || "N/A";
    var teamLeader = data.team_leader || "N/A";
    var teamMembers = (data.team_members && data.team_members.length > 0) ? data.team_members.join(", ") : "N/A";
    var address = data.address || "N/A";
    var district = data.district || "N/A";
    var state = data.state || "N/A";
    var pincode = data.pincode || "N/A";
    var status = data.status || "Confirmed";
    
    // Append candidate row
    sheet.appendRow([
      timestamp,
      regId,
      fullName,
      gender,
      email,
      phone,
      college,
      dept,
      course,
      semester,
      festDept,
      progName,
      category,
      mode,
      teamName,
      teamLeader,
      teamMembers,
      address,
      district,
      state,
      pincode,
      status
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success", "id": regId }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("VENOVATION 26 Google Sheets Sync Webhook is Active and Healthy!");
}
