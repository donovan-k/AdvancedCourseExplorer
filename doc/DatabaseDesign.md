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
    **#1 and Results**    
    
![image](https://media.github-dev.cs.illinois.edu/user/10922/files/1ab17aa1-be06-4e58-b71f-7b2a7eb723f9)
                                                          
  **Advanced SQL Queries**
    **#2 and Results**    
  
![image](https://media.github-dev.cs.illinois.edu/user/10922/files/a78efbfe-cbbe-4f2b-86c0-dc7cb7426f3e)

  
## Indexing Analysis

  ***Explain and Analyze Results of Query 1 Before Indexing***
  ```
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
``` 

  ***After Index 1 of CREATE INDEX idx1 ON Course(Dept)***
  ```
  -> Sort: <temporary>.ID  (actual time=6.782..6.796 rows=204 loops=1)
     -> Table scan on <temporary>  (actual time=0.001..0.024 rows=204 loops=1)
         -> Aggregate using temporary table  (actual time=6.687..6.727 rows=204 loops=1)
             -> Nested loop inner join  (cost=1867.37 rows=264) (actual time=0.078..6.305 rows=461 loops=1)
                 -> Nested loop inner join  (cost=1774.84 rows=264) (actual time=0.061..5.057 rows=459 loops=1)
                     -> Filter: ((s.Dept <> 'CS') and (s.AvgGPA >= 3.5) and (s.CourseNumber is not null) and (s.Dept is not null) and (s.ProfessorID is not null))  (cost=849.65 rows=2643) (actual time=0.047..3.778 rows=824 loops=1)
                         -> Table scan on s  (cost=849.65 rows=8414) (actual time=0.041..2.729 rows=8243 loops=1)
                     -> Filter: (c.Credits = 3)  (cost=0.25 rows=0) (actual time=0.001..0.001 rows=1 loops=824)
                         -> Single-row index lookup on c using PRIMARY (CourseNumber=s.CourseNumber, Dept=s.Dept)  (cost=0.25 rows=1) (actual time=0.001..0.001 rows=1 loops=824)
                 -> Index lookup on p using PRIMARY (ID=s.ProfessorID)  (cost=0.25 rows=1) (actual time=0.002..0.002 rows=1 loops=459)
 ```

> **Explaination**
> We choose to index on Course(Dept) since this query is finding departments not equal to 'CS' and if it is indexed on departments, 
> then the finding should work faster. In reality, we did not see much change in finding departments not equal to 'CS'. However,
> we did notice that aggregation took longer than before (6.687-6.727 vs. 6.085-6.121), and sorting took longer as well (6.782-6.796 vs. 6.177-6.191).
> Since the index is only on Course(Dept), then grouping and sorting by a different tables ID would take a longer time.

  ***After Index 2 of CREATE INDEX c ON Course(Credits); CREATE INDEX a ON Section(AvgGPA);***
  ```
  -> Sort: <temporary>.ID  (actual time=6.254..6.268 rows=204 loops=1)
     -> Table scan on <temporary>  (actual time=0.001..0.024 rows=204 loops=1)
         -> Aggregate using temporary table  (actual time=6.137..6.178 rows=204 loops=1)
             -> Nested loop inner join  (cost=2124.37 rows=999) (actual time=0.102..5.772 rows=461 loops=1)
                 -> Nested loop inner join  (cost=1774.84 rows=999) (actual time=0.092..4.697 rows=459 loops=1)
                     -> Filter: ((s.Dept <> 'CS') and (s.AvgGPA >= 3.5) and (s.CourseNumber is not null) and (s.Dept is not null) and (s.ProfessorID is not null))  (cost=849.65 rows=2643) (actual time=0.075..3.576 rows=824 loops=1)
                         -> Table scan on s  (cost=849.65 rows=8414) (actual time=0.047..2.532 rows=8243 loops=1)
                     -> Filter: (c.Credits = 3)  (cost=0.25 rows=0) (actual time=0.001..0.001 rows=1 loops=824)
                         -> Single-row index lookup on c using PRIMARY (CourseNumber=s.CourseNumber, Dept=s.Dept)  (cost=0.25 rows=1) (actual time=0.001..0.001 rows=1 loops=824)
                 -> Index lookup on p using PRIMARY (ID=s.ProfessorID)  (cost=0.25 rows=1) (actual time=0.002..0.002 rows=1 loops=459)
 ```

> **Explaination**
> We choose to index on Course(Credits) and Section(AvgGPA) since this query is finding credits with 3 credits and filtering the 
> AvgGPA column as well. This index design helped the time better than the last index design probably because I made sure to create indexes
> that would help with the filtering. However, these indexes did not do better than the indexes we started off with.

  ***After Index 3 of CREATE INDEX c ON Course(Credits); CREATE INDEX a ON Section(AvgGPA);***
  ```
  -> Sort: <temporary>.ID  (actual time=6.254..6.268 rows=204 loops=1)
     -> Table scan on <temporary>  (actual time=0.001..0.024 rows=204 loops=1)
         -> Aggregate using temporary table  (actual time=6.137..6.178 rows=204 loops=1)
             -> Nested loop inner join  (cost=2124.37 rows=999) (actual time=0.102..5.772 rows=461 loops=1)
                 -> Nested loop inner join  (cost=1774.84 rows=999) (actual time=0.092..4.697 rows=459 loops=1)
                     -> Filter: ((s.Dept <> 'CS') and (s.AvgGPA >= 3.5) and (s.CourseNumber is not null) and (s.Dept is not null) and (s.ProfessorID is not null))  (cost=849.65 rows=2643) (actual time=0.075..3.576 rows=824 loops=1)
                         -> Table scan on s  (cost=849.65 rows=8414) (actual time=0.047..2.532 rows=8243 loops=1)
                     -> Filter: (c.Credits = 3)  (cost=0.25 rows=0) (actual time=0.001..0.001 rows=1 loops=824)
                         -> Single-row index lookup on c using PRIMARY (CourseNumber=s.CourseNumber, Dept=s.Dept)  (cost=0.25 rows=1) (actual time=0.001..0.001 rows=1 loops=824)
                 -> Index lookup on p using PRIMARY (ID=s.ProfessorID)  (cost=0.25 rows=1) (actual time=0.002..0.002 rows=1 loops=459)
 ```

> **Explaination**
> We choose to index on Course(Credits) and Section(AvgGPA) since this query is finding credits with 3 credits and filtering the 
> AvgGPA column as well. This index design helped the time better than the last index design probably because I made sure to create indexes
> that would help with the filtering. However, these indexes did not do better than the indexes we started off with.

  ***Explain and Analyze Results of Query 2 Before Indexing***
  ```
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
  ```
