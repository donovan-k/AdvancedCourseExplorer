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

  ***First 15 Rows of Advanced Query 1*** 
| ID | Professor | Dept | CoursesTaught |
|---|---|---|---|
|0|	Boonsripaisal, S|	AAS |4|
|1|	Espiritu, A	|AAS |2|
|6|	Rana, J	|AAS|1|
|9|	Burgos, A	|AAS|1|
|39|	Burnett, M	|ACE|2|
|43|	Stevens, A	|ACE|2|
|46|	Stoddard, P	|ACE|2|
|47|	Lemoine, C	|ACE|1|
|50|	Ando, A	|ACE|4|
|52|	Brazee, R	|ACE|4|
|53|	Ellison, B	|ACE|1|
|64|	Schnitkey, G |ACE|2|
|83|	Emmert, J	|ACES|1|
|84|	Hall, S	|ADV|2|
|85|	Clifton, D	|ADV|1|

  ***Explain and Analyze Results of Query 1***
  <pre>
   -> Sort: <temporary>.ID  (actual time=6.177..6.191 rows=204 loops=1)
     -> Table scan on <temporary>  (actual time=0.001..0.024 rows=204 loops=1)
         -> Aggregate using temporary table  (actual time=6.085..6.121 rows=204 loops=1)
             -> Nested loop inner join  (cost=2287.91 rows=264) (actual time=0.095..5.655 rows=461 loops=1)
                 -> Nested loop inner join  (cost=2195.38 rows=264) (actual time=0.082..4.726 rows=459 loops=1)
                     -> Filter: ((s.Dept <> 'CS') and (s.AvgGPA >= 3.5) and (s.CourseNumber is not null) and (s.Dept is not null) and (s.ProfessorID is not null))  (cost=849.65 rows=2643) (actual time=0.066..3.693 rows=824 loops=1)
                         -> Table scan on s  (cost=849.65 rows=8414) (actual time=0.058..2.574 rows=8243 loops=1)
                     -> Filter: (c.Credits = 3)  (cost=0.41 rows=0) (actual time=0.001..0.001 rows=1 loops=824)
                         -> Single-row index lookup on c using PRIMARY (CourseNumber=s.CourseNumber, Dept=s.Dept)  (cost=0.41 rows=1) (actual time=0.001..0.001 rows=1 loops=824)
                 -> Index lookup on p using PRIMARY (ID=s.ProfessorID)  (cost=0.25 rows=1) (actual time=0.001..0.002 rows=1 loops=459)
</pre>                              
                                
  **Advanced SQL Queries**
    **#2**    

            -- Find the courses satisfies the "US minority" category eith average gpa 3.5 and above. Return the course title, course department, and the number of sections which average gpa falls into the category(>=3.5). 
            SELECT g.Title, g.Dept, COUNT(s.SectionID)
            FROM Course c NATURAL JOIN GenEdReq g JOIN Section s on (c.CourseNumber = s.CourseNumber AND c.Dept = s.Dept)
            WHERE g.CS = 'US' AND s.AvgGpa >= 3.5
            GROUP BY g.CourseNumber, g.Dept
            ORDER BY Dept

   ***All 12 Rows of Advanced Query 2*** 
|Title|Dept|SectionCount|
|---|---|---|
|Intro Asian American Studies|AAS|8|
|Muslims in America|AAS|2|
|Economics of Food and Environmental Justice|ACE|8|
|Intro to African American St|AFRO|2|
|Humanist Persp of Afro-Am| Exp|AFRO|2|
|Hist Arch Americas|ANTH|2|
|Contemporary Social Issues|ANTH|1|
|Social Movement Communication|CMN|4|
|Race and Cultural Diversity|EPS|2|
|US Latina and Latino Families|HDFS|2|
|Constructing Race in America|HIST|2|
|Diversity: Identities & Issues|SOCW|2|

  ***Explain and Analyze Results of Query 2***
  <pre>
  -> Sort: <temporary>.Dept  (actual time=10.994..10.995 rows=12 loops=1)
     -> Stream results  (actual time=0.592..10.938 rows=12 loops=1)
         -> Group aggregate: count(s.SectionID)  (actual time=0.591..10.935 rows=12 loops=1)
             -> Nested loop inner join  (cost=1265.48 rows=9) (actual time=0.157..10.911 rows=37 loops=1)
                 -> Nested loop inner join  (cost=1260.78 rows=9) (actual time=0.136..10.815 rows=37 loops=1)
                     -> Filter: ((g.CS = 'US') and (g.CourseNumber is not null) and (g.Dept is not null))  (cost=187.95 rows=185) (actual time=0.065..0.928 rows=305 loops=1)
                         -> Index scan on g using PRIMARY  (cost=187.95 rows=1847) (actual time=0.062..0.754 rows=1920 loops=1)
                     -> Filter: ((s.Dept = g.Dept) and (s.AvgGPA >= 3.5))  (cost=4.15 rows=0) (actual time=0.030..0.032 rows=0 loops=305)
                         -> Index lookup on s using CourseNumber (CourseNumber=g.CourseNumber)  (cost=4.15 rows=17) (actual time=0.015..0.030 rows=28 loops=305)
                 -> Single-row index lookup on c using PRIMARY (CourseNumber=g.CourseNumber, Dept=g.Dept)  (cost=0.42 rows=1) (actual time=0.002..0.002 rows=1 loops=37)
  </pre>
  
## Indexing Analysis
