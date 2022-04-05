import { useLocation, useNavigate } from "react-router-dom"

import './CoursePage.css';

export const CoursePage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const courses = state.courses;

    return (
        <div style={{ width: '100%'}} className="course-page">
             <table style={{ margin: 'auto'}}>
                 <tr>
                    <th>Course ID</th>
                    <th>Course Num</th>
                    <th>Course Dept</th>
                    <th>Description</th>
                    <th>Credits</th>
                    </tr>
                    {courses.map(course => (
                        // make sure naming of these keys is the same as backend
                        // will say undefined otherwise
                        <tr onClick={() => navigate('/sections', { state: { course }})} key={course.course_id}>
                            <td>{course.courseId}</td>
                            <td>{course.courseNum}</td>
                            <td>{course.dept}</td>
                            <td>{course.description}</td>
                            <td>{course.credits}</td>
                        </tr>
                    ))}
            </table>
        </div>
       
    )
}