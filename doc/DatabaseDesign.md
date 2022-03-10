# Database Design

## Data Definition Language (DDL) commands

**Course(CourseNumber,Dept,Description,Credits)**
```sql
CREATE TABLE Course (
    CourseNumber INT PRIMARY KEY NOT NULL, 
    Dept VARCHAR(30) PRIMARY KEY NOT NULL, 
    Description VARCHAR(255), 
    Credits INT
); 
```

**GenEdReq(CourseNumber,Dept,YearTerm,Title,ACP,CS,HUM,NAT,QR,SBS)**
```sql
CREATE TABLE GenEdReq (
    CourseNumber INT PRIMARY KEY NOT NULL, 
    Dept VARCHAR(30) PRIMARY KEY NOT NULL, 
    YearTerm VARCHAR(255) PRIMARY KEY, 
    Title VARCHAR(255), 
    ACP VARCHAR(30), 
    CS VARCHAR(30), 
    HUM VARCHAR(30), 
    NAT VARCHAR(30), 
    QR VARCHAR(30), 
    SBS VARCHAR(30),
    FOREIGN KEY(CourseNumber) REFERENCES Course(CourseNumber) ON DELETE CASCADE, 
    FOREIGN KEY(Dept) REFERENCES Course(Dept) ON DELETE CASCADE
); 
```

**Professor(ID,Name,Dept)**
```sql
CREATE TABLE Professor (
    ID INT PRIMARY KEY NOT NULL, 
    Name VARCHAR PRIMARY KEY NOT NULL, 
    Dept VARCHAR(30)
); 
```

**Section(SectionID,ProfessorID,Professors,CourseNumber,Dept,YearTerm,AvgGPA)**
```sql
CREATE TABLE Section (
    SectionID INT PRIMARY KEY NOT NULL, 
    ProfessorID VARCHAR(255), 
    Professors VARCHAR(1000), 
    CourseNumber INT, 
    Dept VARCHAR(30), 
    YearTerm VARCHAR(255) [FK to GenEdReq.YearTerm], 
    AvgGPA REAL,
    FOREIGN KEY(ProfessorID) REFERENCES Professor(ID) ON DELETE CASCADE, 
    FOREIGN KEY(Professors) REFERENCES Professor(Name) ON DELETE CASCADE,
    FOREIGN KEY(CourseNumber) REFERENCES Course(CourseNumber) ON DELETE CASCADE, 
    FOREIGN KEY(Dept) REFERENCES Course(Dept) ON DELETE CASCADE,
    FOREIGN KEY(YearTerm) REFERENCES GenEdReq(YearTerm) ON DELETE CASCADE
); 
```

## Advanced SQL queries
  
  **Advanced SQL Queries**
    **#1**    
    
            -- Find the Number of professors and the ID, Name, department of the professors which has taught 3-credit Non-CS department courses with average GPA greater or equal to 3.5, order by professor ID. 
            SELECT p.ID, p.Name, p.Dept, COUNT(p.ID)
            FROM Course c NATURAL JOIN SectionInfo s JOIN Professor p on (p.ID = s.ProfessorID)
            WHERE c.Credits = 3 AND c.Dept != 'CS' AND s.AvgGPA >= 3.5
            GROUP BY Professor
            ORDER BY p.ID

  ***Screenshot of First 15 Rows of Advanced Query 1*** 
                                
  **Advanced SQL Queries**
    **#2**    

            -- Find the courses satisfies the "US minority" category eith average gpa 3.5 and above. Return the course title, course department, and the number of sections which average gpa falls into the category(>=3.5). 
            SELECT g.Title, g.Dept, COUNT(s.SectionInfo)
            FROM Course c NATURAL JOIN GenEdReq g JOIN SectionInfo s on (c.CourseNumber = s.CourseNumber AND c.Dept = s.Dept)
            WHERE c.Dept = 'ACS' AND g.CS = 'US' AND s.AvgGpa >= 3.5
            GROUP BY GenEdReq

   ***Screenshot of First 15 Rows of Advanced Query 2*** 

## Indexing Analysis