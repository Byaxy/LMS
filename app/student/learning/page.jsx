import CourseVisualization from "@/components/student/CourseVisualiztion/CourseVisualization";

const LearningPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <CourseVisualization />
      </main>
    </div>
  );
};

export default LearningPage;
