# Your Personal Course Explorer

## Project Summary
This project takes the original course explorer offered by UIUC and upgrades it
to be more personal for each student. Our web application will take into account 
the student's account information such as their major, interests, favorite professors,
and the GPA they are looking for. Based on these factors, our application will create a 
list of courses that student would enjoy or need to take. 
For example, if the student's major is Computer Science, and they are interested
in data science, then the application will list data analysis courses and/or other 
statistical analysis courses for them to take.

## Description
We want to offer a service that makes it easier to find interesting courses and view what all the university has to offer. This application will make it fun and exciting for students to discover different or new classes they haven't heard about that might relate to their interests. The problem with the current course explorer is that you have to manually look through each department to find each individuals necessary courses or courses of their interest. This tool would also bring light to courses some people may have no idea exist. With such a big university, it can be hard to see what they all have to offer, but with this application students would be able to find interesting courses easily. Another feature would be to include a separate list of required courses for each student so they have a clear picture of what courses they have to take.

## Usefulness
 Among all the existing websites about the courses offered at UIUC, most of the functionality of these websites would be providing information of the courses with barely any personal filter option. For example, one of the largest UIUC course information website would be the 'course explorer'. That website is like a database, it contains all the information about all the courses provided by different department, instructor, and etc. Websites like that would be complicated for students to find the information of the course they want unless they are super familiar with all the courses.\
 We want to create a program which would provide personal course suggestions based on the courses the student had taken and based on the student's personal interest fields. With the use of this new program, students would not need to go to the courses database to find the possible classes, and the students do not need to check the availability of the courses they want to take. Instead, they just need to simply input the courses they have taken, requirements for the professor or the course, and/or the field of the course they would like to take next, and our system will filter out all the possibilities for the student.

## Realness
Our data will come from two different sources.\
The first is the REST API Resources page found at https://courses.illinois.edu/cisdocs/api. This source will allow us to find information about courses at the university, specifically based on their scheduling, the requirements they meet, and the subjects.\ 
The second source is a CSV files that can be found at https://raw.githubusercontent.com/wadefagen/datasets/master/gpa/uiuc-gpa-dataset.csv under Professor Wade Fagen-Ulmschneider's github page under datasets/gpa. We will use this file to find information about specific professors and the sections they teach. We can find average GPA's of professors by course and use these to provide recommendations to students about what professors they may want to have.

## Functionality
In the database, we will need a table for the Course information such as 
CRN, course title, instructor, department, prerequisite, credits, description. Then we will have an instructor
table that holds id, name, department, course number, average gpa in course. The basic functions of the website
are to allow students to filter courses based on course information and instructor information. We will
also need a results table that returns the results of the query of information. Students can 
input interests, favorite professors, and the gpa they are looking for, and requirement fulfillment. Then from
this input the app will filter courses according to what the student inputted. Another cool feature would be to
save the information and keep users results so users can come back to information found before. To achieve this,
we could allow site cookies or user accounts on the web application.

```bash
1.	UserInput (a, b are required, one of the c, d, e, f needs to be filled)
a.	Department VARCHAR(30)
b.	CourseTaken VARCHAR(30)
c.	Interest VARCHAR(255)
d.	ProfessorName VARCHAR(255)
e.	avgGPA REAL
f.	CourseReq VARCHAR(255)

2.	Course
a.	CRN INT
b.	CourseNumber INT `PRIMARY KEY`
c.	Department VARCHAR(30)
d.	Description VARCHAR(255)
e.	Credits INT
f.	PreReq VARCHAR(255)
g.	Category VARCHAR(255)

3.	Professor
a.	Name VARCHAR(255)
b.	Department VARCHAR(255)
c.	CourseNumber INT
d.	AvgGPA REAL
e.	ID INT `PRIMARY KEY`
```

## A low fidelity UI Mockup:

Search Page: 
![search_page](https://media.github-dev.cs.illinois.edu/user/12652/files/2c57a076-cea4-4aa6-baf7-4df048cad562)

Result Page: 
![result_page](https://media.github-dev.cs.illinois.edu/user/12652/files/13f4d07d-3a06-4cd7-b784-88f11375aa17)

## Work Distribution
Data input: dkitten2\
Front end: ericrc3\
Back end: yuex7 & colintm3\
*We will talk with each other and update this file if there is any work distribution change in the future.*
