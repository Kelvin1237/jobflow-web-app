import Wrapper from "../assets/wrappers/JobInfo";

const JobInfo = (props) => {
  const { icon, text } = props;
  return (
    <Wrapper>
      <span className="job-icon">{icon}</span>
      <span className="job-text">{text}</span>
    </Wrapper>
  );
};
export default JobInfo;
