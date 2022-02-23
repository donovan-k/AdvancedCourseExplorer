# Conceptual and Logical Database Design

## UML Diagram 
![UML_diagram](https://media.github-dev.cs.illinois.edu/user/12652/files/af0d9583-762c-4701-8edc-aa6b8d5643d9)

## Assumptions
![assumption](https://media.github-dev.cs.illinois.edu/user/12652/files/d2f27b83-179d-4b49-8f92-a3ed37aca298)

## Description
![definition](https://media.github-dev.cs.illinois.edu/user/12652/files/bd6fb11c-e186-47d7-9966-6b8d87a9954d)

## Relational Schema
- UserInfo(UserName: VARCHAR(255) [PK], Passcode: VARCHAR(255))
- UserInput(ID: INT [PK], UserName: VARCHAR(255) [FK to UserInfo.UserName], Interest: VARCHAR(255), FavProfessor: VARCHAR(255) [FK to Professor.Name], AvgGPA: REAL, CourseReq: VARCHAR(255))
- Course(CourseNumber: INT [PK], Dept: VARCHAR(30) [PK], Interest: VARCHAR(255), Credits: INT, PreReq: VARCHAR(255))
- SectionInfo(SectionID: INT [PK], ProfessorName: VARCHAR(255) [FK to Professor.Name], CourseNumber: INT [FK to Course.CourseNumber], Dept: VARCHAR(30) [FK to Course.Dept], AvgGPA: REAL)
- Professor(Name: VARCHAR [PK], Dept: VARCHAR(30), Interests: VARCHAR(255))

