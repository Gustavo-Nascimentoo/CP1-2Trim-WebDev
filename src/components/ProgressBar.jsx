import "./ProgressBar.css";

const ProgressBar = ({ watched, total }) => {
  const percent = total > 0 ? ((watched / total) * 100).toFixed(0) : 0;

  return (
    <div className="progress-bar">
      <div className="progress-bar__track">
        <div className="progress-bar__fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="progress-bar__label">
        {watched}/{total} episódios
      </span>
    </div>
  );
};

export default ProgressBar;
