/* PostDetail.css */

#PostDetail {
  background-color: #071a52;
  width: 100%;
  /* max-height: 100%; */
  display: flex;
  /* align-items: center; */
}

.postDetailContainer {
  position: relative;
  width: 90%;
  /* max-width: 1000px; */
  /* max-height: 800px; */
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  /* display:flex; */
  /* justify-content: center; */
}

.post-title {
  max-width: 800px;
  border-bottom: 1px solid black;
  margin-left:auto;
  margin-right: auto;
  margin-top: 25px;
}

.post-info {
  display: flex;
  justify-content: flex-end;
  width:100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.imgBox{
  width:100%;
  max-width: 800px;
  margin-left: auto;
  margin-right:auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* border-bottom: 1px solid black; */
}

.imgBox h5{
  text-align: left;
}

.posterImg {
  width:100%;
  max-width: 300px;
  max-height: 500px;
  padding-bottom: 15px;
  /* max-width: 300px;
  max-height: 500px; */
  /* border: 1px solid red; */
}



.customPost {
  /* border: 1px solid red; */
  width: 90%;
  max-width: 800px;
  margin: auto;
  padding-top:10px;
  text-align: justify;
  /* border:0px solid; */
}

.customPost .ql-editor{
  min-height: 450px;
  border:none !important;
}

.customPost .ql-container{
  border: none;
}

#Edit {
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  margin-right: auto;
}

#Edit button {
  /* height: 25px; */
  text-align: center;
  font-size: 80%;
}

#Edit .editButton{
  border:0px;
  color: white;
  background-color: #BB2649;
  border-radius: 5px;
}

#Edit .del {
  /* margin-right: auto; */
  margin-left: 3px;
}

#Reply {
  padding-top: 100px;
  position: relative;
  width: 90%;
  max-width: 800px;
  margin: auto;
}

#Reply h2{
  border-bottom: 1px solid black;
  width: 100%;
  text-align: left;
}

.reply-header{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.reply-form{
  width:100%;
  display:flex;
  flex-direction: column;
}

.ReplyButton{
  align-self:flex-end;
  color: white;
  background-color: #BB2649;
  border: 0px;
}

.reply{
  width: 100%;
  /* border: 1px solid black; */
  /* background-color: rgb(248, 245, 219); */
  min-height: 150px;
}

.repliesItem{
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.repName, .repDate, .repSub {
  text-align: left;
  /* 다른 필요한 스타일을 추가할 수 있습니다. */
}

.repDate{
  font-size: small;
}

.pagination{
  margin-top: 20px;
}
.pagination button {
  margin: 3px;
  width: auto;
  height: auto;
}

.pagination > button{
  border-radius: 35%;
  border: 0px;
  background-color: #dbdbdb; 
  color: black; 
}

.pagination >.active {
  background-color: #BB2649; 
  color: #ffffff; 
  font-weight: bold;
}

.pagination > button{
  border-radius: 35%;
  border: 0px;
  background-color: #dbdbdb; 
  color: black; 
}

.pagination >.active {
  background-color: #BB2649; 
  color: #ffffff; 
  font-weight: bold;
}
