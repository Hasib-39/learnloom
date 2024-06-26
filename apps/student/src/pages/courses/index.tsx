import Navbar from "@/components/common/Navbar";
import Searchbar from "@/components/common/Searchbar";
import CourseCard from "@/components/common/CourseCard";
import { CourseData } from "@repo/utils/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Courses() {
  const router = useRouter();
  const [courses, setCourses] = useState([] as CourseData[]);
  const { category } = router.query;

  useEffect(() => {
    if(!category) return;

    fetch(`/api/courses?category=${category}`)
        .then(res => res.json())
        .then(data => {
            setCourses(data.courses);
        })
        .catch(err => {
            toast.error(err.message);
            console.log(err)
        })
  }, [category])

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="py-6 px-4">
        <Searchbar/>
      </div>
      <div className="flex justify-center items-center flex-wrap py-6 px-4">
        {
          courses.length ? 
        <div className="flex justify-stretch gap-4">
            {
                courses.map((course, i) => <CourseCard course={course} key={"search-course" + i}/>)
            }
        </div>
        :
        <div><p className="text-center">No course found</p></div>
        }
    </div>
    </div>
  )
}

export default Courses;