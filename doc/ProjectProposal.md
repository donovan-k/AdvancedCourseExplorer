# Your Personal Course Explorer

## Project Summary
This project takes the original course explorer offered by UIUC and upgrades it to be more personal for each student. Our web application will take into account the student's account information such as their major, courses completed, required courses and interests. Based on these factors, our application will create a list of courses that student would enjoy or need to take. For example, if the student's major is Computer Science and they are interested in data science, then the application will list data analysis courses and/or other statistical analysis courses for them to take.

## Description
We want to offer a service that makes it easier to find interesting courses and view what all the university has to offer. This application will make it fun and exciting for students to discover different or new classes they haven't heard about that might relate to their interests. The problem with the current course explorer is that you have to manually look through each department to find each individuals necessary courses or courses of their interest. This tool would also bring light to courses some people may have no idea exist. With such a big university, it can be hard to see what they all have to offer, but with this application students would be able to find interesting courses easily. Another feature would be to include a separate list of required courses for each student so they have a clear picture of what courses they have to take.

## Usefulness
 Among all the existing websites about the courses offered at UIUC, most of the functionality of these websites would be providing information of the courses with barely any personal filter option. For example, one of the largest UIUC course information website would be the 'course explorer'. That website is like a database, it contains all the information about all the courses provided by different department, instructor, and etc. Websites like that would be complicated for students to find the information of the course they want unless they are super familiar with all the courses. 
 We want to create a program which would provide personal course suggestions based on the courses the student had taken and based on the student's personal interest fields. With the use of this new program, students would not need to go to the courses database to find the possible classes, and the students do not need to check the availability of the courses they want to take. Instead, they just need to simply input the courses they have taken, requirements for the professor or the course, and/or the field of the course they would like to take next, and our system will filter out all the possibilities for the student.

## Realness
  Our data will come from two different sources. The first is the REST API Resources page found at https://courses.illinois.edu/cisdocs/api. This source will allow us to find information about courses at the university, specifically based on their scheduling, the requirements they meet, and the subjects. The second source is a CSV files that can be found at https://raw.githubusercontent.com/wadefagen/datasets/master/gpa/uiuc-gpa-dataset.csv under Professor Wade Fagen-Ulmschneider's github page under datasets/gpa. We will use this file to find information about specific professors and the sections they teach. We can find average GPA's of professors by course and use these to provide recommendations to students about what professors they may want to have.

## Functionality


## UI Mockup


## Work Distribution
Data input: 
Front end: 
Back end: 