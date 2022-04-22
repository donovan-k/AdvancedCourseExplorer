# Database Design

## Database implementation

### Database Implemention on GCP
- Hostname: 35.224.176.76:3306
- Username: root
- Password: The passcode is provided in the private campuswire groupchat

### Data Definition Language (DDL) commands
**Course(CourseNumber,Dept,Description,Credits)**
```sql
CREATE TABLE Course (
  course_id int(11) NOT NULL AUTO_INCREMENT,
  CourseNumber int(11) NOT NULL,
  Dept varchar(30) NOT NULL,
  Description varchar(255),
  Credits int(11),
  AvgGPA float DEFAULT NULL,
  UNIQUE KEY (courseID),
  PRIMARY KEY (CourseNumber,Dept),
  KEY CourseNumber (CourseNumber),
  KEY Dept (Dept)
);
```

**GenEdReq(CourseNumber,Dept,YearTerm,Title,ACP,CS,HUM,NAT,QR,SBS)**
```sql
CREATE TABLE GenEdReq (
  id int(11) NOT NULL AUTO_INCREMENT,
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
  UNIQUE KEY (id),
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

### Row count for each table
- Course Table (Screenshot)  
![course_count](https://media.github-dev.cs.illinois.edu/user/12652/files/98178db7-e24e-4526-8b01-ae41c286af1d)

- GenEdReq Table (Screenshot)  
![GenEdReq_count](https://media.github-dev.cs.illinois.edu/user/12652/files/27f332b8-0cff-48f0-af0b-55b48506c2b7)

- Professor Table (Screenshot)  
![professor_count](https://media.github-dev.cs.illinois.edu/user/12652/files/1f4d97ab-0e14-43a6-a802-76795cd438de)

- Section Table (Screenshot)  
![section_count](https://media.github-dev.cs.illinois.edu/user/12652/files/14267a83-ece7-4f06-a257-36b99330e9df)

## Advanced SQL queries
  
  **Advanced SQL Queries**
    **#1 and Results**    
    
![image](https://media.github-dev.cs.illinois.edu/user/10922/files/1ab17aa1-be06-4e58-b71f-7b2a7eb723f9)
                                                          
  **Advanced SQL Queries**
    **#2 and Results**    
  
![image](https://media.github-dev.cs.illinois.edu/user/10922/files/a78efbfe-cbbe-4f2b-86c0-dc7cb7426f3e)

## Avg GPA Stored Procedure and Triggers DDL

**Stored Procedure to populate course AvgGPA column for all entries**

```sql
CREATE PROCEDURE SetAvgGPA()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE coursenum INT;
    DECLARE coursedept VARCHAR(30);
    DECLARE coursecur CURSOR FOR SELECT DISTINCT CourseNumber, Dept FROM Section;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    OPEN coursecur;
    REPEAT
        FETCH NEXT FROM coursecur INTO coursenum, coursedept;
        UPDATE Course 
        SET AvgGPA = 
        (
        SELECT AVG(Cast(AvgGPA as float)) as averageGPA
        FROM Section
        WHERE AvgGPA != 0 AND CourseNumber = coursenum AND Dept = coursedept
        )
        WHERE CourseNumber = coursenum AND Dept = coursedept;
    UNTIL done
    END REPEAT;

    CLOSE coursecur;
END; 
```

**Trigger to update AvgGPA for courses when columns are added and/or removed**

(I created one for update, one for insert, and one for delete, but they are mostly identical)

```sql
CREATE TRIGGER UpdateAvgGPA
AFTER UPDATE ON Section
    FOR EACH ROW
BEGIN
    DECLARE coursenum int;
    DECLARE coursedept varchar(30);
    SELECT CourseNumber, Dept 
    INTO coursenum, coursedept
    WHERE (CourseNumber = old.CourseNumber AND Dept = old.Dept) OR (CourseNumber = new.CourseNumber AND Dept = new.Dept);
    IF coursenum IS NOT NULL THEN
        UPDATE Course
        SET AvgGPA = (
        SELECT AVG(Cast(AvgGPA as float)) as averageGPA
        FROM Section
        WHERE CourseNumber = coursenum AND Dept = coursedept
        );
    END IF;
END;
```
  
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

  ***After Index 3 of CREATE INDEX c ON Course(Credits);***
  ```
  -> Sort: <temporary>.ID  (actual time=5.894..5.908 rows=204 loops=1)
     -> Table scan on <temporary>  (actual time=0.001..0.024 rows=204 loops=1)
         -> Aggregate using temporary table  (actual time=5.677..5.717 rows=204 loops=1)
             -> Nested loop inner join  (cost=2124.37 rows=999) (actual time=0.097..5.335 rows=461 loops=1)
                 -> Nested loop inner join  (cost=1774.84 rows=999) (actual time=0.065..4.496 rows=459 loops=1)
                     -> Filter: ((s.Dept <> 'CS') and (s.AvgGPA >= 3.5) and (s.CourseNumber is not null) and (s.Dept is not null) and (s.ProfessorID is not null))  (cost=849.65 rows=2643) (actual time=0.047..3.584 rows=824 loops=1)
                         -> Table scan on s  (cost=849.65 rows=8414) (actual time=0.030..2.531 rows=8243 loops=1)
                     -> Filter: (c.Credits = 3)  (cost=0.25 rows=0) (actual time=0.001..0.001 rows=1 loops=824)
                         -> Single-row index lookup on c using PRIMARY (CourseNumber=s.CourseNumber, Dept=s.Dept)  (cost=0.25 rows=1) (actual time=0.001..0.001 rows=1 loops=824)
                 -> Index lookup on p using PRIMARY (ID=s.ProfessorID)  (cost=0.25 rows=1) (actual time=0.001..0.002 rows=1 loops=459)
 ```

> **Explaination**
> We choose to index on Course(Credits) since multiple indexes seemed to mess up the time. We choose correctly
> as we can see the sorting time decreased, the table scan time decreased, aggregate time decreased, etc. This one 
> seems to make the time better for all operations, so this is the indexing we will choose.

**Winner - CREATE INDEX c ON Course(Credits); for best time**

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
  
  ***After Index 1 of CREATE INDEX ex ON GenEdReq(Title);***
  ```
  -> Sort: <temporary>.Dept  (actual time=11.803..11.804 rows=12 loops=1)
     -> Stream results  (actual time=0.696..11.687 rows=12 loops=1)
         -> Group aggregate: count(s.SectionID)  (actual time=0.696..11.684 rows=12 loops=1)
             -> Nested loop inner join  (cost=1264.01 rows=9) (actual time=0.318..11.630 rows=37 loops=1)
                 -> Nested loop inner join  (cost=1260.78 rows=9) (actual time=0.308..11.546 rows=37 loops=1)
                     -> Filter: ((g.CS = 'US') and (g.CourseNumber is not null) and (g.Dept is not null))  (cost=187.95 rows=185) (actual time=0.053..1.131 rows=305 loops=1)
                         -> Index scan on g using PRIMARY  (cost=187.95 rows=1847) (actual time=0.050..0.923 rows=1920 loops=1)
                     -> Filter: ((s.Dept = g.Dept) and (s.AvgGPA >= 3.5))  (cost=4.15 rows=0) (actual time=0.032..0.034 rows=0 loops=305)
                         -> Index lookup on s using CourseNumber (CourseNumber=g.CourseNumber)  (cost=4.15 rows=17) (actual time=0.014..0.031 rows=28 loops=305)
                 -> Single-row index lookup on c using PRIMARY (CourseNumber=g.CourseNumber, Dept=g.Dept)  (cost=0.26 rows=1) (actual time=0.002..0.002 rows=1 loops=37)
 ```
 
> **Explaination**
> I choose to create an index on GenEdReq(Title) because I thought it could speed up the time selecting the 
> title attribute from the GenEdReq table. It did not help sorting, streaming, aggregating, and other operations.
> The reason for this is because this attribute would not help with filtering so all it did was 
> add unnecessary complexity to the indexing.

  ***After Index 2 of CREATE INDEX ey ON Section(AvgGpa);***
  ```
  -> Sort: <temporary>.Dept  (actual time=9.762..9.763 rows=12 loops=1)
     -> Stream results  (actual time=0.745..9.734 rows=12 loops=1)
         -> Group aggregate: count(s.SectionID)  (actual time=0.744..9.731 rows=12 loops=1)
             -> Nested loop inner join  (cost=1264.01 rows=9) (actual time=0.366..9.708 rows=37 loops=1)
                 -> Nested loop inner join  (cost=1260.78 rows=9) (actual time=0.350..9.642 rows=37 loops=1)
                     -> Filter: ((g.CS = 'US') and (g.CourseNumber is not null) and (g.Dept is not null))  (cost=187.95 rows=185) (actual time=0.058..0.932 rows=305 loops=1)
                         -> Index scan on g using PRIMARY  (cost=187.95 rows=1847) (actual time=0.055..0.758 rows=1920 loops=1)
                     -> Filter: ((s.Dept = g.Dept) and (s.AvgGPA >= 3.5))  (cost=4.15 rows=0) (actual time=0.026..0.028 rows=0 loops=305)
                         -> Index lookup on s using CourseNumber (CourseNumber=g.CourseNumber)  (cost=4.15 rows=17) (actual time=0.011..0.026 rows=28 loops=305)
                 -> Single-row index lookup on c using PRIMARY (CourseNumber=g.CourseNumber, Dept=g.Dept)  (cost=0.26 rows=1) (actual time=0.002..0.002 rows=1 loops=37)
 ```
 
 > **Explaination**
 > I choose to index on Section(AvgGpa) since this attribute is used in the where clause. This decision 
 > followed through as we can see it sped up many of the operations higher bound on the time. However, it 
 > was unable to speed up the lower bound on the times, but it shorted the distance between the bounds, so 
 > we can say it performed better than before adding this index.
 
 ***After Index 3 of CREATE INDEX ez ON GenEdReq(CS);***
 ```
 -> Sort: <temporary>.Dept  (actual time=11.045..11.046 rows=12 loops=1)
     -> Stream results  (actual time=1.985..11.020 rows=12 loops=1)
         -> Group aggregate: count(s.SectionID)  (actual time=1.984..11.017 rows=12 loops=1)
             -> Nested loop inner join  (cost=1817.17 rows=15) (actual time=1.609..10.993 rows=37 loops=1)
                 -> Nested loop inner join  (cost=1811.84 rows=15) (actual time=1.599..10.934 rows=37 loops=1)
                     -> Index lookup on g using ez (CS='US'), with index condition: ((g.CourseNumber is not null) and (g.Dept is not null))  (cost=40.25 rows=305) (actual time=1.539..2.528 rows=305 loops=1)
                     -> Filter: ((s.Dept = g.Dept) and (s.AvgGPA >= 3.5))  (cost=4.15 rows=0) (actual time=0.025..0.027 rows=0 loops=305)
                         -> Index lookup on s using CourseNumber (CourseNumber=g.CourseNumber)  (cost=4.15 rows=17) (actual time=0.010..0.025 rows=28 loops=305)
                 -> Single-row index lookup on c using PRIMARY (CourseNumber=g.CourseNumber, Dept=g.Dept)  (cost=0.26 rows=1) (actual time=0.001..0.001 rows=1 loops=37)
 ```
  > **Explaination**
  > I choose to index on GenEdReq(CS) since it was used as a filtering option. However, it seems like
  > this was a poor decision as all the times seem to slower than the default indexing. The reason for
  > this is because of the data contents. The data has a lot of null values in the CS column which could 
  > make this indexing only complicate things.

**Winner - CREATE INDEX ey ON Section(AvgGpa); for best time**
 
