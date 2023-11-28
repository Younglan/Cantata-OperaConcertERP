import "../../css/CenterInfo.css";

const CenterInfo = () => {
    return (
        <div className="Background">
            <div className="textground">
                <div className="title">
                    <h1>"센터소개"</h1>
                </div>
                <div className="image">
                    {/* mariaDB에서 bold타입에 저장된 이미지 가져오기 */}
                </div>
                <div className="text">
                    {/* mariaDB에서 bold타입에 저장되어있는 text가져오기 */}
                </div>
            </div>
        </div>
    );
};
export default CenterInfo;