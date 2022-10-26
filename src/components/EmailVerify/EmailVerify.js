import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container } from "@mui/material";
import Button from '@mui/material/Button';

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:5000/api/users/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <Container>
      {validUrl ? (
        <div>
          <h1>Email verified successfully</h1>
          <Link to="/login">
            <Button variant="contained" disableElevation>
             Login
            </Button>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </Container>
  );
};

export default EmailVerify;
