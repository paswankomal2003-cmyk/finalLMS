import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../Redux/Slices/CoursesSlice';
import { useNavigate } from 'react-router-dom';
import Card22 from '../Components/Card22';

const CoursePage = () => {
    const navigate = useNavigate();
    const courseDataa = useSelector((state) => state.courses.courseData);
    const dispatch = useDispatch();

    console.log("Course Data:", courseDataa);

    const loadCourses = async () => {
        await dispatch(getAllCourses());
    };

    useEffect(() => {
        loadCourses();
    }, []);

    return (
        <div className="flex flex-col min-h-[80vh] justify-center items-center p-4">
            <div className="flex flex-wrap justify-center items-center gap-4">
                {courseDataa && courseDataa.length > 0 ? (
                    courseDataa.map((course) => (
                        <div key={course.id}>
                            <Card22 course={course} />
                        </div>
                    ))
                ) : (
                    <p>Loading courses...</p>
                )}
            </div>
        </div>
    );
};

export default CoursePage;
