import { useNavigate } from "react-router-dom";
import errorSignImg from "../../img/error.png";
import Button from 'react-bootstrap/Button';


function ErrorPage() {
    const navigate = useNavigate();
    //리다이렉션 핸들러
    const handleRedirect = () => {
        navigate("/");
    };
    return(
        <div className='contentsArea'>
            <div className='contents'>
                <div className="ErrorContent">
                <img src={errorSignImg} alt="errorsign" /><br></br>
                    요청하신 페이지에 문제가 있습니다.<br></br><br></br>
                <Button  onClick={handleRedirect} variant="secondary">메인화면으로 가기</Button>  
                </div>
            </div>
        </div>

    );
};
export default ErrorPage;
