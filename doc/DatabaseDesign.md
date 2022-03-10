# Database Design

## Data Definition Language (DDL) commands
- CREATE TABLE course_table (CourseNumber INT, Dept VARCHAR(30), Description VARCHAR(255), Credits INT);
- CREATE TABLE genEdReq_table (CourseNumber INT, Dept VARCHAR(30), YearTerm VARCHAR(255), Title VARCHAR(255), ACP VARCHAR(30), CS VARCHAR(30), HUM VARCHAR(30), NAT VARCHAR(30), QR VARCHAR(30), SBS VARCHAR(30));
- CREATE TABLE professor_table (ID INT, Name VARCHAR(255), Dept VARCHAR(30));
- CREATE TABLE section_table (SectionID INT, ProfessorID INT, Professors VARCHAR(1000), CourseNumber INT, Dept VARCHAR(30), YearTerm VARCHAR(255),AvgGPA REAL);