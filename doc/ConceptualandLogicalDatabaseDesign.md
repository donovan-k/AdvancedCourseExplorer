# Conceptual and Logical Database Design

## UML Diagram 
![updated_uml](https://media.github-dev.cs.illinois.edu/user/12652/files/5459502f-611f-46af-8512-1dda71de2842)

## Entity relationships
![updated_relationships](https://media.github-dev.cs.illinois.edu/user/12652/files/f00203a0-b29b-4dcc-bad6-0ea6b5e25217)

## Entity definitions
![updated_assumptions](https://media.github-dev.cs.illinois.edu/user/12652/files/619e403c-5a2d-43e9-8593-626e241023d7)

## Relational Schema
```sql
UserInfo(UserName: VARCHAR(255) [PK], Passcode: VARCHAR(255))
UserInput(ID: INT [PK], UserName: VARCHAR(255) [FK to UserInfo.UserName], Interests: VARCHAR(255), FavProfessor: VARCHAR(255) [FK to Professor.Name], AvgGPA: REAL, CourseReq: VARCHAR(255))
Course(CourseNumber: INT [PK], Dept: VARCHAR(30) [PK], Description: VARCHAR(255), Credits: INT)
SectionInfo(SectionID: INT [PK], ProfessorID: VARCHAR(255) [FK to Professor.ID], Professors: VARCHAR(1000) [FK to Professor.Name], CourseNumber: INT [FK to Course.CourseNumber], Dept: VARCHAR(30) [FK to Course.Dept], YearTerm: VARCHAR(255) [FK to GenEdReq.YearTerm], AvgGPA: REAL)
Professor(ID: INT [PK], Name: VARCHAR [PK], Dept: VARCHAR(30))
GenEdReq(CourseNumber: INT [PK] [FK to Course.CourseNumber], Dept: VARCHAR(30) [PK] [FK to Course.Dept], YearTerm: VARCHAR(255) [PK], Title: VARCHAR(255), ACP: VARCHAR(30), CS: VARCHAR(30), HUM: VARCHAR(30), NAT: VARCHAR(30), QR: VARCHAR(30), SBS: VARCHAR(30))
Generates(ID: INT [PK] [FK to UserInput.ID], CourseNumber: INT [PK] [FK to Course.CourseNumber], Dept: VARCHAR(30) [PK] [FK to Course.Dept])
```
