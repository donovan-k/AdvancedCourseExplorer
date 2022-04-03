import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"

import './SectionPage.css';
 
const fakeSections = [
    {dept: 'CS', courseNum: '411', sectionId: 'xxxxx', professor: 'Abdu Alawini', professorId: '1', year: 'SP22', avgGpa: '3.61'},
    {dept: 'CS', courseNum: '411', 'sectionId': 'xxxxx', professor: 'Abdu Alawini', professorId: '1', year: 'SP22', avgGpa: '3.61'},
    {dept: 'CS', courseNum: '411', 'sectionId': 'xxxxx', professor: 'Abdu Alawini', professorId: '1', year: 'SP22', avgGpa: '3.61'},
    {dept: 'CS', courseNum: '411', 'sectionId': 'xxxxx', professor: 'Abdu Alawini', professorId: '1', year: 'SP22', avgGpa: '3.61'},
    {dept: 'CS', courseNum: '411', 'sectionId': 'xxxxx', professor: 'Abdu Alawini', professorId: '1', year: 'SP22', avgGpa: '3.61'},
    {dept: 'CS', courseNum: '411', 'sectionId': 'xxxxx', professor: 'Abdu Alawini', professorId: '1', year: 'SP22', avgGpa: '3.61'},
    {dept: 'CS', courseNum: '411', 'sectionId': 'xxxxx', professor: 'Abdu Alawini', professorId: '1', year: 'SP22', avgGpa: '3.61'},
    {dept: 'CS', courseNum: '411', 'sectionId': 'xxxxx', professor: 'Abdu Alawini', professorId: '1', year: 'SP22', avgGpa: '3.61'},
    {dept: 'CS', courseNum: '411', 'sectionId': 'xxxxx', professor: 'Abdu Alawini', professorId: '1', year: 'SP22', avgGpa: '3.61'},
    {dept: 'CS', courseNum: '411', 'sectionId': 'xxxxx', professor: 'Abdu Alawini', professorId: '1', year: 'SP22', avgGpa: '3.61'},
]

export const SectionPage = () => {
    const [sections, setSections] = useState([]);
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSectionInfo = async () => {
            // make api call to get section info - the thing below is fake
            // await fetch('http://localhost:9000/api/section')

            const course = state.course;
            console.log('Getting section info for', course, '...');
            setSections(fakeSections);
        }

        fetchSectionInfo();
    }, [state]);

    return (
        <div style={{ width: '100%'}} className="section-page">
            <button onClick={() => navigate(-1)}>Go back</button>
             <table style={{ margin: 'auto'}}>
                 <tr>
                    <th>Dept</th>
                    <th>Course Num</th>
                    <th>Section Id</th>
                    <th>Professor</th>
                    <th>Professor ID</th>
                    <th>Year</th>
                    <th>Avg Gpa</th>
                    </tr>
                    {sections.map(section => (
                        // make sure naming of these keys is the same as backend
                        // will say undefined otherwise
                        <tr key={section.courseNum}>
                            <td>{section.dept}</td>
                            <td>{section.courseNum}</td>
                            <td>{section.sectionId}</td>
                            <td>{section.professor}</td>
                            <td>{section.professorId}</td>
                            <td>{section.year}</td>
                            <td>{section.avgGpa}</td>
                        </tr>
                    ))}
            </table>
        </div>
       
    )
}