# Conceptual and Logical Database Design

## UML Diagram 
![Inkednew uml_LI](https://media.github-dev.cs.illinois.edu/user/12652/files/39f1e6b0-6a5b-4163-bf7e-e443d652ef71)

## Entity relationships
![relationship](https://media.github-dev.cs.illinois.edu/user/12652/files/ab6f887a-7157-47f5-b4b0-b64d5f027e11)

## Entity definitions
![entity](https://media.github-dev.cs.illinois.edu/user/12652/files/c4db728b-3641-4363-9100-713bfda1259f)

## Relational Schema
- UserInfo(UserName: VARCHAR(255) [PK], Passcode: VARCHAR(255))
- UserInput(ID: INT [PK], UserName: VARCHAR(255) [FK to UserInfo.UserName], Interests: VARCHAR(255), FavProfessor: VARCHAR(255) [FK to Professor.Name], AvgGPA: REAL, CourseReq: VARCHAR(255))
- Course(CourseNumber: INT [PK], Dept: VARCHAR(30) [PK], InterestTags: VARCHAR(255), Credits: INT, PreReqs: VARCHAR(255))
- SectionInfo(SectionID: INT [PK], ProfessorID: VARCHAR(255) [FK to Professor.ID], CourseNumber: INT [FK to Course.CourseNumber], Dept: VARCHAR(30) [FK to Course.Dept], AvgGPA: REAL)
- Professor(ID: INT [PK], Name: VARCHAR [PK], Dept: VARCHAR(30), Interests: VARCHAR(255))
- Generates(ID: INT [PK] [FK to UserInput.ID], CourseNumber: INT [PK] [FK to Course.CourseNumber], Dept: VARCHAR(30) [PK] [FK to Course.Dept])

