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
    
            -- Finds the average points, assists, and 3P for a team
            SELECT
            FROM
  ***Screenshot of First 15 Rows of Advanced Query 1*** 
                                
  **Advanced SQL Queries**
    **#2**    
    
            -- Find Arenas where players shoot the best in
            SELECT ArenaID, AVG(3P) AS Average_3percentage, AVG(FG) AS Average_FieldGoalpercentage
            FROM PlayerStats JOIN Team USING(TeamID) JOIN ArenaStats USING (ArenaID)
            GROUP BY ArenaID
            ORDER BY Average_FieldGoalpercentage ASC, Average_3percentage ASC

   ***Screenshot of First 15 Rows of Advanced Query 2*** 

## Indexing Analysis