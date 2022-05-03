# Project Report and Demo Video

### Please list out changes in directions of your project if the final project is different from your original proposal (based on your stage 1 proposal submission).
The main direction of our project remains the same, which means there are no big changes on the concepts. On stage 1 we stated that we wanted to create an upgraded version of UIUC Course Explorer, and we did make it. Just as what we have described in stage 1, we have fully built out all functionalities based on our updated version ideas: students can filter out all the courses offered by UIUC by Professor, requirements, professors, etc.

### Discuss what you think your application achieved or failed to achieve regarding its usefulness.
Talking about usefulness, we have successfully built out an application that accepts students’ personal preferences to fulfill their course expectations. On a good side, based on the data api we have used, there is a lot of information regarding courses, which builds a great foundation for searching results no matter what the students input as. However, because it is hard to guarantee that all courses that are listed in the database have all columns filled out, sometimes the searching results would not be super holistic (Eg. some courses’ GPA are not listed in the database). Overall, the usefulness of the application reached our expectations.

### Discuss if you changed the schema or source of the data for your application
We, the team, did change the schema a couple of times over the process. When we first discovered the source of the data, we generated a schema as a base. As we start parsing the data and organizing useful information, we have realized that the first version of the schema might not perfectly work as what we have expected. In general, we have changed the schema a couple times, and the change is based on the knowledge we had on the source of data.

### Discuss what you change to your ER diagram and/or your table implementations. What are some differences between the original design and the final design? Why? What do you think is a more suitable design? 
Throughout the entire semester, we have changed our ER diagram and our table implementations around 4-5 times in total, at the beginning stages. Our first ER diagram does not have enough data to support such a big project, and the relationships between each table were vague and insufficient to explain itself. We discussed with our TA and upgraded our ER diagram accordingly several times just to meet the requirements and ensure the feasibility of implementation. Indeed, the modified version of the ER diagram is a more suitable design because the relationships between each table are clear and self-explanatory. Also, by adding more tables, we have more data to play around which makes the entire application more interesting for the potential users.

### Discuss what functionalities you added or removed. Why?
At the beginning, we do not have a user login page because we thought that was not necessary. As we start implementing the application, we have realized that we need to store information of each user’s searching history to help them go back and look up what they have looked at already. We have also added more functionalities such as information about professors, course requirements, etc. By adding these information to our table, users have more access to learn more about the course, which will no longer be limited to general course information.

### Explain how you think your advanced database programs complement your application.
No doubt that we used a lot of data for this project, to the point that it is hard to tell how many courses might fall into certain categories/requirements. To clear out that confusion, we have implemented two advanced database programs to present to the users some example databases. With the addition of these two queries, users will be able to know how we parse and use the source we have collected and the validation of each process.

### Each team member should describe one technical challenge that the team encountered.  This should be sufficiently detailed such that another future team could use this as helpful advice if they were to start a similar project or where to maintain your project. 
- Jocelyn: None of us has a lot of experience building out applications that have a user interface. To build out a useful and functional application, we went through a lot of documents and tutorials about using React and connecting it with Django, our backend language. Some difficulties we have encountered while building the front-end part would be creating connections between pages, building a header to hold some information that stays visible all the time to all the pages, and linking apis and calling apis. 
- Donovan:
- Colin:
- Eric: 

### Are there other things that changed comparing the final application with the original proposal?
Overall, the project remains pretty similar to our original proposal, and the changes we had were discussed above. One thing that is different from our original proposal would be how we implement the user interface, but this is something not related to the functionalities.

### Describe future work that you think, other than the interface, that the application can improve on.
In the future, we could possibly make the advanced queries more interesting and useful for the users, such as letting them choose certain requirements and generate the table accordingly. 

### Describe the final division of labor and how well you managed teamwork. 
- Preparation (ER diagrams and tables): Jocelyn and Donovan
- Input data: Eric and Donovan
- Backend: Donovan
- Frontend: Jocelyn
- Advanced queries: Colin
- Triggers and stored procedures: Colin and Eric
We first discussed our personal preferences and interests about the project along with availability throughout the semester. People who have previous knowledge of a certain part would voluntarily start the part he/she is familiar with. When there is any part that nobody is familiar with, we communicate and do research online to learn more about how to implement.

