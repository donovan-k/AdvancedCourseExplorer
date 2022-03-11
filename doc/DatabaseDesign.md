# Database Design

## Data Definition Language (DDL) commands

**Course(CourseNumber,Dept,Description,Credits)**
```sql
CREATE TABLE Course (
  CourseNumber int(11) NOT NULL,
  Dept varchar(30) NOT NULL,
  Description varchar(255),
  Credits int(11),
  PRIMARY KEY (CourseNumber,Dept),
  KEY CourseNumber (CourseNumber),
  KEY Dept (Dept)
);
```

**GenEdReq(CourseNumber,Dept,YearTerm,Title,ACP,CS,HUM,NAT,QR,SBS)**
```sql
CREATE TABLE GenEdReq (
  CourseNumber int(11) NOT NULL,
  Dept varchar(30) NOT NULL,
  YearTerm varchar(255) NOT NULL,
  Title varchar(255),
  ACP varchar(30),
  CS varchar(30),
  HUM varchar(30),
  NAT varchar(30),
  QR varchar(30),
  SBS varchar(30),
  PRIMARY KEY (CourseNumber,Dept,YearTerm),
  KEY Dept (Dept),
  KEY YearTerm (YearTerm),
  FOREIGN KEY (CourseNumber) REFERENCES Course (CourseNumber) ON DELETE CASCADE,
  FOREIGN KEY (Dept) REFERENCES Course (Dept) ON DELETE CASCADE
);
```

**Professor(ID,Name,Dept)**
```sql
CREATE TABLE Professor (
  ID int(11) NOT NULL,
  Name varchar(1000) NOT NULL,
  Dept varchar(30),
  PRIMARY KEY (ID,Name),
  KEY ID (ID),
  KEY Name (Name)
);
```

**Section(SectionID,ProfessorID,Professors,CourseNumber,Dept,YearTerm,AvgGPA)**
```sql
CREATE TABLE Section (
    SectionID INT PRIMARY KEY NOT NULL, 
    ProfessorID INT, 
    Professors VARCHAR(1000), 
    CourseNumber INT, 
    Dept VARCHAR(30), 
    YearTerm VARCHAR(255), 
    AvgGPA VARCHAR(10),
    FOREIGN KEY(ProfessorID) REFERENCES Professor(ID) ON DELETE CASCADE, 
    FOREIGN KEY(CourseNumber) REFERENCES Course(CourseNumber) ON DELETE CASCADE, 
    FOREIGN KEY(Dept) REFERENCES Course(Dept) ON DELETE CASCADE
); 
```

## Advanced SQL queries
  
  **Advanced SQL Queries**
    **#1**    
    
            -- Find the Number of professors and the ID, Name, department of the professors which has taught 3-credit Non-CS department courses with average GPA greater or equal to 3.5, order by professor ID. 
            EXPLAIN ANALYZE
            SELECT p.ID, p.Name, p.Dept, COUNT(p.ID)
            FROM Course c NATURAL JOIN Section s JOIN Professor p on (p.ID = s.ProfessorID)
            WHERE c.Credits = 3 AND c.Dept != 'CS' AND s.AvgGPA >= 3.5
            GROUP BY s.ProfessorID
            ORDER BY p.ID

  ***Screenshot of First 15 Rows of Advanced Query 1*** 
  0	Boonsripaisal, S	AAS
	4
1	Espiritu, A	AAS
	2
6	Rana, J	AAS
	1
9	Burgos, A	AAS
	1
39	Burnett, M	ACE
	2
43	Stevens, A	ACE
	2
46	Stoddard, P	ACE
	2
47	Lemoine, C	ACE
	1
50	Ando, A	ACE
	4
52	Brazee, R	ACE
	4
53	Ellison, B	ACE
	1
64	Schnitkey, G	ACE
	2
83	Emmert, J	ACES
	1
84	Hall, S	ADV
	2
85	Clifton, D	ADV
	1
                                
  **Advanced SQL Queries**
    **#2**    

            -- Find the courses satisfies the "US minority" category eith average gpa 3.5 and above. Return the course title, course department, and the number of sections which average gpa falls into the category(>=3.5). 
            SELECT g.Title, g.Dept, COUNT(s.SectionInfo)
            FROM Course c NATURAL JOIN GenEdReq g JOIN SectionInfo s on (c.CourseNumber = s.CourseNumber AND c.Dept = s.Dept)
            WHERE c.Dept = 'ACS' AND g.CS = 'US' AND s.AvgGpa >= 3.5
            GROUP BY GenEdReq

   ***Screenshot of First 15 Rows of Advanced Query 2*** 

## Indexing Analysis
