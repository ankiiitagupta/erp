

const FacultyDashboard = () => {
  const { RollNO } = useParams(); // Get Roll number from URL
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [error, setError] = useState(null);
  const [tFlag, setTFlag] = useState(false); // Manage timetable flag
  const [attFlag, setAttFlag] = useState(false); // Manage attendance flag
  const [noticeFlag, setNoticeFlag]= useState(false);


 
}

export default FacultyDashboard