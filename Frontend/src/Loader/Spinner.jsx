import { CircularProgress } from "@mui/material";
import '../styles/spinner.css';
export default function Spinner() {
  return (
    <div className="spinner">
      <CircularProgress color="primary"/>
    </div>
  );
}
