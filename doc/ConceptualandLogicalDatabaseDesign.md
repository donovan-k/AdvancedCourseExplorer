# Conceptual and Logical Database Design

## UML Diagram 
![UML_diagram](https://media.github-dev.cs.illinois.edu/user/12652/files/f730708f-8b54-4d70-99b5-187c816443b8)

## Assumptions
![diagram_assumptions](https://media.github-dev.cs.illinois.edu/user/12652/files/2213d3f2-6a31-487e-9e4c-293dc2b9194d)

## Relational Schema
- UserInfo(UserName: VARCHAR(255) [PK], Passcode: VARCHAR(255))
- UserInput(UserID: INT [PK], UserName: VARCHAR(255) [FK to UserInfo.UserName], Interest: VARCHAR(255), FavProfessor: VARCHAR(255), AvgGPA: REAL, CourseReq: VARCHAR(255))
- Course(CourseNum: INT [PK], Dept: VARCHAR(30) [PK], Interest: VARCHAR(255), Credits: INT, PreReq: VARCHAR(255))
- SectionInfo(SectionID: INT [PK], ProfessorName: VARCHAR(255) [FK to Professor.Name], CourseNum: INT [FK to Course.CourseNum], Dept: VARCHAR(30) [FK to Course.Dept], AvgGPA: REAL)
- Professor(Name [PK], Dept: VARCHAR(30), Interests: VARCHAR(255))
