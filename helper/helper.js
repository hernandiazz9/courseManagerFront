import { addMinutes, addHours } from "date-fns";


export const verifyDisponibilityOfInstructor = (allCourses, startDate, instructor) => {
  const dateSelect = new Date(startDate);
  const verifyDisponibility = allCourses.filter((course) => {
    const dateStart = new Date(Number(course.startDate));
    const hsMin = course.courseLength.split(":");
    const addHs = addHours(dateStart, Number(hsMin[0]));
    const dateFinish = addMinutes(addHs, Number(hsMin[1]));
    return (
      dateSelect.getTime() > course.startDate &&
      dateSelect.getTime() < dateFinish.getTime()
    );
  });
  const sameInstructor = verifyDisponibility.map((course) => {
    return course.instructor.id === instructor.id;
  });

  return sameInstructor;
};
